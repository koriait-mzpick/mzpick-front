
import { useNavigate } from 'react-router';
import { FASHION_DETAIL_PATH, FASHION_PATH, HOF_FASHION_PATH, HOF_FOOD_PATH, HOF_TRAVEL_PATH } from 'src/constants';
import '../style.css';
import { useEffect, useState } from 'react';
import { GetFashionHallOfFameResponseDto } from 'src/apis/hall_of_fame/dto/response';
import { ResponseDto } from 'src/apis/dto/response';
import { getFashionHallOfFameRequest } from 'src/apis/hall_of_fame';

function FashionTop1() {

  // function: 네비게이션 상태 //
  const navigator = useNavigate();

  // state: fashion top1 상태 //
  const [topFashionPhotoLink, setTopFashionPhotoLink] = useState<string>('');
  const [topFashionNumber, setTopFashionNumber] = useState<string | number>('');
  

  // function: 패션 top1 Response 처리 함수 //
  const getTopFashionResponse = (responseBody: GetFashionHallOfFameResponseDto | ResponseDto | null) => {
    const message =
      !responseBody ? '서버에 문제가 있습니다' :
      responseBody.code === 'DBE' ? '서버에 문제가 있습니다.' :
      responseBody.code === 'NB' ? '등록된 게시판이 없습니다' : '';

    const isSuccessed = responseBody !== null && responseBody.code === 'SU';
    if (!isSuccessed) {
      alert(message);
      return;
    }
  
    const { fashionNumber, photoLink } = responseBody as GetFashionHallOfFameResponseDto;
    setTopFashionPhotoLink(photoLink);
    setTopFashionNumber(fashionNumber);
  }

  // effect: fashion top1 불러오기 함수 //
  useEffect(() => {
    getFashionHallOfFameRequest().then(getTopFashionResponse);
  }, []);

  // event handler: top1 클릭시 게시물 이동 이벤트 처리 //
  const onTravelTop1ClickHandler = (topFashionNumber: number | string ) => {
    console.log(topFashionNumber)
    navigator(`${FASHION_DETAIL_PATH}/${topFashionNumber}`)
  };

  // event handler: 명예의전당 buttonbox 클릭 이벤트 //
  const onButtonClickEventHandler = (path: string) => {
    navigator(path);
  };

  // render: 명예의 전당 fashion 화면 컴포넌트 렌더링 //
  return (
    <div id='main-hof-wrapper'>
      <div className='wrapper-container'>
        <div className='text-area'>"Fashion Top 1"</div>
        <div className='icon-area'></div>
        <div className='image-box'>
          <div className="decorated-img"></div>
          <div className='image-area' onClick={()=>onTravelTop1ClickHandler(topFashionNumber)}>
            <div className='link-area' style={{ backgroundImage: `url(${topFashionPhotoLink})` }}></div>
          </div>
          <div className='button-container'>
            <div className='button-box' onClick={() => onButtonClickEventHandler(HOF_TRAVEL_PATH)}>○</div>
            <div className='button-box' onClick={() => onButtonClickEventHandler(HOF_FOOD_PATH)}>○</div>
            <div className='button-box' onClick={() => onButtonClickEventHandler(HOF_FASHION_PATH)}>○</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function HOFFashion() {

  return (
    <FashionTop1 />
  )
}