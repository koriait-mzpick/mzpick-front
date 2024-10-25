import React from 'react'
import './style.css';


// component: 내용 컴포넌트 //
function Content() {

  // render: 내용 컴포넌트 렌더링 //
  return (
    <div id='contents-main'>
      <div className='contents-top'></div>
      <div className='contents-image'>
        <div className='contents-image-left-button'></div>
        <div className='contents-image-right-button'></div>
      </div>
      <div className='contents-text'></div>
      <div className='contents-information'></div>
    </div>
  )
}

// component: 댓글 컴포넌트 //
function Comment() {

  // render: 댓글 컴포넌트 렌더링 //
  return (
    <div id='comment-main'>
      <div className='comment-button-box'>
        <div className='comment-open-button'></div>
        <div className='comment-button-box-right'>
          <div className='comment-update-button'></div>
          <div className='comment-delete-button'></div>
        </div>
      </div>
      <div className='comment-detail'>
        <div className='comment-detail-top'>
          <div className='comment-detail-top-write'></div>
          <div className='comment-detail-top-add-button'></div>
        </div>
        <div className='comment-detail-bottom'>
          <div className='comment-detail-bottom-writer-box'>
            <div className='comment-detail-bottom-writer'></div>
            <div className='comment-detail-bottom-button-box'>
              <div className='comment-detail-bottom-delete-button'></div>
              <div className='comment-detail-bottom-update-button'></div>
            </div>
          </div>
          <div className='comment-detail-bottom-text-box'>
            <div className='comment-detail-bottom-text'></div>
            <div className='comment-detail-bottom-heart'></div>
          </div>
        </div>
      </div>
    </div>
  )
}


export default function Detail() {
  return (
    <>
      <Content />
      <Comment />
    </>
  )
}
