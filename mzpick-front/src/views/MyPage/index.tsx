import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie';
import { useNavigate, useParams } from 'react-router';
import { ResponseDto } from 'src/apis/dto/response';
import { getMyPageCafeBoardRequest, getMyPageCafeLikeListRequest, getMyPageCafeSaveListRequest, getMyPageFashionBoardRequest, getMyPageFashionLikeListRequest, getMyPageFashionSaveListRequest, getMyPageFashionVoteRequest, getMyPageRestaurantBoardRequest, getMyPageRestaurantLikeListRequest, getMyPageRestaurantSaveListRequest, getMyPageStayBoardRequest, getMyPageStayLikeListRequest, getMyPageStaySaveListRequest, getMyPageTravelBoardRequest, getMyPageTravelLikeListRequest, getMyPageTravelSaveListRequest, getMyPageTravelVoteRequest, getMyPageUserDetailRequest } from 'src/apis/mypage';
import { GetMyPageCafeSaveResponseDto, GetMyPageFashionSaveResponseDto, GetMyPageRestaurantSaveResponseDto, GetMyPageStaySaveResponseDto, GetMyPageTravelSaveResponseDto } from 'src/apis/mypage/dto/response/save';
import { GetMyPageUserDetailResponseDto } from 'src/apis/mypage/dto/response/user';
import { getCafeTotalCountRequest, getFashionTotalCountRequest, getFoodTotalCountRequest, getStayTotalCountRequest, getTotalCountRequest } from 'src/apis/pagination';
import { GetTotalCountResponseDto } from 'src/apis/pagination/response';
import Pagination1 from 'src/components/Pagination1';
import { ACCESS_TOKEN, FASHION_ABSOLUTE_DETAIL_PATH, FASHION_ABSOLUTE_UPDATE_PATH, FASHION_DETAIL_PATH, FASHION_UPDATE_PATH, TRAVEL_CAFE_DETAIL_PATH, TRAVEL_CAFE_PATH, TRAVEL_CAFE_UPDATE_PATH, TRAVEL_DETAIL_PATH, TRAVEL_RESTAURANT_DETAIL_PATH, TRAVEL_RESTAURANT_UPDATE_PATH, TRAVEL_STAY_DETAIL_PATH, TRAVEL_STAY_UPDATE_PATH, TRAVEL_UPDATE_PATH, TRAVEL_WRITE_PATH, VOTE_DETAILPATH, VOTE_PATH, VOTEFASHION_PATH, WRITE_PATH } from 'src/constants';
import BottomNav from 'src/layouts/BottomNav';
import { MyPageCafeBoard, MyPageCafeLike, MyPageCafeSave } from 'src/types/mypage/cafe';
import myPageSaveCafes from 'src/types/mypage/cafe/cafe-save.interface';
import './style.css';
import { GetMyPageCafeLikeResponseDto, GetMyPageFashionLikeResponseDto, GetMyPageRestaurantLikeResponseDto, GetMyPageStayLikeResponseDto, GetMyPageTravelLikeResponseDto } from 'src/apis/mypage/dto/response/like';
import myPageLikeCafes from 'src/types/mypage/cafe/cafe-like.interface';
import { GetMyPageCafeBoardResponseDto, GetMyPageFashionBoardResponseDto, GetMyPageRestaurantBoardResponseDto, GetMyPageStayBoardResponseDto, GetMyPageTravelBoardResponseDto } from 'src/apis/mypage/dto/response/board';
import myPageBoardCafes from 'src/types/mypage/cafe/cafe-board.interface';
import myPageVoteFashions from 'src/types/mypage/vote/fashion-vote-board.interface';
import { GetMyPageFashionVoteResponseDto, GetMyPageTravelVoteResponseDto } from 'src/apis/mypage/dto/response/vote';
import { deleteCafeRequest } from 'src/apis/cafe';
import { MyPageFashionBoard, MyPageFashionLike, MyPageSaveFashions } from 'src/types/mypage/fashion';
import { GetFashionSaveListResponseDto } from 'src/apis/fashion/dto/response';
import { deleteFashionVoteRequest, deleteTravelVoteRequest, getFashionVoteListRequest, getTravelVoteListRequest, getTravelVoteTotalRequest, putTravelVoteClickRequest } from 'src/apis/vote';
import { GetTravelLikeListResponseDto, GetTravelSaveListResponseDto } from 'src/apis/travel/dto/response';
import { deleteTravelRequest, getTravelSaveListRequest } from 'src/apis/travel';
import { MyPageTravelBoard, MyPageTravelLike, MyPageTravelSave } from 'src/types/mypage/travel';
import { MyPageRestaurantBoard, MyPageRestaurantLike, MyPageRestaurantSave } from 'src/types/mypage/restaurant';
import { GetStaySaveListResponseDto } from 'src/apis/stay/dto/response';
import { MyPageStayBoard, MyPageStayLike, MyPageStaySave } from 'src/types/mypage/stay';
import { TravelVote, TravelVoteTotal } from 'src/types';
import { TravelVoteBoard } from 'src/types/mypage/vote';
import { title } from 'process';
import { deleteFashionRequest, getFashionSaveListRequest } from 'src/apis/fashion';
import { deleteRestaurantRequest } from 'src/apis/restaurant';
import { deleteStayRequest } from 'src/apis/stay';
import { GetTravelVoteTotalResponseDto } from 'src/apis/vote/travel_vote/dto/response';
import { useAuthStore } from 'src/stores';


