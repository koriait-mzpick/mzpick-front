import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router';
import { ResponseDto } from 'src/apis/dto/response';
import { getFashionListRequest } from 'src/apis/fashion';
import { GetFashionListResponseDto } from 'src/apis/fashion/dto/response';
import { getFashionTotalCountRequest } from 'src/apis/pagination';
import { GetFashionTotalCountResponseDto } from 'src/apis/pagination/response';
import Pagination from 'src/components/Pagination';
import { FASHION_DETAIL_PATH, FASHION_WRITE_PATH, WRITE_PATH } from 'src/constants';
import { useAuthStore } from 'src/stores';
import { Fashion } from 'src/types';
import './style.css';

const SECTION_PER_PAGE = 5;


// component: 패션 게시판 리스트 컴포넌트 //
export default function FashionMain() {

  // state: 쿠키상태 //
  const [cookies] = useCookies();
  // state: 드롭다운 상태//
  const [dropDownOpen, setDropDownOpen] = useState(false);
  // state: 북마크 상태 //
  const [bookMarkClick, setBookMarkClick] = useState(false);
  // state: 원본 리스트 상태 //
  const [originalList, setOriginalList] = useState<Fashion[]>([]);

  // state: signInUser상태 //
  const { signInUser } = useAuthStore();

  const [count, setCount] = useState<number>(0);
  const [pageList, setPageList] = useState<number[]>([]);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalSection, setTotalSection] = useState<number>(0);
  const [currentSection, setCurrentSection] = useState<number>(1);

  const [viewList, setViewList] = useState<Fashion[]>([]);
  const [selectedHashtag, setSelectedHashtag] = useState<string>('');
  const [filteredPostList, setFilteredPostList] = useState<Fashion[]>([]);

  // function: get Fashion List 함수 //
  const getFashionList = (page: number, hashtag: string) => {
    getFashionListRequest(page, hashtag).then(getFashionResponseDto);
  }
  // function: get total count response //
  const getFashionTotalCountResponse = (dto: GetFashionTotalCountResponseDto | ResponseDto | null) => {
    const { count } = dto as GetFashionTotalCountResponseDto;
    const totalPage = Math.ceil(count / 8);
    setTotalPage(totalPage);
    const totalSection = Math.ceil(totalPage / SECTION_PER_PAGE);
    setTotalSection(totalSection);
  }
  // function: get Fashion Response 함수 //
  const getFashionResponseDto = (resposenBody: GetFashionListResponseDto | ResponseDto | null) => {
    const message =
      !resposenBody ? '서버에 문제가 있습니다.' :
        resposenBody.code === 'AF' ? '잘못된 접근입니다.' :
          resposenBody.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

    const isSuccessed = resposenBody !== null && resposenBody.code === 'SU';
    if (!isSuccessed) {
      alert(message);
      return;
    }

    const { fashionList } = resposenBody as GetFashionListResponseDto;
    setViewList(fashionList);
  }

  // function: 네비게이터 함수 //
  const navigate = useNavigate();

  // function: 날짜 포맷 변경 함수 //
  const changeDateFormat = (date: string) => {
    const yy = date.substring(2, 4);
    const mm = date.substring(5, 7);
    const dd = date.substring(8, 10);
    return `${yy}.${mm}.${dd}`;
  };


  // event handler: 네비게이션 아이템 클릭 이벤트 처리 //
  const onItemClickHandler = (path: string) => {
    navigate(path);
  };

  const onPageClickHandler = (page: number) => {
    setCurrentPage(page);
  }

  const onHashtagClickHandler = (hashtag: string) => {
    setFilteredPostList(viewList);
    if (selectedHashtag === hashtag) {
      setSelectedHashtag('');
      setFilteredPostList([]);
      return;
    }
    setSelectedHashtag(hashtag);
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

  }, [currentSection, totalPage]);

  useEffect(() => {

    getFashionTotalCountRequest().then(getFashionTotalCountResponse);

    const pageList: number[] = [];
    const startPage = (currentSection - 1) * SECTION_PER_PAGE + 1;
    const endPage = currentSection * SECTION_PER_PAGE;
    for (let page = startPage; page <= endPage; page++) {
      pageList.push(page);
      if (page === totalPage) break;
    };
    
    setPageList(pageList);

    getFashionList(currentPage, selectedHashtag);

  }, [currentPage, currentSection,selectedHashtag, totalPage])

  // render: 패션 게시판 리스트 컴포넌트 렌더링//  
  return (
    <div id='list-main'>
      <div className='board-top-fashion'>
        <div className='write-button' onClick={() => onItemClickHandler(FASHION_WRITE_PATH)}>글쓰기</div>
      </div>
      <div className='board-middle'>
        {(selectedHashtag ? filteredPostList : viewList).map((item) => (
          <div key={item.fashionNumber} className='board-box'>
            <div className='board-image' onClick={() => navigate(`${FASHION_DETAIL_PATH}/${item.fashionNumber}`)}>
              <img src={item.fashionPhoto} alt={`Fashion ${item.fashionNumber}`} className='board-image-content' />
            </div>
            <div className='board-information'>
              <div className='board-information-data'>{changeDateFormat(item.fashionDate)}</div>
              <div className='board-information-right'>
                <div className='board-information-like'>
                  <div className={`board-information-like-icon ${signInUser && item.fashionLikeUserList.includes(signInUser.userId)}`}></div>
                  <div className='board-information-data'>{item.fashionLikeCount}</div>
                </div>
                <div className='board-information-view'>
                  <div className='board-information-view-icon'></div>
                  <div className='board-information-data'>{item.fashionViewCount}</div>
                </div>
                <div className={`board-information-bookmark ${signInUser && item.fashionSaveUserList.includes(signInUser.userId) ? 'active' : ''}`} ></div>
              </div>
            </div>
            <div className='board-tag'>
              {item.fashionHashtagList.map((hashtag, index) => (
                <div key={index} className='board-tag-item' onClick={() => onHashtagClickHandler(hashtag)}>{hashtag}</div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <Pagination currentPage={currentPage} pageList={pageList} onPageClickHandler={onPageClickHandler} onNextSectionClickHandler={onNextSectionClickHandler} onPreSectionClickHandler={onPreSectionClickHandler} />
    </div>
  );
}
