import React from 'react'

import './style.css';
import { useNavigate } from 'react-router';
import { VOTE_DETAILPHOTOPATH, VOTE_PATH } from 'src/constants';


export default function VoteDetail() {
  const navigator = useNavigate();

  const onClickNavigator = () => {
    navigator(VOTE_DETAILPHOTOPATH);
  }
  const onClicVoteCancelNavigator = () => {
    const isConfirm = window.confirm('나가시겠습니까?')
    if (!isConfirm) return;
    navigator(VOTE_PATH)
  }
  return (
    <div id='main'>
      <div className='detail-top'>
        <div className='detail-title'></div>
          <div className='vote-choice'>
           <input className='nomal' placeholder='제목을 입력하세요.'></input>
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
          <div className='detail-cancel' onClick={onClicVoteCancelNavigator}>취소</div>
        </div>
    </div>
  )
}
