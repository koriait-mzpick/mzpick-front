
import './style.css';

function FashionTop1() {

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
      <div className='button-box'>○</div>
      <div className='button-box'>○</div>
      <div className='button-box'>○</div>
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
