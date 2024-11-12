import React, { useEffect, useState, MouseEvent, ChangeEvent, KeyboardEvent } from 'react'
import './style.css';
import { ResponseDto } from 'src/apis/dto/response';
import { GetTravelDetailResponseDto } from 'src/apis/travel/dto/response';
import { useNavigate, useParams } from 'react-router-dom';
import { ACCESS_TOKEN, FASHION_ABSOLUTE_UPDATE_PATH, FASHION_DETAIL_PATH, FASHION_PATH, FASHION_UPDATE_PATH, TRAVEL_PATH } from 'src/constants';
import { useCookies } from 'react-cookie';
import { getTravelCommentListRequest, getTravelDetailRequest } from 'src/apis/travel';
import { SvgIcon } from '@mui/material';
import { NavigateNext as NavigateNextIcon, NavigateBefore as NavigateBeforeIcon } from '@mui/icons-material';
// slider
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { GetFashionCommentResponseDto, GetFashionDetailResponseDto, GetFashionLikeListResponseDto, GetFashionSaveListResponseDto } from 'src/apis/fashion/dto/response';
import { deleteFashionCommentRequest, deleteFashionRequest, getFashionCommentListRequest, getFashionDetailRequest, getFashionLikeListRequest, getFashionSaveListRequest, postFashionCommentRequest, postUpViewFashionRequest, putFashionLikeRequest, putFashionSaveRequest } from 'src/apis/fashion';
import { FashionComment, FashionDetail } from 'src/types';
import styled from "styled-components";
import { useAuthStore } from 'src/stores';
import { PostFashionCommentRequestDto } from 'src/apis/fashion/dto/request';

//function 이미지 슬라이드 컴포넌트 //
function CarouselComponent({ photoList }: { photoList: string[] }) { 

  // state: 이미지 슬라이드 설정 상태 //
  const settings = {
    dots: true,
    infinite: photoList.length > 1,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: photoList.length > 1,
    adaptiveHeight: true,
    waitForAnimate: false,
    loop: photoList.length > 1, 
    nextArrow: <SvgIcon component={NavigateNextIcon} inheritViewBox sx={{ color: 'black', fontSize: 30 }} />,
    prevArrow: <SvgIcon component={NavigateBeforeIcon} inheritViewBox sx={{ color: 'black', fontSize: 30 }} />
  };

  // styled-component: 이미지 슬라이드 스타일링 //
  const CustomSlider = styled(Slider)`
    margin: 0 auto;
    .slick-slide {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .slick-list {
      height: 100%;
    }
    .slick-track {
      display: flex;
      align-items: center;
    }
    .contents-image-item {
      margin: 0 auto;
      max-width: 100%;
      max-height: 500px; 
      object-fit: contain;
    }
  `;

  // render: 이미지 슬라이드 렌더링 //
  return (
    <CustomSlider {...settings} className='contents-image'>
      {photoList.map((photo, index) => (
        <div key={index} style={{ display: 'flex', justifyContent: 'center' }}>
          <img className='contents-image-item' src={photo} alt={`fashion-photo-${index + 1}`} />
        </div>
      ))}
    </CustomSlider>
  );
}



