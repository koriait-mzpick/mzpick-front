import React, { ChangeEvent, useState, useEffect, MouseEvent } from 'react'
import './style.css';
import { useNavigate, useParams } from 'react-router';
import { ACCESS_TOKEN, VOTE_DETAILPHOTOPATH, VOTE_PATH, VOTE_WRITEPATH, VOTEFASHION_DETAILPHOTOPATH, VOTEFASHION_PATH } from 'src/constants';
import { useCookies } from 'react-cookie';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { MZPICK_API_DOMAIN, responseDataHandler, responseErrorHandler } from 'src/apis';
import { GetTravelVoteDetailResponseDto } from 'src/apis/vote/travel_vote/dto/response';
import { getFashionVoteListRequest, getTravelVoteListRequest, postFashionVoteRequest, postTravelVoteRequest } from 'src/apis/vote';
import { PostTravelRequestDto } from 'src/apis/travel/dto/request';
import { ResponseDto } from 'src/apis/dto/response';
import { PostTravelVoteRequestDto } from 'src/apis/vote/travel_vote/dto/request';
import { PostFashionVoteRequestDto } from 'src/apis/vote/fashion_vote/dto/request';



export default function VoteFashionWrite() {

    const onClicVoteCancelNavigator = () => {
       const isConfirm = window.confirm('나가시겠습니까?')
        if (!isConfirm) return;
        navigator(VOTEFASHION_PATH)
      }
    // state: 파람값 상태 //
    const { fashionTitle } = useParams();


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

    // state: 경로 이동 핸들러 //
    const onClickPathChangeHandler = () => {
        navigator(VOTEFASHION_DETAILPHOTOPATH);
    }
    
    // function: post vote write response 처리 함수 //
  const postFashionVoteWriteResponse = (responseBody: ResponseDto | null) => {
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

    navigator(VOTEFASHION_PATH);
};
    // function: 투표 메인페이지 리스트 불러오기 함수 //
  const getFashionVoteList= () => {
    getFashionVoteListRequest().then();
  }

    // function: 네비게이터 경로 이동 함수 //
    const onClickNavigator = () => {

        const accessToken = cookies[ACCESS_TOKEN];
        if (accessToken) navigator(VOTEFASHION_DETAILPHOTOPATH);
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

        if(!title) {
          alert('제목을 입력해주세요')
          return;
        } else if (!content) {
          alert('내용을 입력해주세요')
          return;
        } else if (!contentSeoncd) {
          alert('내용을 입력해주세요')
          return;
        }

            


        const requestBody: PostFashionVoteRequestDto = {
            fashionVoteTitle: title,
            fashionVotePhoto1: null,
            fashionVotePhoto2: null,
            fashionVoteChoice1: content,
            fashionVoteChoice2: contentSeoncd
        };
        postFashionVoteRequest(requestBody, accessToken).then(postFashionVoteWriteResponse);
        console.log("테스트" + postFashionVoteRequest);
    }


      
  return (
    <div id='main'>
      <div className='detail-top'>
        <div className='detail-title'></div>
          <div className='vote-choice'>
           <input className='nomal' placeholder='제목을 입력하세요.' value={title} onChange={onTitleHandler}></input>
            <div className='board'>
              <div className='normal-vote'>일반투표</div>
             <div className='normal-board' onClick={onClickPathChangeHandler}>게시물투표</div>
          </div>
        </div>
      </div>
      
        <div className='detail-contents'>
          <input className='content' placeholder='내용을 입력하세요.' value={content} onChange={onContentHandler}></input>
          <input className='content' placeholder='내용을 입력하세요.' value={contentSeoncd} onChange={onContentSecondHandler}></input>
        </div>

        <div className='detail-buttons'>
          <div className='detail-post' onClick={onClickPostHandler}>등록</div>
          <div className='detail-cancel' onClick={onClicVoteCancelNavigator}>취소</div>
        </div>
    </div>
  )
}
