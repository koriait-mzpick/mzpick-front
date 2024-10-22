import React from 'react'
import './style.css';

export default function MainTravel() {
  return (
    <div id='main-travel-board'>
      <div className='board-top'>
        <div className='drop-down-box'>
          <div className='drop-down-text'>여행</div>
          <div className='drop-down-button'></div>
        </div>
        <div className='write-button'>글쓰기</div>
      </div>
      <div className='board-middle'>
        <div className='board-detail-box'>게시물</div>
      </div>
    </div>
  )
}
