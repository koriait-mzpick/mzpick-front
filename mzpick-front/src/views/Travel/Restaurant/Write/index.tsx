import React, { ChangeEvent, useEffect, useRef, useState, Component, KeyboardEvent } from 'react'
import './style.css';
import { useCookies } from 'react-cookie';
import { ResponseDto } from 'src/apis/dto/response';
import { ACCESS_TOKEN, TRAVEL_CAFE_PATH, TRAVEL_PATH, TRAVEL_RESTAURANT_PATH } from 'src/constants';
import { fileUploadRequest } from 'src/apis';
import { useNavigate } from 'react-router-dom';
import path from 'path';
import { postCafeRequest } from 'src/apis/cafe';
import { PostTravelCafeRequestDto } from 'src/apis/cafe/dto/request';
import { postRestaurantRequest } from 'src/apis/restaurant';
import { PostTravelFoodRequestDto } from 'src/apis/restaurant/dto/request';

// component: 글쓰기 페이지 컴포넌트 //
export default function TravelRestaurantWrite() {

  // // state: cookie 상태 //
  // const [cookies] = useCookies();

  // // state: 게시글 인풋 상태 //
  // const [travelFoodTitle, setTravelRestaurantTitle] = useState<string>('');
  // const [travelFoodtHashtagContent, setTravelRestaurantHashtagContent] = useState<string>('');
  // const [travelFoodtHashtagContentList, setTravelRestaurantHashtagContentList] = useState<string[]>([]);
  // const [travelLocation, setTravelLocation] = useState<string>('');
  // const [travelFoodtContent, setTravelRestaurantContent] = useState<string>('');
  // const [travelFoodtPhotoList, setTravelRestaurantPhotoList] = useState<File[]>([]);
  // const [travelRestaurantCategoryList, setTravelRestaurantCategoryList] = useState<string[]>([]);

  // // state: 사진 입력 참조 //
  // const photoInputRef = useRef<HTMLInputElement | null>(null);

  // // state: 사진 미리보기 URL 상태 //
  // const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  // // variable: 등록 가능 여부 //
  // const isWriteComplete = travelRestaurantTitle && travelRestaurantHashtagContentList.length > 0 &&  travelLocation && travelRestaurantContent && travelRestaurantPhotoList.length !== 0;

  // // function: 네비게이터 함수 //
  // const navigator = useNavigate();

  // // function: post travelRestaurant response 처리 함수 //
  // const postTravelRestaurantResponse = (responseBody: ResponseDto | null) => {
  //   const message =
  //     !responseBody ? '서버에 문제가 있습니다.' :
  //       responseBody.code === 'VF' ? '모두 입력해주세요' :
  //         responseBody.code === 'AF' ? '잘못된 접근입니다.' :
  //           responseBody.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

  //   const isSuccessed = responseBody !== null && responseBody.code === 'SU';
  //   if (!isSuccessed) {
  //     alert(message);
  //     return;
  //   };
  // };

  // // event handler: 제목 변경 이벤트 처리 //
  // const travelRestaurantTitleChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
  //   const { value } = event.target;
  //   setTravelRestaurantTitle(value);
  // };

  // // event handler: 해시태그 변경 이벤트 처리 //
  // const travelRestaurantHashtagContentChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
  //   const maxLength = 10;
  //   const { value } = event.target;
  //   const filteredValue = value.replace(/[^a-zA-Z0-9ㄱ-ㅎ가-힣\s]/g, '');
    
  //   if (value.length <= maxLength) {
  //     setTravelRestaurantHashtagContent(filteredValue);
  //   } else {
  //     alert("최대 글자수는 10자입니다.");
  //   };
  // };

  // // event handler: 해시태그 추가 이벤트 처리 //
  // const travelRestaurantHashtagContentAddHandler = (event: KeyboardEvent<HTMLInputElement> | any) => {
  //   if (event.isComposing || event.keyCode === 229) return;
  //   if (event.key === 'Enter' && travelRestaurantHashtagContent.trim() !== '' && travelRestaurantHashtagContentList.length < 3) {
  //     setTravelRestaurantHashtagContentList([...travelRestaurantHashtagContentList, travelRestaurantHashtagContent.trim()]);
  //     setTravelRestaurantHashtagContent('');
  //   }
  //   if (event.key === 'Backspace' && travelRestaurantHashtagContent === '' && travelRestaurantHashtagContentList.length > 0)
  //     setTravelRestaurantHashtagContentList(travelRestaurantHashtagContentList.slice(0, -1));
  // };

  // // event handler: 커서 이동시 해시태그 추가 이벤트 처리 //
  // const travelRestaurantHashtagContentBlurHandler = () => {
  //   if (travelRestaurantHashtagContentList.length >= 3) return;
  //   if (travelRestaurantHashtagContent == '') return;
  //   setTravelRestaurantHashtagContentList([...travelRestaurantHashtagContentList, travelRestaurantHashtagContent.trim()])
  //   setTravelRestaurantHashtagContent('');
  // };

  // // event handler: 해시태그 제거 이벤트 처리 //
  // const travelRestaurantHashtagContentDeleteHandler = (index: number) => {
  //   setTravelRestaurantHashtagContentList(travelRestaurantHashtagContentList.filter((_, i) => i !== index));
  // };

  // // event handler: 지역 변경 이벤트 처리 //
  // const travelRestaurantLocationhangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
  //   const { value } = event.target;
  //   setTravelLocation(value);
  // };

  // // event handler: 내용 변경 이벤트 처리 //
  // const travelRestaurantContentChangeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
  //   const { value } = event.target;
  //   setTravelRestaurantContent(value);
  // };

  // // event handler: 첨부파일 버튼 클릭 이벤트 처리 //
  // const attachedFileButtonClickHandler = () => {
  //   const { current } = photoInputRef;
  //   if (!current) return;
  //   current.click();
  // };

  // // event handler: 사진 변경 이벤트 처리 함수 //
  // const photoInputChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
  //   if (travelRestaurantPhotoList.length >= 3) {
  //     alert("최대 3장까지만 업로드할 수 있습니다.");
  //     if (window.confirm("초기화 하시고 다시 첨부 하시겠습니까?")) {
  //       setTravelRestaurantPhotoList([]);
  //       setPreviewUrls([]);
  //       alert("다시 첨부 해주시기 바랍니다.");
  //     } else {
  //       alert("취소 되었습니다.");
  //     }
  //     return;
  //   };
  //   const { files } = event.target;
  //   if (!files || files.length === 0) return;
  //   const file = files[0];
  //   const newFiles = [...travelRestaurantPhotoList, file];
  //   const newPreviewUrls = newFiles.map(file => URL.createObjectURL(file));
  //   console.log(newPreviewUrls, newFiles)
  //   setTravelRestaurantPhotoList(newFiles);
  //   setPreviewUrls(newPreviewUrls);
  // };

  // // event handler: 사진 제거 이벤트 처리 //
  // const travelRestaurantPhotoListDeleteHandler = (index: number) => {
  //   setPreviewUrls(previewUrls.filter((_, i) => i !== index));
  //   setTravelRestaurantPhotoList([]);
  // };

  // // event handler: 등록 버튼 클릭 이벤트 처리 함수 //
  // const registerButtonClickHandler = async (path: string) => {
  //   const accessToken = cookies[ACCESS_TOKEN];
  //   if (!accessToken) return;
  //   if (!travelRestaurantTitle || travelRestaurantHashtagContentList.length === 0 || !travelLocation || !travelRestaurantContent || travelRestaurantPhotoList.length === 0) {
  //     alert('모두 입력해주세요.');
  //     return;
  //   };

  //   if (window.confirm("등록하시겠습니까?")) {
  //     alert("등록이 완료되었습니다.");
  //     navigator(path);
  //   } else {
  //     alert("취소되었습니다.");
  //     return;
  //   };

  //   const travelRestaurantPhotoListUrl: string[] = [];
  //   for (const file of travelRestaurantPhotoList) {
  //     const formData = new FormData();
  //     formData.append('file', file);
  //     const url = await fileUploadRequest(formData);
  //     if (url) travelRestaurantPhotoListUrl.push(url);
  //   };

  //   const requestBody: PostTravelFoodRequestDto = {
  //     travelFoodPhotoList: travelRestaurantPhotoListUrl,
  //     travelFoodTitle,
  //     travelFoodHashtagContentList,
  //     travelLocation,
  //     travelFoodPhotoList,
  //     travelFoodContent
  //   }
  //   postRestaurantRequest(requestBody, accessToken).then(postTravelRestaurantResponse);
  // };

  // // event handler: 취소 버튼 클릭 이벤트 처리 함수 //
  // const cancelButtonClickHandler = (path: string) => {
  //   if (window.confirm("글쓰기를 취소하시겠습니까?"))
  //     navigator(path);
  // };

  // render: 글쓰기 페이지 컴포넌트 렌더링//
  return (
    <div id='main-write'>
      {/* <div className='write-box'>
        <input className='write-box-title' value={travelRestaurantTitle} placeholder='제목을 입력하세요.' onChange={travelRestaurantTitleChangeHandler} />
        <div className='write-box-middle'>
          <div className='middle-hashtag-box'>
            {travelRestaurantHashtagContentList.map((tag, index) => (
              <div className='middle-hashtag' key={index} onClick={() => travelRestaurantHashtagContentDeleteHandler(index)}>
                #{tag}
              </div>
            ))}
            <input className='middle-hashtag-write' type='text' value={travelRestaurantHashtagContent} placeholder='태그 (최대 3개)' onChange={travelRestaurantHashtagContentChangeHandler} onKeyDown={travelRestaurantHashtagContentAddHandler} onBlur={travelRestaurantHashtagContentBlurHandler} />
          </div>
          <input className='middle-location' value={travelLocation} placeholder='지역을 입력하세요.' onChange={travelRestaurantLocationhangeHandler} />
          <div className='middle-attached-file' onClick={attachedFileButtonClickHandler}>
            <input ref={photoInputRef} style={{ display: 'none' }} type='file' accept='image/*' onChange={photoInputChangeHandler} />
          </div>
        </div>
        <div className='write-box-contents-box'>
          <textarea className='contents-box-text' value={travelRestaurantContent} placeholder='내용을 입력하세요. (* 사진은 최대 3장 첨부할 수 있습니다.)' onChange={travelRestaurantContentChangeHandler} />
          <div className='contents-box-preview-photo-box'>
            {previewUrls.map((url, index) => (
              <img className='contents-box-preview-photo' key={index} src={url} alt={`preview ${index}`} onClick={() => travelRestaurantPhotoListDeleteHandler(index)} />
            ))}
          </div>
        </div>
        <div className='write-box-bottom'>
          <div className='bottom-button-box'>
            <div className={`bottom-button-box-register ${isWriteComplete ? 'active' : ''}`} onClick={() => registerButtonClickHandler(TRAVEL_RESTAURANT_PATH)}>등록</div>
            <div className='bottom-button-box-cancel' onClick={() => cancelButtonClickHandler(TRAVEL_RESTAURANT_PATH)}>취소</div>
          </div>
        </div>
      </div> */}
    </div>
  )
}

