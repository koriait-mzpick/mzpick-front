import React, { ChangeEvent, MouseEvent, useEffect, useRef, useState } from 'react'
import './style.css';
import VoteDetail from './VoteDetail';
import { MZPICK_API_DOMAIN, responseDataHandler, responseErrorHandler } from 'src/apis';
import { GetTravelVoteDetailResponseDto, GetTravelVoteListResponseDto, GetTravelVoteTotalResponseDto } from 'src/apis/vote/travel_vote/dto/response';
import axios from 'axios';
import { ResponseDto } from 'src/apis/dto/response';
import { ACCESS_TOKEN, VOTE_WRITEPATH } from 'src/constants';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { deleteTravelVoteRequest, getTravelVoteListRequest, getTravelVoteTotalRequest, postTravelVoteRequest, putTravelVoteClickRequest } from 'src/apis/vote';
import { getTravelListRequest } from 'src/apis/travel';
import { TravelVote, TravelVoteTotal } from 'src/types';
import { GetTravelListResponseDto } from 'src/apis/travel/dto/response';
import DefaultImage from './resources/vote-default-image.png';
import { red } from '@mui/material/colors';
import { count } from 'console';

function FirstCheckVote ({voteNumber, onModalClose}: { voteNumber: number; onModalClose : () => void}){
  const [cookies] = useCookies();
  const [voteTotal, setVoteTotal] = useState<TravelVoteTotal[]>([]);

const[,setNonePhotomodal]=useState<boolean>();
const{travelVoteNumber}  = useParams<{travelVoteNumber: string}>(); 
  const accessToken = cookies[ACCESS_TOKEN];
  
  const [check, setCheck] = useState<boolean>(false);
  const [secondCheck, setSecondCheck] = useState<boolean>(false);

  // state: 체크 표시 상태 //
  const [selectNumber, setSelectNumber] = useState<number>(0);

  // state: 퍼센트바 상태 //
  const [persentage, setPersentage] = useState<number>(0);


  const onSelectHandler = (userSelectNumber: number) => {
    setSelectNumber(userSelectNumber);


    putTravelVoteClickRequest(voteNumber, userSelectNumber, accessToken);
    // console.log(selectNumber);
  }

  const onVoteTotalHandler = (userSelectNumber: number) => {
    // if (userSelectNumber === 1) return;
     
    setVoteTotal(voteTotal);
    putTravelVoteClickRequest(voteNumber, userSelectNumber, accessToken);
    console.log(voteTotal);
  }

  const onPersentageHandler = () => {
    const exp = 246;
  }
    
  const onClickCheckHandler = () => {
    if(secondCheck == false){
      setCheck(!check);
    } else if(secondCheck == true){
      setSecondCheck(!secondCheck)
      setCheck(!check)
    }

  
  }

  const onClickSecondCheckHandler = () => {
    if(check == false){
      setSecondCheck(!secondCheck);
    } else if(check == true){
      setCheck(!check);
      setSecondCheck(!secondCheck);
    }
  }

  // const onClickVoteTotalHandler = (userSelectNumber: number[]) => {

  //   if (userSelectNumber){
  //     setVoteTotal(voteTotal);
   
  // }

  return (
    <div>
     {/* {nonePhotomodal && */}
        <div className='vote-nonephoto-modal'>
          <div className='close-main'>
            <div className='modal-title'>제목 | 제주도 갈까유 말까유</div>
            <div className='modal-close' onClick={onModalClose} style={{cursor:"pointer"}}>x</div>
          </div>
          <div className='vote-modal-main'>
            
            <div className='modal-main-box'>
              <div className='modal-text-two' onClick={onClickCheckHandler}>
                
                <div className='modal-text-all' onClick={() => onSelectHandler(1)}>
                  <div className='modal-first-text' style={{cursor:'pointer'}} onClick={() => onVoteTotalHandler(1)}>간다</div>
                  <div className='modal-first-text-two' style={{cursor:'pointer'}}>0%</div>
                </div>
                {check &&

                <div className='modal-first-cehck' style={{cursor:'pointer'}}></div> 
                
                } 
              </div>  
              
              <div className='modal-text' onClick={onClickSecondCheckHandler}>
                <div className='modal-text-all-two' onClick={() => onSelectHandler(2)}>
                  <div className='modal-second-text' style={{cursor:'pointer'}} >안 간다</div>
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
        {/* } */}
    </div>
  )
}

