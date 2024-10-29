
import { useNavigate } from 'react-router';
import { HOF_FASHION_PATH, HOF_FOOD_PATH, HOF_TRAVEL_PATH } from 'src/constants';
import './style.css';

function FashionTop1() {

    // function: 네비게이션 상태 //
    const navigator = useNavigate();

    // event handler: 명예의전당 buttonbox 클릭 이벤트 //
    const onButtonClickEventHandler = (path: string) =>{
      navigator(path);
    };

  return (
    <div id='main-hof-wrapper'>
      <div className='item-box'>
        <div className='text-area'>"Fashion Top 1"</div>
        <div className='icon-area'></div>
      </div>

      <div className='main-contents'>
      <div className='image-area'></div>
      
      <div className='deco-container'>
      <div className="decorated-img"></div>
      <div className='button-contaner'>
      <div className='button-box' onClick={() => onButtonClickEventHandler(HOF_TRAVEL_PATH)}>○</div>
      <div className='button-box' onClick={() => onButtonClickEventHandler(HOF_FOOD_PATH)}>○</div>
      <div className='button-box'onClick={() => onButtonClickEventHandler(HOF_FASHION_PATH)}>○</div>
      </div>
      </div>
      </div>
    </div>
  )
}

export default function HOFFashion() {


  return (
    <>
      <FashionTop1 />
    </>
  )
}
