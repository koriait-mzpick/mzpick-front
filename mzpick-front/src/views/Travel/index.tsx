import React, { ChangeEvent, useEffect, useState } from 'react'
import axios from 'axios';
import { area } from './area';
import './style.css';
import { useSearchLocationStore } from 'src/stores';
declare global {
  interface Window {
    kakao: any;
  }
}

// export const [loactionTitle, setLocationTitle] = useState<string>("");

const AreaSelect = () => {
  // 상태 관리
  const [selectedArea, setSelectedArea] = useState<string>("");
  const [selectedSubArea, setSelectedSubArea] = useState<string>("");

  const { setSearchLocation } = useSearchLocationStore();

  // 선택된 지역에 따라 하위 지역 목록을 가져옴
  const subAreas = area.find((area) => area.name === selectedArea)?.subArea || [];

  // 이벤트 핸들러
  const onSelectAreaChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedArea(e.target.value);
    setSelectedSubArea(""); // 새로운 지역 선택 시 하위 지역 초기화
  };

  const onSelectSubAreaChangeHanler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSubArea(e.target.value);
  };

  const onSearchButtonClickHandler = () => {
    setSearchLocation(selectedArea + ' ' + selectedSubArea);
  }

  return (
    <div className='search-wrapper'>
        <select value={selectedArea} onChange={onSelectAreaChangeHandler} className="location-select">
          <option value="">지역을 선택해주세요</option>
          {area.map((area) => (
            <option key={area.name} value={area.name}>
              {area.name}
            </option>
          ))}
        </select>
        {selectedArea && (
          <select value={selectedSubArea} onChange={onSelectSubAreaChangeHanler} className="location-select">
            <option value="" >시, 군, 구를 선택해주세요</option>
            {subAreas.map((subArea) => (
              <option key={subArea} value={subArea}>
                {subArea}
              </option>
            ))}
          </select>
        )}
      <div className='search-button' onClick={onSearchButtonClickHandler}>검색</div>
    </div>
  );
};



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

  const { searchLocation, setSearchLocation } = useSearchLocationStore();

  const onSearchLocationChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearchLocation(value);
  }

  return (
    <div id='main-wrapper'>
      <div id='map-main'>
        <div className='map-wrapper'>
          <MapBox />
        </div>
        <div className='bar-box'>
          <div className='vertical-bar'></div>
        </div>
        <div className='map-wrapper'>
          <div className='right-box'>
            <div className='head-travel-title'>{searchLocation}</div>
            <div className='middle-icon-box'>
              <div className='left-icon' />
              <div className='middle-icon' />
              <div className='right-icon' />
            </div>
            <div className='bottom-location-search'>
              <input className='input-box' type="text" value={searchLocation} placeholder='검색어를 입력해주세요' onChange={onSearchLocationChangeHandler} />
            </div>
            <AreaSelect />
          </div>

        </div>
      </div>
    </div>
  )
};