function SecondCheckVote ({voteNumber, onModalClose}: {voteNumber: number; onModalClose : () => void}) {

  const [cookies] = useCookies();

   // state: 체크 표시 상태 //
   const [check, setCheck] = useState<boolean>(false);
   const [secondCheck, setSecondCheck] = useState<boolean>(false);
 
   const accessToken = cookies[ACCESS_TOKEN];
  


  // state: 체크 표시 상태 //
  const [selectNumber, setSelectNumber] = useState<number>(0);

  const onSelectHandler = (userSelectNumber: number) => {
    setSelectNumber(userSelectNumber);

    putTravelVoteClickRequest(voteNumber, userSelectNumber, accessToken);
    console.log(userSelectNumber);
  }

   const onClickCheckHandler = () => {
    if(secondCheck == false){
      setCheck(!check);
    } else if(secondCheck == true){
      setSecondCheck(!secondCheck)
      setCheck(!check)
    }
  }
  
   const onClickSecondCheckHandler = () => {
    if(check == false){
      setSecondCheck(!secondCheck);
    } else if(check == true){
      setCheck(!check);
      setSecondCheck(!secondCheck);
    }
  }
  return (
    <div>
        {/* { singlePhotomodal && */}
        <div className='vote-nonephoto-modal' >
         <div className='close-main'>
            <div className='modal-title'>제목</div>
            <div className='modal-close' onClick={onModalClose} style={{cursor:"pointer"}}>x</div>
          </div>
        
        <div className='modal-singlephoto'>
          <div className='modal-photo-all'>
            <div className='modal-photo'></div>
            <div className='modal-photo-text'>#제주 #강정포구 #차박</div>
          </div>
          <div className='singlemodal-text'>
            <div className='single-check' onClick={() => onSelectHandler(1)}>
                <div className='singlemodal-first-text' style={{cursor:'pointer'}} onClick={onClickCheckHandler}>간다</div>
                {check &&
                <div className='modal-singlefirst-cehck' style={{cursor:'pointer'}}></div>
                }
            </div>
            <div className='single-secondcheck' onClick={() => onSelectHandler(2)}>
                <div className='singlemodal-second-text' style={{cursor:'pointer'}} onClick={onClickSecondCheckHandler}>안 간다</div>
                {secondCheck &&
                <div className='modal-singlesecond-text-check' style={{cursor:'pointer'}}></div>
                }
            </div>
          <button className='singlemodal-button' style={{cursor:'pointer'}}>투표</button>
            </div>
        </div>
        <div className='vote-modal-bottom'>
              <button className='vote-user'>작성자</button>
          </div>

      </div>
      {/* } */}
    </div>
  )
  
}

function ThirdCheckVote ({voteNumber, onModalClose}: {voteNumber:number; onModalClose : () => void}) {

  const [cookies] = useCookies();
  const accessToken = cookies[ACCESS_TOKEN];

   // state: 체크 표시 상태 //
   const [check, setCheck] = useState<boolean>(false);
   const [secondCheck, setSecondCheck] = useState<boolean>(false);
 
   // state: 체크 표시 상태 //
  const [selectNumber, setSelectNumber] = useState<number>(0);

  const onSelectHandler = (userSelectNumber: number) => {
    setSelectNumber(userSelectNumber);

    putTravelVoteClickRequest(voteNumber, userSelectNumber, accessToken);
    console.log(userSelectNumber);
  }

   const onClickCheckHandler = () => {
    if(secondCheck == false){
      setCheck(!check);
    } else if(secondCheck == true){
      setSecondCheck(!secondCheck)
      setCheck(!check)

    }
    console.log('aaa');
    console.log(setSecondCheck);
  }
  
   const onClickSecondCheckHandler = () => {
    if(check == false){
      setSecondCheck(!secondCheck);
    } else if(check == true){
      setCheck(!check);
      setSecondCheck(!secondCheck);
    }
  }

  return (
    <div>
        {/* {modal && */}
          <div className='vote-nonephoto-modal' >
          <div className='double-close-main'>
            <div className='double-modal-title'>제목</div>
            <div className='double-modal-close' onClick={onModalClose} style={{cursor:"pointer"}}>x</div>
          </div>
              <div className='double-main'>
                <div className='double-main-box'>
                  <div className='modal-doublephoto'>
                    <div className='total-photo'>
                      <div className='modal-firstphoto'></div>
                      <div className='modal-photo-text'>#제주 #강정포구 #차박</div>
                    </div>

                    <div className='double-contents' onClick={onClickCheckHandler}>
                      <div className='double-first-textall' onClick={() => onSelectHandler(1)}>
                        <div className='doublemodal-first-text' style={{cursor:'pointer'}} >간다</div>
                        <div className='doublemodal-first-text-second' style={{cursor:'pointer'}}>0%</div>
                      </div>
                      {check &&
                      <div className='modal-doublefirst-check' style={{cursor:'pointer'}}></div>
                    } 
                    </div>
                  </div>

                  <div className='modal-doublephoto'>
                    <div className='total-photo'>
                      <div className='modal-secondphoto'></div>
                      <div className='modal-photo-text'>#제주 #강정포구 #차박</div>
                    </div>

                    <div className='double-contents' onClick={onClickSecondCheckHandler} >
                      <div className='double-second-textall' onClick={() => onSelectHandler(2)}>
                      <div className='doublemodal-second-text' style={{cursor:'pointer'}} >안 간다</div>
                      <div className='doublemodal-second-text-second' style={{cursor:'pointer'}}>50%</div>
                      </div>
                      {secondCheck &&
                      <div className='modal-doublesecond-check' style={{cursor:'pointer'}}></div>
                      }
                    </div>
                  </div>
                  
                </div>

                <div className='double-bottom'>

                  <div className='doublevote-buttons'>
                    <button className='doublemodal-button' style={{cursor:'pointer'}}>투표</button>
                  </div>
                <div className='doublevote-mainbutton'>
              <button className='vote-user'>작성자</button>
                </div>
                </div>
             </div>

         </div>
        {/* } */}
    </div>
  )
  
}





