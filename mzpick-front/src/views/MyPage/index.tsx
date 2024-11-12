import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router';
import { ResponseDto } from 'src/apis/dto/response';
import { getMyPageCafeBoardRequest, getMyPageCafeLikeListRequest, getMyPageCafeSaveListRequest, getMyPageTravelLikeListRequest, getMyPageUserDetailRequest } from 'src/apis/mypage';
import { GetMyPageCafeSaveResponseDto } from 'src/apis/mypage/dto/response/save';
import { GetMyPageUserDetailResponseDto } from 'src/apis/mypage/dto/response/user';
import { getCafeTotalCountRequest } from 'src/apis/pagination';
import { GetTotalCountResponseDto } from 'src/apis/pagination/response';
import Pagination1 from 'src/components/Pagination1';
import { ACCESS_TOKEN, TRAVEL_CAFE_DETAIL_PATH, TRAVEL_WRITE_PATH, WRITE_PATH } from 'src/constants';
import BottomNav from 'src/layouts/BottomNav';
import { MyPageCafeBoard, MyPageCafeLike, MyPageCafeSave } from 'src/types/mypage/cafe';
import myPageSaveCafes from 'src/types/mypage/cafe/cafe-save.interface';
import './style.css';
import { GetMyPageCafeLikeResponseDto } from 'src/apis/mypage/dto/response/like';
import myPageLikeCafes from 'src/types/mypage/cafe/cafe-like.interface';
import { GetMyPageCafeBoardResponseDto } from 'src/apis/mypage/dto/response/board';
import myPageBoardCafes from 'src/types/mypage/cafe/cafe-board.interface';


const SECTION_PER_PAGE = 5;

  // const [writecount, writesetCount] = useState<number>(0);
  // const [writepageList, writesetPageList] = useState<number[]>([]);
  // const [writetotalPage, writesetTotalPage] = useState<number>(0);
  // const [writetotalList, writesetTotalList] = useState<MyPageCafeSave[]>([]);
  // const [writecurrentPage, writesetCurrentPage] = useState<number>(1);
  // const [writetotalSection, writesetTotalSection] = useState<number>(0);
  // const [writecurrentSection, writesetCurrentSection] = useState<number>(1);

  // function: get total count response //
//   const getwriteTotalCountResponse = (dto: GetTotalCountResponseDto | ResponseDto | null) => {
//     const { count } = dto as GetTotalCountResponseDto;
//     const writetotalPage = Math.ceil(count / 8);
//     writesetTotalPage(writetotalPage);
//     const writetotalSection = Math.ceil(writetotalPage / SECTION_PER_PAGE);
//     writesetTotalSection(writetotalSection);
//   }

//   // state : 원본 리스트 상태 //
//   const [writeoriginalList, writesetOriginalList] = useState<MyPageCafeSave[]>([]);

//   const onwritePageClickHandler = (page: number) => {
//     writesetCurrentPage(page);
//   }
//   const onwritePreSectionClickHandler = () => {
//     if (writecurrentSection === 1) return;
//     writesetCurrentSection(writecurrentSection - 1);
//     writesetCurrentPage((writecurrentSection - 1) * SECTION_PER_PAGE);
//   }

//   const onwriteNextSectionClickHandler = () => {
//     if (writecurrentSection === writetotalSection) return;
//     writesetCurrentSection(writecurrentSection + 1);
//     writesetCurrentPage(writecurrentSection * SECTION_PER_PAGE + 1);
//   }

//   useEffect(() => {
//     getCafeTotalCountRequest().then(getwriteTotalCountResponse);
//   }, []);

//   useEffect(() => {
//     const pageList: number[] = [];
//     const startPage = (writecurrentSection - 1) * SECTION_PER_PAGE + 1;
//     const endPage = writecurrentSection * SECTION_PER_PAGE;
//     for (let page = startPage; page <= endPage; page++) {
//       pageList.push(page);
//       if (page === writetotalPage) break;
//     };

