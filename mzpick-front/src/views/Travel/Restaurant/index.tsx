import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useLocation, useNavigate } from 'react-router';
import { ResponseDto } from 'src/apis/dto/response';
import { getFoodTotalCountRequest } from 'src/apis/pagination';
import { GetFoodTotalCountResponseDto, GetTotalCountResponseDto } from 'src/apis/pagination/response';
import { getRestaurantListRequest } from 'src/apis/restaurant';
import { GetRestaurantListResponseDto } from 'src/apis/restaurant/dto/response';
import Pagination from 'src/components/Pagination';
import { ACCESS_TOKEN, SIGN_IN_PATH, TRAVEL_CAFE_PATH, TRAVEL_PATH, TRAVEL_RESTAURANT_DETAIL_PATH, TRAVEL_RESTAURANT_WRITE_PATH, TRAVEL_STAY_PATH } from 'src/constants';
import { useAuthStore, useSearchLocationStore } from 'src/stores';
import { Restaurant } from 'src/types';
import './style.css';


const SECTION_PER_PAGE = 5;

export default function TravelRestaurant() {

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
  // state: signInUser상태 //
  const { signInUser } = useAuthStore();

  const [count, setCount] = useState<number>(0);
  const [pageList, setPageList] = useState<number[]>([]);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalSection, setTotalSection] = useState<number>(0);
  const [currentSection, setCurrentSection] = useState<number>(1);
  const [selectedHashtag, setSelectedHashtag] = useState<string>('');
  const [filteredPostList, setFilteredPostList] = useState<Restaurant[]>([]);


  const [viewList, setViewList] = useState<Restaurant[]>([]);

  // function: get Travel List 함수 //
  const getTravelRestaurantList = (page:number, hashtag: string) => {
    getRestaurantListRequest(page, searchLocation, hashtag).then(getRestaurantResponseDto);
  }
    // function: get total count response //
    const getFoodTotalCountResponse = (dto: GetFoodTotalCountResponseDto | ResponseDto | null) => {
      const { count } = dto as GetTotalCountResponseDto;
      const totalPage = Math.ceil(count / 8);
      setTotalPage(totalPage);
      const totalSection = Math.ceil(totalPage / SECTION_PER_PAGE);
      setTotalSection(totalSection);
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
    navigate(`${destination}`)
  };

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


// event handler: 글쓰기 버튼 클릭 이벤트 처리 //
const writeButtonClickHandler = (path: string) => {
  const accessToken = cookies[ACCESS_TOKEN];
  if (!accessToken) {
    if (window.confirm("글쓰기를 하려면 로그인하시기 바랍니다.\n로그인 페이지로 이동하시겠습니까?")) {
      navigate(SIGN_IN_PATH);
      return;
    } alert("취소되었습니다.");
    return;
  };

  navigate(path);
};

  const onPageClickHandler = (page: number) => {
    setCurrentPage(page);
  } 

  const onHashtagClickHandler = (hashtag: string) => {
    setFilteredPostList(viewList);
    if (selectedHashtag === hashtag) {
      setSelectedHashtag('');
      setFilteredPostList([]);
      return;
    }
    setSelectedHashtag(hashtag);
  }

  const onPreSectionClickHandler = () => {
    if (currentSection === 1) return;
    setCurrentSection(currentSection - 1);
    setCurrentPage((currentSection - 1) * SECTION_PER_PAGE);
  } 
  const onNextSectionClickHandler = () => {
    if (currentSection === totalSection) return;
    setCurrentSection(currentSection + 1);
    setCurrentPage(currentSection * SECTION_PER_PAGE + 1);
  } 

  useEffect(() => {
    getFoodTotalCountRequest().then(getFoodTotalCountResponse);
  }, []);

  useEffect(() => {
    if(totalPage > 0){
    const pageList: number[] = [];
    const startPage = (currentSection - 1) * SECTION_PER_PAGE + 1;
    const endPage = currentSection * SECTION_PER_PAGE;
    for (let page = startPage; page <= endPage; page++) {
      pageList.push(page);
      if (page === totalPage) break;
    };
    
    setPageList(pageList);
  }else{
    setPageList([]);
  }}, [currentSection, totalPage]);

  useEffect(() => {
    getTravelRestaurantList(currentPage,selectedHashtag);
  }, [currentPage,selectedHashtag])

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
        <div className='write-button' onClick={() => writeButtonClickHandler(TRAVEL_RESTAURANT_WRITE_PATH)}>글쓰기</div>
      </div>
      <div className='board-middle'>
        {viewList.map((item) => (
          <div key={item.traveFoodNumber} className='board-box'>
            <div className='board-image' onClick={() => navigate(`${TRAVEL_RESTAURANT_DETAIL_PATH}/${item.traveFoodNumber}`)}>
            <img src={item.travelFoodPhoto} alt={`Travel ${item.traveFoodNumber}`} className='board-image-content' />
            </div>        
            <div className='board-information'>
              <div className='board-information-data'>{changeDateFormat(item.travelFoodDate)}</div>
              <div className='board-information-right'>
                <div className='board-information-like'>
                  <div className={`board-information-like-icon ${signInUser && item.travelFoodLikeUserList.includes(signInUser.userId)? 'active' : ''}`}></div>
                  <div className='board-information-data'>{item.travelFoodLikeCount}</div>
                </div>
                <div className='board-information-view'>
                  <div className='board-information-view-icon'></div>
                  <div className='board-information-data'>{item.travelFoodViewCount}</div>
                </div>
                <div className={`board-information-bookmark ${signInUser && item.travelFoodSaveUserList.includes(signInUser.userId) ? 'active' : ''}`} ></div>
              </div>
            </div>
            <div className='board-tag'>
              {item.travelFoodHashtagList.map((hashtag, index) => (
                <div key={index} className='board-tag-item' onClick={() => onHashtagClickHandler(hashtag)}>#{hashtag}</div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <Pagination currentPage={currentPage} pageList={pageList} onPageClickHandler={onPageClickHandler} onNextSectionClickHandler={onNextSectionClickHandler} onPreSectionClickHandler={onPreSectionClickHandler} />
    </div>
  );
}
