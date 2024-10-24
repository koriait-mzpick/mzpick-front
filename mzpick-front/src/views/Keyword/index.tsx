// 

import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import './style.css';

interface Keyword {
  keywordNumber: number;
  userId: string;
  keywordContent: string;
  keywordDate: Date;
}

export default function Keyword() {
  const [keywords, setKeywords] = useState<Keyword[]>([]);
  const [inputValue, setInputValue] = useState('');

  //state: 쿠키상태 //
  const cookies = useCookies();

  const fetchAllKeywords = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/v1/keywords'); 
      const data = await response.json();

      console.log('Fetched keywords:', data); 

      if (Array.isArray(data)) {
        setKeywords(data); 
      } else {
        console.error('키워드 데이터가 배열이 아닙니다:', data);
        setKeywords([]);
      }
    } catch (error) {
      console.error('키워드 가져오기 실패:', error);
      setKeywords([]); 
    }
  };

  const postKeyword = async (keywordContent: string) => {

    try {
      const newKeyword = {
        userId: 'user123',
        keywordContent: keywordContent,
        keywordDate: new Date(),
      };

      const response = await fetch('http://localhost:4000/api/v1/keywords', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newKeyword),
      });

      if (!response.ok) {
        throw new Error('키워드 저장 실패');
      }

      fetchAllKeywords();
    } catch (error) {
      console.error('키워드 저장 실패:', error);
    }
  };

  const handleAddKeyword = () => {
    if (inputValue.trim()) {
      postKeyword(inputValue); 
      setInputValue(''); 
    }
  };

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
            onChange={(e) => setInputValue(e.target.value)}
          />
          <div className="add-button" onClick={handleAddKeyword}></div>
        </div>
      </div>

      <div className="keyword-contents">
        <div className="contents1">
          {keywords.slice(0, 10).map((keyword) => (
            <div key={keyword.keywordNumber}>
              {keyword.keywordContent}
            </div>
          ))}
        </div>
        <div className="contents2">
          {keywords.slice(10, 20).map((keyword) => (
            <div key={keyword.keywordNumber}>
              {keyword.keywordContent} 
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
