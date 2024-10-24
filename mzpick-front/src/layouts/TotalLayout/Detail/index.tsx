import React from 'react'
import './style.css';


// component: 내용 컴포넌트 //
function Content() {

  // render: 내용 컴포넌트 렌더링 //
  return (
    <div id='contnet-main'>
      <div className='content-top'></div>
      <div className='content-image'>
        <div className='contnet-image-left-button'></div>
        <div className='contnet-image-right-button'></div>
      </div>
      <div className='content-'></div>
      <div></div>
    </div>
  )
}

// component: 댓글 컴포넌트 //
function Comment() {

  // render: 댓글 컴포넌트 렌더링 //
  return (
    <div id='comment-main'></div>
  )
}


export default function Detail() {
  return (
    <div id='detail-main'>
      <Content />
      <Comment />
    </div>
  )
}
