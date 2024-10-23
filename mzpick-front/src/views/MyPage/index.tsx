import React from 'react'
import './style.css';
import { url } from 'inspector';

export default function MyPage() {
  return (
    <div id='componentBox'>

    <div className='header-box'>
      <div className='header-namebox'>MyPage</div>

      <div className='user-infoBox'>
        <div className='user-contentBox'>
          <div className='contentBox1'>
            <div className='iconBox'></div>
            <div className='content-board'>제니</div>
          </div>
          <div className='contentBox1'>
          <div className='iconBox'></div>
          <div className='content-board'>010-1111-1111</div>
          </div>
        </div>
        <div className='user-contentBox'>
          <div className='contentBox2'>
          <div className='iconBox'></div>
          <div className='content-board'>jenny01</div>
          </div>
          <div className='contentBox2'>
          <div className='iconBox'></div>
          <div className='content-board'>NAVER</div>
          </div>
        </div>
      </div>
      </div>

    <div className='subscribe-box'>
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