// component: 내용 컴포넌트 //
function Content() {

  // state: 쿠키상태 //
  const [cookies] = useCookies();

  // state: 패션 게시물 번호 상태 //
  const { fashionNumber } = useParams<{ fashionNumber: string }>();

  // state: 게시글 정보 상태 //
  const [fashionDetail, setFashionDetail] = useState<FashionDetail>();
  const [userId, setUserId] = useState<string>();
  const [fashionTitle, setFashionTitle] = useState<string>('');
  const [fashionPhotoList, setFashionPhotoList] = useState<string[]>([]);
  const [fashionHashtagList, setFashionHashtagList] = useState<string[]>([]);
  const [fashionLikeUserList, setFashionLikeUserList] = useState<string[]>([]);
  const [fashionSaveUserList, setFashionSaveUserList] = useState<string[]>([]);
  const [fashionViewCount, setFashionViewCount] = useState<number>(0);
  const [fashionLikeCount, setFashionLikeCount] = useState<number>(0);
  const [fashionSaveCount, setFashionSaveCount] = useState<number>(0);
  const [fashionContent, setFashionContent] = useState<string>('');
  const [fashionDate, setFashionDate] = useState<string>('');
  const [fashionTotalPrice, setFashionTotalPrice] = useState<number | null>(null);
  const [detail, setDetail] = useState<FashionDetail>();


  // function: 네비게이터 함수 //
  const navigator = useNavigate();

  // function: get Fashion detail response 처리 함수 //
  const getFashionDetailtResponse = (responseBody: GetTravelDetailResponseDto | ResponseDto | null) => {
    const message =
      !responseBody ? '서버에 문제가 있습니다.' :
      responseBody.code === 'VF' ? '잘못된 접근입니다.' :
      responseBody.code === 'AF' ? '잘못된 접근입니다.' :
      responseBody.code === 'DBE' ? '서버에 문제가 있습니다.' :
      responseBody.code === 'NB' ? '해당 게시물이 존재하지 않습니다.' : '';

    // 성공 여부 확인 //
    const isSuccessed = responseBody !== null && responseBody.code === 'SU';
    if (!isSuccessed) {
      alert(message);
      navigator(FASHION_PATH);
      return;
    }

    // 패션 게시물 상세 정보 설정 //
    const { fashionDetail } = responseBody as GetFashionDetailResponseDto;
    setFashionDetail(fashionDetail);
    setUserId(fashionDetail.userId);
    setFashionTitle(fashionDetail.fashionTitle);
    setFashionPhotoList(fashionDetail.fashionPhotoList);
    setFashionHashtagList(fashionDetail.fashionHashtagList);
    setFashionLikeUserList(fashionDetail.fashionLikeUserList);
    setFashionSaveUserList(fashionDetail.fashionSaveUserList);
    setFashionViewCount(fashionDetail.fashionViewCount);
    setFashionLikeCount(fashionDetail.fashionLikeCount);
    setFashionSaveCount(fashionDetail.fashionSaveCount);
    setFashionDate(fashionDetail.fashionDate);
    setFashionTotalPrice(fashionDetail.totalPrice);
    setFashionContent(fashionDetail.fashionContent);
  };


  // function: 날짜 포맷 변경 함수 //
  const changeDateFormat = (date: string) => {
    const yy = date.substring(2, 4);
    const mm = date.substring(5, 7);
    const dd = date.substring(8, 10);
    return `${yy}.${mm}.${dd}`;
  };


  // effect:  게시글 정보 요청 함수 //
  useEffect(() => {
    if (!fashionNumber) return;

    const accessToken = cookies[ACCESS_TOKEN];
    if (!accessToken) return;

    postUpViewFashionRequest(fashionNumber).then();

    getFashionDetailRequest(fashionNumber).then(getFashionDetailtResponse);
  }, [fashionNumber]);

  // render: 내용 컴포넌트 렌더링 //
  return (
    <div id='contents-main'>
      <div className='contents-top'>
        <div className='contents-top-left'>
          <div className='contents-top-title'>{fashionTitle}</div>
          <div className='contents-top-date'>{changeDateFormat(fashionDate)}</div>
        </div>
        <div className='contents-top-vote-button-box'>
          <div className='contents-top-vote-button'>투표</div>
        </div>
      </div>
      <CarouselComponent photoList={fashionPhotoList} />
      <div className='contents-text'>{fashionContent}</div>
      <div className='contents-information'>
        <div className='contents-information-left'>
          <div className='contents-information-hashtag'>
            {fashionHashtagList.map((hashtag: string, index: number) => (
              <div key={index} className='board-tag-item'>{hashtag}</div>
            ))}

          </div>
        </div>
        <div className='contents-information-right'>
          <div className='price'>{"가격 " + fashionTotalPrice + "원"}</div>
          <Like />
          <div className='contents-information-view'>
            <div className='contents-information-view-icon'></div>
            <div className='contents-information-data'>{fashionViewCount}</div>
          </div>
          <Save />
        </div>
      </div>
      
    </div>
  )
}

