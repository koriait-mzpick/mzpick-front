// variable: STAY API URL 상수 //

import axios from "axios";
import { bearerAuthorization, MZPICK_API_DOMAIN, responseDataHandler, responseErrorHandler } from "..";
import { ResponseDto } from "../dto/response";
import { PatchTravelStayRequestDto, PostTravelStayCommentRequestDto, PostTravelStayRequestDto } from "./dto/request";
import { GetStayCommentResponseDto, GetStayDetailResponseDto, GetStayListResponseDto } from "./dto/response";

const STAY_MODULE_URL = `${MZPICK_API_DOMAIN}/api/v1/stay`;

const GET_STAY_LIST_API_URL = `${STAY_MODULE_URL}/`;
const GET_STAY_DETAIL_API_URL = (travelStayNumber: number | string) => `${STAY_MODULE_URL}/${travelStayNumber}`;
const POST_STAY_API_URL = `${STAY_MODULE_URL}/`;
const PATCH_STAY_API_URL = (travelStayNumber: number | string) => `${STAY_MODULE_URL}/${travelStayNumber}`;
const DELETE_STAY_API_URL = (travelStayNumber: number | string) => `${STAY_MODULE_URL}/${travelStayNumber}`;
const POST_UP_VIEW_STAY_API_URL = (travelStayNumber: number | string) => `${STAY_MODULE_URL}/view/${travelStayNumber}`;
const GET_STAY_COMMENT_LIST_API_URL = (travelStayNumber: number | string) => `${STAY_MODULE_URL}/comment/${travelStayNumber}`;
const POST_STAY_COMMENT_API_URL = (travelStayNumber: number | string) => `${STAY_MODULE_URL}/comment/${travelStayNumber}`;
const DELETE_STAY_COMMENT_API_URL = (travelStayCommentNumber: number | string) => `${STAY_MODULE_URL}/comment/${travelStayCommentNumber}`;
const PUT_STAY_LIKE_API_URL = (travelStayNumber: number | string) => `${STAY_MODULE_URL}/like/${travelStayNumber}`;
const PUT_STAY_SAVE_API_URL = (travelStayNumber: number | string) => `${STAY_MODULE_URL}/save/${travelStayNumber}`;

// ! STAY 숙박 요청 

// function: 숙박 리스트 요청 함수 //
export const getStayListRequest = async (page: number | string, searchLocation: string, hashtag:string) => {
    const responseBody = await axios.get(GET_STAY_LIST_API_URL, { params: { page,searchLocation,hashtag } })
        .then(responseDataHandler<GetStayListResponseDto>)
        .catch(responseErrorHandler);
    return responseBody;
};

// function: 숙박 게시판 요청 함수 //
export const getStayDetailRequest = async (travelStayNumber: number | string) => {
    const responseBody = await axios.get(GET_STAY_DETAIL_API_URL(travelStayNumber))
        .then(responseDataHandler<GetStayDetailResponseDto>)
        .catch(responseErrorHandler);
    return responseBody;
};

// function: 숙박 게시판 작성 요청 함수 //
export const postStayRequest = async (requestBody: PostTravelStayRequestDto, accessToken: string) => {
    const responseBody = await axios.post(POST_STAY_API_URL, requestBody, bearerAuthorization(accessToken))
        .then(responseDataHandler<ResponseDto>)
        .catch(responseErrorHandler);
    return responseBody;
};

// function: 숙박 게시판 수정 요청 함수 //
export const pathcStayRequest = async (requestBody: PatchTravelStayRequestDto, travelStayNumber: number | string, accessToken: string) => {
    const responseBody = await axios.patch(PATCH_STAY_API_URL(travelStayNumber), requestBody, bearerAuthorization(accessToken))
        .then(responseDataHandler<ResponseDto>)
        .catch(responseErrorHandler);
    return responseBody;
};

// function: 숙박 게시판 삭제 요청 함수 //
export const deleteStayRequest = async (travelStayNumber: number | string, accessToken: string) => {
    const responseBody = await axios.delete(DELETE_STAY_API_URL(travelStayNumber), bearerAuthorization(accessToken))
        .then(responseDataHandler<ResponseDto>)
        .catch(responseErrorHandler);
    return responseBody;
};

//function: 숙박 게시판 조회수 증가 요청 함수 //
export const postUpViewStayRequest = async (travelStayNumber: number | string) => {
    const responseBody = await axios.post(POST_UP_VIEW_STAY_API_URL(travelStayNumber))
        .then(responseDataHandler<ResponseDto>)
        .catch(responseErrorHandler);
    return responseBody;
};

//function : 해당 숙박 게시판 댓글 리스트 요청 함수 //
export const getStayCommentListRequest = async (travelStayNumber: number | string) => {
    const responseBody = await axios.get(GET_STAY_COMMENT_LIST_API_URL(travelStayNumber))
        .then(responseDataHandler<GetStayCommentResponseDto>)
        .catch(responseErrorHandler);
    return responseBody;
};

//function : 해당 숙박 게시판 댓글 작성 요청 함수 //
export const postStayCommentRequest = async (requestbody: PostTravelStayCommentRequestDto, travelStayNumber: number | string, accessToken: string) => {
    const responseBody = await axios.post(POST_STAY_COMMENT_API_URL(travelStayNumber), requestbody, bearerAuthorization(accessToken))
        .then(responseDataHandler<ResponseDto>)
        .catch(responseErrorHandler);
    return responseBody;
};

//function : 해당 숙박 게시판 댓글 삭제 요청 함수 //
export const deleteStayCommentRequest = async (travelStayCommentNumber: number | string, accessToken: string) => {
    const responseBody = await axios.delete(DELETE_STAY_COMMENT_API_URL(travelStayCommentNumber), bearerAuthorization(accessToken))
        .then(responseDataHandler<ResponseDto>)
        .catch(responseErrorHandler);
    return responseBody;
};

// function : 숙박 좋아요 버튼 클릭 요청 함수 //
export const putStayLikeRequest = async (travelStayNumber: number | string, accessToken: string) => {
    const responseBody = await axios.put(PUT_STAY_LIKE_API_URL(travelStayNumber), bearerAuthorization(accessToken))
        .then(responseDataHandler<ResponseDto>)
        .catch(responseErrorHandler);
    return responseBody;
};

// function : 숙박 저장 버튼 클릭 요청 함수 //
export const putStaySaveRequest = async (travelStayNumber: number | string, accessToken: string) => {
    const responseBody = await axios.put(PUT_STAY_SAVE_API_URL(travelStayNumber), bearerAuthorization(accessToken))
        .then(responseDataHandler<ResponseDto>)
        .catch(responseErrorHandler);
    return responseBody;
};