//     writesetPageList(pageList);
//   }, [writecurrentSection, writetotalPage]);

//   const [likecount, likesetCount] = useState<number>(0);
//   const [likepageList, likesetPageList] = useState<number[]>([]);
//   const [liketotalPage, likesetTotalPage] = useState<number>(0);
//   const [liketotalList, likesetTotalList] = useState<MyPageCafeSave[]>([]);
//   const [likecurrentPage, likesetCurrentPage] = useState<number>(1);
//   const [liketotalSection, likesetTotalSection] = useState<number>(0);
//   const [likecurrentSection, likesetCurrentSection] = useState<number>(1);

//   // function: get total count response //
//   const getlikeTotalCountResponse = (dto: GetTotalCountResponseDto | ResponseDto | null) => {
//     const { count } = dto as GetTotalCountResponseDto;
//     const liketotalPage = Math.ceil(count / 8);
//     likesetTotalPage(liketotalPage);
//     const liketotalSection = Math.ceil(liketotalPage / SECTION_PER_PAGE);
//     likesetTotalSection(liketotalSection);
//   }

//   // state : 원본 리스트 상태 //
//   const [likeoriginalList, likesetOriginalList] = useState<MyPageCafeSave[]>([]);

//   const onlikePageClickHandler = (page: number) => {
//     likesetCurrentPage(page);
//   }
//   const onlikePreSectionClickHandler = () => {
//     if (likecurrentSection === 1) return;
//     likesetCurrentSection(likecurrentSection - 1);
//     likesetCurrentPage((likecurrentSection - 1) * SECTION_PER_PAGE);
//   }

//   const onlikeNextSectionClickHandler = () => {
//     if (likecurrentSection === liketotalSection) return;
//     likesetCurrentSection(likecurrentSection + 1);
//     likesetCurrentPage(likecurrentSection * SECTION_PER_PAGE + 1);
//   }

//   useEffect(() => {
//     getCafeTotalCountRequest().then(getlikeTotalCountResponse);
//   }, []);

//   useEffect(() => {
//     const pageList: number[] = [];
//     const startPage = (likecurrentSection - 1) * SECTION_PER_PAGE + 1;
//     const endPage = likecurrentSection * SECTION_PER_PAGE;
//     for (let page = startPage; page <= endPage; page++) {
//       pageList.push(page);
//       if (page === liketotalPage) break;
//     };

//     likesetPageList(pageList);
//   }, [likecurrentSection, liketotalPage]);

//   const [votecount, votesetCount] = useState<number>(0);
//   const [votepageList, votesetPageList] = useState<number[]>([]);
//   const [votetotalPage, votesetTotalPage] = useState<number>(0);
//   const [votetotalList, votesetTotalList] = useState<MyPageCafeSave[]>([]);
//   const [votecurrentPage, votesetCurrentPage] = useState<number>(1);
//   const [votetotalSection, votesetTotalSection] = useState<number>(0);
//   const [votecurrentSection, votesetCurrentSection] = useState<number>(1);

//   // function: get total count response //
//   const getvoteTotalCountResponse = (dto: GetTotalCountResponseDto | ResponseDto | null) => {
//     const { count } = dto as GetTotalCountResponseDto;
//     const votetotalPage = Math.ceil(count / 8);
//     votesetTotalPage(votetotalPage);
//     const votetotalSection = Math.ceil(votetotalPage / SECTION_PER_PAGE);
//     votesetTotalSection(votetotalSection);
//   }

//   // state : 원본 리스트 상태 //
//   const [voteoriginalList, votesetOriginalList] = useState<MyPageCafeSave[]>([]);

//   const onvotePageClickHandler = (page: number) => {
//     votesetCurrentPage(page);
//   }
//   const onvotePreSectionClickHandler = () => {
//     if (votecurrentSection === 1) return;
//     votesetCurrentSection(votecurrentSection - 1);
//     votesetCurrentPage((votecurrentSection - 1) * SECTION_PER_PAGE);
//   }

