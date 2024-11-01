import React, { ChangeEvent, useEffect, useState , KeyboardEvent} from 'react';
import { useSearchLocationStore } from 'src/stores';
import { area } from './area';
import './style.css';

import { Map, MapMarker } from "react-kakao-maps-sdk"
import { useLocation, useNavigate } from 'react-router';
import { TRAVEL_CAFE_PATH, TRAVEL_PATH, TRAVEL_RESTAURANT_PATH, TRAVEL_STAY_PATH, VOTE_PATH } from '../../constants';

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

  const [searchWord, setSearchWord] = useState<string>('');


  // 선택된 지역에 따라 하위 지역 목록을 가져옴
  const subAreas = area.find((area) => area.name === selectedArea)?.subArea || [];

  // 이벤트 핸들러
  const onSelectAreaChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedArea(e.target.value);
    setSelectedSubArea(""); // 새로운 지역 선택 시 하위 지역 초기화
    setSearchWord('');
    setSearchLocation('');
  };

  const onSelectSubAreaChangeHanler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSubArea(e.target.value);
  };

  const onSearchLocationChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearchWord(value);
    setSelectedArea('');
    setSearchLocation('');
  }

  const onSearchWordButtonClickHandler = () => {
    setSearchLocation(searchWord);
  }


  const onSearchButtonClickHandler = () => {
    setSearchLocation(searchWord);
    if (!searchWord) setSearchLocation(selectedArea + ' ' + selectedSubArea);
  }

  const onkeyDownSearchKeywordHandler = (event : KeyboardEvent<HTMLInputElement> | any) => {
    
    if(event.isComposing || event.keyCode === 229) return; 
    if (event.key === 'Enter') {
      setSearchLocation(searchWord);
    }
  }
  return (
    <div className='search-wrapper'>
      <div className='search-box'>
        <input className='map-input-box' type="text" value={searchWord} placeholder='지역의 전체 이름을 입력해주세요 ex)부산광역시 남구' onKeyDown={onkeyDownSearchKeywordHandler} onChange={onSearchLocationChangeHandler} />
        <div className='select-box'>
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
        </div>
      </div>
      <div className='search-button' onClick={onSearchButtonClickHandler}>검색</div>
    </div >
  );
};

const { kakao } = window;

const MapBox = ({ searchLocation }: any) => {

  const [position, setPosition] = useState<{ lat: number, lng: number }>({ lat: 37.5642135, lng: 126.9769 });

  useEffect(() => {
    if (!searchLocation) return;

    const geocoder = new kakao.maps.services.Geocoder();

    geocoder.addressSearch(searchLocation, function (result: any, status: any) {
      if (status === kakao.maps.services.Status.OK) {
        const coords = new kakao.maps.LatLng(result[0].y, result[0].x);
        const position = { lng: coords.La, lat: coords.Ma };
        setPosition(position);
      }
    })
  }, [searchLocation]);

  return (
    <Map // 지도를 표시할 Container
      id='map'
      center={position}
      level={4} // 지도의 확대 레벨
      >
      <MapMarker // 마커를 생성합니다
        position={position}
        />
    </Map>
  );
};

export default function TraveMap() {

  const navigator = useNavigate();

  const onClickMoveLocationHandler = (path: string) => {
    navigator(path);
  };

  const { searchLocation, setSearchLocation } = useSearchLocationStore();

  const searchLocationUrl = useLocation();

  useEffect(() => {
    console.log(searchLocationUrl);
    console.log(searchLocation);
    setSearchLocation("");
  }, [])

  return (
    <div id='main-wrapper'>
      <div id='map-main'>
        <div className='map-wrapper'>
          <MapBox searchLocation={searchLocation} />
        </div>
        <div className='bar-box'>
          <div className='vertical-bar'></div>
        </div>
        <div className='map-wrapper'>
          <div className='right-box'>
            <div className='head-travel-title'>{searchLocation}</div>
            <div className='middle-icon-box'>
              <div className='left-icon' onClick={() => onClickMoveLocationHandler(TRAVEL_PATH)} />
              <div className='middle-icon-1' onClick={() => onClickMoveLocationHandler(TRAVEL_RESTAURANT_PATH)} />
              <div className='middle-icon-2' onClick={() => onClickMoveLocationHandler(TRAVEL_CAFE_PATH)} />
              <div className='right-icon' onClick={() => onClickMoveLocationHandler(TRAVEL_STAY_PATH)} />
            </div>
            <AreaSelect />
          </div>

        </div>
      </div>
    </div>
  )
};
