import React, { useState } from 'react'
import './style.css';

export default function MainTravel() {

  const [dropDownOpen, setDropDownOpen] = useState(false);

  const dropDown= () => {
    setDropDownOpen(!dropDownOpen);
  }

  // const [selectOption, setSelectOption] = useState<string>('a');

  // const optionClickHandler = (option: string) => {
  //   setSelectOption(option);
  //   setDropDownOpen(false);
  // }


  return (
    <div id='main-travel-board'>
      <div className='board-top'>
        <div className='drop-down-box'>
          <div className='drop-down-main' onClick={dropDown}>
            <div className='drop-down-text'>여행</div>
            <div className='drop-down-button'></div>
          </div>
          <div className={`drop-down-sub ${dropDownOpen ? 'active' : ''}`}>
            <div className='drop-down-text'>외식</div>
            <div className='drop-down-text'>카페</div>
            <div className='drop-down-text'>숙박</div>
          </div>
        </div>
        <div className='write-button'>글쓰기</div>
      </div>
      <div className='board-middle'>
        <div className='board-detail-box'>게시물</div>
      </div>
    </div>
  )
}
