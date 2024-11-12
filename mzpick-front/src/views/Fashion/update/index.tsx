import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate, useParams } from 'react-router-dom';
import { fileUploadRequest } from 'src/apis';
import { ResponseDto } from 'src/apis/dto/response';
import { getFashionDetailRequest, pathcFashionRequest, postFashionRequest } from 'src/apis/fashion';
import { PostFashionRequestDto } from 'src/apis/fashion/dto/request';
import { ACCESS_TOKEN, FASHION_DETAIL_PATH, FASHION_PATH } from 'src/constants';
import './style.css';
import { FashionDetail } from 'src/types';
import { GetFashionDetailResponseDto } from 'src/apis/fashion/dto/response';
import { GetTravelDetailResponseDto } from 'src/apis/travel/dto/response';
import { convertUrlsToFiles } from 'src/utils';

// component: 글쓰기 페이지 컴포넌트 //
export default function FashionUpdate() {

  // state: cookie 상태 //
  const [cookies] = useCookies();
  
  const { fashionNumber } = useParams<{ fashionNumber: string }>();

  // state: 게시글 인풋 상태 //
  const [fashionTitle, setFashionTitle] = useState<string>('');
  const [fashionHashtagContent, setFashionHashtagContent] = useState<string>('');
  const [fashionHashtagContentList, setFashionHashtagContentList] = useState<string[]>([]);
  const [fashionTotalPrice, setFashionTotalPrice] = useState<number>();
  const [fashionContent, setFashionContent] = useState<string>('');
  const [fashionPhotoList, setFashionPhotoList] = useState<File[]>([]);

  // state: 게시글 디테일 상태 //
  const [fashionDetail, setFashionDetail] = useState<FashionDetail>();

  // state: 사진 입력 참조 //
  const photoInputRef = useRef<HTMLInputElement | null>(null);

  // state: 사진 미리보기 URL 상태 //
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  // variable: 등록 가능 여부 //
  const isWriteComplete = fashionTitle && fashionHashtagContentList.length > 0 && fashionTotalPrice && fashionContent && fashionPhotoList.length !== 0;

  // function: get fashion detail response 처리 함수 //
  const getFashionDetailResponse = (responseBody: GetTravelDetailResponseDto | ResponseDto | null) => {
    const message = 
    !responseBody ? '서버에 문제가 있습니다.' :
    responseBody.code === 'VF' ? '잘못된 접근입니다.' :
    responseBody.code === 'AF' ? '잘못된 접근입니다.' :
    responseBody.code === 'DBE' ? '서버에 문제가 있습니다.' : '';


    const isSuccessed = responseBody !== null && responseBody.code === 'SU';
    if (!isSuccessed) {
      alert(message);
      navigator(`${FASHION_DETAIL_PATH}/${fashionNumber}`);
      return;
    }

    const { fashionDetail } = responseBody as GetFashionDetailResponseDto;
    setFashionDetail(fashionDetail);
    setFashionTitle(fashionDetail.fashionTitle);
    setFashionTotalPrice(fashionDetail.totalPrice);
    setPreviewUrls(fashionDetail.fashionPhotoList);
    setFashionHashtagContentList(fashionDetail.fashionHashtagList);
    setFashionContent(fashionDetail.fashionContent);

    convertUrlsToFiles(fashionDetail.fashionPhotoList).then(files => setFashionPhotoList(files));
  }


  // function: 네비게이터 함수 //
  const navigator = useNavigate();

  // function: patch fashion response 처리 함수 //
  const patchFashionResponse = (responseBody: ResponseDto | null) => {
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

    if (!fashionNumber) return;
    alert("등록이 완료되었습니다.");
    navigator(`${FASHION_DETAIL_PATH}/${fashionNumber}`);
  };

  // event handler: 제목 변경 이벤트 처리 //
  const fashionTitleChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setFashionTitle(value);
  };

  // event handler: 해시태그 변경 이벤트 처리 //
  const fashionHashtagContentChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const maxLength = 6;
    const { value } = event.target;
    const filteredValue = value.replace(/[^a-zA-Z0-9ㄱ-ㅎ가-힣\s]/g, '');
    
    if (value.length <= maxLength) {
      setFashionHashtagContent(filteredValue);
    } else {
      alert("최대 글자수는 10자입니다.");
    };
  };

  // event handler: 해시태그 추가 이벤트 처리 //
  const fashionHashtagContentAddHandler = (event: KeyboardEvent<HTMLInputElement> | any) => {
    if (event.isComposing || event.keyCode === 229) return;
    if (event.key === 'Enter' && fashionHashtagContent.trim() !== '' && fashionHashtagContentList.length < 3) {
      setFashionHashtagContentList([...fashionHashtagContentList, fashionHashtagContent.trim()]);
      setFashionHashtagContent('');
    }
    if (event.key === 'Backspace' && fashionHashtagContent === '' && fashionHashtagContentList.length > 0)
      setFashionHashtagContentList(fashionHashtagContentList.slice(0, -1));
  };

    // event handler: 커서 이동시 해시태그 추가 이벤트 처리 //
    const fashionHashtagContentBlurHandler = () => {
      if (fashionHashtagContentList.length >= 3) return;
      if (fashionHashtagContent == '') return;
      setFashionHashtagContentList([...fashionHashtagContentList, fashionHashtagContent.trim()])
      setFashionHashtagContent('');
    };

  // event handler: 해시태그 제거 이벤트 처리 //
  const fashionHashtagContentDeleteHandler = (index: number) => {
    setFashionHashtagContentList(fashionHashtagContentList.filter((_, i) => i !== index));
  };

  // event handler: 가격 변경 이벤트 처리 //
  const fashionTotalPriceChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const numericValue = value === '' ? 0 : Number(value);
    setFashionTotalPrice(numericValue);
  };

  // event handler: 내용 변경 이벤트 처리 //
  const fashionContentChangeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = event.target;
    setFashionContent(value);
  };

  // event handler: 첨부파일 버튼 클릭 이벤트 처리 //
  const attachedFileButtonClickHandler = () => {
    const { current } = photoInputRef;
    if (!current) return;
    current.click();
  };

  // event handler: 사진 변경 이벤트 처리 함수 //
  const photoInputChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    if (fashionPhotoList.length >= 3) {
      alert("최대 3장까지만 업로드할 수 있습니다.");
      if (window.confirm("초기화 하시고 다시 첨부 하시겠습니까?")) {
        setFashionPhotoList([]);
        setPreviewUrls([]);
        alert("다시 첨부 해주시기 바랍니다.");
      } else {
        alert("취소 되었습니다.");
      }
      return;
    };
    const { files } = event.target;
    if (!files || files.length === 0) return;
    const file = files[0];
    const newFiles = [...fashionPhotoList, file];
    const newPreviewUrls = newFiles.map(file => URL.createObjectURL(file));
    console.log(newPreviewUrls, newFiles)
    setFashionPhotoList(newFiles);
    setPreviewUrls(newPreviewUrls);
  };

  // event handler: 사진 제거 이벤트 처리 //
  const fashionPhotoListDeleteHandler = (index: number) => {
    setPreviewUrls(previewUrls.filter((_, i) => i !== index));
    setFashionPhotoList(fashionPhotoList.filter((_, i) => i !== index));
  };

  // event handler: 등록 버튼 클릭 이벤트 처리 함수 //
  const patchButtonClickHandler = async (path: string) => {
    const accessToken = cookies[ACCESS_TOKEN];
    if (!accessToken) return;
    if (!fashionTitle || fashionHashtagContentList.length === 0 || !fashionTotalPrice || !fashionContent || !fashionPhotoList.length) {
      alert('모두 입력해주세요.');
      return;
    };

    if (!window.confirm("등록하시겠습니까?")) {
      alert("취소되었습니다.");
      return;
    };

    const fashionPhotoListUrl: string[] = [];
    for (const file of fashionPhotoList) {
      const formData = new FormData();
      formData.append('file', file);
      const url = await fileUploadRequest(formData);
      if (url) fashionPhotoListUrl.push(url);
    };

    const requestBody: PostFashionRequestDto = {
      fashionPhoto: fashionPhotoListUrl,
      fashionTitle,
      fashionHashtagContent: fashionHashtagContentList,
      fashionTotalPrice: Number(fashionTotalPrice),
      fashionContent
    }
    if(!fashionNumber) return;
    pathcFashionRequest(requestBody,fashionNumber, accessToken).then(patchFashionResponse);
  };

  // event handler: 취소 버튼 클릭 이벤트 처리 함수 //
  const cancelButtonClickHandler = (path: string) => {
    if (window.confirm("글쓰기를 취소하시겠습니까?"))
      navigator(path);
  };


  useEffect(() => {
    if(!fashionNumber) return;
    getFashionDetailRequest(fashionNumber).then(getFashionDetailResponse);
  }, [fashionNumber]);

  // render: 글쓰기 페이지 컴포넌트 렌더링//
  return (
    <div id='main-write'>
      <div className='write-box'>
        <input className='write-box-title' value={fashionTitle} placeholder='제목을 입력하세요.' onChange={fashionTitleChangeHandler} />
        <div className='write-box-middle'>
          <div className='middle-hashtag-box'>
            {fashionHashtagContentList.map((tag, index) => (
              <div className='middle-hashtag' key={index} onClick={() => fashionHashtagContentDeleteHandler(index)}>
                {fashionHashtagContentList[index]}
              </div>
            ))}
            <input className='middle-hashtag-write' type='text' value={fashionHashtagContent} placeholder='태그 (최대 3개)' onChange={fashionHashtagContentChangeHandler} onKeyDown={fashionHashtagContentAddHandler}  onBlur={fashionHashtagContentBlurHandler}/>
          </div>
          <input className='middle-location' type='number' value={fashionTotalPrice} placeholder='총 가격' onChange={fashionTotalPriceChangeHandler} />
          <div className='middle-attached-file' onClick={attachedFileButtonClickHandler}>
            <input ref={photoInputRef} style={{ display: 'none' }} type='file' accept='image/*' onChange={photoInputChangeHandler} />
          </div>
        </div>
        <div className='write-box-contents-box'>
          <textarea className='contents-box-text' value={fashionContent} placeholder='내용을 입력하세요. (* 사진은 최대 3장 첨부할 수 있습니다.)' onChange={fashionContentChangeHandler} />
          <div className='contents-box-preview-photo-box'>
            {previewUrls.map((url, index) => (
              <img className='contents-box-preview-photo' key={index} src={url} alt={`preview ${index}`} onClick={() => fashionPhotoListDeleteHandler(index)}/>
            ))}
          </div>
        </div>
        <div className='write-box-bottom'>
          <div className='bottom-button-box'>
            <div className={`bottom-button-box-register ${isWriteComplete ? 'active' : ''}`} onClick={() => patchButtonClickHandler(FASHION_PATH)}>등록</div>
            <div className='bottom-button-box-cancel' onClick={() => cancelButtonClickHandler(FASHION_PATH)}>취소</div>
          </div>
        </div>
      </div>
    </div>
  )
}

