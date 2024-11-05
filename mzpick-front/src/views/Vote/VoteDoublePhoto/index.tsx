import React from 'react'
import './style.css';
import { useNavigate } from 'react-router';
import { VOTE_DETAILPATH, VOTE_DETAILPHOTOPATH } from 'src/constants';


export default function VoteDoublePhoto() {
    const navigator = useNavigate();
    const onClickNavigator = () => {
        navigator(VOTE_DETAILPHOTOPATH)
    }

    const onClickSecondNavigator = () => {
        navigator(VOTE_DETAILPATH)
    }

  return (
    <div id='main'>
        <div className='doubledetail-top'>
        <div className='doubledetail-title'></div>
          <div className='doublevote-choice'>
           <div className='double-nomal'>제목을 입력하세요.</div>
            <div className='double-board'>
              <div className='doublenormal-vote' onClick={onClickSecondNavigator}>일반투표</div>
             <div className='doublenormal-board'>게시물투표</div>
          </div>
        </div>
      </div>
        <div className='double-photochoice'>
            <div className='photo-choice-one' onClick={onClickNavigator}>1</div>
            <div className='photo-choice-two'>2</div>
        </div>

        <div className='doubledetail-contents'>
            <div className='photos-one'>
                <div className='photo-one'></div>
                <div className='double-input'>
                    <input className='double-content' placeholder='내용을 입력하세요.'></input>
                </div>
            </div>
            <div className='photos-two'>
                <div className='photo-two'></div>
                <div className='double-input'>
                    <input className='double-content' placeholder='내용을 입력하세요.'></input>
                </div>
            </div>    
        </div>

        <div className='doubledetail-buttons'>
          <div className='doubledetail-post'>등록</div>
          <div className='doubledetail-cancel'>취소</div>
        </div>
    </div>
  )
}
