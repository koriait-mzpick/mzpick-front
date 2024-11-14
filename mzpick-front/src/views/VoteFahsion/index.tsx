import React, { ChangeEvent, MouseEvent, useEffect, useRef, useState } from 'react'
import './style.css';
import VoteDetail from './VoteFashionDetail';
import { MZPICK_API_DOMAIN, responseDataHandler, responseErrorHandler } from 'src/apis';
import { GetTravelVoteDetailResponseDto, GetTravelVoteListResponseDto, GetTravelVoteTotalResponseDto } from 'src/apis/vote/travel_vote/dto/response';
import axios from 'axios';
import { ResponseDto } from 'src/apis/dto/response';
import { ACCESS_TOKEN, VOTE_WRITEPATH, VOTEFASHION_WRITEPATH } from 'src/constants';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { deleteTravelVoteRequest, getFashionVoteListRequest, getFashionVoteTotalRequest, getTravelVoteListRequest, getTravelVoteTotalRequest, postTravelVoteRequest, putFashionVoteClickRequest, putTravelVoteClickRequest } from 'src/apis/vote';
import { getTravelListRequest } from 'src/apis/travel';
import { FashionVote, TravelVote, TravelVoteTotal } from 'src/types';
import { GetTravelListResponseDto } from 'src/apis/travel/dto/response';
import DefaultImage from './resources/vote-default-image.png';
import { red } from '@mui/material/colors';
import { count } from 'console';
import { styled } from 'styled-components';
import { useAuthStore } from 'src/stores';
import FashionVoteTotal from 'src/types/vote/fashion-vote-total.interface';
import { GetFashionVoteListResponseDto, GetFashionVoteTotalResponseDto } from 'src/apis/vote/fashion_vote/dto/response';

function FirstCheckVote ({fashionVote, onModalClose}: { fashionVote: FashionVote | null; onModalClose : () => void}){
  const { signInUser } = useAuthStore();
  const [cookies] = useCookies();
  const [voteFashionTotal, setVoteFashionTotal] = useState<FashionVoteTotal[]>([]);

  const accessToken = cookies[ACCESS_TOKEN];
  
  const [check, setCheck] = useState<boolean>(false);
  const [secondCheck, setSecondCheck] = useState<boolean>(false);

  // state: 퍼센트바 상태 //
  const [num, setNum] = useState<number>(0);
  const [maxNum, setMaxNum] = useState<number>(0);

  const firstPercent = voteFashionTotal.length ? (voteFashionTotal.filter(item => item.selected === fashionVote?.fashionVoteChoice1).length / voteFashionTotal.length) * 100 : 0;
  console.log("테스트" +voteFashionTotal);
  const secondPercent = voteFashionTotal.length ? (voteFashionTotal.filter(item => item.selected === fashionVote?.fashionVoteChoice2).length / voteFashionTotal.length) * 100 : 0;
  const totalCount = voteFashionTotal.length ? (voteFashionTotal.filter(item => item.selected === fashionVote?.fashionVoteChoice1).length + voteFashionTotal.filter(item => item.selected === fashionVote?.fashionVoteChoice2).length) : 0;
  
  
  
    
  const onClickCheckHandler = (selectNumber: string | number) => {
    if (!fashionVote) return;
    putFashionVoteClickRequest(fashionVote?.fashionVoteNumber, selectNumber, accessToken).then(putFashionVoteClickResponse)
  }

  // const onClickVoteTotalHandler = (userSelectNumber: number[]) => {

  //   if (userSelectNumber){
  //     setVoteTotal(voteTotal);
   
  // }
   // function: 투표 선택 불러오기 함수 //
   const getFashionVoteTotalList= () => {
    if (!fashionVote) return;
    getFashionVoteTotalRequest(fashionVote.fashionVoteNumber).then(getFashionVotetotalResponse);
    console.log("두번째" + getFashionVoteListRequest)
    console.log("세번째" + getFashionVotetotalResponse)
    console.log("네번째" + getFashionVoteTotalList)
  };


  // function: get travelVote total response 처리 함수 //
  const getFashionVotetotalResponse = (responseBody: GetFashionVoteTotalResponseDto | ResponseDto | null) => {
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

    const {fashionVoteResults} = responseBody as GetFashionVoteTotalResponseDto;
    setVoteFashionTotal(fashionVoteResults);
  };

  // function:  투표 클릭 response 함수//
  const putFashionVoteClickResponse = (responseBody: ResponseDto | null) => {
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

    getFashionVoteTotalList();
  }

  
  useEffect(()=>{
    getFashionVoteTotalList();
  },[])

  useEffect(() => {
  }, [voteFashionTotal])


  if (!fashionVote) return null;
  return (
    <div>
      
     {/* {nonePhotomodal && */}
        <div className='vote-nonephoto-modal'>
          <div className='close-main'>
            <div className='modal-title'>제목 | {fashionVote?.fashionVoteTitle}</div>
            <div className='modal-close' onClick={onModalClose} style={{cursor:"pointer"}}>x</div>
          </div>
          <div className='vote-modal-main'>
            
            <div className='modal-main-box'>
                  <div className='total-list'>
                    <div className='total-vote'>합계:{totalCount}표</div>
                  </div>
                 
              <div className='modal-text-two' onClick={() => onClickCheckHandler(1)}>
                
                <div className='modal-text-all'>
                  <div className='percent-text-one'>{fashionVote?.fashionVoteChoice1}</div>
                  <div className='percent-text-two'>{firstPercent}%</div>
                  <div className='process-bar' style={{ width: `${firstPercent}%` }}></div>
                </div>
                {voteFashionTotal.some(item => signInUser && item.userId === signInUser.userId && item.selected === fashionVote?.fashionVoteChoice1) &&

                <div className='modal-first-cehck' style={{cursor:'pointer'}}></div> 
                
                } 
              </div>  
              
              <div className='modal-text' onClick={() => onClickCheckHandler(2)}>
                <div className='modal-text-all-two'>
                  <div className='percent-text-one-second'>{fashionVote?.fashionVoteChoice2}</div>
                  <div className='percent-text-two-second'>{secondPercent}%</div>
                  <div className='process-bar-second' style={{ width: `${secondPercent}%` }}></div>
                </div>
                {voteFashionTotal.some(item => signInUser && item.userId === signInUser.userId && item.selected === fashionVote?.fashionVoteChoice2) &&
                <div className='modal-second-text-check' style={{cursor:'pointer'}}></div>
                }
              </div>  
            </div>

          </div>
          <div className='vote-modal-bottom'>
              <button className='vote-user'>작성자:{fashionVote?.userId}</button>
          </div>
        </div>
        {/* } */}
    </div>
  )
}

