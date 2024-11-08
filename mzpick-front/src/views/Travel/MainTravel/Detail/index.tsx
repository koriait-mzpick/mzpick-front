import React, { ChangeEvent, MouseEvent, useEffect, useState } from 'react'
import './style.css';
import { ResponseDto } from 'src/apis/dto/response';
import { GetTravelCommentResponseDto, GetTravelDetailResponseDto, GetTravelLikeListResponseDto, GetTravelSaveListResponseDto } from 'src/apis/travel/dto/response';
import { useNavigate, useParams } from 'react-router-dom';
import { ACCESS_TOKEN, TRAVEL_DETAIL_PATH, TRAVEL_PATH, TRAVEL_UPDATE_PATH, TRAVEL_WRITE_PATH } from 'src/constants';
import { useCookies } from 'react-cookie';
import { deleteTravelCommentRequest, deleteTravelRequest, getTravelCommentListRequest, getTravelDetailRequest, getTravelLikeListRequest, getTravelSaveListRequest, postTravelCommentRequest, postUpViewTravelRequest, putTravelLikeRequest, putTravelSaveRequest } from 'src/apis/travel';
import { TravelDetail } from 'src/types';
import { SvgIcon } from '@mui/material';
import { NavigateNext as NavigateNextIcon, NavigateBefore as NavigateBeforeIcon } from '@mui/icons-material';
// slider
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from 'styled-components';
import { useAuthStore } from 'src/stores';
import { PostTravelCommentRequestDto } from 'src/apis/travel/dto/request';
import { TravelComment } from 'src/types/travel/travelComment.interface';

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
          <img className='contents-image-item' src={photo} alt={`travel-photo-${index + 1}`} />
        </div>
      ))}
    </CustomSlider>
  );
}

