import React, { useEffect, useState } from 'react'
import './style.css';
import { ResponseDto } from 'src/apis/dto/response';
import { GetTravelDetailResponseDto } from 'src/apis/travel/dto/response';
import { useNavigate, useParams } from 'react-router-dom';
import { ACCESS_TOKEN, TRAVEL_PATH } from 'src/constants';
import { useCookies } from 'react-cookie';
import { getTravelCommentListRequest, getTravelDetailRequest } from 'src/apis/travel';
import { TravelDetail } from 'src/types';

// slider
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// const [travelPhotoList, setTravelPhotoList] = useState<string[]>([]);

function CarouselComponent() {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  }
  return (
    <Slider {...settings}>
      {/* {travelPhotoList.map((photo, index) => (
        <img className='contents-image-item' src={photo} alt={`travel-photo-${index + 1}`} />
        ))} */}
      <div className='contents-image-item'>
        <h3>1</h3>
      </div>
      <div className='contents-image-item'>
        <h3>2</h3>
      </div>
      <div className='contents-image-item'>
        <h3>3</h3>
      </div>
    </Slider>
  )
}



// component: 내용 컴포넌트 //
function Content() {

  // state: 쿠키상태 //
  const [cookies] = useCookies();

  const { travelNumber } = useParams<{ travelNumber: string }>();

  // state: 게시글 정보 상태 //
  // const [travelNumber, setTravelNumber] = useState<number | string>('');
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
  const [travelDate, setTravelDate] = useState<string>('');
  const [detail, setDetail] = useState<TravelDetail>();

  // state: 북마크 상태 //
  const [bookMarkClick, setBookMarkClick] = useState(false);

  // state: 좋아요 상태 //
  const [likeClick, setLikeClick] = useState(false);

  // function: 네비게이터 함수 //
  const navigator = useNavigate();

  // function: get travel detail response 처리 함수 //
  const getTravelDetailtResponse = (responseBody: GetTravelDetailResponseDto | ResponseDto | null) => {
    const message =
      !responseBody ? '서버에 문제가 있습니다.' :
        responseBody.code === 'VF' ? '잘못된 접근입니다.' :
          responseBody.code === 'AF' ? '잘못된 접근입니다.' :
            responseBody.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

    const isSuccessed = responseBody !== null && responseBody.code === 'SU';
    if (!isSuccessed) {
      alert(message);
      navigator(TRAVEL_PATH);
      return;
    }

    const { travelDetail } = responseBody as GetTravelDetailResponseDto;
    console.log(travelDetail.userId);
    console.log(detail);
    setTravelDetail(travelDetail);
    setUserId(travelDetail.userId);
    setTravelTitle(travelDetail.travelTitle);
    setTravelLocation(travelDetail.travelLocation);
    setTravelTitle(travelDetail.travelTitle);
    setTravelPhotoList(travelDetail.travelPhotoList);
    setTravelHashtagList(travelDetail.travelHashtagList);
    setTravelLikeUserList(travelDetail.travelLikeUserList);
    setTravelSaveUserList(travelDetail.travelSaveUserList);
    setTravelViewCount(travelDetail.travelViewCount);
    setTravelLikeCount(travelDetail.travelLikeCount);
    setTravelSaveCount(travelDetail.travelSaveCount);
    setTravelDate(travelDetail.travelContent);
  };

  // event handler: 북마크 클릭 이벤트 처리 //
  const bookMarkClickHandler = () => {
    setBookMarkClick(!bookMarkClick);
  }

  // event handler: 좋아요 클릭 이벤트 처리 //
  const likeClcikHandler = () => {
    setLikeClick(!likeClick);
  }

  // effect:  게시글 정보 요청 함수 //
  useEffect(() => {
    if (!travelNumber) return;
    const accessToken = cookies[ACCESS_TOKEN];
    if (!accessToken) return;

    getTravelDetailRequest(travelNumber).then(getTravelDetailtResponse);
  }, [travelNumber]);

  // render: 내용 컴포넌트 렌더링 //
  return (
    <div id='contents-main'>
      <div className='contents-top'>
        <div className='contents-top-left'>
          <div className='contents-top-title'>{travelTitle}</div>
          <div className='contents-top-date'>{travelDate}</div>
        </div>
        <div className='contents-top-vote-button-box'>
          <div className='contents-top-vote-button'>투표</div>
        </div>
      </div>
      <div className='contents-image'>
        <CarouselComponent />

        {/* {travelPhotoList.map((photo, index) => (
          <img className='contents-image-item' src={photo} alt={`travel-photo-${index+1}`} />
        ))}
        <img className='contents-image-item' src={travelPhotoList[0]} />
        <div className='contents-image-left-button'></div>
        <div className='contents-image-right-button'></div> */}
      </div>
      <div className='contents-text'></div>
      <div className='contents-information'>
        <div className='contents-information-left'>{travelHashtagList}</div>
        <div className='contents-information-right'>
          <div className='contents-information-like'>
            <div className={`contents-information-like-icon ${likeClick ? 'active' : ''}`} onClick={likeClcikHandler}></div>
            <div className='contents-information-data'></div>
          </div>
          <div className='contents-information-view'>
            <div className='contents-information-view-icon'></div>
            <div className='contents-information-data'></div>
          </div>
          <div className={`contents-information-bookmark ${bookMarkClick ? 'active' : ''}`} onClick={bookMarkClickHandler}></div>
        </div>
      </div>
    </div>
  )
}

// component: 댓글 컴포넌트 //
function Comment() {

  // state: 댓글창 상태 //
  const [commentOpen, setCommentOpen] = useState(false);

  // event handler: 댓글창 오픈 이벤트 처리 //
  const commentOpenHandler = () => {
    setCommentOpen(!commentOpen);
  }

  // render: 댓글 컴포넌트 렌더링 //
  return (
    <div id='comment-main'>
      <div className='comment-button-box'>
        <div className='comment-open-button' onClick={commentOpenHandler}>
          {commentOpen ? "댓글 닫기" : "댓글 열기"}
        </div>
        <div className='comment-button-box-right'>
          <div className='comment-update-button'>수정</div>
          <div className='comment-delete-button'>삭제</div>
        </div>
      </div>
      {commentOpen &&
        <div className='comment-detail'>
          <div className='comment-detail-top'>
            <textarea className='comment-detail-write' placeholder='댓글을 작성하세요.'></textarea>
            <div className='comment-detail-add-button-box'>
              <div className='comment-detail-add-button'>댓글 추가</div>
            </div>
          </div>

          <div className='comment-detail-bottom'>
            <div className='comment-detail-writer'>
              <div className='comment-detail-name'>DAN</div>
              <div className='comment-detail-delete-button'>삭제</div>
            </div>
            <div className='comment-detail-text'>It is a long established fact that</div>
          </div>
        </div>
      }
    </div>
  )
}


export default function Detail() {
  return (
    <div id='detail-main'>
      <Content />
      <Comment />
    </div>
  )
}
