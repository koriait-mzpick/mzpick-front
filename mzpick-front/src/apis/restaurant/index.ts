import axios from "axios";
import { bearerAuthorization, MZPICK_API_DOMAIN, responseDataHandler, responseErrorHandler } from "..";
import { ResponseDto } from "../dto/response";
import { PatchTravelFoodRequestDto, PostTravelFoodCommentRequestDto, PostTravelFoodRequestDto } from "./dto/request";
import { GetRestaurantCommentResponseDto, GetRestaurantDetailResponseDto, GetRestaurantListResponseDto } from "./dto/response";

// variable: RESTAURANT API URL 상수 //
const RESTAURANT_MODULE_URL = `${MZPICK_API_DOMAIN}/api/v1/food`;

const GET_RESTAURANT_LIST_API_URL = `${RESTAURANT_MODULE_URL}/`;
const GET_RESTAURANT_DETAIL_API_URL = (travelFoodNumber: number | string) => `${RESTAURANT_MODULE_URL}/${travelFoodNumber}`;
const POST_RESTAURANT_API_URL = `${RESTAURANT_MODULE_URL}/}`;
const PATCH_RESTAURANT_API_URL = (travelFoodNumber: number | string) => `${RESTAURANT_MODULE_URL}/${travelFoodNumber}`;
const DELETE_RESTAURANT_API_URL = (travelFoodNumber: number | string) => `${RESTAURANT_MODULE_URL}/${travelFoodNumber}`;
const POST_UP_VIEW_RESTAURANT_API_URL = (travelFoodNumber: number | string) => `${RESTAURANT_MODULE_URL}/view/${travelFoodNumber}`;
const GET_RESTAURANT_COMMENT_LIST_API_URL = (travelFoodNumber: number | string) => `${RESTAURANT_MODULE_URL}/comment/${travelFoodNumber}`;
const POST_RESTAURANT_COMMENT_API_URL = (travelFoodNumber: number | string) => `${RESTAURANT_MODULE_URL}/comment/${travelFoodNumber}`;
const DELETE_RESTAURANT_COMMENT_API_URL = (travelFoodCommentNumber: number | string) => `${RESTAURANT_MODULE_URL}/comment/${travelFoodCommentNumber}`;
const PUT_RESTAURANT_LIKE_API_URL = (travelFoodNumber: number | string) => `${RESTAURANT_MODULE_URL}/like/${travelFoodNumber}`;
const PUT_RESTAURANT_SAVE_API_URL = (travelFoodNumber: number | string) => `${RESTAURANT_MODULE_URL}/save/${travelFoodNumber}`;

// ! restaurant

// function: 맛집 리스트 요청 함수 //
export const getRestaurantListRequest = async (page: number | string, searchLocation: string, hashtag:string) => {
    const responseBody = await axios.get(GET_RESTAURANT_LIST_API_URL, { params: { page, searchLocation,hashtag } })
        .then(responseDataHandler<GetRestaurantListResponseDto>)
        .catch(responseErrorHandler);
    return responseBody;
};

// function: 맛집 게시판 요청 함수 //
export const getRestaurantDetailRequest = async (travelFoodNumber: number | string) => {
    const responseBody = await axios.get(GET_RESTAURANT_DETAIL_API_URL(travelFoodNumber))
        .then(responseDataHandler<GetRestaurantDetailResponseDto>)
        .catch(responseErrorHandler);
    return responseBody;
};

// function: 맛집 게시판 작성 요청 함수 //
export const postRestaurantRequest = async (requestBody: PostTravelFoodRequestDto, accessToken: string) => {
    const responseBody = await axios.post(POST_RESTAURANT_API_URL, requestBody, bearerAuthorization(accessToken))
        .then(responseDataHandler<ResponseDto>)
        .catch(responseErrorHandler);
    return responseBody;
};

// function: 맛집 게시판 수정 요청 함수 //
export const pathcRestaurantRequest = async (requestBody: PatchTravelFoodRequestDto, travelFoodNumber: number | string, accessToken: string) => {
    const responseBody = await axios.patch(PATCH_RESTAURANT_API_URL(travelFoodNumber), requestBody, bearerAuthorization(accessToken))
        .then(responseDataHandler<ResponseDto>)
        .catch(responseErrorHandler);
    return responseBody;
};

// function: 맛집 게시판 삭제 요청 함수 //
export const deleteRestaurantRequest = async (travelFoodNumber: number | string, accessToken: string) => {
    const responseBody = await axios.delete(DELETE_RESTAURANT_API_URL(travelFoodNumber), bearerAuthorization(accessToken))
        .then(responseDataHandler<ResponseDto>)
        .catch(responseErrorHandler);
    return responseBody;
};

//function: 맛집 게시판 조회수 증가 요청 함수 //
export const postUpViewRestaurantRequest = async (travelFoodNumber: number | string) => {
    const responseBody = await axios.post(POST_UP_VIEW_RESTAURANT_API_URL(travelFoodNumber))
        .then(responseDataHandler<ResponseDto>)
        .catch(responseErrorHandler);
    return responseBody;
};

//function : 해당 맛집 게시판 댓글 리스트 요청 함수 //
export const getRestaurantCommentListRequest = async (travelFoodNumber: number | string) => {
    const responseBody = await axios.get(GET_RESTAURANT_COMMENT_LIST_API_URL(travelFoodNumber))
        .then(responseDataHandler<GetRestaurantCommentResponseDto>)
        .catch(responseErrorHandler);
    return responseBody;
};

//function : 해당 맛집 게시판 댓글 작성 요청 함수 //
export const postRestaurantCommentRequest = async (requestbody: PostTravelFoodCommentRequestDto, travelFoodNumber: number | string, accessToken: string) => {
    const responseBody = await axios.post(POST_RESTAURANT_COMMENT_API_URL(travelFoodNumber), requestbody, bearerAuthorization(accessToken))
        .then(responseDataHandler<ResponseDto>)
        .catch(responseErrorHandler);
    return responseBody;
};

//function : 해당 맛집 게시판 댓글 삭제 요청 함수 //
export const deleteRestaurantCommentRequest = async (travelFoodCommentNumber: number | string, accessToken: string) => {
    const responseBody = await axios.delete(DELETE_RESTAURANT_COMMENT_API_URL(travelFoodCommentNumber), bearerAuthorization(accessToken))
        .then(responseDataHandler<ResponseDto>)
        .catch(responseErrorHandler);
    return responseBody;
};

// function : 맛집 좋아요 버튼 클릭 요청 함수 //
export const putRestaurantLikeRequest = async (travelFoodNumber: number | string, accessToken: string) => {
    const responseBody = await axios.put(PUT_RESTAURANT_LIKE_API_URL(travelFoodNumber), bearerAuthorization(accessToken))
        .then(responseDataHandler<ResponseDto>)
        .catch(responseErrorHandler);
    return responseBody;
};

// function : 맛집 저장 버튼 클릭 요청 함수 //
export const putRestaurantSaveRequest = async (travelFoodNumber: number | string, accessToken: string) => {
    const responseBody = await axios.put(PUT_RESTAURANT_SAVE_API_URL(travelFoodNumber), bearerAuthorization(accessToken))
        .then(responseDataHandler<ResponseDto>)
        .catch(responseErrorHandler);
    return responseBody;
};