//function 저장 //
function Save() {

  // state: 쿠키상태 //
  const [cookies] = useCookies();

  // state: 패션 게시물 번호 상태 //
  const { fashionNumber } = useParams<{ fashionNumber: string }>();

  // state: 로그인 유저 상태 //
  const { signInUser } = useAuthStore();

  // state: 저장 리스트 상태 //
  const [fashionSaveList, setFashionSaveList] = useState<string[]>([]);

  // state:유저가 저장을 눌렀는지 상태 //
  const isSaved = signInUser !== null && fashionSaveList.includes(signInUser.userId);

  // function: 저장 요청 응답 함수 //
  const putFashionSaveResponse = (responseBody: ResponseDto | null) => {
    const message =
      !responseBody ? '서버에 문제가 있습니다.' :
      responseBody.code === 'VF' ? '잘못된 접근입니다.' :
      responseBody.code === 'AF' ? '잘못된 접근입니다.' :
      responseBody.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

    const isSuccessed = responseBody !== null && responseBody.code === 'SU';
    if (!isSuccessed) {
      alert(message);
      return;
    }

    if (!fashionNumber) return;
    getFashionSaveListRequest(fashionNumber).then(getFashionSaveListResponse);
  }

  // function: 저장 요청 함수 //
  const putFashionSave = () => {
    const accessToken = cookies[ACCESS_TOKEN];
    if (!accessToken) return;
    if (!fashionNumber) return;
    putFashionSaveRequest(fashionNumber, accessToken).then(putFashionSaveResponse);
  }

  // event handler: 저장 클릭 이벤트 처리 //
  const saveClcikHandler = () => {
    putFashionSave();
  }

  // function: 저장 리스트 요청 응답 함수 //
  const getFashionSaveListResponse = (responseBody: GetFashionSaveListResponseDto | ResponseDto | null) => {
    const message =
      !responseBody ? '서버에 문제가 있습니다.' :
      responseBody.code === 'VF' ? '잘못된 접근입니다.' :
      responseBody.code === 'AF' ? '잘못된 접근입니다.' :
      responseBody.code === 'DBE' ? '서버에 문제가 있습니다.' :
      responseBody.code === 'NB' ? '해당 게시물이 존재하지 않습니다.' : '';

    const isSuccessed = responseBody !== null && responseBody.code === 'SU';
    if (!isSuccessed) {
      alert(message);
      return;
    }

    const { userIdList } = responseBody as GetFashionSaveListResponseDto;
    setFashionSaveList(userIdList);
  }

  // effect: 저장 리스트 요청 함수 //
  useEffect(() => {
    // fashionNumber를 이용하여 좋아요 리스트 가져오기
    if (!fashionNumber) return;
    getFashionSaveListRequest(fashionNumber).then(getFashionSaveListResponse);
  }, []);

  // render: 저장 컴포넌트 렌더링 //
  return (
    <div className={`contents-information-bookmark ${isSaved ? 'active' : ''}`} onClick={saveClcikHandler}></div>
  )
}

