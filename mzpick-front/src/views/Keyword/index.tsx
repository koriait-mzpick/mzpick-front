import './style.css';

export default function Keyword() {
  return (
      <div id='main-wrapper'>
    <div id='keyword-wrapper'>
      <div className='keyword-title'>
        <div className="keyword-title1">MZ</div>
        <div className="keyword-title2">픽</div>
        <div className="keyword-title3">&nbsp;키워드</div>
      </div>

      <div id='input-container'>
      <input type='text' placeholder="키워드를 입력해 주세요"></input>
      <div className='add-button'></div>
      </div>
    </div>
      <div className="keyowrd-contents">
      <div className='contents1'>빈 콘텐츠 영역입니다</div>
      <div className='contents2'>빈 콘텐츠 영역입니다</div>
      </div> 
      </div>
  )
}
