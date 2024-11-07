import React, { useEffect, useState } from 'react'
import './style.css';
import { ResponseDto } from 'src/apis/dto/response';
import { GetTravelDetailResponseDto } from 'src/apis/travel/dto/response';
import { useNavigate, useParams } from 'react-router-dom';
import { ACCESS_TOKEN, FASHION_PATH, TRAVEL_PATH } from 'src/constants';
import { useCookies } from 'react-cookie';
import { getTravelCommentListRequest, getTravelDetailRequest } from 'src/apis/travel';
import { SvgIcon } from '@mui/material';
import { NavigateNext as NavigateNextIcon, NavigateBefore as NavigateBeforeIcon } from '@mui/icons-material';
// slider
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { GetFashionDetailResponseDto } from 'src/apis/fashion/dto/response';
import { getFashionDetailRequest } from 'src/apis/fashion';
import { FashionDetail } from 'src/types';


function CarouselComponent({ photoList }: { photoList: string[] }) {  // Fixed props typing
  const settings = {
    dots: true,
    infinite: true,  // Changed to true for continuous sliding
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    adaptiveHeight: true,
    waitForAnimate: false,
    nextArrow: <SvgIcon component={NavigateNextIcon} inheritViewBox sx={{ color: 'black', fontSize: 30 }} />,
    prevArrow: <SvgIcon component={NavigateBeforeIcon} inheritViewBox sx={{ color: 'black', fontSize: 30 }} />
  };

  return (
    <Slider {...settings} className='contents-image' >
      {photoList.map((photo, index) => (
        <div key={index}>
          <img className='contents-image-item' src={photo} alt={`fashion-photo-${index + 1}`} />
        </div>
      ))}
    </Slider>
  );
}



// component: 내용 컴포넌트 //
function Content() {

  // state: 쿠키상태 //
  const [cookies] = useCookies();

  const { fashionNumber } = useParams<{ fashionNumber: string }>();

  // state: 게시글 정보 상태 //
  const [fashionDetail, setFashionDetail] = useState<FashionDetail>();
  const [userId, setUserId] = useState<string>();
  const [fashionLocation, setFashionLocation] = useState<string>('');
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
  const [detail, setDetail] = useState<FashionDetail>();

  // state: 북마크 상태 //
  const [bookMarkClick, setBookMarkClick] = useState(false);

  // state: 좋아요 상태 //
  const [likeClick, setLikeClick] = useState(false);

  // function: 네비게이터 함수 //
  const navigator = useNavigate();

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
      navigator(FASHION_PATH);
      return;
    }

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
    setFashionContent(fashionDetail.fashionContent);
  };

  // function: 날짜 포맷 변경 함수 //
  const changeDateFormat = (date: string) => {
    const yy = date.substring(2, 4);
    const mm = date.substring(5, 7);
    const dd = date.substring(8, 10);
    return `${yy}.${mm}.${dd}`;
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
    if (!fashionNumber) return;
    const accessToken = cookies[ACCESS_TOKEN];
    if (!accessToken) return;

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
          <div className='contents-information-like'>
            <div className={`contents-information-like-icon ${likeClick ? 'active' : ''}`} onClick={likeClcikHandler}></div>
            <div className='contents-information-data'></div>
          </div>
          <div className='contents-information-view'>
            <div className='contents-information-view-icon'>
              <div>{fashionViewCount}</div>
            </div>
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


export default function FashionDetailPage() {
  return (
    <div id='detail-main'>
      <Content />
      <Comment />
    </div>
  )
}
