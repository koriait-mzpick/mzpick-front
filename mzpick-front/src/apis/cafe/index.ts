import axios from "axios";
import { bearerAuthorization, MZPICK_API_DOMAIN, responseDataHandler, responseErrorHandler } from "..";
import { ResponseDto } from "../dto/response";
import { PatchTravelCafeRequestDto, PostTravelCafeCommentRequestDto, PostTravelCafeRequestDto } from "./dto/request";
import { GetCafeCommentResponseDto, GetCafeDetailResponseDto, GetCafeListResponseDto } from "./dto/response";

// variable: CAFE API URL 상수 //
const CAFE_MODULE_URL = `${MZPICK_API_DOMAIN}/api/v1/cafe`;

const GET_CAFE_LIST_API_URL = `${CAFE_MODULE_URL}/`;
const GET_CAFE_DETAIL_API_URL = (travelCafeNumber: number | string) => `${CAFE_MODULE_URL}/${travelCafeNumber}`;
const POST_CAFE_API_URL = `${CAFE_MODULE_URL}/}`;
const PATCH_CAFE_API_URL = (travelCafeNumber: number | string) => `${CAFE_MODULE_URL}/${travelCafeNumber}`;
const DELETE_CAFE_API_URL = (travelCafeNumber: number | string) => `${CAFE_MODULE_URL}/${travelCafeNumber}`;
const POST_UP_VIEW_CAFE_API_URL = (travelCafeNumber: number | string) => `${CAFE_MODULE_URL}/view/${travelCafeNumber}`;
const GET_CAFE_COMMENT_LIST_API_URL = (travelCafeNumber: number | string) => `${CAFE_MODULE_URL}/comment/${travelCafeNumber}`;
const POST_CAFE_COMMENT_API_URL = (travelCafeNumber: number | string) => `${CAFE_MODULE_URL}/comment/${travelCafeNumber}`;
const DELETE_CAFE_COMMENT_API_URL = (travelCafeCommentNumber: number | string) => `${CAFE_MODULE_URL}/comment/${travelCafeCommentNumber}`;
const PUT_CAFE_LIKE_API_URL = (travelCafeNumber: number | string) => `${CAFE_MODULE_URL}/like/${travelCafeNumber}`;
const PUT_CAFE_SAVE_API_URL = (travelCafeNumber: number | string) => `${CAFE_MODULE_URL}/save/${travelCafeNumber}`;

// ! cafe API 요청

// function: 카페 리스트 요청 함수 //
export const getCafeListRequest = async (page: number | string, searchLocation: string, hashtag: string) => {
    const responseBody = await axios.get(GET_CAFE_LIST_API_URL, { params: { page,searchLocation,hashtag} })
        .then(responseDataHandler<GetCafeListResponseDto>)
        .catch(responseErrorHandler);
    return responseBody;
};

// function: 카페 게시판 요청 함수 //
export const getCafeDetailRequest = async (travelCafeNumber: number | string) => {
    const responseBody = await axios.get(GET_CAFE_DETAIL_API_URL(travelCafeNumber))
        .then(responseDataHandler<GetCafeDetailResponseDto>)
        .catch(responseErrorHandler);
    return responseBody;
};

// function: 카페 게시판 작성 요청 함수 //
export const postCafeRequest = async (requestBody: PostTravelCafeRequestDto, accessToken: string) => {
    const responseBody = await axios.post(POST_CAFE_API_URL, requestBody, bearerAuthorization(accessToken))
        .then(responseDataHandler<ResponseDto>)
        .catch(responseErrorHandler);
    return responseBody;
};

// function: 카페 게시판 수정 요청 함수 //
export const pathcCafeRequest = async (requestBody: PatchTravelCafeRequestDto, travelCafeNumber: number | string, accessToken: string) => {
    const responseBody = await axios.patch(PATCH_CAFE_API_URL(travelCafeNumber), requestBody, bearerAuthorization(accessToken))
        .then(responseDataHandler<ResponseDto>)
        .catch(responseErrorHandler);
    return responseBody;
};

// function: 카페 게시판 삭제 요청 함수 //
export const deleteCafeRequest = async (travelCafeNumber: number | string, accessToken: string) => {
    const responseBody = await axios.delete(DELETE_CAFE_API_URL(travelCafeNumber), bearerAuthorization(accessToken))
        .then(responseDataHandler<ResponseDto>)
        .catch(responseErrorHandler);
    return responseBody;
};

//function: 카페 게시판 조회수 증가 요청 함수 //
export const postUpViewCafeRequest = async (travelCafeNumber: number | string) => {
    const responseBody = await axios.post(POST_UP_VIEW_CAFE_API_URL(travelCafeNumber))
        .then(responseDataHandler<ResponseDto>)
        .catch(responseErrorHandler);
    return responseBody;
};

//function : 해당 카페 게시판 댓글 리스트 요청 함수 //
export const getCafeCommentListRequest = async (travelCafeNumber: number | string) => {
    const responseBody = await axios.get(GET_CAFE_COMMENT_LIST_API_URL(travelCafeNumber))
        .then(responseDataHandler<GetCafeCommentResponseDto>)
        .catch(responseErrorHandler);
    return responseBody;
};

//function : 해당 카페 게시판 댓글 작성 요청 함수 //
export const postCafeCommentRequest = async (requestbody: PostTravelCafeCommentRequestDto, travelCafeNumber: number | string, accessToken: string) => {
    const responseBody = await axios.post(POST_CAFE_COMMENT_API_URL(travelCafeNumber), requestbody, bearerAuthorization(accessToken))
        .then(responseDataHandler<ResponseDto>)
        .catch(responseErrorHandler);
    return responseBody;
};

//function : 해당 카페 게시판 댓글 삭제 요청 함수 //
export const deleteCafeCommentRequest = async (travelCafeCommentNumber: number | string, accessToken: string) => {
    const responseBody = await axios.delete(DELETE_CAFE_COMMENT_API_URL(travelCafeCommentNumber), bearerAuthorization(accessToken))
        .then(responseDataHandler<ResponseDto>)
        .catch(responseErrorHandler);
    return responseBody;
};

// function : 카페 좋아요 버튼 클릭 요청 함수 //
export const putCafeLikeRequest = async (travelCafeNumber: number | string, accessToken: string) => {
    const responseBody = await axios.put(PUT_CAFE_LIKE_API_URL(travelCafeNumber), bearerAuthorization(accessToken))
        .then(responseDataHandler<ResponseDto>)
        .catch(responseErrorHandler);
    return responseBody;
};

// function : 카페 저장 버튼 클릭 요청 함수 //
export const putCafeSaveRequest = async (travelCafeNumber: number | string, accessToken: string) => {
    const responseBody = await axios.put(PUT_CAFE_SAVE_API_URL(travelCafeNumber), bearerAuthorization(accessToken))
        .then(responseDataHandler<ResponseDto>)
        .catch(responseErrorHandler);
    return responseBody;
};
