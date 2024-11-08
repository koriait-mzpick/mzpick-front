// import React, { useEffect, useState } from 'react'
// import './style.css';
// import { ResponseDto } from 'src/apis/dto/response';
// import { GetTravelDetailResponseDto } from 'src/apis/travel/dto/response';
// import { useNavigate, useParams } from 'react-router-dom';
// import { ACCESS_TOKEN, TRAVEL_DETAIL_PATH, TRAVEL_PATH } from 'src/constants';
// import { useCookies } from 'react-cookie';
// import { getTravelCommentListRequest, getTravelDetailRequest } from 'src/apis/travel';
// import { TravelDetail } from 'src/types';
// import { SvgIcon } from '@mui/material';
// import { NavigateNext as NavigateNextIcon, NavigateBefore as NavigateBeforeIcon } from '@mui/icons-material';
// // slider
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import styled from 'styled-components';

// // const [travelPhotoList, setTravelPhotoList] = useState<string[]>([]);

// // component: 슬라이드 컴포넌트 //
// function CarouselComponent({ photoList }: { photoList: string[] }) {  // Fixed props typing
//   const settings = {
//     dots: true,
//     infinite: true,  // Changed to true for continuous sliding
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     arrows: true,
//     adaptiveHeight: true,
//     waitForAnimate: false,
//     nextArrow: <SvgIcon component={NavigateNextIcon} inheritViewBox sx={{ color: 'black', fontSize: 30 }} />,
//     prevArrow: <SvgIcon component={NavigateBeforeIcon} inheritViewBox sx={{ color: 'black', fontSize: 30 }} />

//   };
//   const CustomSlider = styled(Slider)`
//     margin: 0 auto;
//     .slick-slide {
//       display: flex;
//       align-items: center;
//       justify-content: center;
//     }
//     .slick-list {
//       height: 100%;
//     }
//     .slick-track {
//       display: flex;
//       align-items: center;
//     }
    
//     // 이미지 컨테이너 스타일링 추가
//     .contents-image-item {
//       margin: 0 auto;
//       max-width: 100%;
//       max-height: 500px; // 필요에 따라 조정
//       object-fit: contain;
//     }
//   `;

//   return (
//     <CustomSlider {...settings} className='contents-image'>
//       {photoList.map((photo, index) => (
//         <div key={index} style={{ display: 'flex', justifyContent: 'center' }}>
//           <img className='contents-image-item' src={photo} alt={`fashion-photo-${index + 1}`} />
//         </div>
//       ))}
//     </CustomSlider>
//   );
// }

// // component: 댓글 컴포넌트 //
// function Comment() {

//   // render: 댓글 컴포넌트 렌더링 //
//   return (
//     <div id='comment-main'>
//         <div className='comment-detail'>
//           <div className='comment-detail-top'>
//             <textarea className='comment-detail-write' placeholder='댓글을 작성하세요.'></textarea>
//             <div className='comment-detail-add-button-box'>
//               <div className='comment-detail-add-button'>댓글 추가</div>
//             </div>
//           </div>
//           <div className='comment-detail-bottom'>
//             <div className='comment-detail-writer'>
//               <div className='comment-detail-name'>DAN</div>
//               <div className='comment-detail-delete-button'>삭제</div>
//             </div>
//             <div className='comment-detail-text'>It is a long established fact that</div>
//           </div>
//         </div>
//     </div>
//   )
// }

