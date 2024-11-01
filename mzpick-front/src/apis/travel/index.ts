import { bearerAuthorization, MZPICK_API_DOMAIN, responseDataHandler, responseErrorHandler } from "src/apis";
import { GetTravelCommentResponseDto, GetTravelDetailResponseDto, GetTravelListResponseDto } from "./dto/response";
import axios from "axios";
import { PatchTravelRequestDto, PostTravelCommentRequestDto, PostTravelRequestDto } from "./dto/request";
import { ResponseDto } from "../dto/response";


// variable: TRAVEL API URL 상수 //
const TRAVEL_MODULE_URL = `${MZPICK_API_DOMAIN}/api/v1/travel`;

const GET_TRAVEL_LIST_API_URL = `${TRAVEL_MODULE_URL}/`;
const GET_TRAVEL_DETAIL_API_URL = (travelNumber: number | string) => `${TRAVEL_MODULE_URL}/${travelNumber}`;
const POST_TRAVEL_API_URL = `${TRAVEL_MODULE_URL}/`;
const PATCH_TRAVEL_API_URL = (travelNumber: number | string) => `${TRAVEL_MODULE_URL}/${travelNumber}`;
const DELETE_TRAVEL_API_URL = (travelNumber: number | string) => `${TRAVEL_MODULE_URL}/${travelNumber}`;
const POST_UP_VIEW_TRAVEL_API_URL = (travelNumber: number | string) => `${TRAVEL_MODULE_URL}/view/${travelNumber}`;
const GET_TRAVEL_COMMENT_LIST_API_URL = (travelNumber: number | string) => `${TRAVEL_MODULE_URL}/comment/${travelNumber}`;
const POST_TRAVEL_COMMENT_API_URL = (travelNumber: number | string) => `${TRAVEL_MODULE_URL}/comment/${travelNumber}`;
const DELETE_TRAVEL_COMMENT_API_URL = (travelCommentNumber: number | string) => `${TRAVEL_MODULE_URL}/comment/${travelCommentNumber}`;
const PUT_TRAVEL_LIKE_API_URL = (travelNumber: number | string) => `${TRAVEL_MODULE_URL}/like/${travelNumber}`;
const PUT_TRAVEL_SAVE_API_URL = (travelNumber: number | string) => `${TRAVEL_MODULE_URL}/save/${travelNumber}`;

// ! TRAVEL 요청 

// function: 여행 리스트 요청 함수 //
export const getTravelListRequest = async (page: number | string) => {
    const responseBody = await axios.get(GET_TRAVEL_LIST_API_URL, { params: { page } })
        .then(responseDataHandler<GetTravelListResponseDto>)
        .catch(responseErrorHandler);
    return responseBody;
};

// function: 여행 게시판 요청 함수 //
export const getTravelDetailRequest = async (travelNumber: number | string) => {
    const responseBody = await axios.get(GET_TRAVEL_DETAIL_API_URL(travelNumber))
        .then(responseDataHandler<GetTravelDetailResponseDto>)
        .catch(responseErrorHandler);
    return responseBody;
};

// function: 여행 게시판 작성 요청 함수 //
export const postcTravelRequest = async (requestBody: PostTravelRequestDto, accessToken: string) => {
    const responseBody = await axios.post(POST_TRAVEL_API_URL, requestBody, bearerAuthorization(accessToken))
        .then(responseDataHandler<ResponseDto>)
        .catch(responseErrorHandler);
    return responseBody;
};

// function: 여행 게시판 수정 요청 함수 //
export const pathcTravelRequest = async (requestBody: PatchTravelRequestDto, travelNumber: number | string, accessToken: string) => {
    const responseBody = await axios.patch(PATCH_TRAVEL_API_URL(travelNumber), requestBody, bearerAuthorization(accessToken))
        .then(responseDataHandler<ResponseDto>)
        .catch(responseErrorHandler);
    return responseBody;
};

// function: 여행 게시판 삭제 요청 함수 //
export const deleteTravelRequest = async (travelNumber: number | string, accessToken: string) => {
    const responseBody = await axios.delete(DELETE_TRAVEL_API_URL(travelNumber), bearerAuthorization(accessToken))
        .then(responseDataHandler<ResponseDto>)
        .catch(responseErrorHandler);
    return responseBody;
};

//function: 여행 게시판 조회수 증가 요청 함수 //
export const postUpViewTravelRequest = async (travelNumber: number | string) => {
    const responseBody = await axios.post(POST_UP_VIEW_TRAVEL_API_URL(travelNumber))
        .then(responseDataHandler<ResponseDto>)
        .catch(responseErrorHandler);
    return responseBody;
};

//function : 해당 여행 게시판 댓글 리스트 요청 함수 //
export const getTravelCommentListRequest = async (travelNumber: number | string) => {
    const responseBody = await axios.get(GET_TRAVEL_COMMENT_LIST_API_URL(travelNumber))
        .then(responseDataHandler<GetTravelCommentResponseDto>)
        .catch(responseErrorHandler);
    return responseBody;
};

//function : 해당 여행 게시판 댓글 작성 요청 함수 //
export const postTravelCommentRequest = async (requestbody: PostTravelCommentRequestDto, travelNumber: number | string, accessToken: string) => {
    const responseBody = await axios.post(POST_TRAVEL_COMMENT_API_URL(travelNumber), requestbody, bearerAuthorization(accessToken))
        .then(responseDataHandler<ResponseDto>)
        .catch(responseErrorHandler);
    return responseBody;
};

//function : 해당 여행 게시판 댓글 삭제 요청 함수 //
export const deleteTravelCommentRequest = async (travelCommentNumber: number | string, accessToken: string) => {
    const responseBody = await axios.delete(DELETE_TRAVEL_COMMENT_API_URL(travelCommentNumber), bearerAuthorization(accessToken))
        .then(responseDataHandler<ResponseDto>)
        .catch(responseErrorHandler);
    return responseBody;
};

// function : 여행 좋아요 버튼 클릭 요청 함수 //
export const putTravelLikeRequest = async (travelNumebr: number | string, accessToken: string) => {
    const responseBody = await axios.put(PUT_TRAVEL_LIKE_API_URL(travelNumebr), bearerAuthorization(accessToken))
        .then(responseDataHandler<ResponseDto>)
        .catch(responseErrorHandler);
    return responseBody;
};

// function : 여행 저장 버튼 클릭 요청 함수 //
export const putTravelSaveRequest = async (travelNumebr: number | string, accessToken: string) => {
    const responseBody = await axios.put(PUT_TRAVEL_SAVE_API_URL(travelNumebr), bearerAuthorization(accessToken))
        .then(responseDataHandler<ResponseDto>)
        .catch(responseErrorHandler);
    return responseBody;
};