//   const onvoteNextSectionClickHandler = () => {
//     if (votecurrentSection === votetotalSection) return;
//     votesetCurrentSection(votecurrentSection + 1);
//     votesetCurrentPage(votecurrentSection * SECTION_PER_PAGE + 1);
//   }

//   useEffect(() => {
//     getCafeTotalCountRequest().then(getvoteTotalCountResponse);
//   }, []);

//   useEffect(() => {
//     const pageList: number[] = [];
//     const startPage = (votecurrentSection - 1) * SECTION_PER_PAGE + 1;
//     const endPage = votecurrentSection * SECTION_PER_PAGE;
//     for (let page = startPage; page <= endPage; page++) {
//       pageList.push(page);
//       if (page === votetotalPage) break;
//     };

//     votesetPageList(pageList);
//   }, [votecurrentSection, votetotalPage]);


//   function onButtonClickEventHandler(WRITE_PATH: string): void {
//     throw new Error('Function not implemented.');
//   }

//   return (
//     <div className='layout'>



//       <div className='subscribe-box'>

//       </div>

//       <div className='like-box'>
//         <div className='textBox' style={{ borderBottom: "4px solid rgba(0 , 0, 0, 100)" }}>LIKE</div>
//         <div className='imageBox'>
//           <div className='WritePostBox'>
//             <div className='imgContainer'></div>
//             <div className='SubtitleBox'></div>
//           </div>
//           <div className='WritePostBox'>
//             <div className='imgContainer'></div>
//             <div className='SubtitleBox'></div>
//           </div>
//           <div className='WritePostBox'>
//             <div className='imgContainer'></div>
//             <div className='SubtitleBox'></div>
//           </div>

//         </div>
//         <Pagination1 currentPage={likecurrentPage} pageList={likepageList} onPageClickHandler={onlikePageClickHandler} onNextSectionClickHandler={onlikeNextSectionClickHandler} onPreSectionClickHandler={onlikePreSectionClickHandler} />

//       </div>

//       <div className='like-box2'>
//         <div className='totalTextBox'>
//           <div className='textBox' style={{ borderBottom: "4px solid rgba(0 , 0, 0, 100)" }}>WRITE</div>
//         </div>
//         <div className='write-totalBox' style={{ borderBottom: "2px solid rgba(210 , 210, 210, 100)" }}>
//           <div className='write-titleBox' style={{ borderBottom: "2px solid rgba(210 , 210, 210, 100)" }}>
//             <div className='title'>작성일</div>
//             <div className='title2'>제목</div>
//             <div className='title'>수정</div>
//             <div className='title'>삭제</div>
//           </div>

//           <div className='contentBox'>
//             <div className='directed-writeBox'>2024.10.11</div>
//             <div className='directed-writeBox2'>여행지 추천 해주세요!</div>
//             <div className='directed-writeBox3'>
//               {/* User가 저장한 PATH로 경로 이동되어지도록 수정 */}
//               <div className='icon-box' onClick={() => onButtonClickEventHandler(WRITE_PATH)}></div>
//             </div>
//             <div className='directed-writeBox4'>
//               <div className='icon-box2'></div>
//             </div>
//           </div>

//           <div className='contentBox'>
//             <div className='directed-writeBox'>2024.10.11</div>
//             <div className='directed-writeBox2'>여행지 추천 해주세요!</div>
//             <div className='directed-writeBox3'>
//               <div className='icon-box'></div>
//             </div>
//             <div className='directed-writeBox4'>
//               <div className='icon-box2'></div>
//             </div>
//           </div>

//           <div className='contentBox'>
//             <div className='directed-writeBox'>2024.10.11</div>
//             <div className='directed-writeBox2'>여행지 추천 해주세요!</div>
//             <div className='directed-writeBox3'>
//               <div className='icon-box'></div>
//             </div>
//             <div className='directed-writeBox4'>
//               <div className='icon-box2'></div>
//             </div>
//           </div>

