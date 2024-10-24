import React from 'react'
import './style.css';
import BottomNav from '../../BottomNav';


// component: 글쓰기 페이지 컴포넌트 //
export default function Write() {

  // render: 글쓰기 페이지 컴포넌트 렌더링//
  return (
    <div id='main-write'>
      <div className='write-box'>
        <input className='title' placeholder='제목을 입력하세요.' />
        <div className='write-box-middle'>
          <div className='tag-box'>
            <input className='tag' placeholder='태그를 입력하세요. (최대 3개)' />
          </div>
          <div className='attached-file'></div>
        </div>
        <div className='contents-box'>
          <input className='content' placeholder='내용을 입력하세요.' />
          <div className='preview-image'></div>
        </div>
        <div className='write-box-bottom'>
          <div className='button-box'>
            <div className='register'>등록</div>
            <div className='cancel'>취소</div>
          </div>
        </div>
      </div>
      <BottomNav />
    </div>
  )
}
