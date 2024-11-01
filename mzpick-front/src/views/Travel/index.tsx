import React, { ChangeEvent, useEffect, useState } from 'react';
import { Map } from "react-kakao-maps-sdk";
import { useSearchLocationStore } from 'src/stores';
import { area } from './area';
import './style.css';
declare global {
  interface Window {
    kakao: any;
  }
}
interface MapContainerProps {
  searchLocation: string;
}

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
    setSearchLocation("");
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

const {kakao} = window;

const MapBox = ({searchLocation}:any) => {

  const [position, setPosition] = useState<{lat: number, lng: number}>({lat: 37.5642135, lng: 127.269311});
  
  useEffect(()=>{
    if(!searchLocation) return;

    const geocoder = new kakao.maps.services.Geocoder();

    geocoder.addressSearch(searchLocation,function(result:any, status:any){
      if(status === kakao.maps.services.Status.OK){
        const coords = new kakao.maps.LatLng(result[0].y,result[0].x);
        const position = { lng: coords.La, lat: coords.Ma };
        setPosition(position);
      } else{
        alert('주소를 찾을 수 없습니다.');
      }
    })
  },[searchLocation]);



  return (
    <Map // 지도를 표시할 Container
      id="map"
      center={position}
      level={3} // 지도의 확대 레벨
    />
  );
};

export default function TraveMap() {

  const { searchLocation, setSearchLocation } = useSearchLocationStore();
  const [searchWord, setSearchWord] = useState<string>('');

  const onSearchLocationChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearchWord(value);
  }

  const onSearchButtonClickHandler = () => {
    setSearchLocation(searchWord);
  }

  return (
    <div id='main-wrapper'>
      <div id='map-main'>
        <div className='map-wrapper'>
          <MapBox searchLocation={searchLocation}/>
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
              <input className='input-box' type="text" value={searchWord} placeholder='검색어를 입력해주세요' onChange={onSearchLocationChangeHandler} />
              <div onClick={onSearchButtonClickHandler}>검색</div>
            </div>
            <AreaSelect />
          </div>

        </div>
      </div>
    </div>
  )
};