//         </div>
//         <Pagination1 currentPage={writecurrentPage} pageList={writepageList} onPageClickHandler={onwritePageClickHandler} onNextSectionClickHandler={onwriteNextSectionClickHandler} onPreSectionClickHandler={onwritePreSectionClickHandler} />

//       </div>

//       <div className='like-box2'>
//         <div className='textBox' style={{ borderBottom: "4px solid rgba(0 , 0, 0, 100)" }}>VOTE</div>
//         <div className='write-totalBox' style={{ borderBottom: "2px solid rgba(210 , 210, 210, 100)" }}>
//           <div className='write-titleBox' style={{ borderBottom: "2px solid rgba(210 , 210, 210, 100)" }}>
//             <div className='title'>작성일</div>
//             <div className='title2'>제목</div>
//             <div className='title'>수정</div>
//             <div className='title'>삭제</div>
//           </div>

//           <div className='contentBox'>
//             <div className='directed-writeBox'>2024.10.11</div>
//             <div className='directed-writeBox2'>여행지 추천 해주세요!</div>
//             <div className='directed-writeBox3'>
//               <div className='icon-box'></div>
//             </div>
//             <div className='directed-writeBox4'>
//               <div className='icon-box2'></div>
//             </div>
//           </div>

//           <div className='contentBox'>
//             <div className='directed-writeBox'>2024.10.11</div>
//             <div className='directed-writeBox2'>여행지 추천 해주세요!</div>
//             <div className='directed-writeBox3'>
//               <div className='icon-box'></div>
//             </div>
//             <div className='directed-writeBox4'>
//               <div className='icon-box2'></div>
//             </div>
//           </div>

//           <div className='contentBox'>
//             <div className='directed-writeBox'>2024.10.11</div>
//             <div className='directed-writeBox2'>여행지 추천 해주세요!</div>
//             <div className='directed-writeBox3'>
//               <div className='icon-box'></div>
//             </div>
//             <div className='directed-writeBox4'>
//               <div className='icon-box2'></div>
//             </div>
//           </div>

//         </div>
//         <Pagination1 currentPage={votecurrentPage} pageList={votepageList} onPageClickHandler={onvotePageClickHandler} onNextSectionClickHandler={onvoteNextSectionClickHandler} onPreSectionClickHandler={onvotePreSectionClickHandler} />

//       </div>
//     </div>

//   );
// }

