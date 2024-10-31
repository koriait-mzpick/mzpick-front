import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router';
import { ResponseDto } from 'src/apis/dto/response';
import { getTravelListRequest } from 'src/apis/travel';
import { GetTravelListResponseDto } from 'src/apis/travel/dto/response';
import { ACCESS_TOKEN, TRAVEL_DETAIL_PATH, WRITE_PATH } from 'src/constants';
import { Travel } from 'src/types';
import './style.css';


// component: 여행 게시판 리스트 컴포넌트 //
export default function MainTravel() {

  // state: 쿠키상태 //
  const [cookies] = useCookies();
  // state: 드롭다운 상태//
  const [dropDownOpen, setDropDownOpen] = useState(false);
  // state: 북마크 상태 //
  const [bookMarkClick, setBookMarkClick] = useState(false);
  // state: 원본 리스트 상태 //
  const [originalList, setOriginalList] = useState<Travel[]>([]);

  const [viewList,setViewList] = useState<[]>([])

  // function: get Travel List 함수 //
  const getTravelList =()=>{
    getTravelListRequest(1).then(getTravelResponseDto);
  }

  // function: get Travel Response 함수 //
  const getTravelResponseDto = (resposenBody: GetTravelListResponseDto | ResponseDto | null)=>{
    const message = 
    !resposenBody ? '서버에 문제가 있습니다.' :
    resposenBody.code === 'AF' ? '잘못된 접근입니다.' :
    resposenBody.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

const isSuccessed = resposenBody !== null && resposenBody.code === 'SU';
if (!isSuccessed) {
    alert(message);
    return;
}

const { travel } = resposenBody as GetTravelListResponseDto;

setOriginalList(travel);
  }

  // function: 네비게이터 함수 //
  const navigator = useNavigate();

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
    navigator(path);
  };

  useEffect(getTravelList,[]);

  // render: 여행 게시판 리스트 컴포넌트 렌더링//  
  return (
    <div id='list-main'>
      <div className='board-top'>
        <div className='drop-down-box'>
          <div className='drop-down-main' onClick={dropDownOpenhandler}>
            <div className='drop-down-main-text'>여행</div>
            <div className='drop-down-button'></div>
          </div>
          <div className={`drop-down-sub ${dropDownOpen ? 'active' : ''}`}>
            <div className='drop-down-sub-text'>외식</div>
            <div className='drop-down-sub-text'>카페</div>
            <div className='drop-down-sub-text'>숙박</div>
          </div>
        </div>
        <div className='write-button' onClick={() => onItemClickHandler(WRITE_PATH)}>글쓰기</div>
      </div>
      <div className='board-middle'>
        <div className='board-box'>
          <div className='board-image' onClick={() => onItemClickHandler(TRAVEL_DETAIL_PATH)}></div>
          <div className='board-information'>
            <div className='board-information-data'>24.12.12</div>
            <div className='board-information-right'>
              <div className='board-information-like'>
                <div className='board-information-like-icon'></div>
                <div className='board-information-data'>32123123</div>
              </div>
              <div className='board-information-view'>
                <div className='board-information-view-icon'></div>
                <div className='board-information-data'>32</div>
              </div>
              <div className={`board-information-bookmark ${bookMarkClick ? 'active' : ''}`} onClick={bookMarkClickHandler}></div>
            </div>
          </div>
          <div className='board-tag'>#자야나야장</div>
        </div>
      </div>
    </div>
  )
}