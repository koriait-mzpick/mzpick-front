
import { useNavigate } from 'react-router';
import { HOF_FASHION_PATH, HOF_FOOD_PATH, HOF_TRAVEL_PATH, TRAVEL_RESTAURANT_DETAIL_PATH } from 'src/constants';
import '../style.css';
import { useEffect, useState } from 'react';
import { GetRestaurantHallOfFameResponseDto } from 'src/apis/hall_of_fame/dto/response';
import { ResponseDto } from 'src/apis/dto/response';
import { getRestaurantHallOfFameRequest } from 'src/apis/hall_of_fame';

function FoodTop1() {

  // function: 네비게이션 상태 //
  const navigator = useNavigate();

  // state: travel top1 상태 //
  const [topFoodphotoLink, setTopFoodphotoLink] = useState<string>('');
  const [topFoodNumber, setTopFoodNumber] = useState<string | number>();

  // function: 여행지 음식 top1 Response 처리 함수 //
  const getTopFoodResponse = (responseBody: GetRestaurantHallOfFameResponseDto | ResponseDto | null) => {
    const message =
      !responseBody ? '서버에 문제가 있습니다' :
        responseBody.code === 'DBE' ? '서버에 문제가 있습니다.' :
          responseBody.code === 'NB' ? '등록된 게시판이 없습니다' : '';

    const isSuccessed = responseBody !== null && responseBody.code === 'SU';
    if (!isSuccessed) {
      alert(message);
      return;
    }

    const { travelFoodNumber, photoLink } = responseBody as GetRestaurantHallOfFameResponseDto;
    setTopFoodphotoLink(photoLink);
    setTopFoodNumber(travelFoodNumber);
  }

  // effect: travel food top1 불러오기 함수 //
  useEffect(() => {
    getRestaurantHallOfFameRequest().then(getTopFoodResponse);
  }, []);

  // event handler: top1 클릭시 게시물 이동 이벤트 처리 //
  const onTravelTop1ClickHandler = () => {
    navigator(`${TRAVEL_RESTAURANT_DETAIL_PATH}/${topFoodNumber}`);
  };

  // event handler: 명예의전당 buttonbox 클릭 이벤트 //
  const onButtonClickEventHandler = (path: string) => {
    navigator(path);
  };

  // render: 명예의 전당 travel food 화면 컴포넌트 렌더링 //
  return (
    <div id='main-hof-wrapper'>
      <div className='wrapper-container'>
        <div className='text-area'>"Food Top 1"</div>
        <div className='icon-area'></div>
        <div className='image-box'>
          <div className="decorated-img"></div>
          <div className='image-area' onClick={onTravelTop1ClickHandler}>
            <div className='link-area' style={{ backgroundImage: `url(${topFoodphotoLink})` }}></div>
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

export default function HOFFood() {

  return (
    <FoodTop1 />
  )
}
