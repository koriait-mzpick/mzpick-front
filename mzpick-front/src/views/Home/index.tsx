import './style.css';

export default function Home() {

  return (
    <div id='home'>
      <div className='home-media'>
        <iframe width="100%" height="100%" src="https://www.youtube.com/embed/mnGtc3wECc0?si=xcdDElbK80f3B8uA"
          title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen>
        </iframe>
      </div>
      <div className='home-text'>
        <div className='introduce-text'>"Pick Your Trend"</div>
        <div className='icon-box'></div>
        <div className='detail-introduce'>"Discover Trends, Curate Your Style Today!"</div>
      </div>
      <div className='home-category'></div>
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
