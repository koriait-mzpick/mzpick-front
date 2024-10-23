import React from 'react'

export default function Write() {
  return (
    <div id='main-write'>
      <div className='write-box'>
        <input className='title' placeholder='제목을 입력하세요.' />
        <div className='write-box-middle'>
          <input className='tag' placeholder='태그를 입력하세요. (최대 3개)'/>
          <div className='attached-file'></div>
        </div>
        <div className='contents-box'>
          <input className='content' placeholder='내용을 입력하세요.' />
          <div className='preview-image'></div>
        </div>
        <div className='write-box-bottom'>
          <div className='register'></div>
          <div className='cancel'></div>
        </div>
      </div>
    </div>
  )
}
