import React from 'react';
import './style.css';

// interface: 페이지네이션 컴포넌트 properties //
interface PaginationProp {
    pageList: number[];
    currentPage: number;
    onPageClickHandler: (page: number) => void;
    onPreSectionClickHandler: () => void;
    onNextSectionClickHandler: () => void;
}

// component: 페이지네이션 컴포넌트 //
export default function Pagination1({ 
    pageList,
    currentPage,
    onPageClickHandler,
    onPreSectionClickHandler,
    onNextSectionClickHandler,
}: PaginationProp) {

    // render: 페이지네이션 컴포넌트 렌더링 //
    return (
        <div className='page-box2'>
            <div className='pageBox1' onClick={onPreSectionClickHandler}></div>
            <div className='pageBox'>
                {pageList.map(page2 => <div key={page2} className={page2 === currentPage ? 'page2-active' : 'page2'} onClick={() => onPageClickHandler(page2)}>{page2}</div>)}
            </div>
            <div className='pageBox2' onClick={onNextSectionClickHandler}></div>
        </div>
    )
}