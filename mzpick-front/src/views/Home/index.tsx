import { useRef } from 'react';
import { useNavigate } from 'react-router';
import { FASHION_PATH, FOOD_PATH, HOF_PATH, KEYWORD_PATH, TRAVEL_MAP_PATH, } from '../../constants';
import './style.css';

export default function Home() {

  const preScroll = useRef<number>(0);
  const homeTextSet = useRef<number>(0);
  const homeTextScroll = useRef<boolean>(false);
  const homeTextRef = useRef<HTMLDivElement | null>(null);
  const homeCategoryRef = useRef<HTMLDivElement | null>(null);

  // function: 네비게이터 함수 //
  const navigator = useNavigate();

  // event handler: 네비게이션 아이템 클릭 이벤트 처리 //
  const onItemClickHandler = (path: string) => {
    navigator(path);
  };

  // render: 메인페이지 렌더링 //
  return (
    <div id='home'>
      <div className='home-media'>
        <iframe width="100%" height="100%" src="https://www.youtube.com/embed/mnGtc3wECc0?autoplay=1&loop=1&mute=1&playlist=mnGtc3wECc0"
          title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen>
        </iframe>
      </div>
      <div className='scroll-box'>
        <div className='home-text'>
          <div className='introduce-text'>"Pick Your Trend"</div>
          <div className='icon-box'></div>
          <div className='detail-introduce'>"Discover Trends, Curate Your Style Today!"</div>
        </div>
        </div>
      
        <div className='scroll-box'>
        <div className='home-category'>
          <div className='category-container'>
            <div className='travel-category' onClick={() => onItemClickHandler(TRAVEL_MAP_PATH)}>TRAVEL</div>
            <div className='food-category' onClick={() => onItemClickHandler(FOOD_PATH)}>FOOD</div>
            <div className='fashion-category' onClick={() => onItemClickHandler(FASHION_PATH)}>FASHION</div>
            <div className='keyword-category'onClick={() => onItemClickHandler(KEYWORD_PATH)}>KEYWORD</div>
            <div className='hall-of-fame-category'onClick={() => onItemClickHandler(HOF_PATH)}>HALL OF FAME</div>
        </div>
        </div>
      </div>


      <div className='footer'>
        <div className='name-logo-box'>
          <div className='logo-box'>MZPICK</div>
          <div className='name-box'>
            <div className='name'>Ha Myung-yoon</div>
            <div className='name'>Lee Dong-hun</div>
            <div className='name'>Jeong Jae-heon</div>
            <div className='name'>Kim Young-pil</div>
            <div className='name'>Kwak Ji-hye</div>
            <div className='name'>Song Yu-ha</div>
          </div>
        </div>
        <div className='contract'>Contact | pyt0505@pick.com</div>
      </div>
    </div>
  )
}
