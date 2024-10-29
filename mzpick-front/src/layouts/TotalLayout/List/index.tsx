import React, { useState } from 'react'
import './style.css';
import { useNavigate } from 'react-router-dom';
import { TRAVEL_DETAIL_PATH, WRITE_PATH } from '../../../constants';

export default function List() {

  // state: 드롭다운 상태//
  const [dropDownOpen, setDropDownOpen] = useState(false);

  // state: 북마크 상태 //
  const [boorMarkClick, setBookMarkClick] = useState(false);

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
    setBookMarkClick(!boorMarkClick);
  }

  // event handler: 네비게이션 아이템 클릭 이벤트 처리 //
  const onItemClickHandler = (path: string) => {
    navigator(path);
  };

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
              <div className={`board-information-bookmark ${boorMarkClick ? 'active' : ''}`} onClick={bookMarkClickHandler}></div>
            </div>
          </div>
          <div className='board-tag'>#자야나야장</div>
        </div>
      </div>
    </div>
  )
}
