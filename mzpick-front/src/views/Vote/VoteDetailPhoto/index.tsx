
import React, { ChangeEvent, MouseEvent, useRef, useState } from 'react'
import './style.css';
import { useNavigate, useParams } from 'react-router';
import VoteDetail from '../VoteDetail';
import { ACCESS_TOKEN, VOTE_DETAILPATH, VOTE_DETAILPHOTOPATH, VOTE_DOUBLEPHOTOPATH, VOTE_PATH, VOTE_WRITEPATH } from 'src/constants';
import { useCookies } from 'react-cookie';
import { useSearchParams } from 'react-router-dom';
import { ResponseDto } from 'src/apis/dto/response';
import { getTravelVoteListRequest, postTravelVoteRequest } from 'src/apis/vote';
import { PostTravelVoteRequestDto } from 'src/apis/vote/travel_vote/dto/request';
import { MZPICK_API_DOMAIN, responseDataHandler } from 'src/apis';
import axios from 'axios';


// function: file upload 요청 함수 //
const FILE_UPLOAD_URL = `${MZPICK_API_DOMAIN}/file/upload`;

const multipart = { headers: { 'Content-Type': 'multipart/form-data' } };

export const fileUploadRequest =  async (requestBody: FormData) => {
  const url = await axios.post(FILE_UPLOAD_URL, requestBody, multipart)
  .then(responseDataHandler<string>)
  .catch(error => null);
  return url;
};

export default function VoteDetailPhoto() {


  // variable: 기본 프로필 이미지 URL //
  const defaultProfileImageUrl = 'https://blog.kakaocdn.net/dn/4CElL/btrQw18lZMc/Q0oOxqQNdL6kZp0iSKLbV1/img.png'

 
  const onClickSecondNavigator = () => {
    navigator(VOTE_DOUBLEPHOTOPATH);
  }

  const onClicVoteNavigator = () => {
    navigator(VOTE_WRITEPATH)
  }
  const onClicVoteCancelNavigator = () => {
    const isConfirm = window.confirm('나가시겠습니까?')
    if (!isConfirm) return;
    navigator(VOTE_PATH)
  }

   // state: 파람값 상태 //
   const { travelTitle } = useParams();

   // state: 이미지 입력 참조 //
   const imageInputRef = useRef<HTMLInputElement|null>(null);

   // state: 프로필 미리보기 url 상태 //
   const [previewUrl, setPreviewUrl] = useState<string>('');

   // state: 제목 입력 상태 //
   const [title, setTitle] = useState<string>('');
   // state: 사진 업로드 상태 //
   const [votePhoto, setVotePhoto] = useState<string>('');
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

   // state: 프로필 이미지 상태 //
   const [profileImageFile, setProfileImageFile] = useState<File|null>(null);
   // state: 게시글 상태 //
  const [travelVotePhotoList, setTravelVotePhotoList] = useState<File[]>([]);

  // state: 사진 미리보기 URL 상태 //
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [addFont, setAddFont] = useState<string>('+');
   


   // event handler: 프로필 이미지 클릭 이벤트 처리 //
   const onProfileImageClickHandler = () => {
    const { current } = imageInputRef;
    if (!current) return;
    current.click();
    console.log(imageInputRef);
};

// event handler: 이미지 변경 이벤트 처리 함수 //
const onImageInputChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    if (!files || !files?.length) return;

    const file = files[0];
    setProfileImageFile(file);

    // const newFiles = { ...travelVotePhotoList, file}
    // const newPreviewUrls = newFiles.map(file => URL.createObjectURL(file));
    // setTravelVotePhotoList(newFiles);
    // setPreviewUrls(newPreviewUrls);
    // console.log('file' + newFiles, 'preview' + newPreviewUrls);

    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    const newFiles = URL.createObjectURL(file);
    fileReader.onloadend = () => {
        setPreviewUrl(fileReader.result as string);
        setPreviewUrl(newFiles);
        setAddFont('');
    };
};

   
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

  

  
   navigator(VOTE_PATH);

};
    // function: 투표 메인페이지 리스트 불러오기 함수 //
    const getTravelVoteList= () => {
      getTravelVoteListRequest().then();
    }

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

   const onClickPostHandler = async () => {
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
     

      let url: string | null = null;
      if (profileImageFile) {
          const formData = new FormData();
          formData.append('file', profileImageFile);
          url = await fileUploadRequest(formData);
      }


       const requestBody: PostTravelVoteRequestDto = {
           travelVoteTitle: title,
           travelVotePhoto1: url,
           travelVotePhoto2: null,
           travelVoteChoice1: content,
           travelVoteChoice2: contentSeoncd
       };
       postTravelVoteRequest(requestBody, accessToken).then(postVoteWriteResponse);
       console.log("테스트" + postTravelVoteRequest);
   }



  return (
    <div id='main'>
      <div className='photo-detail-top'>
        <div className='photo-detail-title'></div>
          <div className='photo-vote-choice'>
           <input className='photo-nomal' placeholder='제목을 입력하세요.' value={title} onChange={onTitleHandler}></input>
            <div className='photo-board'>
              <div className='photo-normal-vote' onClick={onClicVoteNavigator}>일반투표</div>
             <div className='photo-normal-board'>게시물투표</div>
          </div>
        </div>
      </div>
          <div>

          <div className='photo-photo-choice'>
            <div className='photo-choice-first'>1</div>
            <div className='photo-choice-second' onClick={onClickSecondNavigator}>2</div>
          </div>
          </div>
        <div className='photo-detail-contents'>

            <div className='photo-photo' style={{ backgroundImage: `url(${previewUrl})` }} onClick={onProfileImageClickHandler}>{addFont}</div>
              <input className='photo-input' ref={imageInputRef} style={{display:'none'}} type='file' accept='image/*' onChange={onImageInputChangeHandler}/>
            <div className='photo-content-box'>
              <input className='photo-content' placeholder='내용을 입력하세요.' value={content} onChange={onContentHandler}></input>
              <input className='photo-content' placeholder='내용을 입력하세요.' value={contentSeoncd} onChange={onContentSecondHandler}></input>
            </div>
        </div>

        <div className='photo-detail-buttons'>
          <div className='photo-detail-post' onClick={onClickPostHandler}>등록</div>
          <div className='photo-detail-cancel' onClick={onClicVoteCancelNavigator}>취소</div>
        </div>

    </div>
  )
}

