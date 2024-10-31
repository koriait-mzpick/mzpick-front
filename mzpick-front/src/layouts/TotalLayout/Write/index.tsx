import React, { ChangeEvent, useRef, useState } from 'react'
import './style.css';
import { useCookies } from 'react-cookie';


// component: 글쓰기 페이지 컴포넌트 //
export default function Write() {

  // state: cookie 상태 //
  const [cookie] = useCookies();

  // state: 이미지 입력 참조 //
  const imageInputRef = useRef<HTMLInputElement | null>(null);

  // state: 이미지 미리보기 URL 상태 //
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  // state: 첨부파일 상태 //
  const [attachedFiles, setAttachedFiles] = useState<File[]>([]);

  // event handler: 첨부파일 버튼 클릭 이벤트 처리 //
  const attachedFileButtonClickHandler = () => {
    const { current } = imageInputRef;
    if (!current) return;
    current.click();
  };

  // event handler: 이미지 변경 이벤트 처리 함수 //
  const imageInputChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    if (!files || files.length === 0) return;
    const newFiles = Array.from(files);
    if (newFiles.length > 3) {
      alert("최대 3장까지만 업로드할 수 있습니다.");
      return;
    }
    setAttachedFiles(newFiles);
    const newPreviewUrls = newFiles.map(file => URL.createObjectURL(file));
    setPreviewUrls(newPreviewUrls);
  };

  // render: 글쓰기 페이지 컴포넌트 렌더링//
  return (
    <div id='main-write'>
      <div className='write-box'>
        <input className='write-box-title' placeholder='제목을 입력하세요.' />
        <div className='write-box-middle'>
          <input className='middle-tag' placeholder='태그를 입력하세요. (최대 3개)' />
          <div className='middle-attached-file' onClick={attachedFileButtonClickHandler}>
            <input ref={imageInputRef} style={{ display: 'none' }} type='file' accept='image/*' multiple onChange={imageInputChangeHandler} />
          </div>
        </div>
        <div className='write-box-contents-box'>
          <textarea className='contents-box-text' placeholder='내용을 입력하세요. (* 사진은 최대 3장 첨부할 수 있습니다.)' />
          <div className='contents-box-preview-image-box'>
            {previewUrls.map((url, index) => (
              <img className='contents-box-preview-image' key={index} src={url} alt={`preview ${index}`} />
            ))}
          </div>
        </div>
        <div className='write-box-bottom'>
          <div className='bottom-button-box'>
            <div className='bottom-button-box-register'>등록</div>
            <div className='bottom-button-box-cancel'>취소</div>
          </div>
        </div>
      </div>
    </div>
  )
}
