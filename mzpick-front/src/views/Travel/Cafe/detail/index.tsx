
import React, { ChangeEvent, MouseEvent, useEffect, useState } from 'react'
import './style.css';
import { ResponseDto } from 'src/apis/dto/response';
import { useNavigate, useParams } from 'react-router-dom';
import { ACCESS_TOKEN, TRAVEL_CAFE_DETAIL_PATH, TRAVEL_CAFE_PATH, TRAVEL_CAFE_UPDATE_PATH } from 'src/constants';
import { useCookies } from 'react-cookie';
import { CafeDetail } from 'src/types';
import { NavigateBefore as NavigateBeforeIcon, NavigateNext as NavigateNextIcon } from '@mui/icons-material';
import { SvgIcon } from '@mui/material';
import './style.css';
// slider
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import styled from 'styled-components';
import { useAuthStore } from 'src/stores';
import { GetCafeCommentResponseDto, GetCafeDetailResponseDto, GetCafeLikeListResponseDto, GetCafeSaveListResponseDto } from 'src/apis/cafe/dto/response';
import "slick-carousel/slick/slick.css";
import { deleteCafeCommentRequest, deleteCafeRequest, getCafeCommentListRequest, getCafeDetailRequest, getCafeLikeListRequest, getCafeSaveListRequest, postCafeCommentRequest, postUpViewCafeRequest, putCafeLikeRequest, putCafeSaveRequest } from 'src/apis/cafe';
import { PostTravelCafeCommentRequestDto } from 'src/apis/cafe/dto/request';
import { CafeComment } from 'src/types/cafe/cafeComment.interface';

// const [travelPhotoList, setTravelPhotoList] = useState<string[]>([]);

function CarouselComponent({ photoList }: { photoList: string[] }) {  // Fixed props typing
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

  return (
    <CustomSlider {...settings} className='contents-image'>
      {photoList.map((photo, index) => (
        <div key={index} style={{ display: 'flex', justifyContent: 'center' }}>
          <img className='contents-image-item' src={photo} alt={`travelCafe-photo-${index + 1}`} />
        </div>
      ))}
    </CustomSlider>
  );
}

