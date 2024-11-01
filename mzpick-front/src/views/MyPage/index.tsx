import React, { useState } from 'react'
import './style.css';
import BottomNav from '../../layouts/BottomNav';
import { MyPageCafeSave } from 'src/types/mypage/cafe';
import { usePagination } from 'src/hooks';
import { GetMyPageCafeSaveResponseDto } from 'src/apis/mypage/dto/response/save';
import ResponseDto from 'src/apis/dto/response/response.dto';
import Pagination from 'src/components/Pagination';

export default function MyPage() {

  // interface : Properties //
  interface TableSaveProps {
    save: MyPageCafeSave;
    getToolList: () => void;
    onUpdateButtonClickHandler: (toolNumber: number) => void;
  }

  // state : 원본 리스트 상태 //
  const [originalList, setOriginalList] = useState<MyPageCafeSave[]>([]);

  // Pagination //
  const { 
    currentPage, totalPage, totalCount, viewList, pageList,
    setTotalList, initViewList,
    onPageClickHandler, onPreSectionClickHandler, onNextSectionClickHandler
  } = usePagination<MyPageCafeSave>();

      // function: get tool list response 처리 함수 //
      const getMyPageCafeSaveResponse = (responseBody: GetMyPageCafeSaveResponseDto | ResponseDto | null) => {
        // const message = 
            !responseBody ? '서버에 문제가 있습니다.' :
        //     responseBody.code === 'AF' ? '잘못된 접근입니다.' :
        //     responseBody.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

        // const isSuccessed = responseBody !== null && responseBody.code === 'SU';
        // if (!isSuccessed) {
        //     alert(message);
        //     return;
        // }

      // TotalList 상태 업데이트,  originalList 상태 업데이트 
      // const { myPageCafeSave } = responseBody as GetMyPageCafeSaveResponseDto;
      //   setTotalList(myPageCafeSave);
      //   setOriginalList(myPageCafeSave);
      // };


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
        <div  className='page-box'>
          <div className='pageBox1'></div>
          <div className='pageBox'>1</div>
          <div className='pageBox'>2</div>
          <div className='pageBox'>3</div>
          <div className='pageBox'>4</div>
          <div className='pageBox'>5</div>
          <div className='pageBox2'></div>
        </div>

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
        <div  className='page-box'>
          <div className='pageBox1'></div>
          <div className='pageBox'>1</div>
          <div className='pageBox'>2</div>
          <div className='pageBox'>3</div>
          <div className='pageBox'>4</div>
          <div className='pageBox'>5</div>
          <div className='pageBox2'></div>
        </div>
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
        <div  className='page-box'>
          <div className='pageBox1'></div>
          <div className='pageBox'>1</div>
          <div className='pageBox'>2</div>
          <div className='pageBox'>3</div>
          <div className='pageBox'>4</div>
          <div className='pageBox'>5</div>
          <div className='pageBox2'></div>
        </div>
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
        <Pagination 
          pageList={pageList} 
          currentPage={currentPage} 
          onPageClickHandler={onPageClickHandler}
          onPreSectionClickHandler={onPreSectionClickHandler}
          onNextSectionClickHandler={onNextSectionClickHandler}
        />
        {/* <div  className='page-box'>
          <div className='pageBox1'></div>
          <div className='pageBox'>1</div>
          <div className='pageBox'>2</div>
          <div className='pageBox'>3</div>
          <div className='pageBox'>4</div>
          <div className='pageBox'>5</div>
          <div className='pageBox2'></div>
        </div> */}
      </div>
      </div>


      
      <div style={{ width: "100%", height: "175px" }}></div>
      <BottomNav></BottomNav>
      </div>
  );
}
