import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie';
import { useNavigate, useParams } from 'react-router';
import { ResponseDto } from 'src/apis/dto/response';
import { getMyPageCafeBoardRequest, getMyPageCafeLikeListRequest, getMyPageCafeSaveListRequest, getMyPageFashionSaveListRequest, getMyPageFashionVoteRequest, getMyPageRestaurantSaveListRequest, getMyPageStaySaveListRequest, getMyPageTravelLikeListRequest, getMyPageTravelSaveListRequest, getMyPageTravelVoteRequest, getMyPageUserDetailRequest } from 'src/apis/mypage';
import { GetMyPageCafeSaveResponseDto, GetMyPageFashionSaveResponseDto, GetMyPageRestaurantSaveResponseDto, GetMyPageStaySaveResponseDto, GetMyPageTravelSaveResponseDto } from 'src/apis/mypage/dto/response/save';
import { GetMyPageUserDetailResponseDto } from 'src/apis/mypage/dto/response/user';
import { getCafeTotalCountRequest, getFashionTotalCountRequest, getFoodTotalCountRequest, getStayTotalCountRequest, getTotalCountRequest } from 'src/apis/pagination';
import { GetTotalCountResponseDto } from 'src/apis/pagination/response';
import Pagination1 from 'src/components/Pagination1';
import { ACCESS_TOKEN, FASHION_ABSOLUTE_DETAIL_PATH, FASHION_ABSOLUTE_UPDATE_PATH, FASHION_DETAIL_PATH, TRAVEL_CAFE_DETAIL_PATH, TRAVEL_CAFE_PATH, TRAVEL_CAFE_UPDATE_PATH, TRAVEL_RESTAURANT_DETAIL_PATH, TRAVEL_STAY_DETAIL_PATH, TRAVEL_WRITE_PATH, VOTE_DETAILPATH, VOTE_PATH, WRITE_PATH } from 'src/constants';
import BottomNav from 'src/layouts/BottomNav';
import { MyPageCafeBoard, MyPageCafeLike, MyPageCafeSave } from 'src/types/mypage/cafe';
import myPageSaveCafes from 'src/types/mypage/cafe/cafe-save.interface';
import './style.css';
import { GetMyPageCafeLikeResponseDto } from 'src/apis/mypage/dto/response/like';
import myPageLikeCafes from 'src/types/mypage/cafe/cafe-like.interface';
import { GetMyPageCafeBoardResponseDto, GetMyPageFashionBoardResponseDto } from 'src/apis/mypage/dto/response/board';
import myPageBoardCafes from 'src/types/mypage/cafe/cafe-board.interface';
import myPageVoteFashions from 'src/types/mypage/vote/fashion-vote-board.interface';
import { GetMyPageFashionVoteResponseDto, GetMyPageTravelVoteResponseDto } from 'src/apis/mypage/dto/response/vote';
import { deleteCafeRequest } from 'src/apis/cafe';
import { MyPageFashionSave } from 'src/types/mypage/fashion';
import { GetFashionSaveListResponseDto } from 'src/apis/fashion/dto/response';
import { getTravelVoteTotalRequest } from 'src/apis/vote';
import { GetTravelSaveListResponseDto } from 'src/apis/travel/dto/response';
import { getTravelSaveListRequest } from 'src/apis/travel';
import { MyPageTravelLike, MyPageTravelSave } from 'src/types/mypage/travel';
import { MyPageRestaurantLike, MyPageRestaurantSave } from 'src/types/mypage/restaurant';
import { GetStaySaveListResponseDto } from 'src/apis/stay/dto/response';
import { MyPageStayLike, MyPageStaySave } from 'src/types/mypage/stay';


const SECTION_PER_PAGE = 5;