// component: 내용 컴포넌트 //
function Content() {

  // state: 쿠키상태 //
  const [cookies] = useCookies();

  const { travelCafeNumber } = useParams<{ travelCafeNumber: string }>();

  // state: 게시글 정보 상태 //
  const [travelCafeDetail, setTravelCafeDetail] = useState<CafeDetail>();
  const [userId, setUserId] = useState<string>();
  const [travelLocation, setTravelLocation] = useState<string>('');
  const [travelCafeTitle, setTravelCafeTitle] = useState<string>('');
  const [travelCafePhotoList, setTravelCafePhotoList] = useState<string[]>([]);
  const [travelCafeHashtagList, setTravelCafeHashtagList] = useState<string[]>([]);
  const [travelCafeLikeUserList, setTravelCafeLikeUserList] = useState<string[]>([]);
  const [travelCafeSaveUserList, setTravelCafeSaveUserList] = useState<string[]>([]);
  const [travelCafeViewCount, setTravelCafeViewCount] = useState<number>(0);
  const [travelCafeLikeCount, setTravelCafeLikeCount] = useState<number>(0);
  const [travelCafeSaveCount, setTravelCafeSaveCount] = useState<number>(0);
  const [travelCafeContent, setTravelCafeContent] = useState<string>('');
  const [travelCafeDate, setTravelCafeDate] = useState<string>('');
  const [detail, setDetail] = useState<CafeDetail>();

  // function: 네비게이터 함수 //
  const navigator = useNavigate();

  // function: get travelCafe detail response 처리 함수 //
  const getTravelCafeDetailtResponse = (responseBody: GetCafeDetailResponseDto | ResponseDto | null) => {
    const message =
      !responseBody ? '서버에 문제가 있습니다.' :
        responseBody.code === 'VF' ? '잘못된 접근입니다.' :
          responseBody.code === 'AF' ? '잘못된 접근입니다.' :
            responseBody.code === 'DBE' ? '서버에 문제가 있습니다.' :
              responseBody.code === 'NB' ? '해당 게시물이 존재하지 않습니다.' : '';

    const isSuccessed = responseBody !== null && responseBody.code === 'SU';
    if (!isSuccessed) {
      alert(message);
      navigator(`${TRAVEL_CAFE_DETAIL_PATH}/${travelCafeNumber}`);
      return;
    }

    const { travelCafeDetail } = responseBody as GetCafeDetailResponseDto;
    setTravelCafeDetail(travelCafeDetail);
    setUserId(travelCafeDetail.userId);
    setTravelCafeTitle(travelCafeDetail.travelCafeTitle);
    setTravelLocation(travelCafeDetail.travelLocathion);
    setTravelCafePhotoList(travelCafeDetail.travelCafePhotoList);
    setTravelCafeHashtagList(travelCafeDetail.travelCafeHashtagList);
    setTravelCafeLikeUserList(travelCafeDetail.travelCafeLikeUserList);
    setTravelCafeSaveUserList(travelCafeDetail.travelCafeSaveUSerList);
    setTravelCafeViewCount(travelCafeDetail.travelCafeView);
    setTravelCafeLikeCount(travelCafeDetail.travelCafeLikeCount);
    setTravelCafeSaveCount(travelCafeDetail.travelCafeSaveCount);
    setTravelCafeDate(travelCafeDetail.travelCafeDate);
    setTravelCafeContent(travelCafeDetail.travelCafeContent);
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
    if (!travelCafeNumber) return;

    const accessToken = cookies[ACCESS_TOKEN];
    if (!accessToken) return;

    postUpViewCafeRequest(travelCafeNumber).then();

    getCafeDetailRequest(travelCafeNumber).then(getTravelCafeDetailtResponse);
  }, [travelCafeNumber]);

  // render: 내용 컴포넌트 렌더링 //
  return (
    <div id='contents-main'>
      <div className='contents-top'>
        <div className='contents-top-left'>
          <div className='contents-top-title'>{travelCafeTitle}</div>
          <div className='contents-top-date'>{changeDateFormat(travelCafeDate)}</div>
        </div>
        <div className='contents-top-vote-button-box'>
          <div className='contents-top-vote-button'>투표</div>
        </div>
      </div>
      <CarouselComponent photoList={travelCafePhotoList} />
      <div className='contents-text'>{travelCafeContent}</div>
      <div className='contents-information'>
        <div className='contents-information-left'>
          <div className='contents-information-hashtag'>
            {travelCafeHashtagList.map((hashtag: string, index: number) => (
              <div key={index} className='board-tag-item'>#{hashtag}</div>
            ))}
          </div>
        </div>
        <div className='contents-information-right'>
          <Like />
          <div className='contents-information-view'>
            <div className='contents-information-view-icon'></div>
            <div className='contents-information-data'>{travelCafeViewCount}</div>
          </div>
          <Save />
        </div>
      </div>
    </div>
  )
}


// function: 저장 //
function Save() {

  // state: 쿠키상태 //
  const [cookies] = useCookies();

  // state: 카페 게시물 번호 상태 //
  const { travelCafeNumber } = useParams<{ travelCafeNumber: string }>();

  // state: 로그인 유저 상태 //
  const { signInUser } = useAuthStore();

  // state: 저장 리스트 상태 //
  const [travelCafeSaveList, setTravelCafeSaveList] = useState<string[]>([]);

  // state:유저가 저장을 눌렀는지 상태 //
  const isSaved = signInUser !== null && travelCafeSaveList.includes(signInUser.userId);

  // function: 저장 요청 응답 함수 //
  const putTravelCafeSaveResponse = (responseBody: ResponseDto | null) => {
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

    if (!travelCafeNumber) return;
    getCafeSaveListRequest(travelCafeNumber).then(getTravelCafeSaveListResponse);
  }

  // function: 저장 요청 함수 //
  const putTravelCafeSave = () => {
    const accessToken = cookies[ACCESS_TOKEN];
    if (!accessToken) return;
    if (!travelCafeNumber) return;
    putCafeSaveRequest(travelCafeNumber, accessToken).then(putTravelCafeSaveResponse);
  }

  // event handler: 저장 클릭 이벤트 처리 //
  const saveClcikHandler = () => {
    putTravelCafeSave();
  }

  // function: 저장 리스트 요청 응답 함수 //
  const getTravelCafeSaveListResponse = (responseBody: GetCafeSaveListResponseDto | ResponseDto | null) => {
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

    const { userIdList } = responseBody as GetCafeSaveListResponseDto;
    setTravelCafeSaveList(userIdList);
  }

  // effect: 저장 리스트 요청 함수 //
  useEffect(() => {
    // travelCafeNumber를 이용하여 좋아요 리스트 가져오기
    if (!travelCafeNumber) return;
    getCafeSaveListRequest(travelCafeNumber).then(getTravelCafeSaveListResponse);
  }, []);

  // render: 저장 컴포넌트 렌더링 //
  return (
    <div className={`contents-information-bookmark ${isSaved ? 'active' : ''}`} onClick={saveClcikHandler}></div>
  )
}

