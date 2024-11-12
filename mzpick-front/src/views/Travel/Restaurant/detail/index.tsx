import { NavigateBefore as NavigateBeforeIcon, NavigateNext as NavigateNextIcon } from '@mui/icons-material';
import { SvgIcon } from '@mui/material';
import { ChangeEvent, MouseEvent, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate, useParams } from 'react-router-dom';
import { ResponseDto } from 'src/apis/dto/response';
import { ACCESS_TOKEN, TRAVEL_RESTAURANT_DETAIL_PATH, TRAVEL_RESTAURANT_PATH, TRAVEL_RESTAURANT_UPDATE_PATH } from 'src/constants';
import { RestaurantDetail } from 'src/types';
import './style.css';
// slider
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { deleteRestaurantCommentRequest, deleteRestaurantRequest, getRestaurantCommentListRequest, getRestaurantDetailRequest, getRestaurantLikeListRequest, getRestaurantSaveListRequest, postRestaurantCommentRequest, postUpViewRestaurantRequest, putRestaurantLikeRequest, putRestaurantSaveRequest } from 'src/apis/restaurant';
import { PostTravelFoodCommentRequestDto } from 'src/apis/restaurant/dto/request';
import { GetRestaurantCommentResponseDto, GetRestaurantDetailResponseDto, GetRestaurantLikeListResponseDto, GetRestaurantSaveListResponseDto } from 'src/apis/restaurant/dto/response';
import { useAuthStore } from 'src/stores';
import { RestaurantComment } from 'src/types/restaurant/restaurantComment.interface';
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
          <img className='contents-image-item' src={photo} alt={`travelRestaurant-photo-${index + 1}`} />
        </div>
      ))}
    </CustomSlider>
  );
}

