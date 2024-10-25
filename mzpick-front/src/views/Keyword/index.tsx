// import axios from 'axios';
// import { useEffect, useState } from 'react';
// import { useCookies } from 'react-cookie';
// import './style.css';

// interface Keyword {
//   keywordNumber: number;
//   userId: string;
//   keywordContent: string;
//   keywordDate: Date;
// }

// const API_URL = 'http://localhost:4000/api/v1/keyword';

// export default function Keyword() {
//   const [cookies] = useCookies(['accessToken']);
//   const [keywords, setKeywords] = useState<Keyword[]>([]);
//   const [inputValue, setInputValue] = useState('');

//   useEffect(() => {
//     console.log('쿠키에서 가져온 accessToken:', cookies.accessToken);
//   }, [cookies]);

//   const fetchAllKeywords = async () => {
//     try {
//       const token = cookies.accessToken; 

//       const response = await axios.get(API_URL, {
//         headers: {
//           Authorization: `Bearer ${token}`, 
//         },
//       });

//       if (Array.isArray(response.data)) {
//         setKeywords(response.data); 
//       } else if (response.data) {
//         console.log('키워드 데이터가 배열이 아닙니다:', response.data);
//         setKeywords([response.data]); 
//       } else {
//         console.error('키워드 데이터가 없습니다.');
//         setKeywords([]);
//       }
//     } catch (error) {
//       if (axios.isAxiosError(error)) {
//         if (error.response?.status === 401) {
//           console.error('Unauthorized: 인증 실패');
//         } else {
//           console.error('키워드 가져오기 실패:', error.response?.data);
//         }
//       } else {
//         console.error('키워드 가져오기 실패:', error);
//       }
//       setKeywords([]); 
//     }
//   };

//   const postKeyword = async (keywordContent: string) => {
//     try {
//       const token = cookies.accessToken; 
//       const newKeyword = {
//         userId: 'user1234', 
//         keywordContent: keywordContent,
//         keywordDate: new Date(),
//       };

//       const response = await axios.post(API_URL, newKeyword, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           'Content-Type': 'application/json',
//         },
//       });

//       if (response.status !== 200 && response.status !== 201) {
//         throw new Error('키워드 저장 실패');
//       }

//       fetchAllKeywords(); 
//     } catch (error) {
//       console.error('키워드 저장 실패:', error);
//     }
//   };

//   const handleAddKeyword = () => {
//     if (inputValue.trim()) {
//       postKeyword(inputValue); 
//       setInputValue(''); 
//     }
//   };

//   useEffect(() => {
//     fetchAllKeywords(); 
//   }, []);

//   return (
//     <div id="main-wrapper">
//       <div id="keyword-wrapper">
//         <div className="keyword-title">
//           <div className="keyword-title1">MZ</div>
//           <div className="keyword-title2">픽</div>
//           <div className="keyword-title3">&nbsp;키워드</div>
//         </div>

//         <div id="input-container">
//           <input
//             type="text"
//             placeholder="키워드를 입력해 주세요"
//             value={inputValue}
//             onChange={(e) => setInputValue(e.target.value)}
//           />
//           <div className="add-button" onClick={handleAddKeyword}>
//           </div>
//         </div>
//       </div>

//       <div className="keyword-contents">
//         <div className="contents1">
//           {keywords.slice(0, 10).map((keyword) => (
//             <div key={keyword.keywordNumber}>
//               {keyword.keywordContent}
//             </div>
//           ))}
//         </div>
//         <div className="contents2">
//           {keywords.slice(10, 20).map((keyword) => (
//             <div key={keyword.keywordNumber}>
//               {keyword.keywordContent}
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

import axios from 'axios';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import './style.css';

interface Keyword {
  keywordNumber: number;
  userId: string;
  keywordContent: string;
  keywordDate: Date;
}

const API_URL = 'http://localhost:4000/api/v1/keyword';

export default function Keyword() {
  const [cookies] = useCookies(['accessToken']);
  const [keywords, setKeywords] = useState<Keyword[]>([]);
  const [inputValue, setInputValue] = useState('');


  useEffect(() => {
    console.log('쿠키에서 가져온 accessToken:', cookies.accessToken);
  }, [cookies]);

  const fetchAllKeywords = async () => {
    try {
      const token = cookies.accessToken;

      const response = await axios.get(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });

      const data = response.data;

      if (Array.isArray(data)) {
        setKeywords(data);
      } else if (data) {
        console.log('키워드 데이터가 배열이 아닙니다:', data);
        setKeywords([data]);
      } else {
        console.error('키워드 데이터가 없습니다.');
        setKeywords([]);
      }
    } catch (error) {
      console.error('키워드 가져오기 실패:', error);
      setKeywords([]);
    }
  };

  
  const postKeyword = async (keywordContent: string) => {
    try {
      const token = cookies.accessToken;

      if (!keywordContent.trim()) {
        console.error("키워드 내용이 비어 있습니다.");
        return;
      }

      const newKeyword = {
        userId: 'user123',
        keywordContent: keywordContent.trim(),
        keywordDate: new Date(),
      };

      const response = await axios.post(`${API_URL}/write`, newKeyword, {
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


  const handleAddKeyword = () => {
    if (inputValue.trim()) {
      postKeyword(inputValue);
      setInputValue('');
    } else {
      console.error("입력된 키워드가 유효하지 않습니다.");
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
          <div className="add-button" onClick={handleAddKeyword}>
            
          </div>
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
