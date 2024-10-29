import React, { useState } from 'react'
import './style.css';


// component: 내용 컴포넌트 //
function Content() {

  // state: 북마크 상태 //
  const [boorMarkClick, setBookMarkClick] = useState(false);

  // state: 좋아요 상태 //
  const [likeClick, setLikeClick] = useState(false);

  // event handler: 북마크 클릭 이벤트 처리 //
  const bookMarkClickHandler = () => {
    setBookMarkClick(!boorMarkClick);
  }

  // event handler: 좋아요 클릭 이벤트 처리 //
  const likeClcikHandler = () => {
    setLikeClick(!likeClick);
  }

  // render: 내용 컴포넌트 렌더링 //
  return (
    <div id='contents-main'>
      <div className='contents-top'>
        <div className='contents-top-left'>
          <div className='contents-top-title'>제목</div>
          <div className='contents-top-date'>2024-12-12</div>
        </div>
        <div className='contents-top-vote-button-box'>
          <div className='contents-top-vote-button'>투표</div>
        </div>
      </div>
      <div className='contents-image'>
        <div className='contents-image-left-button'></div>
        <div className='contents-image-right-button'></div>
      </div>
      <div className='contents-text'>asdThere are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined</div>
      <div className='contents-information'>
        <div className='contents-information-left'>#잉</div>
        <div className='contents-information-right'>
          <div className='contents-information-like'>
            <div className={`contents-information-like-icon ${likeClick ? 'active' : ''}`} onClick={likeClcikHandler}></div>
            <div className='contents-information-data'>32123123</div>
          </div>
          <div className='contents-information-view'>
            <div className='contents-information-view-icon'></div>
            <div className='contents-information-data'>32</div>
          </div>
          <div className={`contents-information-bookmark ${boorMarkClick ? 'active' : ''}`} onClick={bookMarkClickHandler}></div>
        </div>
      </div>
    </div>
  )
}

// component: 댓글 컴포넌트 //
function Comment() {

  // state: 댓글창 상태 //
  const [commentOpen, setCommentOpen] = useState(false);

  // state: 댓글 좋아요 상태 //
  const [commentLikeClick, setCommentLikeClick] = useState(false);

  // event handler: 댓글창 오픈 이벤트 처리 //
  const commentOpenHandler = () => {
    setCommentOpen(!commentOpen);
  }

  // event handler: 댓글 좋아요 클릭 이벤트 처리 //
  const commentLikeClcikHandler = () => {
    setCommentLikeClick(!commentLikeClick);
  }

  // render: 댓글 컴포넌트 렌더링 //
  return (
    <div id='comment-main'>
      <div className='comment-button-box'>
        <div className='comment-open-button' onClick={commentOpenHandler}>
          {commentOpen ? "댓글 닫기" : "댓글 열기"}
        </div>
        <div className='comment-button-box-right'>
          <div className='comment-update-button'>수정</div>
          <div className='comment-delete-button'>삭제</div>
        </div>
      </div>
      {commentOpen &&
        <div className='comment-detail'>
          <div className='comment-detail-top'>
            <textarea className='comment-detail-write' placeholder='댓글을 작성하세요.'></textarea>
            <div className='comment-detail-add-button-box'>
              <div className='comment-detail-add-button'>댓글 추가</div>
            </div>
          </div>

          <div className='comment-detail-bottom'>
            <div className='comment-detail-writer'>
              <div className='comment-detail-name'>DAN</div>
              <div className='comment-detail-button'>
                <div className='comment-detail-delete-button'>수정</div>
                <div className='comment-detail-update-button'>삭제</div>
              </div>
            </div>
            <div className='comment-detail-text-box'>
              <div className='comment-detail-text'>It is a long established fact that a reader will be disIt is a long established fact that a reader will be distracted by the reada</div>
              <div className='comment-detail-like-box'>
                <div className={`comment-detail-like ${commentLikeClick ? 'active' : ''}`} onClick={commentLikeClcikHandler}></div>
              </div>
            </div>
          </div>
        </div>
      }
    </div>
  )
}


export default function Detail() {
  return (
    <div id='detail-main'>
      <Content />
      <Comment />
    </div>
  )
}
