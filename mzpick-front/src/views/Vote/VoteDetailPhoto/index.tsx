
import React from 'react'
import './style.css';
import { useNavigate } from 'react-router';
import VoteDetail from '../VoteDetail';
import { VOTE_DETAILPATH, VOTE_DOUBLEPHOTOPATH } from 'src/constants';


export default function VoteDetailPhoto() {
  const navigator = useNavigate();
  
  const onClickNavigator = () => {
    navigator(VOTE_DETAILPATH);
  }
  const onClickSecondNavigator = () => {
    navigator(VOTE_DOUBLEPHOTOPATH);
  }

  return (
    <div id='main'>
      <div className='photo-detail-top'>
        <div className='photo-detail-title'></div>
          <div className='photo-vote-choice'>
           <div className='photo-nomal'>제목을 입력하세요.</div>
            <div className='photo-board'>
              <div className='photo-normal-vote' onClick={onClickNavigator}>일반투표</div>
             <div className='photo-normal-board'>게시물투표</div>
          </div>
        </div>
      </div>
          <div>

          <div className='photo-photo-choice'>
            <div className='photo-choice-first'>1</div>
            <div className='photo-choice-second' onClick={onClickSecondNavigator}>2</div>
          </div>
          </div>
        <div className='photo-detail-contents'>
          <div className='photo-photo-box'>
            <div className='photo-photo'></div>
            <div className='photo-content-box'>
              <input className='photo-content' placeholder='내용을 입력하세요.'></input>
              <input className='photo-content' placeholder='내용을 입력하세요.'></input>
            </div>
          </div>
        </div>

        <div className='photo-detail-buttons'>
          <div className='photo-detail-post'>등록</div>
          <div className='photo-detail-cancel'>취소</div>
        </div>

    </div>
  )
}