//function 좋아요 //
function Like() {

  // state: 쿠키상태 //
  const [cookies] = useCookies();

  // state: 패션 게시물 번호 상태 //
  const { fashionNumber } = useParams<{ fashionNumber: string }>();

  // state: 로그인 유저 상태 //
  const { signInUser } = useAuthStore();

  // state: 좋아요 상태 //
  const [fashionLikeList, setFashionLikeList] = useState<string[]>([]);

  // state: 유저가 좋아요를 눌렀는지 상태 //
  const isLiked = signInUser !== null && fashionLikeList.includes(signInUser.userId);

  // function: 좋아요 요청 응답 함수 //
  const putFashionLikeResponse = (responseBody: ResponseDto | null) => {
    const message =
      !responseBody ? '서버에 문제가 있습니다.' :
      responseBody.code === 'VF' ? '잘못된 접근입니다.' :
      responseBody.code === 'AF' ? '잘못된 접근입니다.' :
      responseBody.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

    const isSuccessed = responseBody !== null && responseBody.code === 'SU';
    if (!isSuccessed) {
      alert(message);
      return;
    }

    if (!fashionNumber) return;
    getFashionLikeListRequest(fashionNumber).then(getFashionLikeListResponse);
  }

  // function: 좋아요 요청 함수 //
  const putFashionLike = () => {
    const accessToken = cookies[ACCESS_TOKEN];
    if (!accessToken) return;
    if (!fashionNumber) return;
    putFashionLikeRequest(fashionNumber, accessToken).then(putFashionLikeResponse);
  }



  // event handler: 좋아요 클릭 이벤트 처리 //
  const likeClcikHandler = () => {
    // 좋아요 누르는 API 요청
    putFashionLike();
  }

  // function: 좋아요 리스트 요청 응답 함수 //
  const getFashionLikeListResponse = (responseBody: GetFashionLikeListResponseDto | ResponseDto | null) => {
    const message =
      !responseBody ? '서버에 문제가 있습니다.' :
      responseBody.code === 'VF' ? '잘못된 접근입니다.' :
      responseBody.code === 'AF' ? '잘못된 접근입니다.' :
      responseBody.code === 'DBE' ? '서버에 문제가 있습니다.' :
      responseBody.code === 'NB' ? '해당 게시물이 존재하지 않습니다.' : '';

    const isSuccessed = responseBody !== null && responseBody.code === 'SU';
    if (!isSuccessed) {
      alert(message);
      return;
    }

    const { userIdList } = responseBody as GetFashionLikeListResponseDto;
    setFashionLikeList(userIdList);
  }

  // effect: 좋아요 리스트 요청 함수 //
  useEffect(() => {
    // fashionNumber를 이용하여 좋아요 리스트 가져오기
    if (!fashionNumber) return;
    getFashionLikeListRequest(fashionNumber).then(getFashionLikeListResponse);
  }, []);

  // render: 좋아요 컴포넌트 렌더링 //
  return (
    <div className='contents-information-like'>
      <div className={`contents-information-like-icon ${isLiked ? 'active' : ''}`} onClick={likeClcikHandler}></div>
      <div className='contents-information-data'>{fashionLikeList.length}</div>
    </div>
  )
}

