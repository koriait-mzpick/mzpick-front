import './style.css';

function TravelTop1() {

  return (
    <div id='main-wrapper'>
      <div className='item-box'>
        <div className='text-area'>"Travel Top 1"</div>
        <div className='icon-area'></div>
      </div>

      <div className='main-contents'>
      <button className='image-area'>이미지 영역</button>
      <div className="decorated-img"></div>
      </div>
      <div className='button-box'></div>
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
