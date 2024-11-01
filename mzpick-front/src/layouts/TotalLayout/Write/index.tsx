import React, { ChangeEvent, useEffect, useRef, useState, Component } from 'react'
import './style.css';
import { useCookies } from 'react-cookie';
import { ResponseDto } from 'src/apis/dto/response';
import { ACCESS_TOKEN } from 'src/constants';
import { PostTravelRequestDto } from 'src/apis/travel/dto/request';
import { postcTravelRequest } from 'src/apis/travel';
import { fileUploadRequest } from 'src/apis';
import { useNavigate } from 'react-router-dom';

// component: 글쓰기 페이지 컴포넌트 //
export default function Write() {

  // state: cookie 상태 //
  const [cookies] = useCookies();

  // state: 게시글 인풋 상태 //
  const [travelTitle, setTravelTitle] = useState<string>('');
  const [travelHashtagContentList, setTravelHashtagContentList] = useState<string[]>([]);
  const [travelLocation, setTravelLocation] = useState<string>('');
  const [travelPhotoList, setTravelPhotoList] = useState<File[]>([]);
  const [travelContent, setTravelContent] = useState<string>('');

  // state: 이미지 입력 참조 //
  const photoInputRef = useRef<HTMLInputElement | null>(null);

  // state: 이미지 미리보기 URL 상태 //
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  // variable: 등록 가능 여부 //
  const isWriteComplete = travelTitle && travelHashtagContentList && travelLocation && travelPhotoList && travelContent;

  // function: 네비게이터 함수 //
  const navigator = useNavigate();


  // function: post Travel response 처리 함수 //
  const postTravelResponse = (responseBody: ResponseDto | null) => {
    const message =
      !responseBody ? '서버에 문제가 있습니다.' :
        responseBody.code === 'VF' ? '모두 입력해주세요' :
          responseBody.code === 'AF' ? '잘못된 접근입니다.' :
            responseBody.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

    const isSuccessed = responseBody !== null && responseBody.code === 'SU';
    if (!isSuccessed) {
      alert(message);
      return;
    }
  }

  // event handler: 첨부파일 버튼 클릭 이벤트 처리 //
  const attachedFileButtonClickHandler = () => {
    const { current } = photoInputRef;
    if (!current) return;
    current.click();
  };
  
  // event handler: 이미지 변경 이벤트 처리 함수 //
  const photoInputChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    if (travelPhotoList.length >= 3) {
      alert("최대 3장까지만 업로드할 수 있습니다.");
      if (window.confirm("초기화 하시고 다시 첨부 하시겠습니까?")){
        setTravelPhotoList([]);
        setPreviewUrls([]);
        alert("다시 첨부 해주시기 바랍니다.");
      } else{
        alert("취소 되었습니다.");
      }
      return;
    }
    const { files } = event.target;
    if (!files || files.length === 0) return;
    const file = files[0];
    const newFiles = [...travelPhotoList, file];
    const newPreviewUrls = newFiles.map(file => URL.createObjectURL(file));
    console.log(newPreviewUrls, newFiles)
    setTravelPhotoList(newFiles);
    setPreviewUrls(newPreviewUrls);
  };
  
  // event handler: 제목 변경 이벤트 처리 //
  const travelTitleChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setTravelTitle(value);
  };

  // event handler: 태그 변경 이벤트 처리 //
  const travelHashtagContentListChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setTravelHashtagContentList(value.split(","));
  };

  // event handler: 지역 변경 이벤트 처리 //
  const travelLocationhangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setTravelLocation(value);
  };

  // event handler: 내용 변경 이벤트 처리 //
  const travelContentChangeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = event.target;
    setTravelContent(value);
    console.log(travelHashtagContentList);
  };
  
  // event handler: 등록 버튼 클릭 이벤트 처리 함수 //
  const registerButtonClickHandler =  async () => {
    const accessToken = cookies[ACCESS_TOKEN];
    if (!accessToken) return;

    if (!travelTitle || !travelHashtagContentList || !travelLocation || !travelPhotoList || !travelContent) {
      alert('모두 입력해주세요.');
      return;
    }

    if (window.confirm("등록하시겠습니까?")) {
      alert("등록이 완료되었습니다!");
    } else {
      alert("취소되었습니다.");
      return;
    } 

    const travelPhotoListUrl: string[] = [];
    for (const file of travelPhotoList) {
      const formData = new FormData();
      formData.append('file', file);
      const url = await fileUploadRequest(formData);
      if (url) travelPhotoListUrl.push(url);
    }

    const requestBody: PostTravelRequestDto = {
      travelPhotoList: travelPhotoListUrl,
      travelTitle, 
      travelHashtagContentList,
      travelLocation,
      travelContent
    }
    postcTravelRequest(requestBody, accessToken).then(postTravelResponse);


  }

  // render: 글쓰기 페이지 컴포넌트 렌더링//
  return (
    <div id='main-write'>
      <div className='write-box'>
        <input className='write-box-title' value={travelTitle}  placeholder='제목을 입력하세요.' onChange={travelTitleChangeHandler} />
        <div className='write-box-middle'>
          <input className='middle-tag' value={travelHashtagContentList} placeholder='태그를 입력하세요. (최대 3개)' onChange={travelHashtagContentListChangeHandler} />
          <input className='middle-location' value={travelLocation} placeholder='지역을 입력하세요.' onChange={travelLocationhangeHandler}/>
          <div className='middle-attached-file' onClick={attachedFileButtonClickHandler}>
            <input ref={photoInputRef} style={{ display: 'none' }} type='file' accept='image/*' onChange={photoInputChangeHandler} />
          </div>
        </div>
        <div className='write-box-contents-box'>
          <textarea className='contents-box-text' value={travelContent} placeholder='내용을 입력하세요. (* 사진은 최대 3장 첨부할 수 있습니다.)' onChange={travelContentChangeHandler}/>
          <div className='contents-box-preview-photo-box'>
            {previewUrls.map((url, index) => (
              <img className='contents-box-preview-photo' key={index} src={url} alt={`preview ${index}`} />
            ))}
          </div>
        </div>
        <div className='write-box-bottom'>
          <div className='bottom-button-box'>
            <div className={`bottom-button-box-register ${isWriteComplete ? 'active' : ''}`} onClick={registerButtonClickHandler}>등록</div>
            <div className='bottom-button-box-cancel'>취소</div>
          </div>
        </div>
      </div>
    </div>
  )
}
