import axios from "axios";
import { MZPICK_API_DOMAIN, responseDataHandler, responseErrorHandler, bearerAuthorization } from "..";
import { GetMyPageUserDetailResponseDto } from "./dto/response/user";
import { ResponseDto } from "../dto/response";
import { GetMyPageCafeBoardResponseDto, GetMyPageFashionBoardResponseDto, GetMyPageRestaurantBoardResponseDto, GetMyPageStayBoardResponseDto, GetMyPageTravelBoardResponseDto } from "./dto/response/board";
import { GetMyPageCafeLikeResponseDto, GetMyPageFashionLikeResponseDto, GetMyPageRestaurantLikeResponseDto, GetMyPageStayLikeResponseDto, GetMyPageTravelLikeResponseDto } from "./dto/response/like";
import { GetMyPageCafeSaveResponseDto, GetMyPageFashionSaveResponseDto, GetMyPageRestaurantSaveResponseDto, GetMyPageStaySaveResponseDto, GetMyPageTravelSaveResponseDto } from "./dto/response/save";
import { GetMyPageFashionVoteResponseDto, GetMyPageTravelVoteResponseDto } from "./dto/response/vote";

const MYPAGE_MODULE_URL = `${MZPICK_API_DOMAIN}/api/v1/mypage`

const GET_MYPAGE_USER_DETAIL_API_URL = `${MYPAGE_MODULE_URL}/user`;
const DELETE_MYPAGE_USER_API_URL = `${MYPAGE_MODULE_URL}/user`;

const GET_MYPAGE_SAVE_TRAVEL_LIST_API_URL = `${MYPAGE_MODULE_URL}/save-travel`
const GET_MYPAGE_SAVE_STAY_LIST_API_URL = `${MYPAGE_MODULE_URL}/save-stay`
const GET_MYPAGE_SAVE_RESTAURANT_LIST_API_URL = `${MYPAGE_MODULE_URL}/save-food`
const GET_MYPAGE_SAVE_CAFE_LIST_API_URL = `${MYPAGE_MODULE_URL}/save-cafe`
const GET_MYPAGE_SAVE_FASHION_LIST_API_URL = `${MYPAGE_MODULE_URL}/save-fashion`

const GET_MYPAGE_LIKE_TRAVEL_LIST_API_URL = `${MYPAGE_MODULE_URL}/like-travel`
const GET_MYPAGE_LIKE_STAY_LIST_API_URL = `${MYPAGE_MODULE_URL}/like-stay`
const GET_MYPAGE_LIKE_RESTAURANT_LIST_API_URL = `${MYPAGE_MODULE_URL}/like-food`
const GET_MYPAGE_LIKE_CAFE_LIST_API_URL = `${MYPAGE_MODULE_URL}/like-cafe`
const GET_MYPAGE_LIKE_FASHION_LIST_API_URL = `${MYPAGE_MODULE_URL}/like-fashion`

const GET_MYPAGE_TRAVEL_BOARD_API_URL = `${MYPAGE_MODULE_URL}/write-travel`
const GET_MYPAGE_STAY_BOARD_API_URL = `${MYPAGE_MODULE_URL}/write-stay`
const GET_MYPAGE_RESTAURANT_BOARD_API_URL = `${MYPAGE_MODULE_URL}/write-food`
const GET_MYPAGE_CAFE_BOARD_API_URL = `${MYPAGE_MODULE_URL}/write-cafe`
const GET_MYPAGE_FASHION_BOARD_API_URL = `${MYPAGE_MODULE_URL}/write-fashion`

const GET_MYPAGE_TRAVEL_VOTE_API_URL = `${MYPAGE_MODULE_URL}/vote-travel`
const GET_MYPAGE_FASHION_VOTE_API_URL = `${MYPAGE_MODULE_URL}/vote-fashion`