// component: 댓글 컴포넌트 //
function Comment() {

  // state: 쿠키상태 //
  const [cookies] = useCookies();

  // state: 네비게이션 상태 //
  const navigate = useNavigate();

  // state: 패션 게시물 번호 상태 //
  const { fashionNumber } = useParams<{ fashionNumber: string }>();

  // state: 댓글창 모달 상태 //
  const [commentOpen, setCommentOpen] = useState(false);

  // state: 댓글 리스트 상태 //
  const [commentList, setCommentList] = useState<FashionComment[]>([]);

  // state: 댓글 입력 상태 //
  const [commentWrite, setCommentWrite] = useState<string>('');

  // state: 게시글 디테일 상태 //
  const [fashionDetail, setFashionDetail] = useState<FashionDetail>();

    // state: 현재 로그인한 유저 아이디 //
    const { signInUser } = useAuthStore();

      // function: get travel detail response 처리 함수 //
  const getFashionDetailtResponse = (responseBody: GetTravelDetailResponseDto | ResponseDto | null) => {
    const message =
      !responseBody ? '서버에 문제가 있습니다.' :
        responseBody.code === 'VF' ? '잘못된 접근입니다.' :
          responseBody.code === 'AF' ? '잘못된 접근입니다.' :
            responseBody.code === 'DBE' ? '서버에 문제가 있습니다.' :
              responseBody.code === 'NB' ? '해당 게시물이 존재하지 않습니다.' : '';

    const isSuccessed = responseBody !== null && responseBody.code === 'SU';
    if (!isSuccessed) {
      alert(message);
      navigate(`${FASHION_DETAIL_PATH}/${fashionNumber}`);
      return;
    }

    const { fashionDetail } = responseBody as GetFashionDetailResponseDto;
    setFashionDetail(fashionDetail);
  };


  // function: 댓글 리스트 요청 함수 //
  const getFashionCommentResponse = (responseBody: GetFashionCommentResponseDto | ResponseDto | null) => {
    const message =
      !responseBody ? '서버에 문제가 있습니다.' :
      responseBody.code === 'VF' ? '잘못된 접근입니다.' :
      responseBody.code === 'AF' ? '잘못된 접근입니다.' :
      responseBody.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

    const isSuccessed = responseBody !== null && responseBody.code === 'SU';
    if (!isSuccessed) {
      alert(message);
      return;
    }

    const { fashionComments } = responseBody as GetFashionCommentResponseDto;

    const sortedComments = [...fashionComments].sort((a, b) => b.fashionCommentNumber - a.fashionCommentNumber);
    setCommentList(sortedComments);
  }

  // function: 댓글 추가 요청 함수 //
  const postFashionCommentResponse = (responseBody: ResponseDto | null) => {
    const message =
      !responseBody ? '서버에 문제가 있습니다.' :
      responseBody.code === 'VF' ? '잘못된 접근입니다.' :
      responseBody.code === 'AF' ? '잘못된 접근입니다.' :
      responseBody.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

    const isSuccessed = responseBody !== null && responseBody.code === 'SU';
    if (!isSuccessed) {
      alert(message);
      return;
    }
    if(!fashionNumber) return;
    getFashionCommentListRequest(fashionNumber).then(getFashionCommentResponse);
  }

  // function: 댓글 삭제 요청 응답 함수 //
  const deleteFashionCommentResponse = (responseBody: ResponseDto | null) => {
    const message =
      !responseBody ? '서버에 문제가 있습니다.' :
      responseBody.code === 'VF' ? '잘못된 접근입니다.' :
      responseBody.code === 'AF' ? '잘못된 접근입니다.' :
      responseBody.code === 'DBE' ? '서버에 문제가 있습니다.' :
      responseBody.code === 'NC' ? '존재하지 않는 코드 입니다.' :
      responseBody.code === 'NP' ? '권한이 없습니다.' : '';

    const isSuccessed = responseBody !== null && responseBody.code === 'SU';
    if (!isSuccessed) {
      alert(message);
      return;
    }
    if(!fashionNumber) return;
    getFashionCommentListRequest(fashionNumber).then(getFashionCommentResponse);
  }

  // function: 패션 삭제 요청 응답 함수 //
  const fashionDeleteResponse = (responseBody: ResponseDto | null) => {
    const message =
      !responseBody ? '서버에 문제가 있습니다.' :
      responseBody.code === 'VF' ? '잘못된 접근입니다.' :
      responseBody.code === 'AF' ? '잘못된 접근입니다.' :
      responseBody.code === 'DBE' ? '서버에 문제가 있습니다.' : 
      responseBody.code === 'NP' ? '권한이 없습니다.' : '';

    const isSuccessed = responseBody !== null && responseBody.code === 'SU';
    if (!isSuccessed) {
      alert(message);
      return;
    }
    if(!fashionNumber) return;
    navigate(FASHION_PATH);
  }

  // event handler: 게시글 수정 이벤트 처리 함수 //
  const fashionUpdateHandler = (path: string) => {
    if (!fashionNumber) return;

    const accessToken = cookies[ACCESS_TOKEN];
    if (!accessToken) return;

    navigate(path);
  }

  // event handler: 게시글 삭제 이벤트 처리 함수 //
  const fashionDeleteHandler = () => {
    if (window.confirm("정말로 삭제하시겠습니까?")) {
      alert("삭제가 완료되었습니다.");
    } else {
      alert("취소되었습니다.");
      return;
    }

    const accessToken = cookies[ACCESS_TOKEN];
    if(!fashionNumber) return;
    if(!accessToken) return;
    deleteFashionRequest(fashionNumber, accessToken).then(fashionDeleteResponse);
  }

  // event handler: 댓글 입력 이벤트 처리 //
  const onClickcommentWriteChangeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = event.target;
    if (value.length > 100) {
      alert('댓글은 최대 100자입니다.');
      return;
    }
    setCommentWrite(value);
  }

  // event handler: 댓글 추가 이벤트 처리 //
  const onclickcommentAddHandler = () => {
    const accessToken = cookies[ACCESS_TOKEN];
    if (!accessToken) return;
    if (!fashionNumber) return;
    const requestBody: PostFashionCommentRequestDto = {
      fashionComment: commentWrite
    }

    postFashionCommentRequest(requestBody, fashionNumber, accessToken).then(postFashionCommentResponse);
    setCommentWrite('');
  }

  // event handler: 댓글 삭제 이벤트 처리 //
  const onclickcommentDeleteHandler = (commentNumber: number) => (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();

    const isSuccessed = window.confirm('정말 삭제하시겠습니까?');
    if(!isSuccessed) return;

    const accessToken = cookies[ACCESS_TOKEN];
    if(!fashionNumber) return;
    if(!accessToken) return;

    deleteFashionCommentRequest(commentNumber, accessToken).then(deleteFashionCommentResponse);
  }

  // event handler: 댓글창 오픈 이벤트 처리 //
  const commentOpenHandler = () => {
    setCommentOpen(!commentOpen);
  }

  // effect: 댓글 리스트 요청 함수 //
  useEffect(() => {
    if (!fashionNumber) return;
    console.log(fashionNumber);
    console.log(commentList);

    getFashionDetailRequest(fashionNumber).then(getFashionDetailtResponse);
    getFashionCommentListRequest(fashionNumber).then(getFashionCommentResponse);
  }, []);

  // render: 댓글 컴포넌트 렌더링 //
  return (
    <div id='comment-main'>
      <div className='comment-button-box'>
        <div className='comment-open-button' onClick={commentOpenHandler}>{commentOpen ? "댓글 닫기" : "댓글 열기"}</div>
        {signInUser && fashionDetail?.userId === signInUser.userId ? (
        <div className='comment-button-box-right'>
          <div className='comment-update-button' onClick={() => fashionUpdateHandler(`${FASHION_UPDATE_PATH}/${fashionNumber}`)}>수정</div>
          <div className='comment-delete-button' onClick={fashionDeleteHandler}>삭제</div>
        </div>
        ) : null }
      </div>
      {commentOpen &&
        <div className='comment-detail'>
          <div className='comment-detail-top'>
            <textarea className='comment-detail-write' placeholder='댓글을 작성하세요. (100글자 이내)' value={commentWrite} onChange={onClickcommentWriteChangeHandler}></textarea>
            <div className='comment-detail-add-button-box'>
              <div className='comment-detail-add-button' onClick={onclickcommentAddHandler}>댓글 추가</div>
            </div>
          </div>

          {commentList.map((comment: FashionComment, index: number) => (
            <div className='comment-detail-bottom' key={index}>
              <div className='comment-detail-writer'>
                <div className='comment-detail-name'>{comment.userId}</div>
                {signInUser && comment.userId === signInUser.userId ? (
                <div className='comment-detail-delete-button' onClick={onclickcommentDeleteHandler(comment.fashionCommentNumber)}>삭제</div>
              ) : null }
              </div>
              <div className='comment-detail-text' style={{ wordBreak: 'break-word' }}>{comment.fashionComment}</div>
            </div>
          ))}
        </div>
      }
    </div>
  )
}


// component: 패션 상세 페이지 //
export default function FashionDetailPage() {
  return (
    <div id='detail-main'>
      <Content />
      <Comment />
    </div>
  )
}
