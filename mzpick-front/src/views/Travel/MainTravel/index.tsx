import React, { useState } from 'react'
import './style.css';
import { useNavigate } from 'react-router-dom';
import { WRITE_PATH } from '../../../constants';

export default function MainTravel() {

  const [dropDownOpen, setDropDownOpen] = useState(false);

  const dropDown = () => {
    setDropDownOpen(!dropDownOpen);
  }

  // const [selectOption, setSelectOption] = useState<string>('a');

  // const optionClickHandler = (option: string) => {
  //   setSelectOption(option);
  //   setDropDownOpen(false);
  // }

  // function: 네비게이터 함수 //
  const navigator = useNavigate();

  // event handler: 네비게이션 아이템 클릭 이벤트 처리 //
  const onItemClickHandler = (path: string) => {
    navigator(path);
  };


  return (
    <div id='main-travel-board'>
      <div className='board-top'>
        <div className='drop-down-box'>
          <div className='drop-down-main' onClick={dropDown}>
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
        <div className='board-detail-box'>
          <div className='board-detail-image'></div>
          <div className='board-detail-information'>
            <div className='board-detail-information-date'></div>
            <div className='board-detail-information-right'>
              <div className='board-detail-information-like'>
                <div className='board-detail-information-like-icon'></div>
                <div className='board-detail-information-count'></div>
              </div>
              <div className='board-detail-information-view'>
                <div className='board-detail-information-view-icon'></div>
                <div className='board-detail-information-count'></div>
              </div>
              <div className='board-detail-information-bookmark'></div>
            </div>
          </div>
          <div className='board-detail-tag'></div>
        </div>
      </div>
    </div>
  )
}