function SecondCheckVote ({fashionVote, onModalClose}: {fashionVote: FashionVote | null; onModalClose : () => void}) {
  // state: 로그인유저 상태 //
  const { signInUser } = useAuthStore();
  // state: 투표 총합 상태 //
  const [voteFashionTotal, setVoteFashionTotal] = useState<FashionVoteTotal[]>([]);


  const firstPercent = voteFashionTotal.length ? (voteFashionTotal.filter(item => item.selected === fashionVote?.fashionVoteChoice1).length / voteFashionTotal.length) * 100 : 0;
  const secondPercent = voteFashionTotal.length ? (voteFashionTotal.filter(item => item.selected === fashionVote?.fashionVoteChoice2).length / voteFashionTotal.length) * 100 : 0;
  const totalCount = voteFashionTotal.length ? (voteFashionTotal.filter(item => item.selected === fashionVote?.fashionVoteChoice1).length + voteFashionTotal.filter(item => item.selected === fashionVote?.fashionVoteChoice2).length) : 0;
  const [cookies] = useCookies();

   // state: 체크 표시 상태 //
   const [check, setCheck] = useState<boolean>(false);
   const [secondCheck, setSecondCheck] = useState<boolean>(false);
 
   const accessToken = cookies[ACCESS_TOKEN];
  


  // state: 체크 표시 상태 //
  const [selectNumber, setSelectNumber] = useState<number>(0);

  const onSelectHandler = (userSelectNumber: number) => {
    setSelectNumber(userSelectNumber);
    
    if (!fashionVote) return;
    putTravelVoteClickRequest(fashionVote.fashionVoteNumber, userSelectNumber, accessToken);
    console.log(userSelectNumber);
  }
  
  const onClickCheckHandler = (selectNumber: string | number) => {
    if (!fashionVote) return;
    putFashionVoteClickRequest(fashionVote?.fashionVoteNumber, selectNumber, accessToken).then(putFashionVoteClickResponse)
  }
  
   const onClickSecondCheckHandler = () => {
    if(check == false){
      setSecondCheck(!secondCheck);
    } else if(check == true){
      setCheck(!check);
      setSecondCheck(!secondCheck);
    }
  }

   // function: 투표 선택 불러오기 함수 //
   const getFashionVoteTotalList= () => {
    if (!fashionVote) return;
    getFashionVoteTotalRequest(fashionVote.fashionVoteNumber).then(getFashionVotetotalResponse);
  };

  


   // function: get travelVote total response 처리 함수 //
  const getFashionVotetotalResponse = (responseBody: GetFashionVoteTotalResponseDto | ResponseDto | null) => {
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

    const {fashionVoteResults} = responseBody as GetFashionVoteTotalResponseDto;
    setVoteFashionTotal(fashionVoteResults);
  };

   // function:  투표 클릭 response 함수//
   const putFashionVoteClickResponse = (responseBody: ResponseDto | null) => {
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

    getFashionVoteTotalList();
  }
  
    useEffect(()=>{
      getFashionVoteTotalList();
    },[])
  

    useEffect(() => {
    }, [voteFashionTotal])


  if (!fashionVote) return null;
  return (
    <div>
        <div className='vote-nonephoto-modal' >
         <div className='close-main'>
            <div className='modal-title'>제목{fashionVote.fashionVoteTitle}</div>
            <div className='modal-close' onClick={onModalClose} style={{cursor:"pointer"}}>x</div>
          </div>
        
        <div className='modal-singlephoto'>
          <div className='modal-photo-all'>
            <div className='modal-photo' style={{ backgroundImage: `url(${fashionVote.fashionVotePhoto1})`}}></div>
            <div className='modal-photo-text'>#제주 #강정포구 #차박</div>
          </div>
          <div className='singlemodal-text'>
          <div className='singletotal-list'>
                    <div className='singletotal-vote'>합계:{totalCount}표</div>
         </div>
            <div className='single-vote-all'>
              <div className='single-check' onClick={() => onClickCheckHandler(1)} style={{cursor:'pointer'}}>
                <div className='singlepercent-text-one'>{fashionVote.fashionVoteChoice1}</div>
                <div className='singlepercent-text-two'>{firstPercent}%</div>
                <div className='single-process-bar' style={{ width: `${firstPercent}%` }}></div>
              </div>
              {voteFashionTotal.some(item => signInUser && item.userId === signInUser.userId && item.selected === fashionVote.fashionVoteChoice1) &&
                <div className='modal-singlefirst-cehck' style={{ cursor: 'pointer' }}></div>
              }
            </div>
            <div className='single-vote-all'>
              <div className='single-check' onClick={() => onClickCheckHandler(2)} style={{cursor:'pointer'}}>
                <div className='singlepercent-text-one-second'>{fashionVote?.fashionVoteChoice2}</div>
                <div className='singlepercent-text-two-second'>{secondPercent}%</div>
                <div className='single-process-bar' style={{ width: `${secondPercent}%` }}></div>
              </div>
                {voteFashionTotal.some(item => signInUser && item.userId === signInUser.userId && item.selected === fashionVote.fashionVoteChoice2) &&
                  <div className='modal-singlefirst-cehck' style={{ cursor: 'pointer' }}></div>
                }

            </div>
          </div>
        </div>
        <div className='vote-modal-bottom'>
              <button className='singlevote-user'>작성자{fashionVote.userId}</button>
          </div>

      </div>
    </div>
  )
}


