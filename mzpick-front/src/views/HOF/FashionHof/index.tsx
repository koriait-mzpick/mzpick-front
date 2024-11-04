
import { useNavigate } from 'react-router';
import { HOF_FASHION_PATH, HOF_FOOD_PATH, HOF_TRAVEL_PATH } from 'src/constants';
import '../style.css';
import { useEffect, useState } from 'react';
import { GetFashionHallOfFameResponseDto } from 'src/apis/hall_of_fame/dto/response';
import { ResponseDto } from 'src/apis/dto/response';
import { getFashionHallOfFameRequest } from 'src/apis/hall_of_fame';

function FashionTop1() {

    // function: 네비게이션 상태 //
    const navigator = useNavigate();

    // state: travel top1 상태 //
    const [topFashion, setTopFashion] = useState<GetFashionHallOfFameResponseDto | ResponseDto | null>(null);

    // effect: travel top1 불러오기 함수 //
    useEffect(() => {
      const fetchTopFashion = async () => {
          try {
              const response = await getFashionHallOfFameRequest();
              setTopFashion(response);
          } catch (error) {
              console.error("이동중 오류가 발생했습니다.", error);
          }
      };
      fetchTopFashion();
      }, []);

    // event handler: 명예의전당 buttonbox 클릭 이벤트 //
    const onButtonClickEventHandler = (path: string) =>{
      navigator(path);
    };

    return (
      <div id='main-hof-wrapper'>
        <div className='wrapper-container'>
          <div className='text-area'>"Fashion Top 1"</div>
          <div className='icon-area'></div>
          <div className='image-box'>
            <div className="decorated-img"></div>
            {topFashion && (
              <div className='image-area'>
                <img src={(topFashion as GetFashionHallOfFameResponseDto).photoLink} alt="Top Fashion" />
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

export default function HOFFashion() {

  return (
      <FashionTop1 />
  )
}
