import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useLocation, useNavigate } from 'react-router';
import { ResponseDto } from 'src/apis/dto/response';
import { getRestaurantListRequest } from 'src/apis/restaurant';
import { GetRestaurantListResponseDto } from 'src/apis/restaurant/dto/response';
import { TRAVEL_CAFE_PATH, TRAVEL_PATH, TRAVEL_RESTAURANT_DETAIL_PATH, TRAVEL_STAY_PATH, WRITE_PATH } from 'src/constants';
import { useSearchLocationStore } from 'src/stores';
import { Restaurant } from 'src/types';
import './style.css';

export default function RestaurantMain() {

  // state: 쿠키상태 //
  const [cookies] = useCookies();
  // state: 드롭다운 상태//
  const [dropDownOpen, setDropDownOpen] = useState(false);
  // state: 북마크 상태 //
  const [bookMarkClick, setBookMarkClick] = useState(false);
  // state: 원본 리스트 상태 //
  const [originalList, setOriginalList] = useState<Restaurant[]>([]);
  // state: 검색어 상태 //
  const location = useLocation();
    // state:Zustand에서 searchLocation 상태 불러오기
    const { searchLocation } = useSearchLocationStore();

  const [viewList, setViewList] = useState<Restaurant[]>([]);

  // function: get Travel List 함수 //
  const getTravelList = () => {
    getRestaurantListRequest(1).then(getRestaurantResponseDto);
  }

  // function: get Travel Response 함수 //
  const getRestaurantResponseDto = (resposenBody: GetRestaurantListResponseDto | ResponseDto | null) => {
    const message =
      !resposenBody ? '서버에 문제가 있습니다.' :
        resposenBody.code === 'AF' ? '잘못된 접근입니다.' :
          resposenBody.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

    const isSuccessed = resposenBody !== null && resposenBody.code === 'SU';
    if (!isSuccessed) {
      alert(message);
      return;
    }

    const { travelFoodList } = resposenBody as GetRestaurantListResponseDto;

    setViewList(travelFoodList);

if (searchLocation) {
  const filteredList = travelFoodList.filter(item => item.travelLocation.includes(searchLocation));
  setViewList(filteredList);

  if (filteredList.length === 0) {
    alert('검색 결과가 없습니다.');
  }
} else {
  setViewList(travelFoodList);
}
}

// function: 드롭다운 선택 시 이동
const onDropDownSelect = (destination: string) => {
  navigate (`${destination}`)
};

useEffect(getTravelList, []);


  // function: 네비게이터 함수 //
  const navigate = useNavigate();

  // function: 날짜 포맷 변경 함수 //
  const changeDateFormat = (date: string) => {
    const yy = date.substring(2, 4);
    const mm = date.substring(5, 7);
    const dd = date.substring(8, 10);
    return `${yy}.${mm}.${dd}`;
  };

  // event handler: 드롭다운 오픈 이벤트 처리 //
  const dropDownOpenhandler = () => {
    setDropDownOpen(!dropDownOpen);
  }

  // event handler: 북마크 클릭 이벤트 처리 //
  const bookMarkClickHandler = () => {
    setBookMarkClick(!bookMarkClick);
  }

  // event handler: 네비게이션 아이템 클릭 이벤트 처리 //
  const onItemClickHandler = (path: string) => {
    navigate(path);
  };

  useEffect(getTravelList, []);

  // render: 여행 게시판 리스트 컴포넌트 렌더링//  
  return (
    <div id='list-main'>
      <div className='board-top'>
        <div className='drop-down-box'>
          <div className='drop-down-main' onClick={dropDownOpenhandler}>
            <div className='drop-down-main-text'>외식</div>
            <div className='drop-down-button'></div>
          </div>
          <div className={`drop-down-sub ${dropDownOpen ? 'active' : ''}`}>
            <div className='drop-down-sub-text' onClick={() => onDropDownSelect(TRAVEL_PATH)}>여행</div>
            <div className='drop-down-sub-text' onClick={() => onDropDownSelect(TRAVEL_CAFE_PATH)}>카페</div>
            <div className='drop-down-sub-text' onClick={() => onDropDownSelect(TRAVEL_STAY_PATH)}>숙박</div>
          </div>
        </div>
        <div className='write-button' onClick={() => onItemClickHandler(WRITE_PATH)}>글쓰기</div>
      </div>
      <div className='board-middle'>
        {viewList.map((item) => (
          <div key={item.traveFoodNumber} className='board-box'>
            <div className='board-image' onClick={() => navigate(`${TRAVEL_RESTAURANT_DETAIL_PATH}/${item.traveFoodNumber}`)}></div>
            <div className='board-information'>
              <div className='board-information-data'>{changeDateFormat(item.travelFoodDate)}</div>
              <div className='board-information-right'>
                <div className='board-information-like'>
                  <div className='board-information-like-icon'></div>
                  <div className='board-information-data'>{item.travelFoodLikeCount}</div>
                </div>
                <div className='board-information-view'>
                  <div className='board-information-view-icon'></div>
                  <div className='board-information-data'>{item.travelFoodViewCount}</div>
                </div>
                <div className={`board-information-bookmark ${bookMarkClick ? 'active' : ''}`} onClick={() => setBookMarkClick(!bookMarkClick)}></div>
              </div>
            </div>
            <div className='board-tag'>{item.travelFoodHashtagList}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
