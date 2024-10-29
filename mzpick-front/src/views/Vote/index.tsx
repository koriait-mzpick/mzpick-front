import React, { ChangeEvent, MouseEvent, useState } from 'react'

import './style.css';

export default function Vote() {
  const [modal, setModal] = useState<boolean>(false);
  const [singlePhotomodal, setSinglePhotomodal] = useState<boolean>(false);
  const [nonePhotomodal, setNonePhotomodal] = useState<boolean>(false);

  const onClickModalHandler = () => {
    setModal(!modal);
  }

  const onClickSingleModalHandler = () => {
    setSinglePhotomodal(!singlePhotomodal);
  }

  const onClickNoneModalHandler = () => {
    setNonePhotomodal(!nonePhotomodal);
  }
  return (
    <div id='vote-main'>
        
      

       
      <div className='vote-top'>

      {/* <div className='vote-dropdown' onClick={onChangeDropdownHandler}>
        <select  className='vote-dropdown-button'>
          <option value="1">여행</option>
          <option value="2">외식</option>
          <option value="3">카페</option>
          <option value="4">숙박</option>
          <option value="5">패션</option>
        </select>
      </div> */}
        {modal ?
        <div className='vote-modal' onClick={onClickModalHandler} style={{cursor:'pointer'}}>
          <div className='modal-title'>제목 | 제주도 갈까유 말까유</div>

          <div className='modal-text'>
            <div className='modal-first-text'>간다</div>
            <div className='modal-second-text'>안 간다</div>
          </div>
          <button className='modal-button'>투표</button>
        </div>
        :
        <div className='vote-list' onClick={onClickModalHandler}>
          <div className='vote-name'>jenny</div>
          <div className='vote-text'>여행지 추천 부탁드립니다!!</div>

          <div className='vote-photo'>
            <div className='first-photo'></div>
            <div className='second-photo'></div>
          </div>
        
          <div className='vote-bottom'>
            <div className='first-text'>제주도</div>
            <div className='second-text'>우도</div>
          </div>
        </div>
        }

        { singlePhotomodal ?
        <div className='vote-modal' onClick={onClickSingleModalHandler} style={{cursor:'pointer'}}>
        <div className='modal-title'>제목</div>
        
        <div className='modal-singlephoto'>
            <div className='modal-photo'></div>
          <div className='singlemodal-text'>
            <div className='singlemodal-first-text'>간다</div>
            <div className='singlemodal-second-text'>안 간다</div>
          <button className='singlemodal-button'>투표</button>
          </div>
        </div>

      </div>
        :
        <div className='vote-list' onClick={onClickSingleModalHandler}>
          <div className='vote-name'>jenny</div>
          <div className='vote-text'>여행지 추천 부탁드립니다!!</div>

          <div className='vote-photo'>
            <div className='single-photo'></div>
          </div>

          <div className='vote-bottom'>
            <div className='first-text'>제주도</div>
            <div className='second-text'>우도</div>
          </div>
        </div>
        
        }
        <div className='vote-list' onClick={onClickModalHandler}>
          <div className='vote-name'>jenny</div>
          <div className='vote-text'>여행지 추천 부탁드립니다!!</div>

          <div className='vote-photo'>
            <div className='none-photo'></div>
          </div>

          <div className='vote-bottom'>
            <div className='first-text'>제주도</div>
            <div className='second-text'>우도</div>
          </div>
        </div>
      </div>

      <div className='vote-top'>
      <div className='vote-list' onClick={onClickModalHandler}>
          <div className='vote-name'>jenny</div>
          <div className='vote-text'>여행지 추천 부탁드립니다!!</div>

          <div className='vote-photo'>
            <div className='first-photo'></div>
            <div className='second-photo'></div>
          </div>

          <div className='vote-bottom'>
            <div className='first-text'>제주도</div>
            <div className='second-text'>우도</div>
          </div>
        </div>

        <div className='vote-list' onClick={onClickModalHandler}>
          <div className='vote-name'>jenny</div>
          <div className='vote-text'>여행지 추천 부탁드립니다!!</div>

          <div className='vote-photo'>
            <div className='first-photo'></div>
            <div className='second-photo'></div>
          </div>

          <div className='vote-bottom'>
            <div className='first-text'>제주도</div>
            <div className='second-text'>우도</div>
          </div>
        </div>

        <div className='vote-list' onClick={onClickModalHandler}>
          <div className='vote-name'>jenny</div>
          <div className='vote-text'>여행지 추천 부탁드립니다!!</div>

          <div className='vote-photo'>
            <div className='first-photo'></div>
            <div className='second-photo'></div>
          </div>

          <div className='vote-bottom'>
            <div className='first-text'>제주도</div>
            <div className='second-text'>우도</div>
          </div>
        </div>
      </div>


      <div className='vote-button'>
        <div className='vote-post'>투표 게시하기</div>
      </div>

    </div>
  )
}
