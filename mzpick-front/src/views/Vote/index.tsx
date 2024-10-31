import React, { ChangeEvent, MouseEvent, useState } from 'react'
import VoteDetail from './Vote-Detail';
import './style.css';

export default function Vote() {
  const [modal, setModal] = useState<boolean>(false);
  const [singlePhotomodal, setSinglePhotomodal] = useState<boolean>(false);
  const [nonePhotomodal, setNonePhotomodal] = useState<boolean>(false);
  const [check, setCheck] = useState<boolean>(false);
  const [secondCheck, setSecondCheck] = useState<boolean>(false);

  const onClickModalHandler = () => {
    setModal(!modal);
  }

  const onClickSingleModalHandler = () => {
    setSinglePhotomodal(!singlePhotomodal);
  }

  const onClickNoneModalHandler = () => {
    setNonePhotomodal(!nonePhotomodal);
  }

  const onClickCheckHandler = () => {
    setCheck(!check);
  }
  const onClickSecondCheckHandler = () => {
    setSecondCheck(!secondCheck);
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
        {nonePhotomodal &&
        <div className='vote-nonephoto-modal'>
          <div className='modal-close' onClick={onClickNoneModalHandler} style={{cursor:"pointer"}}>x</div>
          <div className='modal-title'>제목 | 제주도 갈까유 말까유</div>
          <div className='vote-modal-main'>
            <div className='modal-main-box'>
              <div className='modal-text-two'>
                <div className='modal-text-all' onClick={onClickCheckHandler}>
                  <div className='modal-first-text' style={{cursor:'pointer'}}>간다</div>
                  <div className='modal-first-text-two' style={{cursor:'pointer'}}>0%</div>
                </div>
                {check &&
                <div className='modal-first-cehck' style={{cursor:'pointer'}}></div>
                }
              </div>  
              <div className='modal-text'>
                <div className='modal-text-all-two' onClick={onClickSecondCheckHandler}>
                  <div className='modal-second-text' style={{cursor:'pointer'}}>안 간다</div>
                  <div className='modal-second-text-two' style={{cursor:'pointer'}}>50%</div>
                </div>
                {secondCheck &&
                <div className='modal-second-text-check' style={{cursor:'pointer'}}></div>
                }
                </div>  
                <button className='modal-button' style={{cursor:'pointer'}}>투표</button>
            </div>
          </div>
          <div className='vote-modal-bottom'>
              <button className='vote-user'>작성자</button>
          </div>
        </div>
        }
        
         <div className='vote-list' onClick={onClickNoneModalHandler}>
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

        { singlePhotomodal &&
        
        <div className='vote-nonephoto-modal' >
          <div className='modal-close' onClick={onClickSingleModalHandler} style={{cursor:"pointer"}}>x</div>

        <div className='singlemodal-title'>제목</div>
        
        <div className='modal-singlephoto'>
            <div className='modal-photo'></div>
            <div className='modal-photo-text'>제주</div>
          <div className='singlemodal-text'>
            <div className='singlemodal-first-text' style={{cursor:'pointer'}}>간다</div>
            <div className='singlemodal-second-text' style={{cursor:'pointer'}}>안 간다</div>
          <button className='singlemodal-button' style={{cursor:'pointer'}}>투표</button>
          </div>
        </div>

      </div>
      }
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
        
        

        {modal &&
          <div className='vote-nonephoto-modal' >
          <div className='modal-close' onClick={onClickModalHandler} style={{cursor:"pointer"}}>x</div>
            
            <div className='doublemodal-title'>제목</div>
            
            <div className='modal-doublephoto'>
                <div className='modal-firstphoto'></div>
                <div className='modal-secondphoto'></div>
              </div>
              <div className='doublemodal-text'>
                <div className='doublemodal-first-text' style={{cursor:'pointer'}}>간다</div>
                  <div className='doublemodal-second-text' style={{cursor:'pointer'}}>안 간다</div>
            </div>
                <div className='double-button'>
              <button className='doublemodal-button' style={{cursor:'pointer'}}>투표</button>
                </div>
         </div>
        }
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
