import React from 'react'
import './style.css';


// component: 글쓰기 페이지 컴포넌트 //
export default function Write() {

  // render: 글쓰기 페이지 컴포넌트 렌더링//
  return (
    <div id='main-write'>
      <div className='write-box'>
        <input className='write-box-title' placeholder='제목을 입력하세요.' />
        <div className='write-box-middle'>
            <input className='middle-tag' placeholder='태그를 입력하세요. (최대 3개)' />
          <div className='middle-attached-file'></div>
        </div>
        <div className='write-box-contents-box'>
          <textarea className='contents-box-text' placeholder='내용을 입력하세요.' />
          <div className='contents-box-preview-image'></div>
        </div>
        <div className='write-box-bottom'>
          <div className='bottom-button-box'>
            <div className='bottom-button-box-register'>등록</div>
            <div className='bottom-button-box-cancel'>취소</div>
          </div>
        </div>
      </div>
    </div>
  )
}