function ThirdCheckVote ({fashionVote, onModalClose}: {fashionVote: FashionVote | null; onModalClose : () => void}) {
  // state: 로그인유저 상태 //
  const { signInUser } = useAuthStore();
  // state: 투표 총합 상태 //
  const [voteFashionTotal, setVoteFashionTotal] = useState<FashionVoteTotal[]>([]);


  const firstPercent = voteFashionTotal.length ? (voteFashionTotal.filter(item => item.selected === fashionVote?.fashionVoteChoice1).length / voteFashionTotal.length) * 100 : 0;
  const secondPercent = voteFashionTotal.length ? (voteFashionTotal.filter(item => item.selected === fashionVote?.fashionVoteChoice2).length / voteFashionTotal.length) * 100 : 0;
  const totalCount = voteFashionTotal.length ? (voteFashionTotal.filter(item => item.selected === fashionVote?.fashionVoteChoice1).length + voteFashionTotal.filter(item => item.selected === fashionVote?.fashionVoteChoice2).length) : 0;

  const [cookies] = useCookies();
  const accessToken = cookies[ACCESS_TOKEN];

   // state: 체크 표시 상태 //
   const [check, setCheck] = useState<boolean>(false);
   const [secondCheck, setSecondCheck] = useState<boolean>(false);
 
   // state: 체크 표시 상태 //
  const [selectNumber, setSelectNumber] = useState<number>(0);

  const onSelectHandler = (userSelectNumber: number) => {
    setSelectNumber(userSelectNumber);

    if (!fashionVote) return;
    putTravelVoteClickRequest(fashionVote.fashionVoteNumber, userSelectNumber, accessToken);
    console.log(userSelectNumber);
  }
  
  const onClickCheckHandler = (selectNumber: string | number) => {
    if (!fashionVote) return;
    putFashionVoteClickRequest(fashionVote?.fashionVoteNumber, selectNumber, accessToken).then(putFashionVoteClickResponse)
  }
  
   const onClickSecondCheckHandler = () => {
    if(check == false){
      setSecondCheck(!secondCheck);
    } else if(check == true){
      setCheck(!check);
      setSecondCheck(!secondCheck);
    }
  }

   // function: 투표 선택 불러오기 함수 //
   const getFashionVoteTotalList= () => {
    if (!fashionVote) return;
    getFashionVoteTotalRequest(fashionVote.fashionVoteNumber).then(getFashionVotetotalResponse);
  };

  // function:  투표 클릭 response 함수//
  const putFashionVoteClickResponse = (responseBody: ResponseDto | null) => {
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

    getFashionVoteTotalList();
  }


  // function: get travelVote total response 처리 함수 //
  const getFashionVotetotalResponse = (responseBody: GetFashionVoteTotalResponseDto | ResponseDto | null) => {
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

    const {fashionVoteResults} = responseBody as GetFashionVoteTotalResponseDto;
    setVoteFashionTotal(fashionVoteResults);
  };
  
  useEffect(()=>{
    getFashionVoteTotalList();
  },[])

  useEffect(() => {
  }, [voteFashionTotal])

  if (!fashionVote) return null;
  return (
    <div>
        {/* {modal && */}
          <div className='vote-nonephoto-modal' >
          <div className='double-close-main'>
            <div className='double-modal-title'>제목{fashionVote.fashionVoteTitle}</div>
            <div className='double-modal-close' onClick={onModalClose} style={{cursor:"pointer"}}>x</div>
          </div>
              <div className='double-main'>
                <div className='double-main-box'>
                  <div className='modal-doublephoto'>
                    <div className='total-photo'>
                      <div className='modal-firstphoto' style={{ backgroundImage: `url(${fashionVote.fashionVotePhoto1})`}}></div>
                      <div className='modal-photo-text'>#제주 #강정포구 #차박</div>
                    </div>

                    <div className='double-contents' onClick={() => onClickCheckHandler(1)}>
                      <div className='double-first-textall' >
                        <div className='doublemodal-first-text' style={{cursor:'pointer'}} >{fashionVote.fashionVoteChoice1}</div>
                        <div className='doublemodal-first-text-second' style={{cursor:'pointer'}}>{firstPercent}%</div>
                         <div className='double-process-bar' style={{ width: `${firstPercent}%` }}></div>

                      </div>
                      {voteFashionTotal.some(item => signInUser && item.userId === signInUser.userId && item.selected === fashionVote.fashionVoteChoice1) &&
                      <div className='modal-doublefirst-check' style={{cursor:'pointer'}}></div>
                    } 
                    </div>
                  </div>

                  <div className='double-total-list'>
                    <div className='double-total-vote'>합계:{totalCount}표</div>
                  </div>
                  <div className='modal-doublephoto'>
                    <div className='total-photo'>
                      <div className='modal-secondphoto' style={{ backgroundImage: `url(${fashionVote.fashionVotePhoto2})`}}></div>
                      <div className='modal-photo-text'>#제주 #강정포구 #차박</div>
                    </div>

                    <div className='double-contents' onClick={() => onClickCheckHandler(2)} >
                      <div className='double-second-textall'>
                      <div className='doublemodal-second-text' style={{cursor:'pointer'}} >{fashionVote.fashionVoteChoice2}</div>
                      <div className='doublemodal-second-text-second' style={{cursor:'pointer'}}>{secondPercent}%</div>
                       <div className='double-process-bar-second' style={{ width: `${secondPercent}%` }}></div>

                      </div>
                      {voteFashionTotal.some(item => signInUser && item.userId === signInUser.userId && item.selected === fashionVote.fashionVoteChoice2) &&
                      <div className='modal-doublesecond-check' style={{cursor:'pointer'}}></div>
                      }
                    </div>
                  </div>
                  
                </div>

                <div className='double-bottom'>

                  <div className='doublevote-buttons'>
                  </div>
                <div className='doublevote-mainbutton'>
              <button className='doublevote-user'>작성자{fashionVote.userId}</button>
                </div>
                </div>
             </div>

         </div>
        {/* } */}
    </div>
  )
  
}





