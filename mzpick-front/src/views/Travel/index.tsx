import React, { useEffect, useState } from 'react'
import axios from 'axios';

import './style.css';
declare global {
  interface Window {
    kakao: any;
  }
}



const MapBox = () => {

  useEffect(() => {
    let container = document.getElementById(`map`); // 지도를 담을 영역의 DOM 레퍼런스
    let options = {
      center: new window.kakao.maps.LatLng(37.564214, 127.001699), // 지도 중심 좌표
      level: 11, // 지도의 레벨(확대, 축소 정도)
    };

    let map = new window.kakao.maps.Map(container, options); // 지도 생성 및 객체 리턴
  }, []);

  return (
    <div id="map" />
  );
};

export default function TraveMap() {

  return (
    <div id='main-wrapper'>
      <div id='map-main'>
        <div className='right-map-wrapper'>
          <MapBox />
        </div>
        <div className='bar-box'>
          <div className='vertical-bar'></div>
        </div>
        <div className='left-map-wrapper'>
          <div className='right-box'>
            <div className='head-travel-title'>경상남도 김해시</div>
            <div className='middle-icon-box'>
              <div className='left-icon' />
              <div className='middle-icon' />
              <div className='right-icon' />
            </div>
            <div className='bottom-location-select'>
              <div className='location-input-box'>
                <input className='input-box' type="text" placeholder='검색어를 입력해주세요' />
              </div>
              <div className='location-selet-box'>
                <div className='location-select'>
                  <select className='select-box' name="" id="">
                    <option value="">제주</option>
                    <option value="">제주</option>
                    <option value="">제주</option>
                    <option value="">제주</option>
                  </select>
                </div>
                <div className='location-select'>
                  <select className='select-box' name="" id="">
                    <option value="">제주</option>
                    <option value="">제주</option>
                    <option value="">제주</option>
                    <option value="">제주</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
};
