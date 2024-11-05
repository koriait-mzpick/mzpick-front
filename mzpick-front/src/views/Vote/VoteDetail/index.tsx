import React from 'react'

import './style.css';
import { useNavigate } from 'react-router';
import { VOTE_DETAILPHOTOPATH } from 'src/constants';


export default function VoteDetail() {
  const navigator = useNavigate();

  const onClickNavigator = () => {
    navigator(VOTE_DETAILPHOTOPATH);
  }
  return (
    <div id='main'>
      <div className='detail-top'>
        <div className='detail-title'></div>
          <div className='vote-choice'>
           <div className='nomal'>제목을 입력하세요.</div>
            <div className='board'>
              <div className='normal-vote'>일반투표</div>
             <div className='normal-board' onClick={onClickNavigator}>게시물투표</div>
          </div>
        </div>
      </div>
      
        <div className='detail-contents'>
          <input className='content' placeholder='내용을 입력하세요.'></input>
          <input className='content' placeholder='내용을 입력하세요.'></input>
        </div>

        <div className='detail-buttons'>
          <div className='detail-post'>등록</div>
          <div className='detail-cancel'>취소</div>
        </div>
    </div>
  )
}