// component: 내용 컴포넌트 //
function Content() {

  // state: 쿠키상태 //
  const [cookies] = useCookies();

  const { travelNumber } = useParams<{ travelNumber: string }>();

  // state: 게시글 정보 상태 //
  const [travelDetail, setTravelDetail] = useState<TravelDetail>();
  const [userId, setUserId] = useState<string>();
  const [travelLocation, setTravelLocation] = useState<string>('');
  const [travelTitle, setTravelTitle] = useState<string>('');
  const [travelPhotoList, setTravelPhotoList] = useState<string[]>([]);
  const [travelHashtagList, setTravelHashtagList] = useState<string[]>([]);
  const [travelLikeUserList, setTravelLikeUserList] = useState<string[]>([]);
  const [travelSaveUserList, setTravelSaveUserList] = useState<string[]>([]);
  const [travelViewCount, setTravelViewCount] = useState<number>(0);
  const [travelLikeCount, setTravelLikeCount] = useState<number>(0);
  const [travelSaveCount, setTravelSaveCount] = useState<number>(0);
  const [travelContent, setTravelContent] = useState<string>('');
  const [travelDate, setTravelDate] = useState<string>('');
  const [detail, setDetail] = useState<TravelDetail>();

  // function: 네비게이터 함수 //
  const navigator = useNavigate();

  // function: get travel detail response 처리 함수 //
  const getTravelDetailtResponse = (responseBody: GetTravelDetailResponseDto | ResponseDto | null) => {
    const message =
      !responseBody ? '서버에 문제가 있습니다.' :
        responseBody.code === 'VF' ? '잘못된 접근입니다.' :
          responseBody.code === 'AF' ? '잘못된 접근입니다.' :
            responseBody.code === 'DBE' ? '서버에 문제가 있습니다.' :
              responseBody.code === 'NB' ? '해당 게시물이 존재하지 않습니다.' : '';

    const isSuccessed = responseBody !== null && responseBody.code === 'SU';
    if (!isSuccessed) {
      alert(message);
      navigator(`${TRAVEL_DETAIL_PATH}/${travelNumber}`);
      return;
    }

    const { travelDetail } = responseBody as GetTravelDetailResponseDto;
    console.log(travelDetail.userId);
    console.log(detail);
    setTravelDetail(travelDetail);
    setUserId(travelDetail.userId);
    setTravelTitle(travelDetail.travelTitle);
    setTravelLocation(travelDetail.travelLocation);
    setTravelPhotoList(travelDetail.travelPhotoList);
    setTravelHashtagList(travelDetail.travelHashtagList);
    setTravelLikeUserList(travelDetail.travelLikeUserList);
    setTravelSaveUserList(travelDetail.travelSaveUserList);
    setTravelViewCount(travelDetail.travelViewCount);
    setTravelLikeCount(travelDetail.travelLikeCount);
    setTravelSaveCount(travelDetail.travelSaveCount);
    setTravelDate(travelDetail.travelDate);
    setTravelContent(travelDetail.travelContent);
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
    if (!travelNumber) return;

    const accessToken = cookies[ACCESS_TOKEN];
    if (!accessToken) return;

    postUpViewTravelRequest(travelNumber).then();

    getTravelDetailRequest(travelNumber).then(getTravelDetailtResponse);
  }, [travelNumber]);

  // render: 내용 컴포넌트 렌더링 //
  return (
    <div id='contents-main'>
      <div className='contents-top'>
        <div className='contents-top-left'>
          <div className='contents-top-title'>{travelTitle}</div>
          <div className='contents-top-date'>{changeDateFormat(travelDate)}</div>
        </div>
        <div className='contents-top-vote-button-box'>
          <div className='contents-top-vote-button'>투표</div>
        </div>
      </div>
      <CarouselComponent photoList={travelPhotoList} />
      <div className='contents-text'>{travelContent}</div>
      <div className='contents-information'>
        <div className='contents-information-left'>
          <div className='contents-information-hashtag'>
            {travelHashtagList.map((hashtag: string, index: number) => (
              <div key={index} className='board-tag-item'>#{hashtag}</div>
            ))}
          </div>
        </div>
        <div className='contents-information-right'>
          <Like />
          <div className='contents-information-view'>
            <div className='contents-information-view-icon'></div>
            <div className='contents-information-data'></div>
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

  // state: 여행 게시물 번호 상태 //
  const { travelNumber } = useParams<{ travelNumber: string }>();

  // state: 로그인 유저 상태 //
  const { signInUser } = useAuthStore();

  // state: 저장 리스트 상태 //
  const [travelSaveList, setTravelSaveList] = useState<string[]>([]);

  // state:유저가 저장을 눌렀는지 상태 //
  const isSaved = signInUser !== null && travelSaveList.includes(signInUser.userId);

  // function: 저장 요청 응답 함수 //
  const putTravelSaveResponse = (responseBody: ResponseDto | null) => {
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

    if (!travelNumber) return;
    getTravelSaveListRequest(travelNumber).then(getTravelSaveListResponse);
  }

  // function: 저장 요청 함수 //
  const putTravelSave = () => {
    const accessToken = cookies[ACCESS_TOKEN];
    if (!accessToken) return;
    if (!travelNumber) return;
    putTravelSaveRequest(travelNumber, accessToken).then(putTravelSaveResponse);
  }

  // event handler: 저장 클릭 이벤트 처리 //
  const saveClcikHandler = () => {
    putTravelSave();
  }

  // function: 저장 리스트 요청 응답 함수 //
  const getTravelSaveListResponse = (responseBody: GetTravelSaveListResponseDto | ResponseDto | null) => {
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

    const { userIdList } = responseBody as GetTravelSaveListResponseDto;
    setTravelSaveList(userIdList);
  }

  // effect: 저장 리스트 요청 함수 //
  useEffect(() => {
    // travelNumber를 이용하여 좋아요 리스트 가져오기
    if (!travelNumber) return;
    getTravelSaveListRequest(travelNumber).then(getTravelSaveListResponse);
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

  // state: 여행 게시물 번호 상태 //
  const { travelNumber } = useParams<{ travelNumber: string }>();

  // state: 로그인 유저 상태 //
  const { signInUser } = useAuthStore();

  // state: 좋아요 상태 //
  const [travelLikeList, setTravelLikeList] = useState<string[]>([]);

  // state: 유저가 좋아요를 눌렀는지 상태 //
  const isLiked = signInUser !== null && travelLikeList.includes(signInUser.userId);

  // function: 좋아요 요청 응답 함수 //
  const putTravelLikeResponse = (responseBody: ResponseDto | null) => {
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

    if (!travelNumber) return;
    getTravelLikeListRequest(travelNumber).then(getTravelLikeListResponse);
  }

  // function: 좋아요 요청 함수 //
  const putTravelLike = () => {
    const accessToken = cookies[ACCESS_TOKEN];
    if (!accessToken) return;
    if (!travelNumber) return;
    putTravelLikeRequest(travelNumber, accessToken).then(putTravelLikeResponse);
  }

  // event handler: 좋아요 클릭 이벤트 처리 //
  const likeClcikHandler = () => {
    // 좋아요 누르는 API 요청
    putTravelLike();
  }

  // function: 좋아요 리스트 요청 응답 함수 //
  const getTravelLikeListResponse = (responseBody: GetTravelLikeListResponseDto | ResponseDto | null) => {
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

    const { userIdList } = responseBody as GetTravelLikeListResponseDto;
    setTravelLikeList(userIdList);
  }

  // effect: 좋아요 리스트 요청 함수 //
  useEffect(() => {
    // travelNumber를 이용하여 좋아요 리스트 가져오기
    if (!travelNumber) return;
    getTravelLikeListRequest(travelNumber).then(getTravelLikeListResponse);
  }, []);

  // render: 좋아요 컴포넌트 렌더링 //
  return (
    <div className='contents-information-like'>
      <div className={`contents-information-like-icon ${isLiked ? 'active' : ''}`} onClick={likeClcikHandler}></div>
      <div className='contents-information-data'>{travelLikeList.length}</div>
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
  const { travelNumber } = useParams<{ travelNumber: string }>();

  // state: 댓글창 모달 상태 //
  const [commentOpen, setCommentOpen] = useState(false);

  // state: 댓글 리스트 상태 //
  const [commentList, setCommentList] = useState<TravelComment[]>([]);

  // state: 댓글 입력 상태 //
  const [commentWrite, setCommentWrite] = useState<string>('');


  // function: 댓글 리스트 요청 함수 //
  const getTravelCommentResponse = (responseBody: GetTravelCommentResponseDto | ResponseDto | null) => {
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

    const { travelComments } = responseBody as GetTravelCommentResponseDto;

    const sortedComments = [...travelComments].sort((a, b) => b.travelCommentNumber - a.travelCommentNumber);
    setCommentList(sortedComments);
  }

  // function: 댓글 추가 요청 함수 //
  const postTravelCommentResponse = (responseBody: ResponseDto | null) => {
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
    if (!travelNumber) return;
    getTravelCommentListRequest(travelNumber).then(getTravelCommentResponse);
  }

  // function: 댓글 삭제 요청 응답 함수 //
  const deleteTravelCommentResponse = (responseBody: ResponseDto | null) => {
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
    if (!travelNumber) return;
    getTravelCommentListRequest(travelNumber).then(getTravelCommentResponse);
  }

  // function: 여행 삭제 요청 응답 함수 //
  const deleteTravelDetailtResponse = (responseBody: ResponseDto | null) => {
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
    if (!travelNumber) return;
    navigator(TRAVEL_PATH);
  };

  // function: 댓글 수정 이벤트 처리 함수 //
  const travelUpdateHandler = () => {
    // navigate();
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
    if (!travelNumber) return;
    const requestBody: PostTravelCommentRequestDto = {
      travelComment: commentWrite
    }

    postTravelCommentRequest(requestBody, travelNumber, accessToken).then(postTravelCommentResponse);
    setCommentWrite('');
  }

  // event handler: 댓글 삭제 이벤트 처리 //
  const onclickcommentDeleteHandler = (commentNumber: number) => (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();

    const isSuccessed = window.confirm('정말 삭제하시겠습니까?');
    if (!isSuccessed) return;

    const accessToken = cookies[ACCESS_TOKEN];
    if (!travelNumber) return;
    if (!accessToken) return;

    deleteTravelCommentRequest(commentNumber, accessToken).then(deleteTravelCommentResponse);
  }

  // event handler: 댓글창 오픈 이벤트 처리 //
  const commentOpenHandler = () => {
    setCommentOpen(!commentOpen);
  }

  // event handler: 삭제 버튼 클릭 이벤트 처리 //
  const deleteButtonClickHandler = () => {
    if (window.confirm("정말로 삭제하시겠습니까?")) {
      alert("삭제가 완료되었습니다.");
    } else {
      alert("취소되었습니다.");
      return;
    }

    if (!travelNumber) return;

    const accessToken = cookies[ACCESS_TOKEN];
    if (!accessToken) return;

    deleteTravelRequest(travelNumber, accessToken).then(deleteTravelDetailtResponse);
  }

  // event handler: 네비게이션 아이템 클릭 이벤트 처리 //
  const itemClickHandler = (path: string) => {
    navigator(path);
  }

  // effect: 댓글 리스트 요청 함수 //
  useEffect(() => {
    if (!travelNumber) return;
    console.log(travelNumber);
    console.log(commentList);
    getTravelCommentListRequest(travelNumber).then(getTravelCommentResponse);
  }, []);

  // render: 댓글 컴포넌트 렌더링 //
  return (
    <div id='comment-main'>
      <div className='comment-button-box'>
        <div className='comment-open-button' onClick={commentOpenHandler}>{commentOpen ? "댓글 닫기" : "댓글 열기"}</div>
        <div className='comment-button-box-right'>
          <div className='comment-update-button' onClick={() => itemClickHandler(`${TRAVEL_UPDATE_PATH}/${travelNumber}`)}>수정</div>
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

          {commentList.map((comment: TravelComment, index: number) => (
            <div className='comment-detail-bottom' key={index}>
              <div className='comment-detail-writer'>
                <div className='comment-detail-name'>{comment.userId}</div>
                <div className='comment-detail-delete-button' onClick={onclickcommentDeleteHandler(comment.travelCommentNumber)}>삭제</div>
              </div>
              <div className='comment-detail-text' style={{ wordBreak: 'break-word' }}>{comment.travelComment}</div>
            </div>
          ))}
        </div>
      }
    </div>
  )
}

export default function TravelDetailPage() {
  return (
    <div id='detail-main'>
      <Content />
      <Comment />
    </div>
  )
}