// function: 마이페이지 유저 정보 요청 함수 //
export const getMyPageUserDetailRequest = async (accessToken: string) => {
    const responseBody = await axios.get(GET_MYPAGE_USER_DETAIL_API_URL, bearerAuthorization(accessToken))
        .then(responseDataHandler<GetMyPageUserDetailResponseDto>)
        .catch(responseErrorHandler);
    return responseBody;
};

// function: 마이페이지 유저 삭제 요청 함수 //
export const deleteMyPageUserRequest = async (accessToken: string) => {
    const responseBody = await axios.delete(GET_MYPAGE_USER_DETAIL_API_URL, bearerAuthorization(accessToken))
        .then(responseDataHandler<ResponseDto>)
        .catch(responseErrorHandler);
    return responseBody;
};

// function: 마이페이지 여행 리스트 요청 함수 //
export const getMyPageTravelBoardRequest = async (accessToken: string) => {
    const responseBody = await axios.get(GET_MYPAGE_TRAVEL_BOARD_API_URL, bearerAuthorization(accessToken))
        .then(responseDataHandler<GetMyPageTravelBoardResponseDto>)
        .catch(responseErrorHandler);
    return responseBody;
};

// function: 마이페이지 여행 좋아요 리스트 요청 함수 //
export const getMyPageTravelLikeListRequest = async (accessToken: string) => {
    const responseBody = await axios.get(GET_MYPAGE_LIKE_TRAVEL_LIST_API_URL, bearerAuthorization(accessToken))
        .then(responseDataHandler<GetMyPageTravelLikeResponseDto>)
        .catch(responseErrorHandler);
    return responseBody;
};

// function: 마이페이지 여행 저장 리스트 요청 함수 //
export const getMyPageTravelSaveListRequest = async (accessToken: string) => {
    const responseBody = await axios.get(GET_MYPAGE_SAVE_TRAVEL_LIST_API_URL, bearerAuthorization(accessToken))
        .then(responseDataHandler<GetMyPageTravelSaveResponseDto>)
        .catch(responseErrorHandler);
    return responseBody;
};

// function: 마이페이지 숙박 리스트 요청 함수 //
export const getMyPageStayBoardRequest = async (accessToken: string) => {
    const responseBody = await axios.get(GET_MYPAGE_STAY_BOARD_API_URL, bearerAuthorization(accessToken))
        .then(responseDataHandler<GetMyPageStayBoardResponseDto>)
        .catch(responseErrorHandler);
    return responseBody;
};

// function: 마이페이지 숙박 좋아요 리스트 요청 함수 //
export const getMyPageStayLikeListRequest = async (accessToken: string) => {
    const responseBody = await axios.get(GET_MYPAGE_LIKE_STAY_LIST_API_URL, bearerAuthorization(accessToken))
        .then(responseDataHandler<GetMyPageStayLikeResponseDto>)
        .catch(responseErrorHandler);
    return responseBody;
};

// function: 마이페이지 숙박 저장 리스트 요청 함수 //
export const getMyPageStaySaveListRequest = async (accessToken: string) => {
    const responseBody = await axios.get(GET_MYPAGE_SAVE_STAY_LIST_API_URL, bearerAuthorization(accessToken))
        .then(responseDataHandler<GetMyPageStaySaveResponseDto>)
        .catch(responseErrorHandler);
    return responseBody;
};



// function: 마이페이지 맛집 리스트 요청 함수 //
export const getMyPageRestaurantBoardRequest = async (accessToken: string) => {
    const responseBody = await axios.get(GET_MYPAGE_RESTAURANT_BOARD_API_URL, bearerAuthorization(accessToken))
        .then(responseDataHandler<GetMyPageRestaurantBoardResponseDto>)
        .catch(responseErrorHandler);
    return responseBody;
};


// function: 마이페이지 맛집 좋아요 리스트 요청 함수 //
export const getMyPageRestaurantLikeListRequest = async (accessToken: string) => {
    const responseBody = await axios.get(GET_MYPAGE_LIKE_RESTAURANT_LIST_API_URL, bearerAuthorization(accessToken))
        .then(responseDataHandler<GetMyPageRestaurantLikeResponseDto>)
        .catch(responseErrorHandler);
    return responseBody;
};

