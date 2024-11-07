import React, { ChangeEvent, useEffect, useRef, useState, Component, KeyboardEvent } from 'react'
import './style.css';
import { useCookies } from 'react-cookie';
import { ResponseDto } from 'src/apis/dto/response';
import { ACCESS_TOKEN, TRAVEL_ABSOLUTE_DETAIL_PATH, TRAVEL_PATH, WRITE_PATH } from 'src/constants';
import { PatchTravelRequestDto, PostTravelRequestDto } from 'src/apis/travel/dto/request';
import { getTravelDetailRequest, getTravelListRequest, pathcTravelRequest, postcTravelRequest } from 'src/apis/travel';
import { fileUploadRequest } from 'src/apis';
import { useNavigate, useParams } from 'react-router-dom';
import path from 'path';
import { GetTravelDetailResponseDto, GetTravelListResponseDto } from 'src/apis/travel/dto/response';
import { TravelDetail } from 'src/types';

// component: 글쓰기 페이지 컴포넌트 //
export default function TravelUpdate() {

  // state: 게시글번호 상태 //
  const { travelNumber } = useParams();

  // state: cookie 상태 //
  const [cookies] = useCookies();

  // state: 게시글 인풋 상태 //
  const [travelDetail, setTravelDetail] = useState<TravelDetail>();
  const [travelTitle, setTravelTitle] = useState<string>('');
  const [travelHashtagContent, setTravelHashtagContent] = useState<string>('');
  const [travelHashtagContentList, setTravelHashtagContentList] = useState<string[]>([]);
  const [travelLocation, setTravelLocation] = useState<string>('');
  const [travelContent, setTravelContent] = useState<string>('');
  const [travelPhotoList, setTravelPhotoList] = useState<File[]>([]);

  // state: 사진 입력 참조 //
  const photoInputRef = useRef<HTMLInputElement | null>(null);

  // state: 사진 미리보기 URL 상태 //
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  // variable: 등록 가능 여부 //
  const isWriteComplete = travelTitle && travelHashtagContentList && travelLocation && travelContent && travelPhotoList.length !== 0;

  // function: 네비게이터 함수 //
  const navigator = useNavigate();

  // function: get travel detail response 처리 함수 //
  const getTravelDetailtResponse = (responseBody: GetTravelDetailResponseDto | ResponseDto | null) => {
    const message =
      !responseBody ? '서버에 문제가 있습니다.' :
        responseBody.code === 'VF' ? '잘못된 접근입니다.' :
          responseBody.code === 'AF' ? '잘못된 접근입니다.' :
            responseBody.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

    const isSuccessed = responseBody !== null && responseBody.code === 'SU';
    if (!isSuccessed) {
      alert(message);
      navigator(WRITE_PATH);
      return;
    }

    const { travelDetail } = responseBody as GetTravelDetailResponseDto;
    setTravelDetail(travelDetail);
    setTravelTitle(travelDetail.travelTitle);
    setTravelLocation(travelDetail.travelLocation);
    setTravelPhotoList(travelPhotoList);
    setTravelHashtagContentList(travelDetail.travelHashtagList);
    setTravelContent(travelDetail.travelContent);
  };

  // function: patch travel detail response 처리 함수 //
  const patchTravelDetailResponse = (responseBody: ResponseDto | null) => {
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

    if (!travelNumber) return;
    navigator(TRAVEL_ABSOLUTE_DETAIL_PATH(travelNumber));
  }

  // event handler: 제목 변경 이벤트 처리 //
  const travelTitleChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setTravelTitle(value);
  };

  // event handler: 해시태그 변경 이벤트 처리 //
  const travelHashtagContentChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const maxLength = 10;
    const { value } = event.target;
    if (value.length <= maxLength) {
      setTravelHashtagContent(value);
    } else {
      alert("최대 글자수는 10자입니다.");
    }
  }

  // event handler: 해시태그 추가 이벤트 처리 //
  const travelHashtagContentAddHandler = (event: KeyboardEvent<HTMLInputElement> | any) => {
    if (event.isComposing || event.keyCode === 229) return;
    if (event.key === 'Enter' && travelHashtagContent.trim() !== '' && travelHashtagContentList.length < 3) {
      setTravelHashtagContentList([...travelHashtagContentList, travelHashtagContent.trim()]);
      setTravelHashtagContent('');
    }
    if (event.key === 'Backspace' && travelHashtagContent === '' && travelHashtagContentList.length > 0)
      setTravelHashtagContentList(travelHashtagContentList.slice(0, -1));
    console.log(travelHashtagContentList)
  }

  // event handler: 해시태그 제거 이벤트 처리 //
  const travelHashtagContentDeleteHandler = (index: number) => {
    setTravelHashtagContentList(travelHashtagContentList.filter((_, i) => i !== index));
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
  };

  // event handler: 첨부파일 버튼 클릭 이벤트 처리 //
  const attachedFileButtonClickHandler = () => {
    const { current } = photoInputRef;
    if (!current) return;
    current.click();
  };

  // event handler: 사진 변경 이벤트 처리 함수 //
  const photoInputChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    if (travelPhotoList.length >= 3) {
      alert("최대 3장까지만 업로드할 수 있습니다.");
      if (window.confirm("초기화 하시고 다시 첨부 하시겠습니까?")) {
        setTravelPhotoList([]);
        setPreviewUrls([]);
        alert("다시 첨부 해주시기 바랍니다.");
      } else {
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

  // event handler: 사진 제거 이벤트 처리 //
  const travelPhotoListDeleteHandler = (index: number) => {
    setPreviewUrls(previewUrls.filter((_, i) => i !== index));
    setTravelPhotoList([]);
  };

  // event handler: 수정 버튼 클릭 이벤트 처리 함수 //
  const updeteButtonClickHandler = async (path: string) => {
    const accessToken = cookies[ACCESS_TOKEN];
    if (!accessToken) return;
    if (!travelNumber) return;
    if (!travelTitle || !travelHashtagContentList || !travelLocation || !travelContent || travelPhotoList.length === 0) {
      alert('모두 입력해주세요.');
      return;
    }

    if (window.confirm("수정하시겠습니까?")) {
      alert("수정이 완료되었습니다.");
      navigator(path);
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

    const requestBody: PatchTravelRequestDto = {
      travelPhotoList: travelPhotoListUrl,
      travelTitle,
      travelHashtagContentList,
      travelLocation,
      travelContent
    }
    pathcTravelRequest(requestBody, travelNumber, accessToken).then(patchTravelDetailResponse);
  }

  // event handler: 취소 버튼 클릭 이벤트 처리 함수 //
  const cancelButtonClickHandler = (path: string) => {
    if (window.confirm("글쓰기를 취소하시겠습니까?"))
      navigator(path);
  }

  // effect: 첫 로드시 게시글 정보 불러오기 함수 //
  useEffect(() => {
    if (!travelNumber) {
      navigator(TRAVEL_PATH);
      return;
    }
    const accessToken = cookies[ACCESS_TOKEN];
    if (!accessToken) return;

    getTravelDetailRequest(accessToken).then(getTravelDetailtResponse);
  }, [travelNumber]);

  // render: 글쓰기 페이지 컴포넌트 렌더링//
  return (
    <div id='main-write'>
      <div className='write-box'>
        <input className='write-box-title' value={travelTitle} placeholder='제목을 입력하세요.' onChange={travelTitleChangeHandler} />
        <div className='write-box-middle'>
          <div className='middle-hashtag-box'>
            {travelHashtagContentList.map((tag, index) => (
              <div className='middle-hashtag' key={index} onClick={() => travelHashtagContentDeleteHandler(index)}>
                {'#' + tag}
              </div>
            ))}
            <input className='middle-hashtag-write' type='text' value={travelHashtagContent} placeholder='태그 (최대 3개)' onChange={travelHashtagContentChangeHandler} onKeyDown={travelHashtagContentAddHandler} />
          </div>
          <input className='middle-location' value={travelLocation} placeholder='지역을 입력하세요.' onChange={travelLocationhangeHandler} />
          <div className='middle-attached-file' onClick={attachedFileButtonClickHandler}>
            <input ref={photoInputRef} style={{ display: 'none' }} type='file' accept='image/*' onChange={photoInputChangeHandler} />
          </div>
        </div>
        <div className='write-box-contents-box'>
          <textarea className='contents-box-text' value={travelContent} placeholder='내용을 입력하세요. (* 사진은 최대 3장 첨부할 수 있습니다.)' onChange={travelContentChangeHandler} />
          <div className='contents-box-preview-photo-box'>
            {previewUrls.map((url, index) => (
              <img className='contents-box-preview-photo' key={index} src={url} alt={`preview ${index}`} onClick={() => travelPhotoListDeleteHandler(index)} />
            ))}
          </div>
        </div>
        <div className='write-box-bottom'>
          <div className='bottom-button-box'>
            <div className={`bottom-button-box-register ${isWriteComplete ? 'active' : ''}`} onClick={() => updeteButtonClickHandler(TRAVEL_PATH)}>수정</div>
            <div className='bottom-button-box-cancel' onClick={() => cancelButtonClickHandler(TRAVEL_PATH)}>취소</div>
          </div>
        </div>
      </div>
    </div>
  )
}