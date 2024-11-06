import React, { ChangeEvent, MouseEvent, useState } from 'react'
import './style.css';
import { useNavigate, useParams } from 'react-router';
import { ACCESS_TOKEN, VOTE_DETAILPATH, VOTE_DETAILPHOTOPATH, VOTE_PATH } from 'src/constants';
import { useCookies } from 'react-cookie';
import { useSearchParams } from 'react-router-dom';
import { ResponseDto } from 'src/apis/dto/response';
import { postTravelVoteRequest } from 'src/apis/vote';
import { PostTravelVoteRequestDto } from 'src/apis/vote/travel_vote/dto/request';


export default function VoteDoublePhoto() {


    const onClickSecondNavigator = () => {
        navigator(VOTE_DETAILPATH)
    }

    const onClicVoteCancelNavigator = () => {
        const isConfirm = window.confirm('나가시겠습니까?')
        if (!isConfirm) return;
        navigator(VOTE_PATH)
      }
    // state: 파람값 상태 //
   const { travelTitle } = useParams();


   // state: 제목 입력 상태 //
   const [title, setTitle] = useState<string>('');
   // state: 내용 입력 상태 //
   const [content, setContent] = useState<string>('');
   const [contentSeoncd, setContentSecond] = useState<string>('');

   // state: cookie 상태 //
   const [cookies, setCookie] = useCookies();

   // state: parameter 상태 //
   const [qeuryParam] = useSearchParams();

   // state: token 상태 //
   const accessToken = qeuryParam.get('accessToken');

   // state: 네비게이터 경로 이동 상태 //
   const navigator = useNavigate();

   
   // function: post vote write response 처리 함수 //
 const postVoteWriteResponse = (responseBody: ResponseDto | null) => {
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

   if (!travelTitle) return;

   const accessToken = cookies[ACCESS_TOKEN];
   if (!accessToken) return;

   postTravelVoteRequest(accessToken, travelTitle).then(postVoteWriteResponse);
};

   // function: 네비게이터 경로 이동 함수 //
   const onClickNavigator = () => {

       const accessToken = cookies[ACCESS_TOKEN];
       if (accessToken) navigator(VOTE_DETAILPHOTOPATH);
     }

   const onTitleHandler = (event:ChangeEvent<HTMLInputElement>) => {
       const { value } = event.target;
       setTitle(value);
   
   }
   const onContentHandler = (event:ChangeEvent<HTMLInputElement>) => {
       const { value } = event.target;
       setContent(value);
   }

   const onContentSecondHandler = (event:ChangeEvent<HTMLInputElement>) => {
       const { value } = event.target;
       setContentSecond(value);
   }

   const onClickPostHandler = (event:MouseEvent<HTMLDivElement>) => {
       const accessToken = cookies[ACCESS_TOKEN];
       if (accessToken) {
      
           alert('글 작성성공')
           navigator(VOTE_PATH);

       }    


       const requestBody: PostTravelVoteRequestDto = {
           travelVoteTitle: title,
           travelVotePhoto1: null,
           travelVotePhoto2: null,
           travelVoteChoice1: content,
           travelVoteChoice2: contentSeoncd
       };
       postTravelVoteRequest(requestBody, accessToken).then(postVoteWriteResponse);
       console.log("테스트" + postTravelVoteRequest);
   }



  return (
    <div id='main'>
        <div className='doubledetail-top'>
        <div className='doubledetail-title'></div>
          <div className='doublevote-choice'>
           <input className='double-nomal' placeholder='제목을 입력하세요.' value={title} onChange={onTitleHandler}></input>
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
                    <input className='double-content' placeholder='내용을 입력하세요.' value={content} onChange={onContentHandler}></input>
                </div>
            </div>
            <div className='photos-two'>
                <div className='photo-two'></div>
                <div className='double-input'>
                    <input className='double-content' placeholder='내용을 입력하세요.' value={contentSeoncd} onChange={onContentSecondHandler}></input>
                </div>
            </div>    
        </div>

        <div className='doubledetail-buttons'>
          <div className='doubledetail-post' onClick={onClickPostHandler}>등록</div>
          <div className='doubledetail-cancel' onClick={onClicVoteCancelNavigator}>취소</div>
        </div>
    </div>
  )
}