// function: 좋아요 //
function Like() {

  // state: 쿠키상태 //
  const [cookies] = useCookies();

  // state: 카페 게시물 번호 상태 //
  const { travelCafeNumber } = useParams<{ travelCafeNumber: string }>();

  // state: 로그인 유저 상태 //
  const { signInUser } = useAuthStore();

  // state: 좋아요 상태 //
  const [travelCafeLikeList, setTravelCafeLikeList] = useState<string[]>([]);

  // state: 유저가 좋아요를 눌렀는지 상태 //
  const isLiked = signInUser !== null && travelCafeLikeList.includes(signInUser.userId);

  // function: 좋아요 요청 응답 함수 //
  const putTravelCafeLikeResponse = (responseBody: ResponseDto | null) => {
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

    if (!travelCafeNumber) return;
    getCafeLikeListRequest(travelCafeNumber).then(getTravelCafeLikeListResponse);
  }

  // function: 좋아요 요청 함수 //
  const putTravelCafeLike = () => {
    const accessToken = cookies[ACCESS_TOKEN];
    if (!accessToken) return;
    if (!travelCafeNumber) return;
    putCafeLikeRequest(travelCafeNumber, accessToken).then(putTravelCafeLikeResponse);
  }

  // event handler: 좋아요 클릭 이벤트 처리 //
  const likeClcikHandler = () => {
    // 좋아요 누르는 API 요청
    putTravelCafeLike();
  }

  // function: 좋아요 리스트 요청 응답 함수 //
  const getTravelCafeLikeListResponse = (responseBody: GetCafeLikeListResponseDto | ResponseDto | null) => {
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

    const { userIdList } = responseBody as GetCafeLikeListResponseDto;
    setTravelCafeLikeList(userIdList);
  }

  // effect: 좋아요 리스트 요청 함수 //
  useEffect(() => {
    // travelCafeNumber를 이용하여 좋아요 리스트 가져오기
    if (!travelCafeNumber) return;
    getCafeLikeListRequest(travelCafeNumber).then(getTravelCafeLikeListResponse);
  }, []);

  // render: 좋아요 컴포넌트 렌더링 //
  return (
    <div className='contents-information-like'>
      <div className={`contents-information-like-icon ${isLiked ? 'active' : ''}`} onClick={likeClcikHandler}></div>
      <div className='contents-information-data'>{travelCafeLikeList.length}</div>
    </div>
  )
}

