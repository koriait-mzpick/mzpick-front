// variable: 상대 경로 상수 //
export const API_URL = 'http://localhost:4000/api/v1'

export const ROOT_PATH = '/';
export const HOME_PATH = '/home'

export const SIGN_IN_PATH = '/sign-in'
export const ID_CHECK_PATH = '/id-check'
export const TEL_AUTH_PATH = '/tel-auth'
export const TEL_AUTH_CHECK_PATH = '/tel-auth-check'
export const SIGN_UP_PATH = '/sign-up'

export const TRAVEL_MAP_PATH='/travel/map'
export const TRAVEL_PATH='/travel'
export const TRAVEL_DETAIL_PATH='/travel/detail'
export const TRAVEL_WRITE_PATH='/travel/write'
export const TRAVEL_UPDATE_PATH='/travel/update'

export const TRAVEL_CAFE_PATH='/travel/cafe'
export const TRAVEL_CAFE_DETAIL_PATH='/travel/cafe/detail'
export const TRAVEL_CAFE_WRITE_PATH='/travel/cafe/write'

export const TRAVEL_STAY_DETAIL_PATH='/travel/stay/detail'
export const TRAVEL_STAY_PATH='/travel/stay'
export const TRAVEL_STAY_WRITE_PATH='/travel/stay/write'

export const TRAVEL_RESTAURANT_PATH='/travel/restaurant'
export const TRAVEL_RESTAURANT_DETAIL_PATH='/travel/restaurant/detail'
export const TRAVEL_RESTAURANT_WRITE_PATH='/travel/restaurant/write'

export const FASHION_PATH='/fashion'
export const FASHION_DETAIL_PATH = '/fashion/detail'
export const FASHION_WRITE_PATH = '/fashion/write'
export const FASHION_UPDATE_PATH = '/fashion/update'
export const KEYWORD_PATH='/keyword'

export const HOF_PATH = '/hof'
export const HOF_TRAVEL_PATH = '/hof/travel'
export const HOF_FOOD_PATH = '/hof/food'
export const HOF_FASHION_PATH = '/hof/fashion'

export const VOTE_PATH = '/vote'
export const VOTE_DETAILPATH = '/vote/vote-detail'
export const VOTE_DETAILPHOTOPATH = '/vote/vote-photo'
export const VOTE_DOUBLEPHOTOPATH = '/vote/vote-doublephoto'
export const VOTE_WRITEPATH = '/vote/vote-write'

export const MY_PAGE_PATH = '/mypage'

export const WRITE_PATH = '/write'

export const SNS_SUCCESS_PATH = '/sns-success';
export const OTHERS_PATH = '*';

// variable: 절대경로 상수

export const AUTH_ABSOLUTE_PATH = SIGN_IN_PATH;

export const HOME_ABSOLUTE_PATH = HOME_PATH;

export const TRAVEL_ABSOLUTE_DETAIL_PATH = (travelNumber: number | string) => `/travel/detail/${travelNumber}`;
export const FASHION_ABSOLUTE_DETAIL_PATH = (fashionNumber:number | string) => `/travel/detail/${fashionNumber}`;

export const FASHION_ABSOLUTE_UPDATE_PATH = (fashionNumber:number | string) => `/fashion/update/${fashionNumber}`;

// variable: HTTP BEARER TOKEN COOKIE NAME //
export const ACCESS_TOKEN = 'accessToken';
