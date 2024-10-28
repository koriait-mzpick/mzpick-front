import React from 'react'
import './style.css';
import { url } from 'inspector';
import BottomNav from '../../layouts/BottomNav';

export default function MyPage() {
  return (
    <div className='layout'>

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
        <div  className='page-box'>
          <div className='pageBox1'></div>
          <div className='pageBox'>1</div>
          <div className='pageBox'>2</div>
          <div className='pageBox'>3</div>
          <div className='pageBox'>4</div>
          <div className='pageBox'>5</div>
          <div className='pageBox2'></div>
        </div>

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
        <div  className='page-box'>
          <div className='pageBox1'></div>
          <div className='pageBox'>1</div>
          <div className='pageBox'>2</div>
          <div className='pageBox'>3</div>
          <div className='pageBox'>4</div>
          <div className='pageBox'>5</div>
          <div className='pageBox2'></div>
        </div>
      </div>

      <div className='like-box'>
        <div className='textBox'  style={{ borderBottom: "4px solid rgba(0 , 0, 0, 100)" }}>WRITE</div>
        <div className='write-totalBox' style={{ borderBottom: "2px solid rgba(210 , 210, 210, 100)" }}>
          <div className='write-titleBox' style={{ borderBottom: "2px solid rgba(210 , 210, 210, 100)" }}>
            <div className='title'>작성일</div>
            <div className='title2'>제목</div>
            <div className='title'>수정</div>
            <div className='title'>삭제</div>
          </div>

          <div className='contentBox'>
            <div className='directed-writeBox'>2024.10.11</div>
            <div className='directed-writeBox2'>여행지 추천 해주세요!</div>
            <div className='directed-writeBox3'>
              <div className='icon-box'></div>
            </div>
            <div className='directed-writeBox4'>
              <div className='icon-box2'></div>
            </div>
          </div>

          <div className='contentBox'>
            <div className='directed-writeBox'>2024.10.11</div>
            <div className='directed-writeBox2'>여행지 추천 해주세요!</div>
            <div className='directed-writeBox3'>
              <div className='icon-box'></div>
            </div>
            <div className='directed-writeBox4'>
              <div className='icon-box2'></div>
            </div>
          </div>

          <div className='contentBox'>
            <div className='directed-writeBox'>2024.10.11</div>
            <div className='directed-writeBox2'>여행지 추천 해주세요!</div>
            <div className='directed-writeBox3'>
              <div className='icon-box'></div>
            </div>
            <div className='directed-writeBox4'>
              <div className='icon-box2'></div>
            </div>
          </div>

        </div>
        <div  className='page-box'>
          <div className='pageBox1'></div>
          <div className='pageBox'>1</div>
          <div className='pageBox'>2</div>
          <div className='pageBox'>3</div>
          <div className='pageBox'>4</div>
          <div className='pageBox'>5</div>
          <div className='pageBox2'></div>
        </div>
      </div>

      <div className='like-box'>
        <div className='textBox'  style={{ borderBottom: "4px solid rgba(0 , 0, 0, 100)" }}>WRITE</div>
        <div className='write-totalBox' style={{ borderBottom: "2px solid rgba(210 , 210, 210, 100)" }}>
          <div className='write-titleBox' style={{ borderBottom: "2px solid rgba(210 , 210, 210, 100)" }}>
            <div className='title'>작성일</div>
            <div className='title2'>제목</div>
            <div className='title'>수정</div>
            <div className='title'>삭제</div>
          </div>

          <div className='contentBox'>
            <div className='directed-writeBox'>2024.10.11</div>
            <div className='directed-writeBox2'>여행지 추천 해주세요!</div>
            <div className='directed-writeBox3'>
              <div className='icon-box'></div>
            </div>
            <div className='directed-writeBox4'>
              <div className='icon-box2'></div>
            </div>
          </div>

          <div className='contentBox'>
            <div className='directed-writeBox'>2024.10.11</div>
            <div className='directed-writeBox2'>여행지 추천 해주세요!</div>
            <div className='directed-writeBox3'>
              <div className='icon-box'></div>
            </div>
            <div className='directed-writeBox4'>
              <div className='icon-box2'></div>
            </div>
          </div>

          <div className='contentBox'>
            <div className='directed-writeBox'>2024.10.11</div>
            <div className='directed-writeBox2'>여행지 추천 해주세요!</div>
            <div className='directed-writeBox3'>
              <div className='icon-box'></div>
            </div>
            <div className='directed-writeBox4'>
              <div className='icon-box2'></div>
            </div>
          </div>

        </div>
        <div  className='page-box'>
          <div className='pageBox1'></div>
          <div className='pageBox'>1</div>
          <div className='pageBox'>2</div>
          <div className='pageBox'>3</div>
          <div className='pageBox'>4</div>
          <div className='pageBox'>5</div>
          <div className='pageBox2'></div>
        </div>
      </div>


      
    </div>
    <div style={{ width: "100%", height: "800px" }}></div>
    <BottomNav></BottomNav>          
    </div>

    
      
    
  )
}