// component: 댓글 컴포넌트 //
function Comment() {

  // state: 쿠키상태 //
  const [cookies] = useCookies();

  // state: 네비게이션 상태 //
  const navigator = useNavigate();

  // state: 여행 게시물 번호 상태 //
  const { travelCafeNumber } = useParams<{ travelCafeNumber: string }>();

  // state: 댓글창 모달 상태 //
  const [commentOpen, setCommentOpen] = useState(false);

  // state: 댓글 리스트 상태 //
  const [commentList, setCommentList] = useState<CafeComment[]>([]);

  // state: 댓글 입력 상태 //
  const [commentWrite, setCommentWrite] = useState<string>('');


  // function: 댓글 리스트 요청 함수 //
  const getTravelCafeCommentResponse = (responseBody: GetCafeCommentResponseDto | ResponseDto | null) => {
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

    const { travelCafeComments } = responseBody as GetCafeCommentResponseDto;

    const sortedComments = [...travelCafeComments].sort((a, b) => b.travelCafeCommentNumber - a.travelCafeCommentNumber);
    setCommentList(sortedComments);
  }

  // function: 댓글 추가 요청 함수 //
  const postTravelCafeCommentResponse = (responseBody: ResponseDto | null) => {
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
    if (!travelCafeNumber) return;
    getCafeCommentListRequest(travelCafeNumber).then(getTravelCafeCommentResponse);
  }

  // function: 댓글 삭제 요청 응답 함수 //
  const deleteTravelCafeCommentResponse = (responseBody: ResponseDto | null) => {
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
    if (!travelCafeNumber) return;
    getCafeCommentListRequest(travelCafeNumber).then(getTravelCafeCommentResponse);
  }

  // function: 카페 삭제 요청 응답 함수 //
  const deleteTravelCafeDetailtResponse = (responseBody: ResponseDto | null) => {
    const message =
      !responseBody ? '서버에 문제가 있습니다.' :
        responseBody.code === 'VF' ? '잘못된 접근입니다.' :
          responseBody.code === 'AF' ? '잘못된 접근입니다.' :
            responseBody.code === 'NP' ? '권한이 없습니다.' :
              responseBody.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

    const isSuccessed = responseBody !== null && responseBody.code === 'SU';
    if (!isSuccessed) {
      alert(message);
      return;
    }
    if (!travelCafeNumber) return;
    navigator(TRAVEL_CAFE_PATH);
  };

  // event handler: 댓글 수정 이벤트 처리 함수 //
  const travelCafeUpdateHandler = (path: string) => {
    navigator(path);
  }

    // event handler: 삭제 버튼 클릭 이벤트 처리 //
    const deleteButtonClickHandler = () => {
      if (window.confirm("정말로 삭제하시겠습니까?")) {
        alert("삭제가 완료되었습니다.");
      } else {
        alert("취소되었습니다.");
        return;
      }
  
      if (!travelCafeNumber) return;
  
      const accessToken = cookies[ACCESS_TOKEN];
      if (!accessToken) return;
  
      deleteCafeRequest(travelCafeNumber, accessToken).then(deleteTravelCafeDetailtResponse);
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
    if (!travelCafeNumber) return;
    const requestBody: PostTravelCafeCommentRequestDto = {
      travelCafeComment: commentWrite
    }

    postCafeCommentRequest(requestBody, travelCafeNumber, accessToken).then(postTravelCafeCommentResponse);
    setCommentWrite('');
  }

  // event handler: 댓글 삭제 이벤트 처리 //
  const onclickcommentDeleteHandler = (commentNumber: number) => (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();

    const isSuccessed = window.confirm('정말 삭제하시겠습니까?');
    if (!isSuccessed) return;

    const accessToken = cookies[ACCESS_TOKEN];
    if (!travelCafeNumber) return;
    if (!accessToken) return;

    deleteCafeCommentRequest(commentNumber, accessToken).then(deleteTravelCafeCommentResponse);
  }

  // event handler: 댓글창 오픈 이벤트 처리 //
  const commentOpenHandler = () => {
    setCommentOpen(!commentOpen);
  }

  // effect: 댓글 리스트 요청 함수 //
  useEffect(() => {
    if (!travelCafeNumber) return;
    console.log(travelCafeNumber);
    console.log(commentList);
    getCafeCommentListRequest(travelCafeNumber).then(getTravelCafeCommentResponse);
  }, []);

  // render: 댓글 컴포넌트 렌더링 //
  return (
    <div id='comment-main'>
      <div className='comment-button-box'>
        <div className='comment-open-button' onClick={commentOpenHandler}>{commentOpen ? "댓글 닫기" : "댓글 열기"}</div>
        <div className='comment-button-box-right'>
          <div className='comment-update-button' onClick={() => travelCafeUpdateHandler(`${TRAVEL_CAFE_UPDATE_PATH}/${travelCafeNumber}`)}>수정</div>
          <div className='comment-delete-button' onClick={deleteButtonClickHandler}>삭제</div>
        </div>
      </div>
      {commentOpen &&
        <div className='comment-detail'>
          <div className='comment-detail-top'>
            <textarea className='comment-detail-write' placeholder='댓글을 작성하세요. (100글자 이내)' value={commentWrite} onChange={onClickcommentWriteChangeHandler}></textarea>
            <div className='comment-detail-add-button-box'>
              <div className='comment-detail-add-button' onClick={onclickcommentAddHandler}>댓글 추가</div>
            </div>
          </div>

          {commentList.map((comment: CafeComment, index: number) => (
            <div className='comment-detail-bottom' key={index}>
              <div className='comment-detail-writer'>
                <div className='comment-detail-name'>{comment.userId}</div>
                <div className='comment-detail-delete-button' onClick={onclickcommentDeleteHandler(comment.travelCafeCommentNumber)}>삭제</div>
              </div>
              <div className='comment-detail-text' style={{ wordBreak: 'break-word' }}>{comment.travelCafeComment}</div>
            </div>
          ))}
        </div>
      }
    </div>
  )
}

export default function TravelCafeDetailPage() {
  return (
    <div id='detail-main'>
      <Content />
      <Comment />
    </div>
  )
}
