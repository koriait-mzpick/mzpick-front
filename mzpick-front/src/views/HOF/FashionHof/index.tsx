
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
      <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
      <div className='wrapper-container'>
        <div className='text-area'>"Fashion Top 1"</div>
        <div className='deco-container'>
          <div className='image-box'>
            <div className='decorated-img'></div>
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

export default function HOFFashion() {


  return (
    <>
      <FashionTop1 />
    </>
  )
}