export default function VoteFashion() {
  const navigator = useNavigate();

  const onWritePostPath = () => {
    navigator(VOTEFASHION_WRITEPATH);
  }

  // state: 파람값 상태 //
  const { travelVoteNumber } = useParams();
  const { selectNumber } = useParams();

  // state: get travel vote 상태 //
  const [fashionVoteList, setFashionVoteList] = useState<FashionVote[]>([]);
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
  const [voteFashionTotal, setVoteFashionTotal] = useState<FashionVoteTotal[]>([]);
  const [voteFashionChoiceNumber, setVoteFashionChoiceNumber] = useState<string>('');


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
  const [selectedVote, setSelectdVote] = useState<FashionVote | null>(null);

  const onClickModalHandler = (fashionvote: FashionVote) => {
    setSelectdVote(fashionvote);
    setSelectedVoteNumber(fashionvote.fashionVoteNumber);
    if (!fashionvote.fashionVotePhoto1 && !fashionvote.fashionVotePhoto2) {
      setNonePhotomodal(!nonePhotomodal);
    };
    if (fashionvote.fashionVotePhoto1 && !fashionvote.fashionVotePhoto2) {
      setSinglePhotomodal(!singlePhotomodal);
      
    };
    if (fashionvote.fashionVotePhoto1 && fashionvote.fashionVotePhoto2) {
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

  

  const onClickSecondCheckHandler = () => {
    if(check == false){
      setSecondCheck(!secondCheck);
    } else if(check == true){
      setCheck(!check);
      setSecondCheck(!secondCheck);
    }


  }


  

  // function: 투표 메인페이지 리스트 불러오기 함수 //
  const getFashionVoteList= () => {
    getFashionVoteListRequest().then(getVoteFashionWriteResponse);
  }
  
  // function: 투표 선택 불러오기 함수 //
  const getFashionVoteTotalList= () => {
    if (!travelVoteNumber) return;
    getFashionVoteTotalRequest(travelVoteNumber).then(getFashionVotetotalResponse);
  }

  
  // function: get travelVote total response 처리 함수 //
  const getFashionVotetotalResponse = (responseBody: GetFashionVoteTotalResponseDto | ResponseDto | null) => {
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
    const { voteResults } = responseBody as GetTravelVoteTotalResponseDto;
    setVoteFashionTotal(voteResults);
    setVoteFashionChoiceNumber(selectNumber);

    putFashionVoteClickRequest(travelVoteNumber, selectNumber, accessToken).then(getFashionVotetotalResponse);
  };

  // function: get vote write response 처리 함수 //
  const getVoteFashionWriteResponse = (responseBody: ResponseDto | null) => {
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

    const { fashionVotes } = responseBody as GetFashionVoteListResponseDto;
    setFashionVoteList(fashionVotes);

    };

  

useEffect(()=>{
  getFashionVoteList();
},[])

useEffect(()=>{
  getFashionVoteTotalList();
  console.log(getFashionVoteTotalList);
},[])

  return (
    <div id='vote-main'>
       
      <div className='vote-top'>

        { nonePhotomodal && <FirstCheckVote fashionVote={selectedVote} onModalClose={onModalClose} />} 
        
        { singlePhotomodal && <SecondCheckVote fashionVote={selectedVote} onModalClose={onModalClose} />}
        {modal && <ThirdCheckVote fashionVote={selectedVote} onModalClose={onModalClose} />}

       
       
        
      </div>
      <div className='vote-top'>
        
        {fashionVoteList.map((item)=>(
                  <div className='vote-list' onClick={() => onClickModalHandler(item)}>
                    <div className='vote-name'>{item.userId}</div>
                    <div className='vote-text'>{item.fashionVoteTitle}</div>
          
                    <div className='vote-photo'>

                      {!item.fashionVotePhoto1 && !item.fashionVotePhoto2 ? <div className='first-photo' style={{ backgroundImage: `url(${DefaultImage})`, width:'8vw' ,border:'none'}} ></div> :
                      item.fashionVotePhoto1 && item.fashionVotePhoto2 ? <div className='second-photo' style={{ backgroundImage: `url(${item.fashionVotePhoto1})`, width:'8vw'}}></div> :
                      <div className='first-photo' style={{ backgroundImage: `url(${item.fashionVotePhoto1})`, width:'16vw'}}></div>}

                      {item.fashionVotePhoto2 && <div className='first-photo' style={{ backgroundImage: `url(${item.fashionVotePhoto2})`, width:'8vw', border:'none'}} ></div>}
                      
                    </div>
          
                    <div className='vote-bottom'>
                      <div className='first-text'>{item.fashionVoteChoice1}</div>
                      <div className='second-text'>{item.fashionVoteChoice2}</div>
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
