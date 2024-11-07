import React, { useState, useEffect  } from 'react'
import './style.css';
import BottomNav from '../../layouts/BottomNav';
import { MyPageCafeSave } from 'src/types/mypage/cafe';
import { usePagination } from 'src/hooks';
import { GetMyPageCafeSaveResponseDto } from 'src/apis/mypage/dto/response/save';
import { getTotalCountRequest } from 'src/apis/pagination';
import { GetTotalCountResponseDto } from 'src/apis/pagination/response';
import ResponseDto from 'src/apis/dto/response/response.dto';
import { useNavigate } from 'react-router-dom';
import { ACCESS_TOKEN, WRITE_PATH } from 'src/constants';
import axios from 'axios';
import { getMyPageCafeSaveListRequest } from 'src/apis/mypage';
import { useCookies } from 'react-cookie';
import Pagination from 'src/components/Pagination2';

const SECTION_PER_PAGE = 5;

export default function MyPage() {
  const navigator = useNavigate();

  const [cookies] = useCookies();

  const [count, setCount] = useState<number>(0);
  const [pageList, setPageList] = useState<number[]>([]);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [totalList, setTotalList] = useState<MyPageCafeSave[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalSection, setTotalSection] = useState<number>(0);
  const [currentSection, setCurrentSection] = useState<number>(1);

  const accessToken = cookies[ACCESS_TOKEN];

  // const [viewList, setViewList] = useState<MyPageCafeSave[]>([]);
    
    
    // function: get total count response //
    const getTotalCountResponse = (dto: GetTotalCountResponseDto | ResponseDto | null) => {
      const { count } = dto as GetTotalCountResponseDto;
      const totalPage = Math.ceil(count / 8);
      setTotalPage(totalPage);
      const totalSection = Math.ceil(totalPage / SECTION_PER_PAGE);
      setTotalSection(totalSection);
    }

    // function: getSave List 함수 //
    const getCafeSaveList = () => {
      getMyPageCafeSaveListRequest(accessToken).then(GetMyPageCafeSaveResponseDto);
    }

    // function: get Save Response 함수 //
    const GetMyPageCafeSaveResponseDto = (resposeBody: GetMyPageCafeSaveResponseDto | ResponseDto | null) => {
      const message =
        !resposeBody ? '서버에 문제가 있습니다.' :
          resposeBody.code === 'AF' ? '잘못된 접근입니다.' :
          resposeBody.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

      const isSuccessed = resposeBody !== null && resposeBody.code === 'SU';
      if (!isSuccessed) {
        alert(message);
        return;
    }

     // TotalList 상태 업데이트,  originalList 상태 업데이트 
    const { myPageCafeSaves } = resposeBody as GetMyPageCafeSaveResponseDto;
    setTotalList(myPageCafeSaves);
    setOriginalList(myPageCafeSaves);
};

  const onButtonClickEventHandler = (path: string) => {
    navigator(path);
  }

  // interface : Properties //
  interface TableSaveProps {
    save: MyPageCafeSave;
  }

  // state : 원본 리스트 상태 //
  const [originalList, setOriginalList] = useState<MyPageCafeSave[]>([]);
  
  const onPageClickHandler = (page: number) => {
    setCurrentPage(page);
  } 
  const onPreSectionClickHandler = () => {
    if (currentSection === 1) return;
    setCurrentSection(currentSection - 1);
    setCurrentPage((currentSection - 1) * SECTION_PER_PAGE);
  } 
  
  const onNextSectionClickHandler = () => {
    if (currentSection === totalSection) return;
    setCurrentSection(currentSection + 1);
    setCurrentPage(currentSection * SECTION_PER_PAGE + 1);
  } 

  useEffect(() => {
    getTotalCountRequest().then(getTotalCountResponse);
  }, []);

  useEffect(() => {
    const pageList: number[] = [];
    const startPage = (currentSection - 1) * SECTION_PER_PAGE + 1;
    const endPage = currentSection * SECTION_PER_PAGE;
    for (let page = startPage; page <= endPage; page++) {
      pageList.push(page);
      if (page === totalPage) break;
    };
    
    setPageList(pageList);
  }, [currentSection, totalPage]);

  useEffect(() => {
    getCafeSaveList();
  }, [])


  return (
    <div className='layout'>



          <div className='subscribe-box'>

          <div className='header-box'>
            <div className='header-namebox'>MyPage</div>

            <div className='user-infoBox'>
              <div className='user-contentBox'>
                <div className='contentBox1'>
                  <div className='iconBox'></div>
                  <div className='content-board'>제니</div>
                </div>
                <div className='contentBox1'>
                  <div className='iconBox'></div>
                  <div className='content-board'>010-1111-1111</div>
                </div>
              </div>
              <div className='user-contentBox'>
                <div className='contentBox2'>
                  <div className='iconBox'></div>
                  <div className='content-board'>jenny01</div>
                </div>
                <div className='contentBox2'>
                  <div className='iconBox'></div>
                  <div className='content-board'>NAVER</div>
                </div>
              </div>
            </div>
          </div>

          <div className='save-box'>
        <div className='textBox'  style={{ borderBottom: "4px solid rgba(0 , 0, 0, 100)" }} >SAVE</div>
        <div className='imageBox'>
          <div className='WritePostBox'>
            <div className='board-box'>
          <div className='board-image'></div>
          <div className='board-information'>
            <div className='board-information-data'>24.12.12</div>
          
          </div>
          <div className='board-tag'>#</div>
        </div>
          </div>
          <div className='WritePostBox'>
          <div className='board-box'>
          <div className='board-image'></div>
          <div className='board-information'>
            <div className='board-information-data'>24.12.12</div>
          
          </div>
          <div className='board-tag'>#</div>
        </div>
          </div>
          <div className='WritePostBox'>
          <div className='board-box'>
          <div className='board-image'></div>
          <div className='board-information'>
            <div className='board-information-data'>24.12.12</div>
          
          </div>
          <div className='board-tag'>#</div>
        </div>
          </div>
        </div>
        <Pagination currentPage={currentPage} pageList={pageList} onPageClickHandler={onPageClickHandler} onNextSectionClickHandler={onNextSectionClickHandler} onPreSectionClickHandler={onPreSectionClickHandler} />


      </div>
      <div className='like-box'>
        <div className='textBox'  style={{ borderBottom: "4px solid rgba(0 , 0, 0, 100)" }}>LIKE</div>
        <div className='imageBox'>
          <div className='WritePostBox'>
            <div className='imgContainer'></div>
            <div className='SubtitleBox'></div>
          </div>
          <div className='WritePostBox'>
            <div className='imgContainer'></div>
            <div className='SubtitleBox'></div>
          </div>
          <div className='WritePostBox'>
            <div className='imgContainer'></div>
            <div className='SubtitleBox'></div>
          </div>
          
        </div>
        <Pagination currentPage={currentPage} pageList={pageList} onPageClickHandler={onPageClickHandler} onNextSectionClickHandler={onNextSectionClickHandler} onPreSectionClickHandler={onPreSectionClickHandler} />

      </div>

      <div className='like-box2'>
        <div className='totalTextBox'>
        <div className='textBox'  style={{ borderBottom: "4px solid rgba(0 , 0, 0, 100)" }}>WRITE</div>
        </div>
        <div className='write-totalBox' style={{ borderBottom: "2px solid rgba(210 , 210, 210, 100)" }}>
          <div className='write-titleBox' style={{ borderBottom: "2px solid rgba(210 , 210, 210, 100)" }}>
            <div className='title'>작성일</div>
            <div className='title2'>제목</div>
            <div className='title'>수정</div>
            <div className='title'>삭제</div>
          </div>

          <div className='contentBox'>
            <div className='directed-writeBox'>2024.10.11</div>
            <div className='directed-writeBox2'>여행지 추천 해주세요!</div>
            <div className='directed-writeBox3'>
            {/* User가 저장한 PATH로 경로 이동되어지도록 수정 */}
              <div className='icon-box' onClick={() => onButtonClickEventHandler(WRITE_PATH)}></div> 
            </div>
            <div className='directed-writeBox4'>
              <div className='icon-box2'></div>
            </div>
          </div>

          <div className='contentBox'>
            <div className='directed-writeBox'>2024.10.11</div>
            <div className='directed-writeBox2'>여행지 추천 해주세요!</div>
            <div className='directed-writeBox3'>
              <div className='icon-box'></div>
            </div>
            <div className='directed-writeBox4'>
              <div className='icon-box2'></div>
            </div>
          </div>

          <div className='contentBox'>
            <div className='directed-writeBox'>2024.10.11</div>
            <div className='directed-writeBox2'>여행지 추천 해주세요!</div>
            <div className='directed-writeBox3'>
              <div className='icon-box'></div>
            </div>
            <div className='directed-writeBox4'>
              <div className='icon-box2'></div>
            </div>
          </div>

        </div>
        <Pagination currentPage={currentPage} pageList={pageList} onPageClickHandler={onPageClickHandler} onNextSectionClickHandler={onNextSectionClickHandler} onPreSectionClickHandler={onPreSectionClickHandler} />

      </div>

      <div className='like-box2'>
        <div className='textBox'  style={{ borderBottom: "4px solid rgba(0 , 0, 0, 100)" }}>VOTE</div>
        <div className='write-totalBox' style={{ borderBottom: "2px solid rgba(210 , 210, 210, 100)" }}>
          <div className='write-titleBox' style={{ borderBottom: "2px solid rgba(210 , 210, 210, 100)" }}>
            <div className='title'>작성일</div>
            <div className='title2'>제목</div>
            <div className='title'>수정</div>
            <div className='title'>삭제</div>
          </div>

          <div className='contentBox'>
            <div className='directed-writeBox'>2024.10.11</div>
            <div className='directed-writeBox2'>여행지 추천 해주세요!</div>
            <div className='directed-writeBox3'>
              <div className='icon-box'></div>
            </div>
            <div className='directed-writeBox4'>
              <div className='icon-box2'></div>
            </div>
          </div>

          <div className='contentBox'>
            <div className='directed-writeBox'>2024.10.11</div>
            <div className='directed-writeBox2'>여행지 추천 해주세요!</div>
            <div className='directed-writeBox3'>
              <div className='icon-box'></div>
            </div>
            <div className='directed-writeBox4'>
              <div className='icon-box2'></div>
            </div>
          </div>

          <div className='contentBox'>
            <div className='directed-writeBox'>2024.10.11</div>
            <div className='directed-writeBox2'>여행지 추천 해주세요!</div>
            <div className='directed-writeBox3'>
              <div className='icon-box'></div>
            </div>
            <div className='directed-writeBox4'>
              <div className='icon-box2'></div>
            </div>
          </div>

        </div>
        <Pagination currentPage={currentPage} pageList={pageList} onPageClickHandler={onPageClickHandler} onNextSectionClickHandler={onNextSectionClickHandler} onPreSectionClickHandler={onPreSectionClickHandler} />

      </div>
      </div>


      
      <div style={{ width: "100%", height: "175px" }}></div>
      <BottomNav></BottomNav>
      </div>
  );
}