function Save() {
  const navigator = useNavigate();
  const [cookies] = useCookies();

  const accessToken = cookies[ACCESS_TOKEN];

  const [saveviewList, savesetViewList] = useState<myPageSaveCafes[]>([]);

  const [savecount, savesetCount] = useState<number>(0);
  const [savepageList, savesetPageList] = useState<number[]>([]);
  const [savetotalPage, savesetTotalPage] = useState<number>(0);
  const [savetotalList, savesetTotalList] = useState<myPageSaveCafes[]>([]);
  const [savecurrentPage, savesetCurrentPage] = useState<number>(1);
  const [savetotalSection, savesetTotalSection] = useState<number>(0);
  const [savecurrentSection, savesetCurrentSection] = useState<number>(1);
  const [selectedHashtag, setSelectedHashtag] = useState<string>('');

  // function: get total count response //
  const getsaveTotalCountResponse = (dto: GetTotalCountResponseDto | ResponseDto | null) => {
    const { count } = dto as GetTotalCountResponseDto;
    const savetotalPage = Math.ceil(count / 8);
    savesetTotalPage(savetotalPage);
    const savetotalSection = Math.ceil(savetotalPage / SECTION_PER_PAGE);
    savesetTotalSection(savetotalSection);
  }

  // function: getSave List 함수 //
  const getCafeSaveList = () => {
    getMyPageCafeSaveListRequest(accessToken).then(GetMyPageCafeSaveResponseDto);
  }

  // function: 날짜 포맷 변경 함수 //
  const changeDateFormat = (date: string) => {
    const yy = date.substring(2, 4);
    const mm = date.substring(5, 7);
    const dd = date.substring(8, 10);
    return `${yy}.${mm}.${dd}`;
  };

  // function: get Save Response 함수 //   
  const GetMyPageCafeSaveResponseDto = (responseBody: GetMyPageCafeSaveResponseDto | ResponseDto | null) => {
    const message =
      !responseBody ? '로그인 유저 정보를 불러오는데 문제가 발생했습니다.' :
        responseBody.code === 'NI' ? '로그인 유저 정보가 존재하지 않습니다.' :
          responseBody.code === 'AF' ? '잘못된 접근입니다.' :
            responseBody.code === 'DBE' ? '로그인 유저 정보를 불러오는데 문제가 발생했습니다.' : '';

    const isSuccessed = responseBody !== null && responseBody.code === 'SU';
    if (!isSuccessed) {
      alert(message);
      return;
    }

    // savesetviewList 상태 업데이트
    const { myPageSaveCafes } = responseBody as GetMyPageCafeSaveResponseDto;
    savesetViewList(myPageSaveCafes);
    console.log(myPageSaveCafes);
  };

  const onButtonClickEventHandler = (path: string) => {
    navigator(path);
    console.log();
    
  };

  // interface : Properties //
  interface TableSaveProps {
    save: MyPageCafeSave;
  }

  const onSavePageClickHandler = (page: number) => {
    savesetCurrentPage(page);
  }

  const onSavePreSectionClickHandler = () => {
    if (savecurrentSection === 1) return;
    savesetCurrentSection(savecurrentSection - 1);
    savesetCurrentPage((savecurrentSection - 1) * SECTION_PER_PAGE);
  }

  const onSaveNextSectionClickHandler = () => {
    if (savecurrentSection === savetotalSection) return;
    savesetCurrentSection(savecurrentSection + 1);
    savesetCurrentPage(savecurrentSection * SECTION_PER_PAGE + 1);
  }

  useEffect(() => {
    getCafeTotalCountRequest().then(getsaveTotalCountResponse);
  }, []);

  useEffect(() => {
    const pageList: number[] = [];
    const startPage = (savecurrentSection - 1) * SECTION_PER_PAGE + 1;
    const endPage = savecurrentSection * SECTION_PER_PAGE;
    for (let page = startPage; page <= endPage; page++) {
      pageList.push(page);
      if (page === savetotalPage) break;
    };
    getCafeSaveList();
    savesetPageList(pageList);

  }, [savecurrentSection, savetotalPage]);

  return (
    <div className='save-box'>
      <div className='textBox' style={{ borderBottom: "4px solid rgba(0 , 0, 0, 100)" }} >SAVE</div>
      <div className='imageBox'>
        {saveviewList.map((item) => (
          <div key={item.travelCafeNumber} className='WritePostBox'  onClick={() => onButtonClickEventHandler(`${TRAVEL_CAFE_DETAIL_PATH}/${item.travelCafeNumber}`)}>
            <div className='board-box'>
              <img src={item.travelCafePhoto} alt={`Travel ${item.travelCafeNumber}`} className='board-image' />
              <div className='board-information'>
                <div className='board-information-data'>{changeDateFormat(item.travelCafeDate)}</div>
              </div>
              <div className='board-tag'>
                {item.travelCafeHashtagList.map((hashtag, index) => (
                  <div key={index} className='board-tag-item'>#{hashtag}</div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function Like() {
  const navigator = useNavigate();
  const [cookies] = useCookies();

  const accessToken = cookies[ACCESS_TOKEN];

  const [likeviewList, likesetViewList] = useState<myPageLikeCafes[]>([]);

  const [likecount, likesetCount] = useState<number>(0);
  const [likepageList, likesetPageList] = useState<number[]>([]);
  const [liketotalPage, likesetTotalPage] = useState<number>(0);
  const [liketotalList, likesetTotalList] = useState<myPageLikeCafes[]>([]);
  const [likecurrentPage, likesetCurrentPage] = useState<number>(1);
  const [liketotalSection, likesetTotalSection] = useState<number>(0);
  const [likecurrentSection, likesetCurrentSection] = useState<number>(1);


  // function: get total count response //
  const getlikeTotalCountResponse = (dto: GetTotalCountResponseDto | ResponseDto | null) => {
    const { count } = dto as GetTotalCountResponseDto;
    const liketotalPage = Math.ceil(count / 8);
    likesetTotalPage(liketotalPage);
    const liketotalSection = Math.ceil(liketotalPage / SECTION_PER_PAGE);
    likesetTotalSection(liketotalSection);
  }

  // function: getLike List 함수 //
  const getCafeLikeList = () => {
    getMyPageCafeLikeListRequest(accessToken).then(GetMyPageCafeLikeResponseDto);
  }

  // function: 날짜 포맷 변경 함수 //
  const changeDateFormat = (date: string) => {
    const yy = date.substring(2, 4);
    const mm = date.substring(5, 7);
    const dd = date.substring(8, 10);
    return `${yy}.${mm}.${dd}`;
  };

  // function: get Save Response 함수 //
  const GetMyPageCafeLikeResponseDto = (responseBody: GetMyPageCafeLikeResponseDto | ResponseDto | null) => {
    const message =
      !responseBody ? '로그인 유저 정보를 불러오는데 문제가 발생했습니다.' :
        responseBody.code === 'NI' ? '로그인 유저 정보가 존재하지 않습니다.' :
          responseBody.code === 'AF' ? '잘못된 접근입니다.' :
            responseBody.code === 'DBE' ? '로그인 유저 정보를 불러오는데 문제가 발생했습니다.' : '';

    const isSuccessed = responseBody !== null && responseBody.code === 'SU';
    if (!isSuccessed) {
      alert(message);
      return;
    }

    // savesetviewList 상태 업데이트
    const { myPageLikeCafes } = responseBody as GetMyPageCafeLikeResponseDto;
    likesetViewList(myPageLikeCafes);
    console.log(myPageLikeCafes);
  };

  const onButtonClickEventHandler = (path: string) => {
    navigator(path);
  };

  // interface : Properties //
  interface TableSaveProps {
    save: MyPageCafeLike;
  }

  const onlikePageClickHandler = (page: number) => {
    likesetCurrentPage(page);
  }

  const onlikePreSectionClickHandler = () => {
    if (likecurrentSection === 1) return;
    likesetCurrentSection(likecurrentSection - 1);
    likesetCurrentPage((likecurrentSection - 1) * SECTION_PER_PAGE);
  }

  const onlikeNextSectionClickHandler = () => {
    if (likecount === liketotalSection) return;
    // likecurrentSection(likecurrentSection + 1);
    likesetCurrentPage(likecurrentSection * SECTION_PER_PAGE + 1);
  }

  useEffect(() => {
    getCafeTotalCountRequest().then(getlikeTotalCountResponse);
  }, []);

  useEffect(() => {
    const pageList: number[] = [];
    const startPage = (likecurrentSection - 1) * SECTION_PER_PAGE + 1;
    const endPage = likecurrentSection * SECTION_PER_PAGE;
    for (let page = startPage; page <= endPage; page++) {
      pageList.push(page);
      if (page === liketotalPage) break;
    };
    getCafeLikeList();
    likesetPageList(pageList);

  }, [likecurrentSection, liketotalPage]);

  return (
    <div className='like-box'>
      <div className='textBox' style={{ borderBottom: "4px solid rgba(0 , 0, 0, 100)" }} >LIKE</div>
      <div className='imageBox'>
        {likeviewList.map((item) => (
          <div key={item.mypageBoardNumber} className='WritePostBox'>
            <div className='board-box'>
              <img src={item.mypagePhotoList} alt={`Travel ${item.mypageBoardNumber}`} className='board-image' />
              <div className='board-information'>
                <div className='board-information-data'>{changeDateFormat(item.mypageBoardDate)}</div>
              </div>
              <div className='board-tag'>
                {item.mypageHashTagList.map((hashtag, index) => (
                  <div key={index} className='board-tag-item'>#{hashtag}</div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function Write() {
  const navigator = useNavigate();
  const [cookies] = useCookies();

  const accessToken = cookies[ACCESS_TOKEN];

  const [writeviewList, writesetviewList] = useState<myPageBoardCafes[]>([]);

  const [writecount, writesetCount] = useState<number>(0);
  const [writepageList, writesetPageList] = useState<number[]>([]);
  const [writetotalPage, writesetTotalPage] = useState<number>(0);
  const [writetotalList, writesetTotalList] = useState<myPageBoardCafes[]>([]);
  const [writecurrentPage, writesetCurrentPage] = useState<number>(1);
  const [writetotalSection, writesetTotalSection] = useState<number>(0);
  const [writecurrentSection, writesetCurrentSection] = useState<number>(1);



  // function: get total count response //
  const getwriteTotalCountResponse = (dto: GetTotalCountResponseDto | ResponseDto | null) => {
    const { count } = dto as GetTotalCountResponseDto;
    const writetotalPage = Math.ceil(count / 8);
    writesetTotalPage(writetotalPage);
    const writetotalSection = Math.ceil(writetotalPage / SECTION_PER_PAGE);
    writesetTotalSection(writetotalSection);
  }

  // function: getLike List 함수 //
  const getCafeWriteList = () => {
    getMyPageCafeBoardRequest(accessToken).then(GetMyPageCafeBoardResponseDto);
  }

  // function: 날짜 포맷 변경 함수 //
  const changeDateFormat = (date: string) => {
    const yy = date.substring(0, 4);
    const mm = date.substring(5, 7);
    const dd = date.substring(8, 10);
    return `${yy}.${mm}.${dd}`;
  };

  // function: get Save Response 함수 //
  const GetMyPageCafeBoardResponseDto = (responseBody: GetMyPageCafeBoardResponseDto | ResponseDto | null) => {
    const message =
      !responseBody ? '로그인 유저 정보를 불러오는데 문제가 발생했습니다.' :
        responseBody.code === 'NI' ? '로그인 유저 정보가 존재하지 않습니다.' :
          responseBody.code === 'AF' ? '잘못된 접근입니다.' :
            responseBody.code === 'DBE' ? '로그인 유저 정보를 불러오는데 문제가 발생했습니다.' : '';

    const isSuccessed = responseBody !== null && responseBody.code === 'SU';
    if (!isSuccessed) {
      alert(message);
      return;
    }

    // savesetviewList 상태 업데이트
    const { myPageBoardCafes } = responseBody as GetMyPageCafeBoardResponseDto;
    writesetviewList(myPageBoardCafes);
    console.log(myPageBoardCafes);
  };

  const onButtonClickEventHandler = (path: string) => {
    navigator(path);
  };

  // interface : Properties //
  interface TableSaveProps {
    save: MyPageCafeBoard;
  }

  const onlikePageClickHandler = (page: number) => {
    writesetCurrentPage(page);
  }

  const onlikePreSectionClickHandler = () => {
    if (writecurrentSection === 1) return;
    writesetCurrentSection(writecurrentSection - 1);
    writesetCurrentPage((writecurrentSection - 1) * SECTION_PER_PAGE);
  }

  const onlikeNextSectionClickHandler = () => {
    if (writecount === writetotalSection) return;
    // likecurrentSection(likecurrentSection + 1);
    writesetCurrentPage(writecurrentSection * SECTION_PER_PAGE + 1);
  }

  useEffect(() => {
    getCafeTotalCountRequest().then(getwriteTotalCountResponse);
  }, []);

  useEffect(() => {
    const pageList: number[] = [];
    const startPage = (writecurrentSection - 1) * SECTION_PER_PAGE + 1;
    const endPage = writecurrentSection * SECTION_PER_PAGE;
    for (let page = startPage; page <= endPage; page++) {
      pageList.push(page);
      if (page === writetotalPage) break;
    };
    getCafeWriteList();
    writesetPageList(pageList);

  }, [writecurrentSection, writetotalPage]);

  return (

        <div className='like-box2'>
        <div className='textBox' style={{ borderBottom: "4px solid rgba(0 , 0, 0, 100)" }}>WRITE</div>
        <div className='write-totalBox' style={{ borderBottom: "2px solid rgba(210 , 210, 210, 100)" }}>
          <div className='write-titleBox' style={{ borderBottom: "2px solid rgba(210 , 210, 210, 100)" }}>
            <div className='title'>작성일</div>
            <div className='title2'>제목</div>
            <div className='title'>수정</div>
            <div className='title'>삭제</div>
          </div>

          {writeviewList.map((item) => (
          <div  key={item.mypageBoardNumber} className='contentBox'>
            <div className='directed-writeBox'>{changeDateFormat(item.mypageBoardDate)}</div>
            <div className='directed-writeBox2'>{item.mypageBoardTitle}</div>
            <div className='directed-writeBox3'>
              <div className='icon-box'></div>
            </div>
            <div className='directed-writeBox4'>
              <div className='icon-box2'></div>
            </div>
          </div>
          ))}

        </div>

      </div>
  );
}

export default function MyPageMain() {
  const navigator = useNavigate();
  const [cookies] = useCookies();

  const accessToken = cookies[ACCESS_TOKEN];

  const [name, setName] = useState<string>('');
  const [telNumber, setTelNumber] = useState<string>('');
  const [joinPath, setJoinPath] = useState<string>('');
  const [userId, setUserId] = useState<string>('');

  const getUserDetailResponseDto = (responseBody: GetMyPageUserDetailResponseDto | ResponseDto | null) => {
    const message =
      !responseBody ? '서버에 문제가 있습니다.' :
        responseBody.code === 'VF' ? '잘못된 접근입니다.' :
          responseBody.code === 'AF' ? '잘못된 접근입니다.' :
            responseBody.code === 'NI' ? ' 존재하지 않는 유저 입니다..' : "";

    const isSuccessed = responseBody !== null && responseBody.code === 'SU';
    if (!isSuccessed) {
      alert(message);
      return;
    }

    const { userId, name, joinPath, telNumber } = responseBody as GetMyPageUserDetailResponseDto;
    setName(name);
    setJoinPath(joinPath);
    setTelNumber(telNumber);
    setUserId(userId);
  };


  useEffect(() => {

    if (!accessToken) return;
    getMyPageUserDetailRequest(accessToken).then(getUserDetailResponseDto);
  }, [accessToken]);

  return (
    <div className='layout'>

      <div className='subscribe-box'>

        <div className='header-box'>
          <div className='header-namebox'>MyPage</div>

          <div className='user-infoBox'>
            <div className='user-contentBox'>
              <div className='contentBox1'>
                <div className='iconBox'></div>
                <div className='content-board'>{name}</div>
              </div>
              <div className='contentBox1'>
                <div className='iconBox'></div>
                <div className='content-board'>{telNumber}</div>
              </div>
            </div>
            <div className='user-contentBox'>
              <div className='contentBox2'>
                <div className='iconBox'></div>
                <div className='content-board'>{userId}</div>
              </div>
              <div className='contentBox2'>
                <div className='iconBox'></div>
                <div className='content-board'>{joinPath}</div>
              </div>
            </div>
          </div>
        </div>

        <Save />
        <Like />
        <Write />

      </div>

      
      <div style={{ width: "100%", height: "175px" }}></div>
      <BottomNav></BottomNav>
      </div>
  );
}