const SECTION_PER_PAGE = 5;

function Save() {
  const navigator = useNavigate();
  const [cookies] = useCookies();

  const accessToken = cookies[ACCESS_TOKEN];

  const [cafesaveviewList, cafesavesetviewList] = useState<myPageSaveCafes[]>([]);
  const [fashionsaveviewList, fashionsavesetviewList] = useState<MyPageSaveFashions[]>([]);
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
        hashtags: item.travelFoodHashtagList,
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
        id: item.fashionNumber,
        photo: item.fashionPhoto,
        hashtags: item.fashionHashtagList,
        date: item.fashionDate,
      }))),
      ...(staysaveviewList.map((item) => ({
        type: 'stay',
        id: item.travelStayNumber,
        photo: item.travelStayPhoto,
        hashtags: item.travelStayHashtagList,
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
                item.type === 'travel' ? `${TRAVEL_DETAIL_PATH}/${item.id}` :
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

function Like() {
  const navigator = useNavigate();
  const [cookies] = useCookies();

  const accessToken = cookies[ACCESS_TOKEN];

  const [cafelikeviewList, cafelikesetviewList] = useState<myPageLikeCafes[]>([]);
  const [fashionlikeviewList, fashionlikesetviewList] = useState<MyPageFashionLike[]>([]);
  const [travellikeviewList, travellikesetviewList] = useState<MyPageTravelLike[]>([]);
  const [foodlikeviewList, foodlikesetviewList] = useState<MyPageRestaurantLike[]>([]);
  const [staylikeviewList, staylikesetviewList] = useState<MyPageStayLike[]>([]);
  
  const [likecount, likesetCount] = useState<number>(0);
  const [likepageList, likesetPageList] = useState<number[]>([]);
  const [liketotalPage, likesetTotalPage] = useState<number>(0);
  const [liketotalList, likesetTotalList] = useState<myPageLikeCafes[]>([]);
  const [likecurrentPage, likesetCurrentPage] = useState<number>(1);
  const [liketotalSection, likesetTotalSection] = useState<number>(0);
  const [likecurrentSection, likesetCurrentSection] = useState<number>(1);


  // function: get total count response //
  const getlikeTotalCountResponse = (dto: GetTotalCountResponseDto | ResponseDto | null) => {
    const { count } = dto as GetTotalCountResponseDto;
    const liketotalPage = Math.ceil(count / 8);
    likesetTotalPage(liketotalPage);
    const liketotalSection = Math.ceil(liketotalPage / SECTION_PER_PAGE);
    likesetTotalSection(liketotalSection);
  }

  // function: getLike List 함수 //
  const getCafeLikeList = () => {
    getMyPageCafeLikeListRequest(accessToken).then(GetMyPageCafeLikeResponseDto);
  }
  
  const getTravelLikeList = () => {
    getMyPageTravelLikeListRequest(accessToken).then(GetMyPageTravelLikeResponseDto);
  }

  const getFashionLikeList = () => {
    getMyPageFashionLikeListRequest(accessToken).then(GetMyPageFashionLikeResponseDto);
  }

  const getStayLikeList = () => {
    getMyPageStayLikeListRequest(accessToken).then(GetMyPageStayLikeResponseDto);
  }

  const getFoodLikeList = () => {
    getMyPageRestaurantLikeListRequest(accessToken).then(GetMyPageRestaurantLikeResponseDto);
  }


  // function: 날짜 포맷 변경 함수 //
  const changeDateFormat = (date: string) => {
    const yy = date.substring(2, 4);
    const mm = date.substring(5, 7);
    const dd = date.substring(8, 10);
    return `${yy}.${mm}.${dd}`;
  };

  const combinedLikeList = [
    ...(cafelikeviewList.map((item) => ({
      type: 'cafe',
      id: item.mypageBoardNumber,
      photo: item.mypagePhotoList,
      hashtags: item.mypageHashTagList,
      date: item.mypageBoardDate,
    }))),
    ...(foodlikeviewList.map((item) => ({
      type: 'food',
      id: item.mypageBoardNumber,
      photo: item.mypagePhotoList,
      hashtags: item.mypageHashTagList,
      date: item.mypageBoardDate,
    }))),
    ...(travellikeviewList.map((item) => ({
      type: 'travel',
      id: item.mypageBoardNumber,
      photo: item.mypagePhotoList,
      hashtags: item.mypageHashTagList,
      date: item.mypageBoardDate,
    }))),
    ...(fashionlikeviewList.map((item) => ({
      type: 'fashion',
      id: item.mypageBoardNumber,
      photo: item.mypagePhotoList,
      hashtags: item.mypageHashTagList,
      date: item.mypageBoardDate,
    }))),
    ...(staylikeviewList.map((item) => ({
      type: 'stay',
      id: item.mypageBoardNumber,
      photo: item.mypagePhotoList,
      hashtags: item.mypageHashTagList,
      date: item.mypageBoardDate,
    }))),
    
  ];

  console.log(combinedLikeList);

  // function: get Save Response 함수 //
  const GetMyPageCafeLikeResponseDto = (responseBody: GetMyPageCafeSaveResponseDto | ResponseDto | null) => {
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
    const { myPageLikeCafes } = responseBody as GetMyPageCafeLikeResponseDto;
    cafelikesetviewList(myPageLikeCafes);
    console.log(myPageLikeCafes);
  };
  
  const GetMyPageTravelLikeResponseDto = (responseBody: GetMyPageTravelLikeResponseDto | ResponseDto | null) => {
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
    const { myPageLikeTravels } = responseBody as GetMyPageTravelLikeResponseDto;
    travellikesetviewList(myPageLikeTravels);
    console.log(myPageLikeTravels);
  };

  const GetMyPageFashionLikeResponseDto = (responseBody: GetMyPageFashionLikeResponseDto | ResponseDto | null) => {
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
    const { myPageLikeFashions } = responseBody as GetMyPageFashionLikeResponseDto;
    fashionlikesetviewList(myPageLikeFashions);
    console.log(myPageLikeFashions);
  };

  const GetMyPageStayLikeResponseDto = (responseBody: GetMyPageStayLikeResponseDto | ResponseDto | null) => {
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
    const { myPageLikeStays } = responseBody as GetMyPageStayLikeResponseDto;
    staylikesetviewList(myPageLikeStays);
    console.log(myPageLikeStays);
  };

  const GetMyPageRestaurantLikeResponseDto = (responseBody: GetMyPageRestaurantLikeResponseDto | ResponseDto | null) => {
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
    const { myPageLikeFoods } = responseBody as GetMyPageRestaurantLikeResponseDto;
    foodlikesetviewList(myPageLikeFoods);
    console.log(myPageLikeFoods);
  };


  const onButtonClickEventHandler = (path: string) => {
    navigator(path);
  };

  useEffect(() => {
    getCafeLikeList();
    getTravelLikeList();
    getFashionLikeList();
    getStayLikeList();
    getFoodLikeList();
  }, []);

  // interface : Properties //
  interface TableSaveProps {
    save: MyPageCafeLike;
  }

  const onlikePageClickHandler = (page: number) => {
    likesetCurrentPage(page);
  }

  const onlikePreSectionClickHandler = () => {
    if (likecurrentSection === 1) return;
    likesetCurrentSection(likecurrentSection - 1);
    likesetCurrentPage((likecurrentSection - 1) * SECTION_PER_PAGE);
  }

  const onlikeNextSectionClickHandler = () => {
    if (likecount === liketotalSection) return;
    // likecurrentSection(likecurrentSection + 1);
    likesetCurrentPage(likecurrentSection * SECTION_PER_PAGE + 1);
  }

  useEffect(() => {
    getCafeTotalCountRequest().then(getlikeTotalCountResponse);
  }, []);

  useEffect(() => {
    getTotalCountRequest().then(getlikeTotalCountResponse);
  }, []);

  useEffect(() => {
    getFashionTotalCountRequest().then(getlikeTotalCountResponse);
  }, []);

  useEffect(() => {
    getStayTotalCountRequest().then(getlikeTotalCountResponse);
  }, []);

  useEffect(() => {
    getFoodTotalCountRequest().then(getlikeTotalCountResponse);
  }, []);



  useEffect(() => {
    const pageList: number[] = [];
    const startPage = (likecurrentSection - 1) * SECTION_PER_PAGE + 1;
    const endPage = likecurrentSection * SECTION_PER_PAGE;
    for (let page = startPage; page <= endPage; page++) {
      pageList.push(page);
      if (page === liketotalPage) break;
    };
    getCafeLikeList();
    likesetPageList(pageList);

  }, [likecurrentSection, liketotalPage]);

  return (
    <div className='like-box'>
      <div className='textBox' style={{ borderBottom: "4px solid rgba(0 , 0, 0, 100)" }} >LIKE</div>
      <div className='imageBox'>
      {combinedLikeList.map((item) => (
          <div key={`${item.type}-${item.id}`} className='WritePostBox'
            onClick={() => {
              const path = item.type === 'cafe' ? `${TRAVEL_CAFE_DETAIL_PATH}/${item.id}` :
                item.type === 'travel' ? `${TRAVEL_DETAIL_PATH}/${item.id}` :
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

function Write() {
  const navigator = useNavigate();
  const [cookies] = useCookies();

  const accessToken = cookies[ACCESS_TOKEN];

  const [cafewriteviewList, cafewritesetviewList] = useState<myPageBoardCafes[]>([]);
  const [fashionwriteviewList, fashionwritesetviewList] = useState<MyPageFashionBoard[]>([]);
  const [travelwriteviewList, travelwritesetviewList] = useState<MyPageTravelBoard[]>([]);
  const [foodwriteviewList, foodwritesetviewList] = useState<MyPageRestaurantBoard[]>([]);
  const [staywriteviewList, staywritesetviewList] = useState<MyPageStayBoard[]>([]);

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

  const getFashionWriteList = () => {
    getMyPageFashionBoardRequest(accessToken).then(GetMyPageFashionBoardResponseDto);
  }

  const getTravelWriteList = () => {
    getMyPageTravelBoardRequest(accessToken).then(GetMyPageTravelBoardResponseDto);
  }

  const getFoodWriteList = () => {
    getMyPageRestaurantBoardRequest(accessToken).then(GetMyPageRestaurantBoardResponseDto);
  }

  const getStayWriteList = () => {
    getMyPageStayBoardRequest(accessToken).then(GetMyPageStayBoardResponseDto);
  }

  // function: 날짜 포맷 변경 함수 //
  const changeDateFormat = (date: string) => {
    const yy = date.substring(0, 4);
    const mm = date.substring(5, 7);
    const dd = date.substring(8, 10);
    return `${yy}.${mm}.${dd}`;
  };

  
  const combinedWriteList = [
    ...(cafewriteviewList.map((item) => ({
      type: 'cafe',
      id: item.mypageBoardNumber,
      title: item.mypageBoardTitle,
      date: item.mypageBoardDate,
    }))),
    ...(foodwriteviewList.map((item) => ({
      type: 'food',
      id: item.mypageBoardNumber,
      title: item.mypageBoardTitle,
      date: item.mypageBoardDate,
    }))),
    ...(travelwriteviewList.map((item) => ({
      type: 'travel',
      id: item.mypageBoardNumber,
      title: item.mypageBoardTitle,
      date: item.mypageBoardDate,
    }))),
    ...(fashionwriteviewList.map((item) => ({
      type: 'fashion',
      id: item.mypageBoardNumber,
      title: item.mypageBoardTitle,
      date: item.mypageBoardDate,
    }))),
    ...(staywriteviewList.map((item) => ({
      type: 'stay',
      id: item.mypageBoardNumber,
      title: item.mypageBoardTitle,
      date: item.mypageBoardDate,
    }))),
    
  ];

  console.log(combinedWriteList);



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

  const GetMyPageFashionBoardResponseDto = (responseBody: GetMyPageFashionBoardResponseDto | ResponseDto | null) => {
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
    const { myPageBoardFashions } = responseBody as GetMyPageFashionBoardResponseDto;
    fashionwritesetviewList(myPageBoardFashions);
    console.log(myPageBoardFashions);
  };

  const GetMyPageRestaurantBoardResponseDto = (responseBody: GetMyPageRestaurantBoardResponseDto | ResponseDto | null) => {
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
    const { myPageBoardFoods } = responseBody as GetMyPageRestaurantBoardResponseDto;
    foodwritesetviewList(myPageBoardFoods);
    console.log(myPageBoardFoods);
  };

  const GetMyPageStayBoardResponseDto = (responseBody: GetMyPageStayBoardResponseDto | ResponseDto | null) => {
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
    const { myPageBoardStays } = responseBody as GetMyPageStayBoardResponseDto;
    staywritesetviewList(myPageBoardStays);
    console.log(myPageBoardStays);
  };

  const GetMyPageTravelBoardResponseDto = (responseBody: GetMyPageTravelBoardResponseDto | ResponseDto | null) => {
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
    const { myPageBoardTravels } = responseBody as GetMyPageTravelBoardResponseDto;
    travelwritesetviewList(myPageBoardTravels);
    console.log(myPageBoardTravels);
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

  const boardDeleteDetailtResponse = (responseBody: ResponseDto | null) => {
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
    
  };

 // event handler: 게시글 삭제 버튼 클릭 이벤트 처리 //
  const boardDeleteButtonClickHandler = (itemNumber:number, type: string) => {
  if (window.confirm("정말로 삭제하시겠습니까?")) {
    alert("삭제가 완료되었습니다.");
  } else {
    alert("취소되었습니다.");
    return;
  }

  if (!itemNumber) return;

  const accessToken = cookies[ACCESS_TOKEN];
  if (!accessToken) return;

  if (type === 'travel') deleteTravelRequest(itemNumber, accessToken).then(boardDeleteDetailtResponse);
  if (type === 'food') deleteRestaurantRequest(itemNumber, accessToken).then(boardDeleteDetailtResponse);
  if (type === 'cafe') deleteCafeRequest(itemNumber, accessToken).then(boardDeleteDetailtResponse);
  if (type === 'stay') deleteStayRequest(itemNumber, accessToken).then(boardDeleteDetailtResponse);
  if (type === 'fashion') deleteFashionRequest(itemNumber, accessToken).then(boardDeleteDetailtResponse);
}

  useEffect(() => {
    getTravelWriteList();
    getFashionWriteList();
    getStayWriteList();
    getFoodWriteList();
    getCafeWriteList();
  }, []);


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
    getFashionTotalCountRequest().then(getwriteTotalCountResponse);
  }, []);

  useEffect(() => {
    getTotalCountRequest().then(getwriteTotalCountResponse);
  }, []);

  useEffect(() => {
    getFoodTotalCountRequest().then(getwriteTotalCountResponse);
  }, []);

  useEffect(() => {
    getStayTotalCountRequest().then(getwriteTotalCountResponse);
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

<div className='Box'>
              {combinedWriteList.map((item) => (
          <div key={`${item.type}-${item.id}`} className='contentBox'>
            <div className='directed-writeBox'>{changeDateFormat(item.date)}</div>
            <div className='directed-writeBox2' onClick={() => {
              const path = item.type === 'cafe' ? `${TRAVEL_CAFE_DETAIL_PATH}/${item.id}` :
                item.type === 'travel' ? `${TRAVEL_DETAIL_PATH}/${item.id}` :
                  item.type === 'fashion' ? `${FASHION_DETAIL_PATH}/${item.id}` :
                    item.type === 'food' ? `${TRAVEL_RESTAURANT_DETAIL_PATH}/${item.id}` :
                      `${TRAVEL_STAY_DETAIL_PATH}/${item.id}`;
              onButtonClickEventHandler(path);
            }}>{item.title}</div>
            <div className='directed-writeBox3'>
              <div className='icon-box' onClick={() => {
              const path = item.type === 'cafe' ? `${TRAVEL_CAFE_UPDATE_PATH}/${item.id}` :
                item.type === 'travel' ? `${TRAVEL_UPDATE_PATH}/${item.id}` :
                  item.type === 'fashion' ? `${FASHION_UPDATE_PATH}/${item.id}` :
                    item.type === 'food' ? `${TRAVEL_RESTAURANT_UPDATE_PATH}/${item.id}` :
                      `${TRAVEL_STAY_UPDATE_PATH}/${item.id}`;
              onButtonClickEventHandler(path);
            }}></div>
            </div>
            <div className='directed-writeBox4'>
              <div className='icon-box2'  onClick={() => boardDeleteButtonClickHandler(item.id, item.type)}></div>
            </div>
          </div>
          ))}
          </div>
        </div>

      </div>
  );
}

function Vote() {
  const navigator = useNavigate();
  const [cookies] = useCookies();

  const accessToken = cookies[ACCESS_TOKEN];

  const [fashionvoteviewList, fashionvotesetviewList] = useState<myPageVoteFashions[]>([]);
  const [travelvoteviewList, travelvotesetviewList] = useState<TravelVoteBoard[]>([]);

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

  
  const combinedVoteList = [
    ...(travelvoteviewList.map((item) => ({
      type: 'travel',
      id: item.mypageVoteNumber,
      title: item.mypageVoteTitle,
      date: item.mypageVoteDate,
    }))),
    ...(fashionvoteviewList.map((item) => ({
      type: 'fashion',
      id: item.mypageVoteNumber,
      title: item.mypageVoteTitle,
      date: item.mypageVoteDate,
    }))),
  ];

  console.log(combinedVoteList);



  // function: get Save Response 함수 //

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
    const { myPageVoteTravels } = responseBody as GetMyPageTravelVoteResponseDto;
    travelvotesetviewList(myPageVoteTravels);
    console.log(myPageVoteTravels);
  };

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

  const onButtonClickEventHandler = (path: string) => {

    navigator(path);

  };

  

   // state: 여행 게시물 번호 상태 //
  const { travelCafeNumber } = useParams<{ travelCafeNumber: string }>();
  

  // interface : Properties //
  interface TableSaveProps {
    save: MyPageCafeBoard;
  }

  const voteDeleteDetailtResponse = (responseBody: ResponseDto | null) => {
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
  };


 // event handler: 게시글 삭제 버튼 클릭 이벤트 처리 //
  const voteDeleteButtonClickHandler = (itemNumber:number, type: string) => {
  if (window.confirm("정말로 삭제하시겠습니까?")) {
    alert("삭제가 완료되었습니다.");
  } else {
    alert("취소되었습니다.");
    return;
  }

  if (!itemNumber) return;

  const accessToken = cookies[ACCESS_TOKEN];
  if (!accessToken) return;

  if (type === 'travel') deleteTravelVoteRequest(itemNumber, accessToken).then(voteDeleteDetailtResponse);
  if (type === 'fashion') deleteFashionVoteRequest(itemNumber, accessToken).then(voteDeleteDetailtResponse);
}

  useEffect(() => {
    getTravelVoteList();
    getFashionVoteList();
  }, []);


  const onlikePageClickHandler = (page: number) => {
    writesetCurrentPage(page);
  }

  // const onHashtagClickHandler = (hashtag: string) => {
  //   if (user === hashtag) {
  //     setSelectedHashtag('');
  //     return;
  //   }
  //   setSelectedHashtag(hashtag);
  // }

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

  // useEffect(() => {
  //   getTravelVoteListRequest().then(GetMyPageTravelVoteResponseDto);
  // }, []);

  // useEffect(() => {
  //   getFashionVoteListRequest().then(GetMyPageFashionVoteResponseDto);
  // }, []);

  return (

        <div className='like-box2'>
        <div className='textBox' style={{ borderBottom: "4px solid rgba(0 , 0, 0, 100)" }}>VOTE</div>
        <div className='write-totalBox' style={{ borderBottom: "2px solid rgba(210 , 210, 210, 100)" }}>
          <div className='write-titleBox' style={{ borderBottom: "2px solid rgba(210 , 210, 210, 100)" }}>
            <div className='title'>작성일</div>
            <div className='title2'>제목</div>
            <div className='title'></div>
            <div className='title'>삭제</div>
          </div>

<div className='Box'>
              {combinedVoteList.map((item) => (
          <div key={`${item.type}-${item.id}`} className='contentBox'>
            <div className='directed-writeBox'>{changeDateFormat(item.date)}</div>
            <div className='directed-writeBox2' onClick={() => {
              const path = item.type === 'travel' ? `${VOTE_PATH}` :
                      `${VOTEFASHION_PATH}`;
              onButtonClickEventHandler(path);
            }}>{item.title}</div>
            <div className='directed-writeBox3'>
              <div className='icon-box0'></div>
            </div>
            <div className='directed-writeBox4'>
              <div className='icon-box2'  onClick={() => voteDeleteButtonClickHandler(item.id, item.type)}></div>
            </div>
          </div>
          ))}
          </div>
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
        <Vote />

      </div>

      
      <div style={{ width: "100%", height: "75px" }}></div>
      <BottomNav></BottomNav>
      </div>
  );
}

