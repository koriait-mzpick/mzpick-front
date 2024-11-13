import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate, useParams } from 'react-router-dom';
import { fileUploadRequest } from 'src/apis';
import { ResponseDto } from 'src/apis/dto/response';
import { getStayDetailRequest, pathcStayRequest } from 'src/apis/stay';
import { PatchTravelStayRequestDto } from 'src/apis/stay/dto/request';
import { GetStayDetailResponseDto } from 'src/apis/stay/dto/response';
import { ACCESS_TOKEN, TRAVEL_STAY_DETAIL_PATH } from 'src/constants';
import { StayDetail } from 'src/types';
import { convertUrlsToFiles } from 'src/utils';
import './style.css';

// component: 글쓰기 페이지 컴포넌트 //
export default function TravelStayUpdate() {

  // state: 게시글번호 상태 //
  const { travelStayNumber } = useParams<{ travelStayNumber: string }>();

  // state: cookie 상태 //
  const [cookies] = useCookies();

  // state: 게시글 인풋 상태 //
  const [travelStayTitle, setTravelStayTitle] = useState<string>('');
  const [travelStayHashtagContent, setTravelStayHashtagContent] = useState<string>('');
  const [travelStayHashtagContentList, setTravelStayHashtagContentList] = useState<string[]>([]);
  const [travelLocation, setTravelLocation] = useState<string>('');
  const [travelStayContent, setTravelStayContent] = useState<string>('');
  const [travelStayPhotoList, setTravelStayPhotoList] = useState<File[]>([]);
  const [travelStayCategoryList, setTravelStayCategoryList] = useState<string[]>([]);

  // state: 게시글 디테일 상태 //
  const [travelStayDetail, setTravelStayDetail] = useState<StayDetail>();

  // state: 사진 입력 참조 //
  const photoInputRef = useRef<HTMLInputElement | null>(null);

  // state: 사진 미리보기 URL 상태 //
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  // variable: 등록 가능 여부 //
  const isWriteComplete = travelStayTitle && travelStayHashtagContentList.length > 0 && travelLocation && travelStayContent && travelStayPhotoList.length !== 0;

  // function: 네비게이터 함수 //
  const navigator = useNavigate();

  // function: get travelStay detail response 처리 함수 //
  const getTravelStayDetailtResponse = (responseBody: GetStayDetailResponseDto | ResponseDto | null) => {
    const message =
      !responseBody ? '서버에 문제가 있습니다.' :
        responseBody.code === 'VF' ? '잘못된 접근입니다.' :
          responseBody.code === 'AF' ? '잘못된 접근입니다.' :
            responseBody.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

    const isSuccessed = responseBody !== null && responseBody.code === 'SU';
    if (!isSuccessed) {
      alert(message);
      navigator(`${TRAVEL_STAY_DETAIL_PATH}/${travelStayNumber}`);
      return;
    }

    const { travelStayDetail } = responseBody as GetStayDetailResponseDto;
    setTravelStayDetail(travelStayDetail);
    setTravelStayTitle(travelStayDetail.travelStayTitle);
    setTravelLocation(travelStayDetail.travelLocathion);
    setPreviewUrls(travelStayDetail.travelStayPhotoList);
    setTravelStayHashtagContentList(travelStayDetail.travelStayHashtagList);
    setTravelStayContent(travelStayDetail.travelStayContent);

    convertUrlsToFiles(travelStayDetail.travelStayPhotoList).then(files => setTravelStayPhotoList(files));
  };

  // function: patch travelStay detail response 처리 함수 //
  const patchTravelStayDetailResponse = (responseBody: ResponseDto | null) => {
    const message =
      !responseBody ? '서버에 문제가 있습니다.' :
        responseBody.code === 'VF' ? '모두 입력해주세요' :
          responseBody.code === 'AF' ? '잘못된 접근입니다.' :
            responseBody.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

    const isSuccessed = responseBody !== null && responseBody.code === 'SU';
    if (!isSuccessed) {
      alert(message);
      navigator(`${TRAVEL_STAY_DETAIL_PATH}/${travelStayNumber}`);
      return;
    }

    if (!travelStayNumber) return;
    alert("수정이 완료되었습니다.");
    navigator(`${TRAVEL_STAY_DETAIL_PATH}/${travelStayNumber}`);
  }

  // event handler: 제목 변경 이벤트 처리 //
  const travelStayTitleChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setTravelStayTitle(value);
  };

  // event handler: 해시태그 변경 이벤트 처리 //
  const travelStayHashtagContentChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const maxLength = 6;
    const { value } = event.target;
    const filteredValue = value.replace(/[^a-zA-Z0-9ㄱ-ㅎ가-힣\s]/g, '');

    if (value.length <= maxLength) {
      setTravelStayHashtagContent(filteredValue);
    } else {
      alert("최대 글자수는 6자입니다.");
    };
  };

  // event handler: 해시태그 추가 이벤트 처리 //
  const travelStayHashtagContentAddHandler = (event: KeyboardEvent<HTMLInputElement> | any) => {
    if (event.isComposing || event.keyCode === 229) return;
    if (event.key === 'Enter' && travelStayHashtagContent.trim() !== '' && travelStayHashtagContentList.length < 3) {
      setTravelStayHashtagContentList([...travelStayHashtagContentList, travelStayHashtagContent.trim()]);
      setTravelStayHashtagContent('');
    }
    if (event.key === 'Backspace' && travelStayHashtagContent === '' && travelStayHashtagContentList.length > 0)
      setTravelStayHashtagContentList(travelStayHashtagContentList.slice(0, -1));
  };

  // event handler: 커서 이동시 해시태그 추가 이벤트 처리 //
  const travelStayHashtagContentBlurHandler = () => {
    if (travelStayHashtagContentList.length >= 3) return;
    if (travelStayHashtagContent == '') return;
    setTravelStayHashtagContentList([...travelStayHashtagContentList, travelStayHashtagContent.trim()])
    setTravelStayHashtagContent('');
  };

  // event handler: 해시태그 제거 이벤트 처리 //
  const travelStayHashtagContentDeleteHandler = (index: number) => {
    setTravelStayHashtagContentList(travelStayHashtagContentList.filter((_, i) => i !== index));
  };

  // event handler: 지역 변경 이벤트 처리 //
  const travelStayLocationhangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setTravelLocation(value);
  };

  // event handler: 내용 변경 이벤트 처리 //
  const travelStayContentChangeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = event.target;
    setTravelStayContent(value);
  };

  // event handler: 첨부파일 버튼 클릭 이벤트 처리 //
  const attachedFileButtonClickHandler = () => {
    const { current } = photoInputRef;
    if (!current) return;
    current.click();
  };

  // event handler: 사진 변경 이벤트 처리 함수 //
  const photoInputChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    if (travelStayPhotoList.length >= 3) {
      alert("최대 3장까지만 업로드할 수 있습니다.");
      if (window.confirm("초기화 하시고 다시 첨부 하시겠습니까?")) {
        setTravelStayPhotoList([]);
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
    const newFiles = [...travelStayPhotoList, file];
    const newPreviewUrls = newFiles.map(file => URL.createObjectURL(file));
    console.log(newPreviewUrls, newFiles)
    setTravelStayPhotoList(newFiles);
    setPreviewUrls(newPreviewUrls);
  };

  // event handler: 사진 제거 이벤트 처리 //
  const travelStayPhotoListDeleteHandler = (index: number) => {
    setPreviewUrls(previewUrls.filter((_, i) => i !== index));
    setTravelStayPhotoList(travelStayPhotoList.filter((_, i) => i !== index));
  };

  // event handler: 수정 버튼 클릭 이벤트 처리 함수 //
  const updateButtonClickHandler = async (path: string) => {
    const accessToken = cookies[ACCESS_TOKEN];
    if (!accessToken) return;
    if (!travelStayNumber) return;
    if (!travelStayTitle || travelStayHashtagContentList.length === 0 || !travelLocation || !travelStayContent || !travelStayPhotoList.length ) {
      alert('모두 입력해주세요.');
      return;
    }

    if (!window.confirm("수정하시겠습니까?")) {
      alert("취소되었습니다.");
      return;
    };

    const travelStayPhotoListUrl: string[] = [];
    for (const file of travelStayPhotoList) {
      const formData = new FormData();
      formData.append('file', file);
      const url = await fileUploadRequest(formData);
      if (url) travelStayPhotoListUrl.push(url);
    }

    const requestBody: PatchTravelStayRequestDto = {
      travelStayPhotoList: travelStayPhotoListUrl,
      travelStayTitle,
      travelStayHashtagContentList,
      travelLocation,
      travelStayContent,
      travelStayCategoryList
    }
    pathcStayRequest(requestBody, travelStayNumber, accessToken).then(patchTravelStayDetailResponse);
  }

  // event handler: 취소 버튼 클릭 이벤트 처리 함수 //
  const cancelButtonClickHandler = (path: string) => {
    if (window.confirm("글쓰기를 취소하시겠습니까?"))
      navigator(path);
  }

  // effect: 첫 로드시 게시글 정보 불러오기 함수 //
  useEffect(() => {
    if (!travelStayNumber) {
      navigator(`${TRAVEL_STAY_DETAIL_PATH}/${travelStayNumber}`);
      return;
    }

    const accessToken = cookies[ACCESS_TOKEN];
    if (!accessToken) return;

    getStayDetailRequest(travelStayNumber).then(getTravelStayDetailtResponse);
  }, [travelStayNumber]);

  // render: 글쓰기 페이지 컴포넌트 렌더링//
  return (
    <div id='main-write'>
      <div className='write-box'>
        <input className='write-box-title' value={travelStayTitle} placeholder='제목을 입력하세요.' onChange={travelStayTitleChangeHandler} />
        <div className='write-box-middle'>
          <div className='middle-hashtag-box'>
            {travelStayHashtagContentList.map((tag, index) => (
              <div className='middle-hashtag' key={index} onClick={() => travelStayHashtagContentDeleteHandler(index)}>
                {'#' + tag}
              </div>
            ))}
            <input className='middle-hashtag-write' type='text' value={travelStayHashtagContent} placeholder='태그 (최대 3개)' onChange={travelStayHashtagContentChangeHandler} onKeyDown={travelStayHashtagContentAddHandler} onBlur={travelStayHashtagContentBlurHandler} />
          </div>
          <input className='middle-location' value={travelLocation} placeholder='지역을 입력하세요.' onChange={travelStayLocationhangeHandler} />
          <div className='middle-attached-file' onClick={attachedFileButtonClickHandler}>
            <input ref={photoInputRef} style={{ display: 'none' }} type='file' accept='image/*' onChange={photoInputChangeHandler} />
          </div>
        </div>
        <div className='write-box-contents-box'>
          <textarea className='contents-box-text' value={travelStayContent} placeholder='내용을 입력하세요. (* 사진은 최대 3장 첨부할 수 있습니다.)' onChange={travelStayContentChangeHandler} />
          <div className='contents-box-preview-photo-box'>
            {previewUrls.map((url, index) => (
              <img className='contents-box-preview-photo' key={index} src={url} alt={`preview ${index}`} onClick={() => travelStayPhotoListDeleteHandler(index)} />
            ))}
          </div>
        </div>
        <div className='write-box-bottom'>
          <div className='bottom-button-box'>
            <div className={`bottom-button-box-register ${isWriteComplete ? 'active' : ''}`} onClick={() => updateButtonClickHandler(`${TRAVEL_STAY_DETAIL_PATH}/${travelStayNumber}`)}>수정</div>
            <div className='bottom-button-box-cancel' onClick={() => cancelButtonClickHandler(`${TRAVEL_STAY_DETAIL_PATH}/${travelStayNumber}`)}>취소</div>
          </div>
        </div>
      </div>
    </div>
  )
}