// component: 내용 컴포넌트 //
function Content() {

  // state: 쿠키상태 //
  const [cookies] = useCookies();

  const { travelRestaurantNumber } = useParams<{ travelRestaurantNumber: string }>();

  // state: 게시글 정보 상태 //
  const [travelRestaurantDetail, setTravelRestaurantDetail] = useState<RestaurantDetail>();
  const [userId, setUserId] = useState<string>();
  const [travelLocation, setTravelLocation] = useState<string>('');
  const [travelRestaurantTitle, setTravelRestaurantTitle] = useState<string>('');
  const [travelRestaurantPhotoList, setTravelRestaurantPhotoList] = useState<string[]>([]);
  const [travelRestaurantHashtagList, setTravelRestaurantHashtagList] = useState<string[]>([]);
  const [travelRestaurantLikeUserList, setTravelRestaurantLikeUserList] = useState<string[]>([]);
  const [travelRestaurantSaveUserList, setTravelRestaurantSaveUserList] = useState<string[]>([]);
  const [travelRestaurantViewCount, setTravelRestaurantViewCount] = useState<number>(0);
  const [travelRestaurantLikeCount, setTravelRestaurantLikeCount] = useState<number>(0);
  const [travelRestaurantSaveCount, setTravelRestaurantSaveCount] = useState<number>(0);
  const [travelRestaurantContent, setTravelRestaurantContent] = useState<string>('');
  const [travelRestaurantDate, setTravelRestaurantDate] = useState<string>('');

  // function: 네비게이터 함수 //
  const navigator = useNavigate();

  // function: get travelRestaurant detail response 처리 함수 //
  const getTravelRestaurantDetailtResponse = (responseBody: GetRestaurantDetailResponseDto | ResponseDto | null) => {
    const message =
      !responseBody ? '서버에 문제가 있습니다.' :
        responseBody.code === 'VF' ? '잘못된 접근입니다.' :
          responseBody.code === 'AF' ? '잘못된 접근입니다.' :
            responseBody.code === 'DBE' ? '서버에 문제가 있습니다.' :
              responseBody.code === 'NB' ? '해당 게시물이 존재하지 않습니다.' : '';

    const isSuccessed = responseBody !== null && responseBody.code === 'SU';
    if (!isSuccessed) {
      alert(message);
      navigator(`${TRAVEL_RESTAURANT_DETAIL_PATH}/${travelRestaurantNumber}`);
      return;
    }

    const { travelFoodDetail } = responseBody as GetRestaurantDetailResponseDto;
    setTravelRestaurantDetail(travelFoodDetail);
    setUserId(travelFoodDetail.userId);
    setTravelRestaurantTitle(travelFoodDetail.travelFoodTitle);
    setTravelLocation(travelFoodDetail.travelLocation);
    setTravelRestaurantPhotoList(travelFoodDetail.travelFoodPhotoList);
    setTravelRestaurantHashtagList(travelFoodDetail.travelFoodHashtagList);
    setTravelRestaurantLikeUserList(travelFoodDetail.travelFoodLikeUserList);
    setTravelRestaurantSaveUserList(travelFoodDetail.travelFoodSaveUSerList);
    setTravelRestaurantViewCount(travelFoodDetail.travelFoodViewCount);
    setTravelRestaurantLikeCount(travelFoodDetail.travelFoodLikeCount);
    setTravelRestaurantSaveCount(travelFoodDetail.travelFoodSaveCount);
    setTravelRestaurantDate(travelFoodDetail.travelFoodDate);
    setTravelRestaurantContent(travelFoodDetail.travelFoodContent);
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
    if (!travelRestaurantNumber) return;

    postUpViewRestaurantRequest(travelRestaurantNumber).then();
    getRestaurantDetailRequest(travelRestaurantNumber).then(getTravelRestaurantDetailtResponse);
  }, [travelRestaurantNumber]);

  // render: 내용 컴포넌트 렌더링 //
  return (
    <div id='contents-main'>
      <div className='contents-top'>
        <div className='contents-top-left'>
          <div className='contents-top-title'>{travelRestaurantTitle}</div>
          <div className='contents-top-date'>{changeDateFormat(travelRestaurantDate)}</div>
        </div>
        <div className='contents-top-vote-button-box'>
          <div className='contents-top-vote-button'>투표</div>
        </div>
      </div>
      <CarouselComponent photoList={travelRestaurantPhotoList} />
      <div className='contents-text'>{travelRestaurantContent}</div>
      <div className='contents-information'>
        <div className='contents-information-left'>
          <div className='contents-information-hashtag'>
            {travelRestaurantHashtagList.map((hashtag: string, index: number) => (
              <div key={index} className='board-tag-item'>#{hashtag}</div>
            ))}
          </div>
        </div>
        <div className='contents-information-right'>
          <Like />
          <div className='contents-information-view'>
            <div className='contents-information-view-icon'></div>
            <div className='contents-information-data'>{travelRestaurantViewCount}</div>
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
  const { travelRestaurantNumber } = useParams<{ travelRestaurantNumber: string }>();

  // state: 로그인 유저 상태 //
  const { signInUser } = useAuthStore();

  // state: 저장 리스트 상태 //
  const [travelRestaurantSaveList, setTravelRestaurantSaveList] = useState<string[]>([]);

  // state:유저가 저장을 눌렀는지 상태 //
  const isSaved = signInUser !== null && travelRestaurantSaveList.includes(signInUser.userId);

  // function: 저장 요청 응답 함수 //
  const putTravelRestaurantSaveResponse = (responseBody: ResponseDto | null) => {
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

    if (!travelRestaurantNumber) return;
    getRestaurantSaveListRequest(travelRestaurantNumber).then(getTravelRestaurantSaveListResponse);
  }

  // function: 저장 요청 함수 //
  const putTravelRestaurantSave = () => {
    const accessToken = cookies[ACCESS_TOKEN];
    if (!accessToken) return;
    if (!travelRestaurantNumber) return;
    putRestaurantSaveRequest(travelRestaurantNumber, accessToken).then(putTravelRestaurantSaveResponse);
  }

  // event handler: 저장 클릭 이벤트 처리 //
  const saveClcikHandler = () => {
    putTravelRestaurantSave();
  }

  // function: 저장 리스트 요청 응답 함수 //
  const getTravelRestaurantSaveListResponse = (responseBody: GetRestaurantSaveListResponseDto | ResponseDto | null) => {
    const message =
      !responseBody ? '서버에 문제가 있습니다.' :
        responseBody.code === 'VF' ? '잘못된 접근입니다.' :
          responseBody.code === 'AF' ? '못된 접근입니다.' :
            responseBody.code === 'DBE' ? '서버에 문제가 있습니다.' :
              responseBody.code === 'NB' ? '해당 게시물이 존재하지 않습니다.' : '';

    const isSuccessed = responseBody !== null && responseBody.code === 'SU';
    if (!isSuccessed) {
      alert(message);
      return;
    }

    const { userIdList } = responseBody as GetRestaurantSaveListResponseDto;
    setTravelRestaurantSaveList(userIdList);
  }

  // effect: 저장 리스트 요청 함수 //
  useEffect(() => {
    // travelRestaurantNumber를 이용하여 좋아요 리스트 가져오기
    if (!travelRestaurantNumber) return;
    getRestaurantSaveListRequest(travelRestaurantNumber).then(getTravelRestaurantSaveListResponse);
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
  const { travelRestaurantNumber } = useParams<{ travelRestaurantNumber: string }>();

  // state: 로그인 유저 상태 //
  const { signInUser } = useAuthStore();

  // state: 좋아요 상태 //
  const [travelRestaurantLikeList, setTravelRestaurantLikeList] = useState<string[]>([]);

  // state: 유저가 좋아요를 눌렀는지 상태 //
  const isLiked = signInUser !== null && travelRestaurantLikeList.includes(signInUser.userId);

  // function: 좋아요 요청 응답 함수 //
  const putTravelRestaurantLikeResponse = (responseBody: ResponseDto | null) => {
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

    if (!travelRestaurantNumber) return;
    getRestaurantLikeListRequest(travelRestaurantNumber).then(getTravelRestaurantLikeListResponse);
  }

  // function: 좋아요 요청 함수 //
  const putTravelRestaurantLike = () => {
    const accessToken = cookies[ACCESS_TOKEN];
    if (!accessToken) return;
    if (!travelRestaurantNumber) return;
    putRestaurantLikeRequest(travelRestaurantNumber, accessToken).then(putTravelRestaurantLikeResponse);
  }

  // event handler: 좋아요 클릭 이벤트 처리 //
  const likeClcikHandler = () => {
    // 좋아요 누르는 API 요청
    putTravelRestaurantLike();
  }

  // function: 좋아요 리스트 요청 응답 함수 //
  const getTravelRestaurantLikeListResponse = (responseBody: GetRestaurantLikeListResponseDto | ResponseDto | null) => {
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

    const { userIdList } = responseBody as GetRestaurantLikeListResponseDto;
    setTravelRestaurantLikeList(userIdList);
  }

  // effect: 좋아요 리스트 요청 함수 //
  useEffect(() => {
    // travelRestaurantNumber를 이용하여 좋아요 리스트 가져오기
    if (!travelRestaurantNumber) return;
    getRestaurantLikeListRequest(travelRestaurantNumber).then(getTravelRestaurantLikeListResponse);
  }, []);

  // render: 좋아요 컴포넌트 렌더링 //
  return (
    <div className='contents-information-like'>
      <div className={`contents-information-like-icon ${isLiked ? 'active' : ''}`} onClick={likeClcikHandler}></div>
      <div className='contents-information-data'>{travelRestaurantLikeList.length}</div>
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
  const { travelRestaurantNumber } = useParams<{ travelRestaurantNumber: string }>();

  // state: 댓글창 모달 상태 //
  const [commentOpen, setCommentOpen] = useState(false);

  // state: 댓글 리스트 상태 //
  const [commentList, setCommentList] = useState<RestaurantComment[]>([]);

  // state: 댓글 입력 상태 //
  const [commentWrite, setCommentWrite] = useState<string>('');

    // state: 게시글 디테일 상태 //
    const [travelRestaurantDetail, setTravelRestaurantDetail] = useState<RestaurantDetail>();

    // state: 현재 로그인한 유저 아이디 //
    const { signInUser } = useAuthStore();

  // function: get travelRestaurant detail response 처리 함수 //
  const getTravelRestaurantDetailtResponse = (responseBody: GetRestaurantDetailResponseDto | ResponseDto | null) => {
    const message =
      !responseBody ? '서버에 문제가 있습니다.' :
        responseBody.code === 'VF' ? '잘못된 접근입니다.' :
          responseBody.code === 'AF' ? '잘못된 접근입니다.' :
            responseBody.code === 'DBE' ? '서버에 문제가 있습니다.' :
              responseBody.code === 'NB' ? '해당 게시물이 존재하지 않습니다.' : '';

    const isSuccessed = responseBody !== null && responseBody.code === 'SU';
    if (!isSuccessed) {
      alert(message);
      navigator(`${TRAVEL_RESTAURANT_DETAIL_PATH}/${travelRestaurantNumber}`);
      return;
    }

    const { travelFoodDetail } = responseBody as GetRestaurantDetailResponseDto;
    setTravelRestaurantDetail(travelFoodDetail);
  };


  // function: 댓글 리스트 요청 함수 //
  const getTravelRestaurantCommentResponse = (responseBody: GetRestaurantCommentResponseDto | ResponseDto | null) => {
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

    const { travelFoodComments } = responseBody as GetRestaurantCommentResponseDto;

    const sortedComments = [...travelFoodComments].sort((a, b) => b.travelFoodCommentNumber - a.travelFoodCommentNumber);
    setCommentList(sortedComments);
  }

  // function: 댓글 추가 요청 함수 //
  const postTravelRestaurantCommentResponse = (responseBody: ResponseDto | null) => {
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
    if (!travelRestaurantNumber) return;
    getRestaurantCommentListRequest(travelRestaurantNumber).then(getTravelRestaurantCommentResponse);
  }

  // function: 댓글 삭제 요청 응답 함수 //
  const deleteTravelRestaurantCommentResponse = (responseBody: ResponseDto | null) => {
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
    if (!travelRestaurantNumber) return;
    getRestaurantCommentListRequest(travelRestaurantNumber).then(getTravelRestaurantCommentResponse);
  }

  // function: 카페 삭제 요청 응답 함수 //
  const deleteTravelRestaurantDetailtResponse = (responseBody: ResponseDto | null) => {
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
    if (!travelRestaurantNumber) return;
    navigator(TRAVEL_RESTAURANT_PATH);
  };

  // event handler: 게시글 수정 버튼 클릭 이벤트 처리 //
  const updateButtonClickHandler = (path: string) => {
    if (!travelRestaurantNumber) return;

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
  
      if (!travelRestaurantNumber) return;
  
      const accessToken = cookies[ACCESS_TOKEN];
      if (!accessToken) return;
  
      deleteRestaurantRequest(travelRestaurantNumber, accessToken).then(deleteTravelRestaurantDetailtResponse);
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
    if (!travelRestaurantNumber) return;
    const requestBody: PostTravelFoodCommentRequestDto = {
      travelFoodComment: commentWrite
    }

    postRestaurantCommentRequest(requestBody, travelRestaurantNumber, accessToken).then(postTravelRestaurantCommentResponse);
    setCommentWrite('');
  }

  // event handler: 댓글 삭제 이벤트 처리 //
  const onclickcommentDeleteHandler = (commentNumber: number) => (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();

    const isSuccessed = window.confirm('정말 삭제하시겠습니까?');
    if (!isSuccessed) return;

    const accessToken = cookies[ACCESS_TOKEN];
    if (!travelRestaurantNumber) return;
    if (!accessToken) return;

    deleteRestaurantCommentRequest(commentNumber, accessToken).then(deleteTravelRestaurantCommentResponse);
  }

  // event handler: 댓글창 오픈 이벤트 처리 //
  const commentOpenHandler = () => {
    setCommentOpen(!commentOpen);
  }

  // effect: 댓글 리스트 요청 함수 //
  useEffect(() => {
    if (!travelRestaurantNumber) return;
    console.log(travelRestaurantNumber);
    console.log(commentList);

    getRestaurantDetailRequest(travelRestaurantNumber).then(getTravelRestaurantDetailtResponse)
    getRestaurantCommentListRequest(travelRestaurantNumber).then(getTravelRestaurantCommentResponse);
  }, []);

  // render: 댓글 컴포넌트 렌더링 //
  return (
    <div id='comment-main'>
      <div className='comment-button-box'>
        <div className='comment-open-button' onClick={commentOpenHandler}>{commentOpen ? "댓글 닫기" : "댓글 열기"}</div>
        {signInUser && travelRestaurantDetail?.userId === signInUser.userId ? (
        <div className='comment-button-box-right'>
          <div className='comment-update-button' onClick={() => updateButtonClickHandler(`${TRAVEL_RESTAURANT_UPDATE_PATH}/${travelRestaurantNumber}`)}>수정</div>
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

          {commentList.map((comment: RestaurantComment, index: number) => (
            <div className='comment-detail-bottom' key={index}>
              <div className='comment-detail-writer'>
                <div className='comment-detail-name'>{comment.userId}</div>
                {signInUser && comment.userId === signInUser.userId ? (
                <div className='comment-detail-delete-button' onClick={onclickcommentDeleteHandler(comment.travelFoodCommentNumber)}>삭제</div>
              ) : null}
              </div>
              <div className='comment-detail-text' style={{ wordBreak: 'break-word' }}>{comment.travelFoodComment}</div>
            </div>
          ))}
        </div>
      }
    </div>
  )
}

export default function TravelRestaurantDetailPage() {
  return (
    <div id='detail-main'>
      <Content />
      <Comment />
    </div>
  )
}
