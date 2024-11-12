import axios from 'axios';
import { ChangeEvent, KeyboardEvent, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { GetKeyWordResponseDto } from 'src/apis/keyword/dto/response';
import { useAuthStore } from 'src/stores';
import { API_URL } from '../../constants';
import type { Keyword } from '../../types';
import './style.css';

export default function Keyword() {

  const [cookies] = useCookies(['accessToken']);
  const [keywords, setKeywords] = useState<Keyword[]>([]);
  const [inputValue, setInputValue] = useState('');
  const { signInUser } = useAuthStore();

  // useEffect(() => {}, [cookies]);

  // function: 키워드 패치 함수 //
  const fetchAllKeywords = async () => {
    try {
      const token = cookies.accessToken;
  
      const response = await axios.get(`${API_URL}/keyword`, {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });
  
      const data = response.data;
  
  
      if (data && Array.isArray(data.getKeywordResultsets)) {
        const keywordList = data.getKeywordResultsets.map((item: GetKeyWordResponseDto, index: number) => ({
          keywordNumber: index + 1, 
          userId: useAuthStore, 
          keywordContent: item.keywordContent,
          keywordDate: new Date(), 

        }));
        
        console.log('Fetched keywords:', keywordList);
        setKeywords(keywordList);
      } else {
        console.error('키워드 데이터가 배열이 아닙니다:', data);
        setKeywords([]);
      }
    } catch (error) {
      console.error('키워드 가져오기 실패:', error);
      setKeywords([]);
    }
  };
  
    // function: 키워드 추가 함수//
    const postKeyword = async (keywordContent: string) => {
      
      if (keywords.some(keyword => keyword.keywordContent === keywordContent)) {
        alert('이전과 동일한 검색어입니다.');
        return;
      }
  
      try {
        const token = cookies.accessToken;
  
        if (!keywordContent.trim()) {
          alert("키워드 내용이 비어 있습니다.");
          return;
        }
  
        const newKeyword = {
          userId: useAuthStore,
          keywordContent: keywordContent.trim(),
          keywordDate: new Date(),
        };
  
        const response = await axios.post(`${API_URL}/keyword/write`, newKeyword, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, 
          },
        });
  
        if (response.status !== 200) {
          throw new Error('키워드 저장 실패');
        }
  
        fetchAllKeywords(); 
      } catch (error) {
        console.error('키워드 저장 실패:', error);
      }
    };

  const onKeywordChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  }

  // event handler: 키워드 추가 버튼 이벤트 핸들러 //
  const handleAddKeyword = () => {
    if (inputValue.trim()) {
      postKeyword(inputValue);
    } else {
      console.error("입력된 키워드가 유효하지 않습니다.");
    }
  };

  // event handler: 엔터키 눌렀을시 handleAddKeyword 요청 //
  const handleKeyDown = (event : KeyboardEvent<HTMLInputElement> | any) => {
    
    if(event.isComposing || event.keyCode === 229) return; 
    if (event.key === 'Enter') {
      handleAddKeyword();
      setInputValue('');
    }
  }

  useEffect(() => {
    fetchAllKeywords();
  }, []);

  return (
    <div id="main-wrapper">
      <div id="keyword-wrapper">
        <div className="keyword-title">
          <div className="keyword-title1">MZ</div>
          <div className="keyword-title2">픽</div>
          <div className="keyword-title3">&nbsp;키워드</div>
        </div>

        <div id="input-container">
          <input
            type="text"
            placeholder="키워드를 입력해 주세요"
            value={inputValue}
            onChange={onKeywordChangeHandler}
            onKeyDown={handleKeyDown}
          />
          <div className="add-button" onClick={handleAddKeyword}>
            
          </div>
        </div>
      </div>

      <div className="keyword-contents">
        
      <div className="contents1">
  {keywords.slice(0, 10).length > 0 ? (
    keywords.slice(0, 10).map((keyword) => (
      <a
        key={keyword.keywordNumber}
        href={`https://search.naver.com/search.naver?query=${encodeURIComponent(keyword.keywordContent)}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <div>{keyword.keywordContent}</div>
      </a>
    ))
  ) : (
    <div>키워드가 없습니다</div>
  )}
</div>
<div className="contents2">
  {keywords.length > 10 ? (
    keywords.slice(10, 20).map((keyword) => (
      <a
        key={keyword.keywordNumber}
        href={`https://search.naver.com/search.naver?query=${encodeURIComponent(keyword.keywordContent)}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <div>{keyword.keywordContent}</div>
      </a>
    ))
  ) : (
    <div>키워드가 없습니다</div>
  )}
        </div>
      </div>
    </div>
  );
}
