import { NavigateBefore as NavigateBeforeIcon, NavigateNext as NavigateNextIcon } from '@mui/icons-material';
import { SvgIcon } from '@mui/material';
import { ChangeEvent, MouseEvent, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate, useParams } from 'react-router-dom';
import { ResponseDto } from 'src/apis/dto/response';
import { ACCESS_TOKEN, TRAVEL_STAY_DETAIL_PATH, TRAVEL_STAY_PATH, TRAVEL_STAY_UPDATE_PATH } from 'src/constants';
import { StayDetail } from 'src/types';
import './style.css';
// slider
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { deleteStayCommentRequest, deleteStayRequest, getStayCommentListRequest, getStayDetailRequest, getStayLikeListRequest, getStaySaveListRequest, postStayCommentRequest, postUpViewStayRequest, putStayLikeRequest, putStaySaveRequest } from 'src/apis/stay';
import { PostTravelStayCommentRequestDto } from 'src/apis/stay/dto/request';
import { GetStayCommentResponseDto, GetStayDetailResponseDto, GetStayLikeListResponseDto, GetStaySaveListResponseDto } from 'src/apis/stay/dto/response';
import { useAuthStore } from 'src/stores';
import { StayComment } from 'src/types/stay/stayComment.interface';
import styled from 'styled-components';

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
      width: 100%
      height: 1000px
      max-width: 100%
      max-height: 1500px; 
      object-fit: contain;
    }
  `;

  return (
    <CustomSlider {...settings} className='contents-image'>
      {photoList.map((photo, index) => (
        <div key={index} style={{ display: 'flex', justifyContent: 'center' }}>
          <img className='contents-image-item' src={photo} alt={`travelStay-photo-${index + 1}`} />
        </div>
      ))}
    </CustomSlider>
  );
}

// component: 내용 컴포넌트 //
function Content() {

  // state: 쿠키상태 //
  const [cookies] = useCookies();

  const { travelStayNumber } = useParams<{ travelStayNumber: string }>();

  // state: 게시글 정보 상태 //
  const [travelStayDetail, setTravelStayDetail] = useState<StayDetail>();
  const [userId, setUserId] = useState<string>();
  const [travelLocation, setTravelLocation] = useState<string>('');
  const [travelStayTitle, setTravelStayTitle] = useState<string>('');
  const [travelStayPhotoList, setTravelStayPhotoList] = useState<string[]>([]);
  const [travelStayHashtagList, setTravelStayHashtagList] = useState<string[]>([]);
  const [travelStayLikeUserList, setTravelStayLikeUserList] = useState<string[]>([]);
  const [travelStaySaveUserList, setTravelStaySaveUserList] = useState<string[]>([]);
  const [travelStayViewCount, setTravelStayViewCount] = useState<number>(0);
  const [travelStayLikeCount, setTravelStayLikeCount] = useState<number>(0);
  const [travelStaySaveCount, setTravelStaySaveCount] = useState<number>(0);
  const [travelStayContent, setTravelStayContent] = useState<string>('');
  const [travelStayDate, setTravelStayDate] = useState<string>('');

  // function: 네비게이터 함수 //
  const navigator = useNavigate();

  // function: get travelStay detail response 처리 함수 //
  const getTravelStayDetailtResponse = (responseBody: GetStayDetailResponseDto | ResponseDto | null) => {
    const message =
      !responseBody ? '서버에 문제가 있습니다.' :
        responseBody.code === 'VF' ? '잘못된 접근입니다.' :
          responseBody.code === 'AF' ? '잘못된 접근입니다.' :
            responseBody.code === 'DBE' ? '서버에 문제가 있습니다.' :
              responseBody.code === 'NB' ? '해당 게시물이 존재하지 않습니다.' : '';

    const isSuccessed = responseBody !== null && responseBody.code === 'SU';
    if (!isSuccessed) {
      alert(message);
      navigator(`${TRAVEL_STAY_DETAIL_PATH}/${travelStayNumber}`);
      return;
    }

    const { travelStayDetail } = responseBody as GetStayDetailResponseDto;
    setTravelStayDetail(travelStayDetail);
    setUserId(travelStayDetail.userId);
    setTravelStayTitle(travelStayDetail.travelStayTitle);
    setTravelLocation(travelStayDetail.travelLocathion);
    setTravelStayPhotoList(travelStayDetail.travelStayPhotoList);
    setTravelStayHashtagList(travelStayDetail.travelStayHashtagList);
    setTravelStayLikeUserList(travelStayDetail.travelStayLikeUserList);
    setTravelStaySaveUserList(travelStayDetail.travelStaySaveUserList);
    setTravelStayViewCount(travelStayDetail.travelStayViewCount);
    setTravelStayLikeCount(travelStayDetail.travelStayLikeCount);
    setTravelStaySaveCount(travelStayDetail.travelStaySaveCount);
    setTravelStayDate(travelStayDetail.travelStayDate);
    setTravelStayContent(travelStayDetail.travelStayContent);
  };

  // function: 날짜 포맷 변경 함수 //
  const changeDateFormat = (date: string) => {
    const yy = date.substring(2, 4);
    const mm = date.substring(5, 7);
    const dd = date.substring(8, 10);
    return `${yy}.${mm}.${dd}`;
  };

  // event handler: 목록 버튼 클릭 이벤트 처리 //
  const listButtonClickHandler = (path: string) => {
    navigator(path);
  }

  // effect:  게시글 정보 요청 함수 //
  useEffect(() => {
    if (!travelStayNumber) return;

    postUpViewStayRequest(travelStayNumber).then();
    getStayDetailRequest(travelStayNumber).then(getTravelStayDetailtResponse);
  }, [travelStayNumber]);

  // render: 내용 컴포넌트 렌더링 //
  return (
    <div id='contents-main'>
      <div className='contents-top'>
        <div className='contents-top-left'>
          <div className='contents-top-title'>{travelStayTitle}</div>
          <div className='contents-top-date'>{changeDateFormat(travelStayDate)}</div>
        </div>
        <div className='contents-top-vote-button-box'>
          <div className='contents-top-vote-button' onClick={() => listButtonClickHandler(TRAVEL_STAY_PATH)}>목록</div>
        </div>
      </div>
      <CarouselComponent photoList={travelStayPhotoList} />
      <div className='contents-text'>{travelStayContent}</div>
      <div className='contents-information'>
        <div className='contents-information-left'>
          <div className='contents-information-hashtag'>
            {travelStayHashtagList.map((hashtag: string, index: number) => (
              <div key={index} className='board-tag-item'>#{hashtag}</div>
            ))}
          </div>
        </div>
        <div className='contents-information-right'>
          <Like />
          <div className='contents-information-view'>
            <div className='contents-information-view-icon'></div>
            <div className='contents-information-data'>{travelStayViewCount}</div>
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
  const { travelStayNumber } = useParams<{ travelStayNumber: string }>();

  // state: 로그인 유저 상태 //
  const { signInUser } = useAuthStore();

  // state: 저장 리스트 상태 //
  const [travelStaySaveList, setTravelStaySaveList] = useState<string[]>([]);

  // state:유저가 저장을 눌렀는지 상태 //
  const isSaved = signInUser !== null && travelStaySaveList.includes(signInUser.userId);

  // function: 저장 요청 응답 함수 //
  const putTravelStaySaveResponse = (responseBody: ResponseDto | null) => {
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

    if (!travelStayNumber) return;
    getStaySaveListRequest(travelStayNumber).then(getTravelStaySaveListResponse);
  }

  // function: 저장 요청 함수 //
  const putTravelStaySave = () => {
    const accessToken = cookies[ACCESS_TOKEN];
    if (!accessToken) return;
    if (!travelStayNumber) return;
    putStaySaveRequest(travelStayNumber, accessToken).then(putTravelStaySaveResponse);
  }

  // event handler: 저장 클릭 이벤트 처리 //
  const saveClcikHandler = () => {
    putTravelStaySave();
  }

  // function: 저장 리스트 요청 응답 함수 //
  const getTravelStaySaveListResponse = (responseBody: GetStaySaveListResponseDto | ResponseDto | null) => {
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

    const { userIdList } = responseBody as GetStaySaveListResponseDto;
    setTravelStaySaveList(userIdList);
  }

  // effect: 저장 리스트 요청 함수 //
  useEffect(() => {
    // travelStayNumber를 이용하여 좋아요 리스트 가져오기
    if (!travelStayNumber) return;
    getStaySaveListRequest(travelStayNumber).then(getTravelStaySaveListResponse);
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
  const { travelStayNumber } = useParams<{ travelStayNumber: string }>();

  // state: 로그인 유저 상태 //
  const { signInUser } = useAuthStore();

  // state: 좋아요 상태 //
  const [travelStayLikeList, setTravelStayLikeList] = useState<string[]>([]);

  // state: 유저가 좋아요를 눌렀는지 상태 //
  const isLiked = signInUser !== null && travelStayLikeList.includes(signInUser.userId);

  // function: 좋아요 요청 응답 함수 //
  const putTravelStayLikeResponse = (responseBody: ResponseDto | null) => {
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

    if (!travelStayNumber) return;
    getStayLikeListRequest(travelStayNumber).then(getTravelStayLikeListResponse);
  }

  // function: 좋아요 요청 함수 //
  const putTravelStayLike = () => {
    const accessToken = cookies[ACCESS_TOKEN];
    if (!accessToken) return;
    if (!travelStayNumber) return;
    putStayLikeRequest(travelStayNumber, accessToken).then(putTravelStayLikeResponse);
  }

  // event handler: 좋아요 클릭 이벤트 처리 //
  const likeClcikHandler = () => {
    // 좋아요 누르는 API 요청
    putTravelStayLike();
  }

  // function: 좋아요 리스트 요청 응답 함수 //
  const getTravelStayLikeListResponse = (responseBody: GetStayLikeListResponseDto | ResponseDto | null) => {
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

    const { userIdList } = responseBody as GetStayLikeListResponseDto;
    setTravelStayLikeList(userIdList);
  }

  // effect: 좋아요 리스트 요청 함수 //
  useEffect(() => {
    // travelStayNumber를 이용하여 좋아요 리스트 가져오기
    if (!travelStayNumber) return;
    getStayLikeListRequest(travelStayNumber).then(getTravelStayLikeListResponse);
  }, []);

  // render: 좋아요 컴포넌트 렌더링 //
  return (
    <div className='contents-information-like'>
      <div className={`contents-information-like-icon ${isLiked ? 'active' : ''}`} onClick={likeClcikHandler}></div>
      <div className='contents-information-data'>{travelStayLikeList.length}</div>
    </div>
  )
}

// component: 댓글 컴포넌트 //
function Comment() {

  // state: 쿠키상태 //
  const [cookies] = useCookies();

  // state: 네비게이션 상태 //
  const navigator = useNavigate();

  // state: 카페 게시물 번호 상태 //
  const { travelStayNumber } = useParams<{ travelStayNumber: string }>();

  // state: 댓글창 모달 상태 //
  const [commentOpen, setCommentOpen] = useState(false);

  // state: 댓글 리스트 상태 //
  const [commentList, setCommentList] = useState<StayComment[]>([]);

  // state: 댓글 입력 상태 //
  const [commentWrite, setCommentWrite] = useState<string>('');

  // state: 게시글 디테일 상태 //
  const [travelStayDetail, setTravelStayDetail] = useState<StayDetail>();

  // state: 현재 로그인한 유저 아이디 //
  const { signInUser } = useAuthStore();

  // function: get travel detail response 처리 함수 //
  const getTravelStayDetailtResponse = (responseBody: GetStayDetailResponseDto | ResponseDto | null) => {
    const message =
      !responseBody ? '서버에 문제가 있습니다.' :
        responseBody.code === 'VF' ? '잘못된 접근입니다.' :
          responseBody.code === 'AF' ? '잘못된 접근입니다.' :
            responseBody.code === 'DBE' ? '서버에 문제가 있습니다.' :
              responseBody.code === 'NB' ? '해당 게시물이 존재하지 않습니다.' : '';

    const isSuccessed = responseBody !== null && responseBody.code === 'SU';
    if (!isSuccessed) {
      alert(message);
      navigator(`${TRAVEL_STAY_DETAIL_PATH}/${travelStayNumber}`);
      return;
    }

    const { travelStayDetail } = responseBody as GetStayDetailResponseDto;
    setTravelStayDetail(travelStayDetail);
  };

  // function: 댓글 리스트 요청 함수 //
  const getTravelStayCommentResponse = (responseBody: GetStayCommentResponseDto | ResponseDto | null) => {
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

    const { travelStayComments } = responseBody as GetStayCommentResponseDto;

    const sortedComments = [...travelStayComments].sort((a, b) => b.travelStayCommentNumber - a.travelStayCommentNumber);
    setCommentList(sortedComments);
  }

  // function: 댓글 추가 요청 함수 //
  const postTravelStayCommentResponse = (responseBody: ResponseDto | null) => {
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
    if (!travelStayNumber) return;
    getStayCommentListRequest(travelStayNumber).then(getTravelStayCommentResponse);
  }

  // function: 댓글 삭제 요청 응답 함수 //
  const deleteTravelStayCommentResponse = (responseBody: ResponseDto | null) => {
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
    if (!travelStayNumber) return;
    getStayCommentListRequest(travelStayNumber).then(getTravelStayCommentResponse);
  }

  // function: 카페 삭제 요청 응답 함수 //
  const deleteTravelStayDetailtResponse = (responseBody: ResponseDto | null) => {
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
    if (!travelStayNumber) return;
    navigator(TRAVEL_STAY_PATH);
  };

  // event handler: 게시글 수정 버튼 클릭 이벤트 처리 //
  const updateButtonClickHandler = (path: string) => {
    if (!travelStayNumber) return;

    const accessToken = cookies[ACCESS_TOKEN];
    if (!accessToken) return;

    navigator(path);
  }

    // event handler: 게시글 삭제 버튼 클릭 이벤트 처리 //
    const deleteButtonClickHandler = () => {
      if (window.confirm("정말로 삭제하시겠습니까?")) {
        alert("삭제가 완료되었습니다.");
      } else {
        alert("취소되었습니다.");
        return;
      }
  
      if (!travelStayNumber) return;
  
      const accessToken = cookies[ACCESS_TOKEN];
      if (!accessToken) return;
  
      deleteStayRequest(travelStayNumber, accessToken).then(deleteTravelStayDetailtResponse);
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
    if (!travelStayNumber) return;
    const requestBody: PostTravelStayCommentRequestDto = {
      travelStayComment: commentWrite
    }

    postStayCommentRequest(requestBody, travelStayNumber, accessToken).then(postTravelStayCommentResponse);
    setCommentWrite('');
  }

  // event handler: 댓글 삭제 이벤트 처리 //
  const onclickcommentDeleteHandler = (commentNumber: number) => (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();

    const isSuccessed = window.confirm('정말 삭제하시겠습니까?');
    if (!isSuccessed) return;

    const accessToken = cookies[ACCESS_TOKEN];
    if (!travelStayNumber) return;
    if (!accessToken) return;

    deleteStayCommentRequest(commentNumber, accessToken).then(deleteTravelStayCommentResponse);
  }

  // event handler: 댓글창 오픈 이벤트 처리 //
  const commentOpenHandler = () => {
    setCommentOpen(!commentOpen);
  }

  // effect: 댓글 리스트 요청 함수 //
  useEffect(() => {
    if (!travelStayNumber) return;
    console.log(travelStayNumber);
    console.log(commentList);

    getStayDetailRequest(travelStayNumber).then(getTravelStayDetailtResponse);
    getStayCommentListRequest(travelStayNumber).then(getTravelStayCommentResponse);
  }, []);

  // render: 댓글 컴포넌트 렌더링 //
  return (
    <div id='comment-main'>
      <div className='comment-button-box'>
        <div className='comment-open-button' onClick={commentOpenHandler}>{commentOpen ? "댓글 닫기" : "댓글 열기"}</div>
        {signInUser && travelStayDetail?.userId === signInUser.userId ? (
        <div className='comment-button-box-right'>
          <div className='comment-update-button' onClick={() => updateButtonClickHandler(`${TRAVEL_STAY_UPDATE_PATH}/${travelStayNumber}`)}>수정</div>
          <div className='comment-delete-button' onClick={deleteButtonClickHandler}>삭제</div>
        </div>
        ) : null}
      </div>
      {commentOpen &&
        <div className='comment-detail'>
          <div className='comment-detail-top'>
            <textarea className='comment-detail-write' placeholder='댓글을 작성하세요. (100글자 이내)' value={commentWrite} onChange={onClickcommentWriteChangeHandler}></textarea>
            <div className='comment-detail-add-button-box'>
              <div className='comment-detail-add-button' onClick={onclickcommentAddHandler}>댓글 추가</div>
            </div>
          </div>

          {commentList.map((comment: StayComment, index: number) => (
            <div className='comment-detail-bottom' key={index}>
              <div className='comment-detail-writer'>
                <div className='comment-detail-name'>{comment.userId}</div>
                {signInUser && comment.userId === signInUser.userId ? (
                <div className='comment-detail-delete-button' onClick={onclickcommentDeleteHandler(comment.travelStayCommentNumber)}>삭제</div>
              ) : null}
              </div>
              <div className='comment-detail-text' style={{ wordBreak: 'break-word' }}>{comment.travelStayComment}</div>
            </div>
          ))}
        </div>
      }
    </div>
  )
}

export default function TravelStayDetailPage() {
  return (
    <div id='detail-main'>
      <Content />
      <Comment />
    </div>
  )
}