// function: 마이페이지 맛집 저장 리스트 요청 함수 //
export const getMyPageRestaurantSaveListRequest = async (accessToken: string) => {
    const responseBody = await axios.get(GET_MYPAGE_SAVE_RESTAURANT_LIST_API_URL, bearerAuthorization(accessToken))
        .then(responseDataHandler<GetMyPageRestaurantSaveResponseDto>)
        .catch(responseErrorHandler);
    return responseBody;
};

// function: 마이페이지 카페 리스트 요청 함수 //
export const getMyPageCafeBoardRequest = async (accessToken: string) => {
    const responseBody = await axios.get(GET_MYPAGE_CAFE_BOARD_API_URL, bearerAuthorization(accessToken))
        .then(responseDataHandler<GetMyPageCafeBoardResponseDto>)
        .catch(responseErrorHandler);
    return responseBody;
};

// function: 마이페이지 카페 좋아요 리스트 요청 함수 //
export const getMyPageCafeLikeListRequest = async (accessToken: string) => {
    const responseBody = await axios.get(GET_MYPAGE_LIKE_CAFE_LIST_API_URL, bearerAuthorization(accessToken))
        .then(responseDataHandler<GetMyPageCafeLikeResponseDto>)
        .catch(responseErrorHandler);
    return responseBody;
};

// function: 마이페이지 카페 저장 리스트 요청 함수 //
export const getMyPageCafeSaveListRequest = async (accessToken: string) => {
    const responseBody = await axios.get(GET_MYPAGE_SAVE_CAFE_LIST_API_URL, bearerAuthorization(accessToken))
        .then(responseDataHandler<GetMyPageCafeSaveResponseDto>)
        .catch(responseErrorHandler);
    return responseBody;
};

// function: 마이페이지 페션 리스트 요청 함수 //
export const getMyPageFashionBoardRequest = async (accessToken: string) => {
    const responseBody = await axios.get(GET_MYPAGE_FASHION_BOARD_API_URL, bearerAuthorization(accessToken))
        .then(responseDataHandler<GetMyPageFashionBoardResponseDto>)
        .catch(responseErrorHandler);
    return responseBody;
};

// function: 마이페이지 페션 좋아요 리스트 요청 함수 //
export const getMyPageFashionLikeListRequest = async (accessToken:string) => {
    const responseBody = await axios.get(GET_MYPAGE_LIKE_FASHION_LIST_API_URL, bearerAuthorization(accessToken))
        .then(responseDataHandler<GetMyPageFashionLikeResponseDto>)
        .catch(responseErrorHandler);
    return responseBody;
};

// function: 마이페이지 페션 저장 리스트 요청 함수 //
export const getMyPageFashionSaveListRequest = async (accessToken:string) => {
    const responseBody = await axios.get(GET_MYPAGE_SAVE_FASHION_LIST_API_URL, bearerAuthorization(accessToken))
        .then(responseDataHandler<GetMyPageFashionSaveResponseDto>)
        .catch(responseErrorHandler);
    return responseBody;
};

// function: 마이페이지 여행 투표 정보 요청 함수 //
export const getMyPageTravelVoteRequest = async (accessToken: string) => {
    const responseBody = await axios.get(GET_MYPAGE_TRAVEL_VOTE_API_URL, bearerAuthorization(accessToken))
        .then(responseDataHandler<GetMyPageTravelVoteResponseDto>)
        .catch(responseErrorHandler);
    return responseBody;
};

// function: 마이페이지 패션 투표 정보 요청 함수 //
export const getMyPageFashionVoteRequest = async (accessToken: string) => {
    const responseBody = await axios.get(GET_MYPAGE_FASHION_VOTE_API_URL, bearerAuthorization(accessToken))
        .then(responseDataHandler<GetMyPageFashionVoteResponseDto>)
        .catch(responseErrorHandler);
    return responseBody;
};