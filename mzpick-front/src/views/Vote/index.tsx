import React, { ChangeEvent, MouseEvent, useState } from 'react'

import './style.css';

export default function Vote() {
  const [dropdown, setDropdown] = useState<boolean>(false);

  const onChangeDropdownHandler = (event:MouseEvent) => {
   
    setDropdown(dropdown);
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

        <div className='vote-list'>
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
        
        <div className='vote-list'>
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

        <div className='vote-list'>
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

      <div className='vote-top'>
      <div className='vote-list'>
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

        <div className='vote-list'>
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

        <div className='vote-list'>
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
