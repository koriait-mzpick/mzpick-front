
import { useNavigate } from 'react-router';
import { HOF_FASHION_PATH, HOF_FOOD_PATH, HOF_TRAVEL_PATH } from 'src/constants';
import '../style.css';
import { useEffect, useState } from 'react';
import { GetRestaurantHallOfFameResponseDto } from 'src/apis/hall_of_fame/dto/response';
import { ResponseDto } from 'src/apis/dto/response';
import { getRestaurantHallOfFameRequest } from 'src/apis/hall_of_fame';

function FoodTop1() {

  // function: 네비게이션 상태 //
  const navigator = useNavigate();

  // state: travel top1 상태 //
  const [topFood, setTopFood] = useState<GetRestaurantHallOfFameResponseDto | ResponseDto | null>(null);

  // effect: travel top1 불러오기 함수 //
  useEffect(() => {
    const fetchTopFood = async () => {
        try {
            const response = await getRestaurantHallOfFameRequest();
            setTopFood(response);
        } catch (error) {
            console.error("이동중 오류가 발생했습니다.", error);
        }
    };
    fetchTopFood();
  }, []);

  // event handler: 명예의전당 buttonbox 클릭 이벤트 //
  const onButtonClickEventHandler = (path: string) => {
    navigator(path);
  };

  return (
    <div id='main-hof-wrapper'>
      <div className='wrapper-container'>
        <div className='text-area'>"Food Top 1"</div>
        <div className='icon-area'></div>
        <div className='image-box'>
          <div className="decorated-img"></div>
          {topFood && (
              <div className='image-area'>
                <img src={(topFood as GetRestaurantHallOfFameResponseDto).photoLink} alt="Top Food" />
              </div>
              )}
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
