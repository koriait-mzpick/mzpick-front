
import { useNavigate } from 'react-router';
import { HOF_FASHION_PATH, HOF_FOOD_PATH, HOF_TRAVEL_PATH } from 'src/constants';
import './style.css';
import { GetTravelHallOfFameResponseDto } from 'src/apis/hall_of_fame/dto/response';
import { useEffect, useState } from 'react';
import { getTravelHallOfFameRequest } from 'src/apis/hall_of_fame';
import { ResponseDto } from 'src/apis/dto/response';
import { getTravelDetailRequest, getTravelListRequest } from 'src/apis/travel';
import { GetTravelDetailResponseDto } from 'src/apis/travel/dto/response';

function TravelTop1() {

    // state: 여행지 //
    const [travelNumber, setTravelNumber] = useState<string>('');

    const [topItem, setTopItem] = useState(null);


    const TravelDetail = () => {
      const [topTravelPost, setTopTravelPost] = useState<GetTravelDetailResponseDto | null>(null);
      const [error, setError] = useState('');
  


    // function: 네비게이션 상태 //
    const navigator = useNavigate();

    // function: 명예의전당 여행지 Response 처리 함수 //
    const GetTravelHallOfFameResponse = (responseBody: ResponseDto) => {
      const message = 
        !responseBody ? '서버에 문제가 있습니다.' : 
        responseBody.code === "VF" ? '올바른 데이터가 아닙니다.' :


        responseBody.code === "SU" ? '사용 가능' : ''

        const isSuccessed = responseBody !== null && responseBody.code === 'SU';

    }

    // event handler: 명예의전당 buttonbox 클릭 이벤트 //
    const onButtonClickEventHandler = (path: string) =>{
      navigator(path);
    };

        // effect: 명예의전당 top 1 불러오기 함수 //
        useEffect(() => {
          const fetchTravelData = async () => {
              try {
                  const response = await getTravelDetailRequest(travelNumber); // 데이터 요청
                  console.log('응답 데이터:', response); // 응답 데이터 확인

                  const travelPosts: GetTravelDetailResponseDto[] = response.resultSet; // 게시물 목록

                  if (travelPosts.length === 0) {
                    setTopTravelPost(null);
                    return;
                }
  

                  const sortedPosts = travelPosts.sort((a, b) => {
                      const aScore = a.travelViewCount + a.travelLikeCount; 
                      const bScore = b.travelViewCount + b.travelLikeCount; 
                      return bScore - aScore;
                  });
  
                  setTopTravelPost(sortedPosts[0]); 
              } catch (err) {
                  setError('게시물을 가져오는 데 오류가 발생했습니다.');
              }
          };
  
          fetchTravelData();
      }, []);
  
  
  

    return (
      <div id='main-hof-wrapper'>
        <div className='wrapper-container'>
          <div className='text-area'>"Travle Top 1"</div>
          <div className='deco-container'>
            <div className='image-box'>
              <div className="decorated-img"></div>
              {/* <img src={topItem.imageUrl} /> */}
                <div className='image-area'></div>
                  
            </div>
            <div className='button-container'>
              <div className='button-box' onClick={() => onButtonClickEventHandler(HOF_TRAVEL_PATH)}>○</div>
              <div className='button-box' onClick={() => onButtonClickEventHandler(HOF_FOOD_PATH)}>○</div>
              <div className='button-box'onClick={() => onButtonClickEventHandler(HOF_FASHION_PATH)}>○</div>
            </div>
          </div>
        <div className='icon-area'></div>
        </div>
      </div>
    )
}
}

export default function HOFTravel() {


  return (
    <>
      <TravelTop1 />
    </>
  )
}

function getTravelResponseDto(value: ResponseDto | GetTravelListResponseDto | null): ResponseDto | GetTravelListResponseDto | PromiseLike<ResponseDto | GetTravelListResponseDto | null> | null {
  throw new Error('Function not implemented.');
}