function Save() {
  const navigator = useNavigate();
  const [cookies] = useCookies();

  const accessToken = cookies[ACCESS_TOKEN];

  const [cafesaveviewList, cafesavesetviewList] = useState<myPageSaveCafes[]>([]);
  const [fashionsaveviewList, fashionsavesetviewList] = useState<MyPageFashionSave[]>([]);
  const [travelsaveviewList, travelsavesetviewList] = useState<MyPageTravelSave[]>([]);
  const [foodsaveviewList, foodsavesetviewList] = useState<MyPageRestaurantSave[]>([]);
  const [staysaveviewList, staysavesetviewList] = useState<MyPageStaySave[]>([]);

  const [savepageList, savesetPageList] = useState<number[]>([]);
  const [savetotalPage, savesetTotalPage] = useState<number>(0);
  const [savecurrentPage, savesetCurrentPage] = useState<number>(1);
  const [savetotalSection, savesetTotalSection] = useState<number>(0);
  const [savecurrentSection, savesetCurrentSection] = useState<number>(1);

  // function: get total count response //
  const getsaveTotalCountResponse = (dto: GetTotalCountResponseDto | ResponseDto | null) => {
    const { count } = dto as GetTotalCountResponseDto;
    const savetotalPage = Math.ceil(count / 8);
    savesetTotalPage(savetotalPage);
    const savetotalSection = Math.ceil(savetotalPage / SECTION_PER_PAGE);
    savesetTotalSection(savetotalSection);
  }

  // function: getSave List 함수 //
  const getCafeSaveList = () => {
    getMyPageCafeSaveListRequest(accessToken).then(GetMyPageCafeSaveResponseDto);
  }

  const getTravelSaveList = () => {
    getMyPageTravelSaveListRequest(accessToken).then(GetMyPageTravelSaveResponseDto);
  }

  const getFashionSaveList = () => {
    getMyPageFashionSaveListRequest(accessToken).then(GetMyPageFashionSaveResponseDto);
  }

  const getStaySaveList = () => {
    getMyPageStaySaveListRequest(accessToken).then(GetMyPageStaySaveResponseDto);
  }

  const getFoodSaveList = () => {
    getMyPageRestaurantSaveListRequest(accessToken).then(GetMyPageRestaurantSaveResponseDto);
  }


  // function: 날짜 포맷 변경 함수 //
    const changeDateFormat = (date: string) => {
    const yy = date.substring(2, 4);
    const mm = date.substring(5, 7);
    const dd = date.substring(8, 10);
    return `${yy}.${mm}.${dd}`;
  };

    // 저장된 모든 리스트를 하나로 합침
    const combinedSaveList = [
      ...(cafesaveviewList.map((item) => ({
        type: 'cafe',
        id: item.travelCafeNumber,
        photo: item.travelCafePhoto,
        hashtags: item.travelCafeHashtagList,
        date: item.travelCafeDate,
      }))),
      ...(foodsaveviewList.map((item) => ({
        type: 'food',
        id: item.travelFoodNumber,
        photo: item.travelFoodPhoto,
        hashtags: item.travelFoodHashTagList,
        date: item.travelFoodDate,
      }))),
      ...(travelsaveviewList.map((item) => ({
        type: 'travel',
        id: item.travelNumber,
        photo: item.travelPhoto,
        hashtags: item.travelHashtagList,
        date: item.travelDate,
      }))),
      ...(fashionsaveviewList.map((item) => ({
        type: 'fashion',
        id: item.mypageFashionBoardNumber,
        photo: item.mypageFashionPhotoList,
        hashtags: item.mypageFashionHashTagList,
        date: item.mypageFashionBoarDate,
      }))),
      ...(staysaveviewList.map((item) => ({
        type: 'stay',
        id: item.travelStayNumber,
        photo: item.travelStayPhoto,
        hashtags: item.travelStayHashTagList,
        date: item.travelStayDate,
      }))),
      
    ];

    console.log(combinedSaveList);
  // function: get Save Response 함수 //   
  const GetMyPageCafeSaveResponseDto = (responseBody: GetMyPageCafeSaveResponseDto | ResponseDto | null) => {
    const message =
      !responseBody ? '로그인 유저 정보를 불러오는데 문제가 발생했습니다.' :
        responseBody.code === 'NI' ? '로그인 유저 정보가 존재하지 않습니다.' :
          responseBody.code === 'AF' ? '잘못된 접근입니다.' :
            responseBody.code === 'DBE' ? '로그인 유저 정보를 불러오는데 문제가 발생했습니다.' : '';

    const isSuccessed = responseBody !== null && responseBody.code === 'SU';
    if (!isSuccessed) {
      alert(message);
      return;
    }

    // cafesavesetviewList 상태 업데이트
    const { myPageSaveCafes } = responseBody as GetMyPageCafeSaveResponseDto;
    cafesavesetviewList(myPageSaveCafes);
    console.log(myPageSaveCafes);
  };
  
  const GetMyPageTravelSaveResponseDto = (responseBody: GetMyPageTravelSaveResponseDto | ResponseDto | null) => {
    const message =
      !responseBody ? '로그인 유저 정보를 불러오는데 문제가 발생했습니다.' :
        responseBody.code === 'NI' ? '로그인 유저 정보가 존재하지 않습니다.' :
          responseBody.code === 'AF' ? '잘못된 접근입니다.' :
            responseBody.code === 'DBE' ? '로그인 유저 정보를 불러오는데 문제가 발생했습니다.' : '';

    const isSuccessed = responseBody !== null && responseBody.code === 'SU';
    if (!isSuccessed) {
      alert(message);
      return;
    }
    
    // cafesavesetviewList 상태 업데이트
    const { myPageSaveTravel } = responseBody as GetMyPageTravelSaveResponseDto;
    travelsavesetviewList(myPageSaveTravel);
    console.log(myPageSaveTravel);
  };

  const GetMyPageFashionSaveResponseDto = (responseBody: GetMyPageFashionSaveResponseDto | ResponseDto | null) => {
    const message =
      !responseBody ? '로그인 유저 정보를 불러오는데 문제가 발생했습니다.' :
        responseBody.code === 'NI' ? '로그인 유저 정보가 존재하지 않습니다.' :
          responseBody.code === 'AF' ? '잘못된 접근입니다.' :
            responseBody.code === 'DBE' ? '로그인 유저 정보를 불러오는데 문제가 발생했습니다.' : '';

    const isSuccessed = responseBody !== null && responseBody.code === 'SU';
    if (!isSuccessed) {
      alert(message);
      return;
    }

    // cafesavesetviewList 상태 업데이트
    const { myPageSaveFashions } = responseBody as GetMyPageFashionSaveResponseDto;
    fashionsavesetviewList(myPageSaveFashions);
    console.log(myPageSaveFashions);
  };

  const GetMyPageStaySaveResponseDto = (responseBody: GetMyPageStaySaveResponseDto | ResponseDto | null) => {
    const message =
      !responseBody ? '로그인 유저 정보를 불러오는데 문제가 발생했습니다.' :
        responseBody.code === 'NI' ? '로그인 유저 정보가 존재하지 않습니다.' :
          responseBody.code === 'AF' ? '잘못된 접근입니다.' :
            responseBody.code === 'DBE' ? '로그인 유저 정보를 불러오는데 문제가 발생했습니다.' : '';

    const isSuccessed = responseBody !== null && responseBody.code === 'SU';
    if (!isSuccessed) {
      alert(message);
      return;
    }

    // cafesavesetviewList 상태 업데이트
    const { myPageSaveStays } = responseBody as GetMyPageStaySaveResponseDto;
    staysavesetviewList(myPageSaveStays);
    console.log(myPageSaveStays);
  };

  const GetMyPageRestaurantSaveResponseDto = (responseBody: GetMyPageRestaurantSaveResponseDto | ResponseDto | null) => {
    const message =
      !responseBody ? '로그인 유저 정보를 불러오는데 문제가 발생했습니다.' :
        responseBody.code === 'NI' ? '로그인 유저 정보가 존재하지 않습니다.' :
          responseBody.code === 'AF' ? '잘못된 접근입니다.' :
            responseBody.code === 'DBE' ? '로그인 유저 정보를 불러오는데 문제가 발생했습니다.' : '';

    const isSuccessed = responseBody !== null && responseBody.code === 'SU';
    if (!isSuccessed) {
      alert(message);
      return;
    }

    // cafesavesetviewList 상태 업데이트
    const { myPageSaveFoods } = responseBody as GetMyPageRestaurantSaveResponseDto;
    foodsavesetviewList(myPageSaveFoods);
    console.log(myPageSaveFoods);
  };

  const onButtonClickEventHandler = (path: string) => {
    navigator(path);
    console.log();
    
  };

  useEffect(() => {
    getCafeSaveList();
    getTravelSaveList();
    getFashionSaveList();
    getStaySaveList();
    getFoodSaveList();
  }, []);

  const onSavePageClickHandler = (page: number) => {
    savesetCurrentPage(page);
  }

  const onSavePreSectionClickHandler = () => {
    if (savecurrentSection === 1) return;
    savesetCurrentSection(savecurrentSection - 1);
    savesetCurrentPage((savecurrentSection - 1) * SECTION_PER_PAGE);
  }

  const onSaveNextSectionClickHandler = () => {
    if (savecurrentSection === savetotalSection) return;
    savesetCurrentSection(savecurrentSection + 1);
    savesetCurrentPage(savecurrentSection * SECTION_PER_PAGE + 1);
  }

  useEffect(() => {
    getFashionTotalCountRequest().then(getsaveTotalCountResponse);
  }, []);

  useEffect(() => {
    getTotalCountRequest().then(getsaveTotalCountResponse);
  }, []);

  useEffect(() => {
    getFashionTotalCountRequest().then(getsaveTotalCountResponse);
  }, []);

  useEffect(() => {
    getStayTotalCountRequest().then(getsaveTotalCountResponse);
  }, []);

  useEffect(() => {
    getFoodTotalCountRequest().then(getsaveTotalCountResponse);
  }, []);

  useEffect(() => {
    const pageList: number[] = [];
    const startPage = (savecurrentSection - 1) * SECTION_PER_PAGE + 1;
    const endPage = savecurrentSection * SECTION_PER_PAGE;
    for (let page = startPage; page <= endPage; page++) {
      pageList.push(page);
      if (page === savetotalPage) break;
    };
    getCafeSaveList();
    savesetPageList(pageList);

  }, [savecurrentSection, savetotalPage]);

  return (
    <div className='save-box'>
    <div className='textBox' style={{ borderBottom: "4px solid rgba(0 , 0, 0, 100)" }} >SAVE</div>
    <div className='imageBox'>
        {combinedSaveList.map((item) => (
          <div key={`${item.type}-${item.id}`} className='WritePostBox'
            onClick={() => {
              const path = item.type === 'cafe' ? `${TRAVEL_CAFE_DETAIL_PATH}/${item.id}` :
                item.type === 'travel' ? `${TRAVEL_CAFE_DETAIL_PATH}/${item.id}` :
                  item.type === 'fashion' ? `${FASHION_DETAIL_PATH}/${item.id}` :
                    item.type === 'food' ? `${TRAVEL_RESTAURANT_DETAIL_PATH}/${item.id}` :
                      `${TRAVEL_STAY_DETAIL_PATH}/${item.id}`;
              onButtonClickEventHandler(path);
            }}>
            <div className='board-box'>
              <img src={item.photo} alt={`Photo ${item.photo}`} className='board-image' />
              <div className='board-information'>
                <div className='board-information-data'>{changeDateFormat(item.date)}</div>
              </div>
              <div className='board-tag'>
                {item.hashtags.map((hashtag, index) => (
                  <div key={index} className='board-tag-item'>#{hashtag}</div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// function Like() {
//   const navigator = useNavigate();
//   const [cookies] = useCookies();

//   const accessToken = cookies[ACCESS_TOKEN];

//   const [cafelikeviewList, cafelikesetviewList] = useState<myPageLikeCafes[]>([]);
//   const [fashionlikeviewList, fashionlikesetviewList] = useState<MyPageFashionSave[]>([]);
//   const [travellikeviewList, travellikesetviewList] = useState<MyPageTravelLike[]>([]);
//   const [foodlikeviewList, foodlikesetviewList] = useState<MyPageRestaurantLike[]>([]);
//   const [staylikeviewList, staylikesetviewList] = useState<MyPageStayLike[]>([]);
  
//   const [likecount, likesetCount] = useState<number>(0);
//   const [likepageList, likesetPageList] = useState<number[]>([]);
//   const [liketotalPage, likesetTotalPage] = useState<number>(0);
//   const [liketotalList, likesetTotalList] = useState<myPageLikeCafes[]>([]);
//   const [likecurrentPage, likesetCurrentPage] = useState<number>(1);
//   const [liketotalSection, likesetTotalSection] = useState<number>(0);
//   const [likecurrentSection, likesetCurrentSection] = useState<number>(1);


//   // function: get total count response //
//   const getlikeTotalCountResponse = (dto: GetTotalCountResponseDto | ResponseDto | null) => {
//     const { count } = dto as GetTotalCountResponseDto;
//     const liketotalPage = Math.ceil(count / 8);
//     likesetTotalPage(liketotalPage);
//     const liketotalSection = Math.ceil(liketotalPage / SECTION_PER_PAGE);
//     likesetTotalSection(liketotalSection);
//   }

//   // function: getLike List 함수 //
//   const getCafeLikeList = () => {
//     getMyPageCafeLikeListRequest(accessToken).then(GetMyPageCafeLikeResponseDto);
//   }

//   const getTravelSaveList = () => {
//     getMyPageTravelSaveListRequest(accessToken).then(GetMyPageTravelSaveResponseDto);
//   }

//   const getFashionSaveList = () => {
//     getMyPageFashionSaveListRequest(accessToken).then(GetMyPageFashionSaveResponseDto);
//   }

//   const getStaySaveList = () => {
//     getMyPageStaySaveListRequest(accessToken).then(GetMyPageStaySaveResponseDto);
//   }

//   const getFoodSaveList = () => {
//     getMyPageRestaurantSaveListRequest(accessToken).then(GetMyPageRestaurantSaveResponseDto);
//   }


//   // function: 날짜 포맷 변경 함수 //
//   const changeDateFormat = (date: string) => {
//     const yy = date.substring(2, 4);
//     const mm = date.substring(5, 7);
//     const dd = date.substring(8, 10);
//     return `${yy}.${mm}.${dd}`;
//   };

//   // function: get Save Response 함수 //
//   const GetMyPageCafeLikeResponseDto = (responseBody: GetMyPageCafeLikeResponseDto | ResponseDto | null) => {
//     const message =
//       !responseBody ? '로그인 유저 정보를 불러오는데 문제가 발생했습니다.' :
//         responseBody.code === 'NI' ? '로그인 유저 정보가 존재하지 않습니다.' :
//           responseBody.code === 'AF' ? '잘못된 접근입니다.' :
//             responseBody.code === 'DBE' ? '로그인 유저 정보를 불러오는데 문제가 발생했습니다.' : '';

//     const isSuccessed = responseBody !== null && responseBody.code === 'SU';
//     if (!isSuccessed) {
//       alert(message);
//       return;
//     }

//     // cafesavesetviewList 상태 업데이트
//     const { myPageLikeCafes } = responseBody as GetMyPageCafeLikeResponseDto;
//     cafelikesetviewList(myPageLikeCafes);
//     console.log(myPageLikeCafes);
//   };

//   const onButtonClickEventHandler = (path: string) => {
//     navigator(path);
//   };

//   // interface : Properties //
//   interface TableSaveProps {
//     save: MyPageCafeLike;
//   }

//   const onlikePageClickHandler = (page: number) => {
//     likesetCurrentPage(page);
//   }

//   const onlikePreSectionClickHandler = () => {
//     if (likecurrentSection === 1) return;
//     likesetCurrentSection(likecurrentSection - 1);
//     likesetCurrentPage((likecurrentSection - 1) * SECTION_PER_PAGE);
//   }

//   const onlikeNextSectionClickHandler = () => {
//     if (likecount === liketotalSection) return;
//     // likecurrentSection(likecurrentSection + 1);
//     likesetCurrentPage(likecurrentSection * SECTION_PER_PAGE + 1);
//   }

//   useEffect(() => {
//     getCafeTotalCountRequest().then(getlikeTotalCountResponse);
//   }, []);

//   useEffect(() => {
//     const pageList: number[] = [];
//     const startPage = (likecurrentSection - 1) * SECTION_PER_PAGE + 1;
//     const endPage = likecurrentSection * SECTION_PER_PAGE;
//     for (let page = startPage; page <= endPage; page++) {
//       pageList.push(page);
//       if (page === liketotalPage) break;
//     };
//     getCafeLikeList();
//     likesetPageList(pageList);

//   }, [likecurrentSection, liketotalPage]);

//   return (
//     <div className='like-box'>
//       <div className='textBox' style={{ borderBottom: "4px solid rgba(0 , 0, 0, 100)" }} >LIKE</div>
//       <div className='imageBox'>
//         {cafelikeviewList.map((item) => (
//           <div key={item.mypageBoardNumber} className='WritePostBox' onClick={() => onButtonClickEventHandler(`${TRAVEL_CAFE_DETAIL_PATH}/${item.mypageBoardNumber}`)}>
//             <div className='board-box'>
//               <img src={item.mypagePhotoList} alt={`Travel ${item.mypageBoardNumber}`} className='board-image' />
//               <div className='board-information'>
//                 <div className='board-information-data'>{changeDateFormat(item.mypageBoardDate)}</div>
//               </div>
//               <div className='board-tag'>
//                 {item.mypageHashTagList.map((hashtag, index) => (
//                   <div key={index} className='board-tag-item'>#{hashtag}</div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }

function Write() {
  const navigator = useNavigate();
  const [cookies] = useCookies();

  const accessToken = cookies[ACCESS_TOKEN];

  const [cafewriteviewList, cafewritesetviewList] = useState<myPageBoardCafes[]>([]);

  const [writecount, writesetCount] = useState<number>(0);
  const [writepageList, writesetPageList] = useState<number[]>([]);
  const [writetotalPage, writesetTotalPage] = useState<number>(0);
  const [writetotalList, writesetTotalList] = useState<myPageBoardCafes[]>([]);
  const [writecurrentPage, writesetCurrentPage] = useState<number>(1);
  const [writetotalSection, writesetTotalSection] = useState<number>(0);
  const [writecurrentSection, writesetCurrentSection] = useState<number>(1);



  // function: get total count response //
  const getwriteTotalCountResponse = (dto: GetTotalCountResponseDto | ResponseDto | null) => {
    const { count } = dto as GetTotalCountResponseDto;
    const writetotalPage = Math.ceil(count / 8);
    writesetTotalPage(writetotalPage);
    const writetotalSection = Math.ceil(writetotalPage / SECTION_PER_PAGE);
    writesetTotalSection(writetotalSection);
  }

  // function: getLike List 함수 //
  const getCafeWriteList = () => {
    getMyPageCafeBoardRequest(accessToken).then(GetMyPageCafeBoardResponseDto);
  }

  // function: 날짜 포맷 변경 함수 //
  const changeDateFormat = (date: string) => {
    const yy = date.substring(0, 4);
    const mm = date.substring(5, 7);
    const dd = date.substring(8, 10);
    return `${yy}.${mm}.${dd}`;
  };

  // function: get Save Response 함수 //
  const GetMyPageCafeBoardResponseDto = (responseBody: GetMyPageCafeBoardResponseDto | ResponseDto | null) => {
    const message =
      !responseBody ? '로그인 유저 정보를 불러오는데 문제가 발생했습니다.' :
        responseBody.code === 'NI' ? '로그인 유저 정보가 존재하지 않습니다.' :
          responseBody.code === 'AF' ? '잘못된 접근입니다.' :
            responseBody.code === 'DBE' ? '로그인 유저 정보를 불러오는데 문제가 발생했습니다.' : '';

    const isSuccessed = responseBody !== null && responseBody.code === 'SU';
    if (!isSuccessed) {
      alert(message);
      return;
    }

    // cafesavesetviewList 상태 업데이트
    const { myPageBoardCafes } = responseBody as GetMyPageCafeBoardResponseDto;
    cafewritesetviewList(myPageBoardCafes);
    console.log(myPageBoardCafes);
  };

  const onButtonClickEventHandler = (path: string) => {
    navigator(path);
  };

   // state: 여행 게시물 번호 상태 //
  const { travelCafeNumber } = useParams<{ travelCafeNumber: string }>();

  // interface : Properties //
  interface TableSaveProps {
    save: MyPageCafeBoard;
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
  

   // event handler: 게시글 삭제 버튼 클릭 이벤트 처리 //
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


  const onlikePageClickHandler = (page: number) => {
    writesetCurrentPage(page);
  }

  const onlikePreSectionClickHandler = () => {
    if (writecurrentSection === 1) return;
    writesetCurrentSection(writecurrentSection - 1);
    writesetCurrentPage((writecurrentSection - 1) * SECTION_PER_PAGE);
  }

  const onlikeNextSectionClickHandler = () => {
    if (writecount === writetotalSection) return;
    // likecurrentSection(likecurrentSection + 1);
    writesetCurrentPage(writecurrentSection * SECTION_PER_PAGE + 1);
  }

  useEffect(() => {
    getCafeTotalCountRequest().then(getwriteTotalCountResponse);
  }, []);

  useEffect(() => {
    const pageList: number[] = [];
    const startPage = (writecurrentSection - 1) * SECTION_PER_PAGE + 1;
    const endPage = writecurrentSection * SECTION_PER_PAGE;
    for (let page = startPage; page <= endPage; page++) {
      pageList.push(page);
      if (page === writetotalPage) break;
    };
    getCafeWriteList();
    writesetPageList(pageList);

  }, [writecurrentSection, writetotalPage]);

  return (

        <div className='like-box2'>
        <div className='textBox' style={{ borderBottom: "4px solid rgba(0 , 0, 0, 100)" }}>WRITE</div>
        <div className='write-totalBox' style={{ borderBottom: "2px solid rgba(210 , 210, 210, 100)" }}>
          <div className='write-titleBox' style={{ borderBottom: "2px solid rgba(210 , 210, 210, 100)" }}>
            <div className='title'>작성일</div>
            <div className='title2'>제목</div>
            <div className='title'>수정</div>
            <div className='title'>삭제</div>
          </div>

          {cafewriteviewList.map((item) => (
          <div  key={item.mypageBoardNumber} className='contentBox'>
            <div className='directed-writeBox'>{changeDateFormat(item.mypageBoardDate)}</div>
            <div className='directed-writeBox2' onClick={() => onButtonClickEventHandler(`${TRAVEL_CAFE_DETAIL_PATH}/${item.mypageBoardNumber}`)}>{item.mypageBoardTitle}</div>
            <div className='directed-writeBox3'>
              <div className='icon-box' onClick={() => onButtonClickEventHandler(`${TRAVEL_CAFE_UPDATE_PATH}/${item.mypageBoardNumber}`)}></div>
            </div>
            <div className='directed-writeBox4'>
              <div className='icon-box2'  onClick={deleteButtonClickHandler}></div>
            </div>
          </div>
          ))}

        </div>

      </div>
  );
}

function Vote() {
  const navigator = useNavigate();
  const [cookies] = useCookies();

  const accessToken = cookies[ACCESS_TOKEN];

  const [fashionvoteviewList, fashionvotesetviewList] = useState<myPageVoteFashions[]>([]);
  const [travelvoteviewList, travelvotesetviewList] = useState<myPageVoteFashions[]>([]);

  const [votecount, votesetCount] = useState<number>(0);
  const [votepageList, votesetPageList] = useState<number[]>([]);
  const [votetotalPage, votesetTotalPage] = useState<number>(0);
  const [votetotalList, votesetTotalList] = useState<myPageVoteFashions[]>([]);
  const [votecurrentPage, votesetCurrentPage] = useState<number>(1);
  const [votetotalSection, votesetTotalSection] = useState<number>(0);
  const [votecurrentSection, votesetCurrentSection] = useState<number>(1);

  // function: get total count response //
  const getvoteTotalCountResponse = (dto: GetTotalCountResponseDto | ResponseDto | null) => {
    const { count } = dto as GetTotalCountResponseDto;
    const votetotalPage = Math.ceil(count / 8);
    votesetTotalPage(votetotalPage);
    const votetotalSection = Math.ceil(votetotalPage / SECTION_PER_PAGE);
    votesetTotalSection(votetotalSection);
  }

  // function: getLike List 함수 //
  const getFashionVoteList = () => {
    getMyPageFashionVoteRequest(accessToken).then(GetMyPageFashionVoteResponseDto);
  }

  const getTravelVoteList = () => {
    getMyPageTravelVoteRequest(accessToken).then(GetMyPageTravelVoteResponseDto);
  }

  // function: 날짜 포맷 변경 함수 //
  const changeDateFormat = (date: string) => {
    const yy = date.substring(0, 4);
    const mm = date.substring(5, 7);
    const dd = date.substring(8, 10);
    return `${yy}.${mm}.${dd}`;
  };

  // function: get Save Response 함수 //
  const GetMyPageFashionVoteResponseDto = (responseBody: GetMyPageFashionVoteResponseDto | ResponseDto | null) => {
    const message =
      !responseBody ? '로그인 유저 정보를 불러오는데 문제가 발생했습니다.' :
        responseBody.code === 'NI' ? '로그인 유저 정보가 존재하지 않습니다.' :
          responseBody.code === 'AF' ? '잘못된 접근입니다.' :
            responseBody.code === 'DBE' ? '로그인 유저 정보를 불러오는데 문제가 발생했습니다.' : '';

    const isSuccessed = responseBody !== null && responseBody.code === 'SU';
    if (!isSuccessed) {
      alert(message);
      return;
    }

   // cafesavesetviewList 상태 업데이트
    const { myPageVoteFashions } = responseBody as GetMyPageFashionVoteResponseDto;
    fashionvotesetviewList(myPageVoteFashions);
    console.log(myPageVoteFashions);
  };

  const GetMyPageTravelVoteResponseDto = (responseBody: GetMyPageTravelVoteResponseDto | ResponseDto | null) => {
    const message =
      !responseBody ? '로그인 유저 정보를 불러오는데 문제가 발생했습니다.' :
        responseBody.code === 'NI' ? '로그인 유저 정보가 존재하지 않습니다.' :
          responseBody.code === 'AF' ? '잘못된 접근입니다.' :
            responseBody.code === 'DBE' ? '로그인 유저 정보를 불러오는데 문제가 발생했습니다.' : '';

    const isSuccessed = responseBody !== null && responseBody.code === 'SU';
    if (!isSuccessed) {
      alert(message);
      return;
    }

   // cafesavesetviewList 상태 업데이트
    const { myPageTravelVoteBoard } = responseBody as GetMyPageTravelVoteResponseDto;
    travelvotesetviewList(myPageTravelVoteBoard);
    console.log(myPageTravelVoteBoard);
  };

  const onButtonClickEventHandler = (path: string) => {
    navigator(path);
  };

  const onvotePageClickHandler = (page: number) => {
    votesetCurrentPage(page);
  }

  const onvotePreSectionClickHandler = () => {
    if (votecurrentSection === 1) return;
    votesetCurrentSection(votecurrentSection - 1);
    votesetCurrentSection((votecurrentSection - 1) * SECTION_PER_PAGE);
  }

  const onvoteNextSectionClickHandler = () => {
    if (votecount === votetotalSection) return;
    votesetCurrentSection(votecurrentSection + 1);
    votesetCurrentPage(votecurrentSection * SECTION_PER_PAGE + 1);
  }

  // useEffect(() => {
  //   getTravelVoteTotalRequest().then(getvoteTotalCountResponse);
  // }, []);

  useEffect(() => {
    getFashionTotalCountRequest().then(getvoteTotalCountResponse);
  }, []);

  useEffect(() => {
    const pageList: number[] = [];
    const startPage = (votecurrentSection - 1) * SECTION_PER_PAGE + 1;
    const endPage = votecurrentSection * SECTION_PER_PAGE;
    for (let page = startPage; page <= endPage; page++) {
      pageList.push(page);
      if (page === votetotalPage) break;
    };
    getFashionVoteList();
    votesetPageList(pageList);

  }, [votecurrentSection, votetotalPage]);

  return (

        <div className='like-box2'>
        <div className='textBox' style={{ borderBottom: "4px solid rgba(0 , 0, 0, 100)" }}>VOTE</div>
        <div className='write-totalBox' style={{ borderBottom: "2px solid rgba(210 , 210, 210, 100)" }}>
          <div className='write-titleBox' style={{ borderBottom: "2px solid rgba(210 , 210, 210, 100)" }}>
            <div className='title'>작성일</div>
            <div className='title2'>제목</div>
            <div className='title'>수정</div>
            <div className='title'>삭제</div>
          </div>

          {fashionvoteviewList.map((item) => (
          <div key={item.mypageVoteNumber} className='contentBox'>
            <div className='directed-writeBox'>{changeDateFormat(item.mypageVoteDate)}</div>
            <div className='directed-writeBox2'  onClick={() => onButtonClickEventHandler(`${VOTE_PATH}/${item.mypageVoteNumber}`)}>{item.mypageVoteTitle}</div>
            <div className='directed-writeBox3'>
              <div className='icon-box' onClick={() => onButtonClickEventHandler(`${VOTE_PATH}/${item.mypageVoteNumber}`)}></div>
            </div>
            <div className='directed-writeBox4'>
              <div className='icon-box2'></div>
            </div>
          </div>
          ))}

        </div>

      </div>
  );
}

export default function MyPageMain() {
  const navigator = useNavigate();
  const [cookies] = useCookies();

  const accessToken = cookies[ACCESS_TOKEN];

  const [name, setName] = useState<string>('');
  const [telNumber, setTelNumber] = useState<string>('');
  const [joinPath, setJoinPath] = useState<string>('');
  const [userId, setUserId] = useState<string>('');

  const getUserDetailResponseDto = (responseBody: GetMyPageUserDetailResponseDto | ResponseDto | null) => {
    const message =
      !responseBody ? '서버에 문제가 있습니다.' :
        responseBody.code === 'VF' ? '잘못된 접근입니다.' :
          responseBody.code === 'AF' ? '잘못된 접근입니다.' :
            responseBody.code === 'NI' ? ' 존재하지 않는 유저 입니다..' : "";

    const isSuccessed = responseBody !== null && responseBody.code === 'SU';
    if (!isSuccessed) {
      alert(message);
      return;
    }

    const { userId, name, joinPath, telNumber } = responseBody as GetMyPageUserDetailResponseDto;
    setName(name);
    setJoinPath(joinPath);
    setTelNumber(telNumber);
    setUserId(userId);
  };


  useEffect(() => {

    if (!accessToken) return;
    getMyPageUserDetailRequest(accessToken).then(getUserDetailResponseDto);
  }, [accessToken]);

  return (
    <div className='layout'>

      <div className='subscribe-box'>

        <div className='header-box'>
          <div className='header-namebox'>MyPage</div>

          <div className='user-infoBox'>
            <div className='user-contentBox'>
              <div className='contentBox1'>
                <div className='iconBox'></div>
                <div className='content-board'>{name}</div>
              </div>
              <div className='contentBox1'>
                <div className='iconBox'></div>
                <div className='content-board'>{telNumber}</div>
              </div>
            </div>
            <div className='user-contentBox'>
              <div className='contentBox2'>
                <div className='iconBox'></div>
                <div className='content-board'>{userId}</div>
              </div>
              <div className='contentBox2'>
                <div className='iconBox'></div>
                <div className='content-board'>{joinPath}</div>
              </div>
            </div>
          </div>
        </div>

        <Save />
        <Like />
        <Write />
        <div style={{ width: "100%", height: "80px" }}></div>
        <Vote />

      </div>

      
      <div style={{ width: "100%", height: "175px" }}></div>
      <BottomNav></BottomNav>
      </div>
  );
}