export default function TravelDetailPage() {

  // // state: 쿠키상태 //
  // const [cookies] = useCookies();

  // const { travelNumber } = useParams<{ travelNumber: string }>();

  // // state: 게시글 정보 상태 //
  // // const [travelNumber, setTravelNumber] = useState<number | string>('');
  // const [travelDetail, setTravelDetail] = useState<TravelDetail>();
  // const [userId, setUserId] = useState<string>();
  // const [travelLocation, setTravelLocation] = useState<string>('');
  // const [travelTitle, setTravelTitle] = useState<string>('');
  // const [travelPhotoList, setTravelPhotoList] = useState<string[]>([]);
  // const [travelHashtagList, setTravelHashtagList] = useState<string[]>([]);
  // const [travelLikeUserList, setTravelLikeUserList] = useState<string[]>([]);
  // const [travelSaveUserList, setTravelSaveUserList] = useState<string[]>([]);
  // const [travelViewCount, setTravelViewCount] = useState<number>(0);
  // const [travelLikeCount, setTravelLikeCount] = useState<number>(0);
  // const [travelSaveCount, setTravelSaveCount] = useState<number>(0);
  // const [travelContent, setTravelContent] = useState<string>('');
  // const [travelDate, setTravelDate] = useState<string>('');
  // const [detail, setDetail] = useState<TravelDetail>();

  // // state: 북마크 상태 //
  // const [bookMarkClick, setBookMarkClick] = useState(false);

  // // state: 좋아요 상태 //
  // const [likeClick, setLikeClick] = useState(false);

  // // state: 댓글창 상태 //
  // const [commentOpen, setCommentOpen] = useState(false);

  // // function: 네비게이터 함수 //
  // const navigator = useNavigate();

  // // function: get travel detail response 처리 함수 //
  // const getTravelDetailtResponse = (responseBody: GetTravelDetailResponseDto | ResponseDto | null) => {
  //   const message =
  //     !responseBody ? '서버에 문제가 있습니다.' :
  //       responseBody.code === 'VF' ? '잘못된 접근입니다.' :
  //         responseBody.code === 'AF' ? '잘못된 접근입니다.' :
  //           responseBody.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

  //   const isSuccessed = responseBody !== null && responseBody.code === 'SU';
  //   if (!isSuccessed) {
  //     alert(message);
  //     navigator(TRAVEL_PATH);
  //     return;
  //   }

  //   const { travelDetail } = responseBody as GetTravelDetailResponseDto;
  //   console.log(travelDetail.userId);
  //   console.log(detail);
  //   setTravelDetail(travelDetail);
  //   setUserId(travelDetail.userId);
  //   setTravelTitle(travelDetail.travelTitle);
  //   setTravelLocation(travelDetail.travelLocation);
  //   setTravelPhotoList(travelDetail.travelPhotoList);
  //   setTravelHashtagList(travelDetail.travelHashtagList);
  //   setTravelLikeUserList(travelDetail.travelLikeUserList);
  //   setTravelSaveUserList(travelDetail.travelSaveUserList);
  //   setTravelViewCount(travelDetail.travelViewCount);
  //   setTravelLikeCount(travelDetail.travelLikeCount);
  //   setTravelSaveCount(travelDetail.travelSaveCount);
  //   setTravelDate(travelDetail.travelDate);
  //   setTravelContent(travelDetail.travelContent);
  // };

  // // function: 날짜 포맷 변경 함수 //
  // const changeDateFormat = (date: string) => {
  //   const yy = date.substring(2, 4);
  //   const mm = date.substring(5, 7);
  //   const dd = date.substring(8, 10);
  //   return `${yy}.${mm}.${dd}`;
  // };

  // // event handler: 북마크 클릭 이벤트 처리 //
  // const bookMarkClickHandler = () => {
  //   setBookMarkClick(!bookMarkClick);
  // }

  // // event handler: 좋아요 클릭 이벤트 처리 //
  // const likeClcikHandler = () => {
  //   setLikeClick(!likeClick);
  // }

  //   // event handler: 댓글창 오픈 이벤트 처리 //
  //   const commentOpenHandler = () => {
  //     setCommentOpen(!commentOpen);
  //   }

  // // event handler: 네비게이션 아이템 클릭 이벤트 처리 //
  // const itemClickHandler = (path: string) => {
  //   navigator(path);
  // }

  // // effect:  게시글 정보 요청 함수 //
  // useEffect(() => {
  //   if (!travelNumber) return;
  //   const accessToken = cookies[ACCESS_TOKEN];
  //   if (!accessToken) return;

  //   getTravelDetailRequest(travelNumber).then(getTravelDetailtResponse);
  // }, [travelNumber]);

  // render: 내용 컴포넌트 렌더링 //
  return (
    <div id='contents-main'>
      {/* <div className='contents-top'>
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
      <div className='comment-button-box'>
        <div className='comment-open-button' onClick={commentOpenHandler}>{commentOpen ? "댓글 닫기" : "댓글 열기"}</div>
        <div className='comment-button-box-right'>
          <div className='comment-update-button' onClick={() => itemClickHandler(`${TRAVEL_DETAIL_PATH}/${travelNumber}`)}>수정</div>
          <div className='comment-delete-button'>삭제</div>
        </div>
      </div>
      {commentOpen && <Comment />} */}
    </div>
  )
}