export default function Vote() {
  const navigator = useNavigate();

  const onWritePostPath = () => {
    navigator(VOTE_WRITEPATH);
  }

  // state: 파람값 상태 //
  const { travelVoteNumber } = useParams();
  const { selectNumber } = useParams();

  // state: get travel vote 상태 //
  const [travelVoteList, setTravelVoteList] = useState<TravelVote[]>([]);
  const [travelVoteNum, setTravelVoteNum] = useState<number>(0);
  const [userId, setUserId] = useState<string>('');
  const [voteTitle, setVoteTitle] = useState<string>('');
  const [votePhotoFirst, setVotePhotoFirst] = useState<string>('');
  const [votePhotoSecond, setVotePhotoSecond] = useState<string>('');
  const [voteChoiceFirst, setVoteChoiceFirst] = useState<string>('');
  const [voteChoiceSecond, setVoteChoiceSecond] = useState<string>('');
  const [voteChoiceUser, setVoteChoiceUser] = useState<string[]>([]);
  const [voteChoiceContent, setVoteChoiceContent] = useState<string[]>([]);
  const [voteDate, setVoteDate] = useState<string>('');
  const [voteTotal, setVoteTotal] = useState<TravelVoteTotal[]>([]);
  const [voteChoiceNumber, setVoteChoiceNumber] = useState<string>('');


  // state: 제목 입력 상태 //
  const [title, setTitle] = useState<string>('');
  // state: 내용 입력 상태 //
  const [content, setContent] = useState<string>('');
  const [contentSeoncd, setContentSecond] = useState<string>('');

  const [cookies] = useCookies();

  const [qeuryParam] = useSearchParams();
  const accessToken = qeuryParam.get('accessToken');
  
  // state: 모달창 상태 //
  const [modal, setModal] = useState<boolean>(false);
  const [singlePhotomodal, setSinglePhotomodal] = useState<boolean>(false);
  const [nonePhotomodal, setNonePhotomodal] = useState<boolean>(false);
  // state: 체크 표시 상태 //
  const [check, setCheck] = useState<boolean>(false);
  const [secondCheck, setSecondCheck] = useState<boolean>(false);
  const [selectedVoteNumber, setSelectedVoteNumber] = useState<number>(0);

  const onClickModalHandler = (travelVote: TravelVote) => {
    setSelectedVoteNumber(travelVote.travelVoteNumber);
    if (!travelVote.travelVotePhoto1 && !travelVote.travelVotePhoto2) {
      setNonePhotomodal(!nonePhotomodal);
    };
    if (travelVote.travelVotePhoto1 && !travelVote.travelVotePhoto2) {
      setSinglePhotomodal(!singlePhotomodal);
      
    };
    if (travelVote.travelVotePhoto1 && travelVote.travelVotePhoto2) {
      setModal(!modal)
    };
  }

  const onModalClose = () => {
    setNonePhotomodal(false);
    setSinglePhotomodal(false);
    setModal(false);
  }

  const onClickSingleModalHandler = () => {
    setSinglePhotomodal(!singlePhotomodal);
  }

  const onClickNoneModalHandler = () => {
    setNonePhotomodal(!nonePhotomodal);
  }

  const onClickCheckHandler = () => {
    if(secondCheck == false){
      setCheck(!check);
    } else if(secondCheck == true){
      setSecondCheck(!secondCheck)
      setCheck(!check)
    }
   
  }

  const onClickSecondCheckHandler = () => {
    if(check == false){
      setSecondCheck(!secondCheck);
    } else if(check == true){
      setCheck(!check);
      setSecondCheck(!secondCheck);
    }


  }

  // function: 투표 메인페이지 리스트 불러오기 함수 //
  const getTravelVoteList= () => {
    getTravelVoteListRequest().then(getVoteWriteResponse);
  }
  
  // function: 투표 선택 불러오기 함수 //
  const getTravelVoteTotalList= () => {
    if (!travelVoteNumber) return;
    getTravelVoteTotalRequest(travelVoteNumber).then(getTravelVotetotalResponse);
  }

  
  // function: get travelVote total response 처리 함수 //
  const getTravelVotetotalResponse = (responseBody: GetTravelVoteTotalResponseDto | ResponseDto | null) => {
    const message =
      !responseBody ? '서버에 문제가 있습니다.' :
        responseBody.code === 'VF' ? '모두 입력해주세요' :
          responseBody.code === 'AF' ? '잘못된 접근입니다.' :
            responseBody.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

    const isSuccessed = responseBody !== null && responseBody.code === 'SU';
    if (!isSuccessed) {
      alert(message);
      return;
    };

    if (!travelVoteNumber) return;
    if (!selectNumber) return;
    if (!accessToken) return;
    const { resultSets } = responseBody as GetTravelVoteTotalResponseDto;
    setVoteTotal(resultSets);
    setVoteChoiceNumber(selectNumber);

    putTravelVoteClickRequest(travelVoteNumber, selectNumber, accessToken).then(getTravelVotetotalResponse);
  };

  // function: get vote write response 처리 함수 //
  const getVoteWriteResponse = (responseBody: ResponseDto | null) => {
    const message = 
        !responseBody ? '서버에 문제가 있습니다.' : 
        responseBody.code === 'VF' ? '유효하지 않은 데이터입니다.' : 
        responseBody.code === 'AF' ? '잘못된 접근입니다.' : 
        responseBody.code === 'DBE' ? '서버에 문제가 있습니다.' : '';
    
    const isSuccessed = responseBody !== null && responseBody.code === 'SU';
    if (!isSuccessed) {
        alert(message);
        return;
    }

    const { travelVotes } = responseBody as GetTravelVoteListResponseDto;
    setTravelVoteList(travelVotes);

    };

  

useEffect(()=>{
  getTravelVoteList();
},[])

useEffect(()=>{
  getTravelVoteTotalList();
  console.log(getTravelVoteTotalList);
},[])

  return (
    <div id='vote-main'>
       
      <div className='vote-top'>

        { nonePhotomodal && <FirstCheckVote  voteNumber={selectedVoteNumber} onModalClose={onModalClose} />}
        { singlePhotomodal && <SecondCheckVote voteNumber={selectedVoteNumber} onModalClose={onModalClose} />}
        {modal && <ThirdCheckVote voteNumber={selectedVoteNumber} onModalClose={onModalClose} />}

       
       
        
      </div>
      <div className='vote-top'>
        
        {travelVoteList.map((item)=>(
                  <div className='vote-list' onClick={() => onClickModalHandler(item)}>
                    <div className='vote-name'>{item.userId}</div>
                    <div className='vote-text'>{item.travelVoteTitle}</div>
          
                    <div className='vote-photo'>

                      {!item.travelVotePhoto1 && !item.travelVotePhoto2 ? <div className='first-photo' style={{ backgroundImage: `url(${DefaultImage})`, width:'8vw' ,border:'none'}} ></div> :
                      item.travelVotePhoto1 && item.travelVotePhoto2 ? <div className='second-photo' style={{ backgroundImage: `url(${item.travelVotePhoto1})`, width:'8vw'}}></div> :
                      <div className='first-photo' style={{ backgroundImage: `url(${item.travelVotePhoto1})`, width:'16vw'}}></div>}

                      {item.travelVotePhoto2 && <div className='first-photo' style={{ backgroundImage: `url(${item.travelVotePhoto2})`, width:'8vw', border:'none'}} ></div>}
                      
                    </div>
          
                    <div className='vote-bottom'>
                      <div className='first-text'>{item.travelVoteChoice1}</div>
                      <div className='second-text'>{item.travelVoteChoice2}</div>
                    </div>
                </div>
        ))}


      </div>
      <div className='vote-button'>
        <div className='vote-post' onClick={onWritePostPath}>투표 게시하기</div>
      </div>



    </div>
  )
}
