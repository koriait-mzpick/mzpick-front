import React from 'react'
import './style.css';

export default function MyPage() {
  return (
    <div>

    <div id='header-box'>
      <div className='header-namebox'>MyPage</div>

      <div className='user-infoBox'>
        <div className='user-contentBox'>
          <div className='contentBox1'>제니</div>
          <div className='contentBox1'>010-1111-1111</div>
        </div>
        <div className='user-contentBox'>
          <div className='contentBox2'>jenny001</div>
          <div className='contentBox2'>Naver</div>
        </div>
      </div>
      </div>

    <div id='subscribe-box'>
      <div className='save-box'>
        <div className='textBox'  style={{ borderBottom: "4px solid rgba(0 , 0, 0, 100)" }} >SAVE</div>
        <div className='imageBox'>
          <div className='WritePostBox'>
            <div className='imgContainer'></div>
            <div className='SubtitleBox'></div>
          </div>
          <div className='WritePostBox'>
            <div className='imgContainer'></div>
            <div className='SubtitleBox'></div>
          </div>
          <div className='WritePostBox'>
            <div className='imgContainer'></div>
            <div className='SubtitleBox'></div>
          </div>
        </div>
        <div  className='page-box'></div>
      </div>
      <div className='like-box'>
        <div className='textBox'  style={{ borderBottom: "4px solid rgba(0 , 0, 0, 100)" }}>LIKE</div>
        <div className='imageBox'>
          <div className='WritePostBox'>
            <div className='imgContainer'></div>
            <div className='SubtitleBox'></div>
          </div>
          <div className='WritePostBox'>
            <div className='imgContainer'></div>
            <div className='SubtitleBox'></div>
          </div>
          <div className='WritePostBox'>
            <div className='imgContainer'></div>
            <div className='SubtitleBox'></div>
          </div>
          
        </div>
        <div  className='page-box'></div>
      </div>
    </div>

    </div>
      
    
  )
}
