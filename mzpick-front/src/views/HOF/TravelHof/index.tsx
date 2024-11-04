
import { useNavigate } from 'react-router';
import { HOF_FASHION_PATH, HOF_FOOD_PATH, HOF_TRAVEL_PATH } from 'src/constants';
import '../style.css';
import { GetTravelHallOfFameResponseDto } from 'src/apis/hall_of_fame/dto/response';
import { useEffect, useState } from 'react';
import { getTravelHallOfFameRequest } from 'src/apis/hall_of_fame';
import { ResponseDto } from 'src/apis/dto/response';
import { TravelPhoto } from 'src/types';

function TravelTop1() {

    // function: 네비게이션 상태 //
    const navigator = useNavigate();

    // state: travel top1 상태 //
    const [topTravelphotoLink, setTopTravelphotoLink] = useState<string>('');
    const [topTravelNumber, setTopTravelNumber] = useState<string | number>();


    const getTopTravelResponse = (responseBody: GetTravelHallOfFameResponseDto | ResponseDto | null) => {
      const message = 
      !responseBody ? '서버에 문제가 있습니다':
      responseBody.code === 'DBE' ? '서버에 문제가 있습니다.' :
      responseBody.code === 'NB' ? '등록된 게시판이 없습니다': '';

      const isSuccessed = responseBody !== null && responseBody.code ==='SU';
      if(!isSuccessed){
        alert(message);
        return;
      }

      const { travelNumber,  photoLink } = responseBody as GetTravelHallOfFameResponseDto;
      setTopTravelphotoLink(photoLink);
      setTopTravelNumber(travelNumber); 
    }

    // effect: travel top1 불러오기 함수 //
    useEffect(()=>{
      getTravelHallOfFameRequest().then(getTopTravelResponse);
      console.log();
    }, []);

    // event handler: 명예의전당 buttonbox 클릭 이벤트 //
    const onButtonClickEventHandler = (path: string) =>{
      navigator(path);
    };

    return (
      <div id='main-hof-wrapper'>
        <div className='wrapper-container'>
          <div className='text-area'>"Travle Top 1"</div>
          <div className='icon-area'></div>
            <div className='image-box'>
              <div className="decorated-img"></div>
              <div className='image-area'>
                <img style={{ width: '100px' }} src={topTravelphotoLink} alt="Top Travel" />
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

export default function HOFTravel() {

  return (
      <TravelTop1 />
  )
}