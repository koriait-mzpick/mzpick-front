import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate, useParams } from 'react-router-dom';
import { fileUploadRequest } from 'src/apis';
import { ResponseDto } from 'src/apis/dto/response';
import { getRestaurantDetailRequest, pathcRestaurantRequest } from 'src/apis/restaurant';
import { PatchTravelFoodRequestDto } from 'src/apis/restaurant/dto/request';
import { GetRestaurantDetailResponseDto } from 'src/apis/restaurant/dto/response';
import { ACCESS_TOKEN, TRAVEL_RESTAURANT_DETAIL_PATH } from 'src/constants';
import { RestaurantDetail } from 'src/types';
import { convertUrlsToFiles } from 'src/utils';
import './style.css';

// component: 글쓰기 페이지 컴포넌트 //
export default function TravelRestaurantUpdate() {

  // state: 게시글번호 상태 //
  const { travelRestaurantNumber } = useParams<{ travelRestaurantNumber: string }>();

  // state: cookie 상태 //
  const [cookies] = useCookies();

  // state: 게시글 인풋 상태 //
  const [travelFoodTitle, setTravelFoodTitle] = useState<string>('');
  const [travelFoodHashtagContent, setTravelFoodHashtagContent] = useState<string>('');
  const [travelFoodHashtagContentList, setTravelFoodHashtagContentList] = useState<string[]>([]);
  const [travelLocation, setTravelLocation] = useState<string>('');
  const [travelFoodContent, setTravelFoodContent] = useState<string>('');
  const [travelFoodPhotoList, setTravelFoodPhotoList] = useState<File[]>([]);

  // state: 게시글 디테일 상태 //
  const [travelFoodDetail, setTravelFoodDetail] = useState<RestaurantDetail>();

  // state: 사진 입력 참조 //
  const photoInputRef = useRef<HTMLInputElement | null>(null);

  // state: 사진 미리보기 URL 상태 //
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  // variable: 등록 가능 여부 //
  const isWriteComplete = travelFoodTitle && travelFoodHashtagContentList.length > 0 && travelLocation && travelFoodContent && travelFoodPhotoList.length !== 0;

  // function: 네비게이터 함수 //
  const navigator = useNavigate();

  // function: get travelFood detail response 처리 함수 //
  const getTravelFoodDetailtResponse = (responseBody: GetRestaurantDetailResponseDto | ResponseDto | null) => {
    const message =
      !responseBody ? '서버에 문제가 있습니다.' :
        responseBody.code === 'VF' ? '잘못된 접근입니다.' :
          responseBody.code === 'AF' ? '잘못된 접근입니다.' :
            responseBody.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

    const isSuccessed = responseBody !== null && responseBody.code === 'SU';
    if (!isSuccessed) {
      alert(message);
      navigator(`${TRAVEL_RESTAURANT_DETAIL_PATH}/${travelRestaurantNumber}`);
      return;
    }

    const { travelFoodDetail } = responseBody as GetRestaurantDetailResponseDto;
    setTravelFoodDetail(travelFoodDetail);
    setTravelFoodTitle(travelFoodDetail.travelFoodTitle);
    setTravelLocation(travelFoodDetail.travelLocation);
    setPreviewUrls(travelFoodDetail.travelFoodPhotoList);
    setTravelFoodHashtagContentList(travelFoodDetail.travelFoodHashtagList);
    setTravelFoodContent(travelFoodDetail.travelFoodContent);

    convertUrlsToFiles(travelFoodDetail.travelFoodPhotoList).then(files => setTravelFoodPhotoList(files));
  };

  // function: patch travelFood detail response 처리 함수 //
  const patchTravelFoodDetailResponse = (responseBody: ResponseDto | null) => {
    const message =
      !responseBody ? '서버에 문제가 있습니다.' :
        responseBody.code === 'VF' ? '모두 입력해주세요' :
          responseBody.code === 'AF' ? '잘못된 접근입니다.' :
            responseBody.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

    const isSuccessed = responseBody !== null && responseBody.code === 'SU';
    if (!isSuccessed) {
      alert(message);
      navigator(`${TRAVEL_RESTAURANT_DETAIL_PATH}/${travelRestaurantNumber}`);
      return;
    }

    if (!travelRestaurantNumber) return;
    alert("수정이 완료되었습니다.");
    navigator(`${TRAVEL_RESTAURANT_DETAIL_PATH}/${travelRestaurantNumber}`);
  }

  // event handler: 제목 변경 이벤트 처리 //
  const travelFoodTitleChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setTravelFoodTitle(value);
  };

  // event handler: 해시태그 변경 이벤트 처리 //
  const travelFoodHashtagContentChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const maxLength = 6;
    const { value } = event.target;
    const filteredValue = value.replace(/[^a-zA-Z0-9ㄱ-ㅎ가-힣\s]/g, '');

    if (value.length <= maxLength) {
      setTravelFoodHashtagContent(filteredValue);
    } else {
      alert("최대 글자수는 6자입니다.");
    };
  };

  // event handler: 해시태그 추가 이벤트 처리 //
  const travelFoodHashtagContentAddHandler = (event: KeyboardEvent<HTMLInputElement> | any) => {
    if (event.isComposing || event.keyCode === 229) return;
    if (event.key === 'Enter' && travelFoodHashtagContent.trim() !== '' && travelFoodHashtagContentList.length < 3) {
      setTravelFoodHashtagContentList([...travelFoodHashtagContentList, travelFoodHashtagContent.trim()]);
      setTravelFoodHashtagContent('');
    }
    if (event.key === 'Backspace' && travelFoodHashtagContent === '' && travelFoodHashtagContentList.length > 0)
      setTravelFoodHashtagContentList(travelFoodHashtagContentList.slice(0, -1));
  };

  // event handler: 커서 이동시 해시태그 추가 이벤트 처리 //
  const travelFoodHashtagContentBlurHandler = () => {
    if (travelFoodHashtagContentList.length >= 3) return;
    if (travelFoodHashtagContent == '') return;
    setTravelFoodHashtagContentList([...travelFoodHashtagContentList, travelFoodHashtagContent.trim()])
    setTravelFoodHashtagContent('');
  };

  // event handler: 해시태그 제거 이벤트 처리 //
  const travelFoodHashtagContentDeleteHandler = (index: number) => {
    setTravelFoodHashtagContentList(travelFoodHashtagContentList.filter((_, i) => i !== index));
  };

  // event handler: 지역 변경 이벤트 처리 //
  const travelFoodLocationhangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setTravelLocation(value);
  };

  // event handler: 내용 변경 이벤트 처리 //
  const travelFoodContentChangeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = event.target;
    setTravelFoodContent(value);
  };

  // event handler: 첨부파일 버튼 클릭 이벤트 처리 //
  const attachedFileButtonClickHandler = () => {
    const { current } = photoInputRef;
    if (!current) return;
    current.click();
  };

  // event handler: 사진 변경 이벤트 처리 함수 //
  const photoInputChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    if (travelFoodPhotoList.length >= 3) {
      alert("최대 3장까지만 업로드할 수 있습니다.");
      if (window.confirm("초기화 하시고 다시 첨부 하시겠습니까?")) {
        setTravelFoodPhotoList([]);
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
    const newFiles = [...travelFoodPhotoList, file];
    const newPreviewUrls = newFiles.map(file => URL.createObjectURL(file));
    setTravelFoodPhotoList(newFiles);
    setPreviewUrls(newPreviewUrls);
  };

  // event handler: 사진 제거 이벤트 처리 //
  const travelFoodPhotoListDeleteHandler = (index: number) => {
    setPreviewUrls(previewUrls.filter((_, i) => i !== index));
    setTravelFoodPhotoList(travelFoodPhotoList.filter((_, i) => i !== index));
  };

  // event handler: 수정 버튼 클릭 이벤트 처리 함수 //
  const updateButtonClickHandler = async (path: string) => {
    const accessToken = cookies[ACCESS_TOKEN];
    if (!accessToken) return;
    if (!travelRestaurantNumber) return;
    if (!travelFoodTitle || travelFoodHashtagContentList.length === 0 || !travelLocation || !travelFoodContent || !travelFoodPhotoList.length ) {
      alert('모두 입력해주세요.');
      return;
    }

    if (!window.confirm("수정하시겠습니까?")) {
      alert("취소되었습니다.");
      return;
    };

    const travelFoodPhotoListUrl: string[] = [];
    for (const file of travelFoodPhotoList) {
      const formData = new FormData();
      formData.append('file', file);
      const url = await fileUploadRequest(formData);
      if (url) travelFoodPhotoListUrl.push(url);
    }

    const requestBody: PatchTravelFoodRequestDto = {
      travelFoodPhotoList: travelFoodPhotoListUrl,
      travelFoodTitle,
      travelFoodHashtagContentList,
      travelLocation,
      travelFoodContent
    }
    pathcRestaurantRequest(requestBody, travelRestaurantNumber, accessToken).then(patchTravelFoodDetailResponse);
  }

  // event handler: 취소 버튼 클릭 이벤트 처리 함수 //
  const cancelButtonClickHandler = (path: string) => {
    if (window.confirm("글쓰기를 취소하시겠습니까?"))
      navigator(path);
  }

  // effect: 첫 로드시 게시글 정보 불러오기 함수 //
  useEffect(() => {
    if (!travelRestaurantNumber) {
      navigator(`${TRAVEL_RESTAURANT_DETAIL_PATH}/${travelRestaurantNumber}`);
      return;
    }

    const accessToken = cookies[ACCESS_TOKEN];
    if (!accessToken) return;

    getRestaurantDetailRequest(travelRestaurantNumber).then(getTravelFoodDetailtResponse);
  }, [travelRestaurantNumber]);

  // render: 글쓰기 페이지 컴포넌트 렌더링//
  return (
    <div id='main-write'>
      <div className='write-box'>
        <input className='write-box-title' value={travelFoodTitle} placeholder='제목을 입력하세요.' onChange={travelFoodTitleChangeHandler} />
        <div className='write-box-middle'>
          <div className='middle-hashtag-box'>
            {travelFoodHashtagContentList.map((tag, index) => (
              <div className='middle-hashtag' key={index} onClick={() => travelFoodHashtagContentDeleteHandler(index)}>
                #{tag}
              </div>
            ))}
            <input className='middle-hashtag-write' type='text' value={travelFoodHashtagContent} placeholder='태그 (최대 3개)' onChange={travelFoodHashtagContentChangeHandler} onKeyDown={travelFoodHashtagContentAddHandler} onBlur={travelFoodHashtagContentBlurHandler} />
          </div>
          <input className='middle-location' value={travelLocation} placeholder='지역을 입력하세요.' onChange={travelFoodLocationhangeHandler} />
          <div className='middle-attached-file' onClick={attachedFileButtonClickHandler}>
            <input ref={photoInputRef} style={{ display: 'none' }} type='file' accept='image/*' onChange={photoInputChangeHandler} />
          </div>
        </div>
        <div className='write-box-contents-box'>
          <textarea className='contents-box-text' value={travelFoodContent} placeholder='내용을 입력하세요. (* 사진은 최대 3장 첨부할 수 있습니다.)' onChange={travelFoodContentChangeHandler} />
          <div className='contents-box-preview-photo-box'>
            {previewUrls.map((url, index) => (
              <img className='contents-box-preview-photo' key={index} src={url} alt={`preview ${index}`} onClick={() => travelFoodPhotoListDeleteHandler(index)} />
            ))}
          </div>
        </div>
        <div className='write-box-bottom'>
          <div className='bottom-button-box'>
            <div className={`bottom-button-box-register ${isWriteComplete ? 'active' : ''}`} onClick={() => updateButtonClickHandler(`${TRAVEL_RESTAURANT_DETAIL_PATH}/${travelRestaurantNumber}`)}>수정</div>
            <div className='bottom-button-box-cancel' onClick={() => cancelButtonClickHandler(`${TRAVEL_RESTAURANT_DETAIL_PATH}/${travelRestaurantNumber}`)}>취소</div>
          </div>
        </div>
      </div>
    </div>
  )
}