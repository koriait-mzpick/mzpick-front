import './style.css';

function TravelTop1() {

  return (
    <div id='main-wrapper'>
      <div className='item-box'>
        <div className='text-area'>"Travel Top 1"</div>
        <div className='icon-area'></div>
      </div>

      <div className='main-contents'>
      <div className='image-area'></div>
      
      <div className='deco-container'>
      <div className="decorated-img"></div>
      </div>
      </div>
      
      <div className='button-contaner'>
      <div className='button-box'>○</div>
      <div className='button-box'>○</div>
      <div className='button-box'>○</div>
      </div>
    </div>
  )
}

export default function HOF() {


  return (
    <>
      <TravelTop1 />
    </>
  )
}
