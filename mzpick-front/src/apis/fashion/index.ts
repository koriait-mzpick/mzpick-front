import axios from "axios";
import { bearerAuthorization, MZPICK_API_DOMAIN, responseDataHandler, responseErrorHandler } from "..";
import { ResponseDto } from "../dto/response";
import { PatchFashionRequestDto, PostFashionCommentRequestDto, PostFashionRequestDto } from "./dto/request";
import { GetFashionCommentResponseDto, GetFashionDetailResponseDto, GetFashionLikeListResponseDto, GetFashionListResponseDto, GetFashionSaveListResponseDto } from "./dto/response";


// variable: FASHION API URL 상수 //
const FASHION_MODULE_URL = `${MZPICK_API_DOMAIN}/api/v1/fashion`;

const GET_FASHION_LIST_API_URL = `${FASHION_MODULE_URL}/`;
const GET_FASHION_DETAIL_API_URL = (fashionNumber: number | string) => `${FASHION_MODULE_URL}/${fashionNumber}`;
const POST_FASHION_API_URL = `${FASHION_MODULE_URL}/`;
const PATCH_FASHION_API_URL = (fashionNumber: number | string) => `${FASHION_MODULE_URL}/${fashionNumber}`;
const DELETE_FASHION_API_URL = (fashionNumber: number | string) => `${FASHION_MODULE_URL}/${fashionNumber}`;
const POST_UP_VIEW_FASHION_API_URL = (fashionNumber: number | string) => `${FASHION_MODULE_URL}/view/${fashionNumber}`;
const GET_FASHION_COMMENT_LIST_API_URL = (fashionNumber: number | string) => `${FASHION_MODULE_URL}/comment/${fashionNumber}`;
const POST_FASHION_COMMENT_API_URL = (fashionNumber: number | string) => `${FASHION_MODULE_URL}/comment/${fashionNumber}`;
const DELETE_FASHION_COMMENT_API_URL = (fashionCommentNumber: number | string) => `${FASHION_MODULE_URL}/comment/${fashionCommentNumber}`;
const GET_FASHION_LIKE_LIST_API_URL = (fashionNumber: number | string) => `${FASHION_MODULE_URL}/like/${fashionNumber}`;
const PUT_FASHION_LIKE_API_URL = (fashionNumber: number | string) => `${FASHION_MODULE_URL}/like/${fashionNumber}`;
const GET_FASHION_SAVE_LIST_API_URL = (fashionNumber: number | string) => `${FASHION_MODULE_URL}/save/${fashionNumber}`;
const PUT_FASHION_SAVE_API_URL = (fashionNumber: number | string) => `${FASHION_MODULE_URL}/save/${fashionNumber}`;
// ! Fashion

// function: 패션 리스트 요청 함수 //
export const getFashionListRequest = async (page: number | string ,hashtag: string ) => {
    const responseBody = await axios.get(GET_FASHION_LIST_API_URL, { params: { page, hashtag} })
        .then(responseDataHandler<GetFashionListResponseDto>)
        .catch(responseErrorHandler);
    return responseBody;
};

// function: 패션 게시판 요청 함수 //
export const getFashionDetailRequest = async (fashionNumber: number | string) => {
    const responseBody = await axios.get(GET_FASHION_DETAIL_API_URL(fashionNumber))
        .then(responseDataHandler<GetFashionDetailResponseDto>)
        .catch(responseErrorHandler);
    return responseBody;
};

// function: 패션 게시판 작성 요청 함수 //
export const postFashionRequest = async (requestBody: PostFashionRequestDto, accessToken: string) => {
    const responseBody = await axios.post(POST_FASHION_API_URL, requestBody, bearerAuthorization(accessToken))
        .then(responseDataHandler<ResponseDto>)
        .catch(responseErrorHandler);
    return responseBody;
};

// function: 패션 게시판 수정 요청 함수 //
export const pathcFashionRequest = async (requestBody: PatchFashionRequestDto, fashionNumber: number | string, accessToken: string) => {
    const responseBody = await axios.patch(PATCH_FASHION_API_URL(fashionNumber), requestBody, bearerAuthorization(accessToken))
        .then(responseDataHandler<ResponseDto>)
        .catch(responseErrorHandler);
    return responseBody;
};

// function: 패션 게시판 삭제 요청 함수 //
export const deleteFashionRequest = async (fashionNumber: number | string, accessToken: string) => {
    const responseBody = await axios.delete(DELETE_FASHION_API_URL(fashionNumber), bearerAuthorization(accessToken))
        .then(responseDataHandler<ResponseDto>)
        .catch(responseErrorHandler);
    return responseBody;
};

//function: 패션 게시판 조회수 증가 요청 함수 //
export const postUpViewFashionRequest = async (fashionNumber: number | string) => {
    const responseBody = await axios.post(POST_UP_VIEW_FASHION_API_URL(fashionNumber))
        .then(responseDataHandler<ResponseDto>)
        .catch(responseErrorHandler);
    return responseBody;
};

//function : 해당 패션 게시판 댓글 리스트 요청 함수 //
export const getFashionCommentListRequest = async (fashionNumber: number | string) => {
    const responseBody = await axios.get(GET_FASHION_COMMENT_LIST_API_URL(fashionNumber))
        .then(responseDataHandler<GetFashionCommentResponseDto>)
        .catch(responseErrorHandler);
    return responseBody;
};

//function : 해당 패션 게시판 댓글 작성 요청 함수 //
export const postFashionCommentRequest = async (requestbody: PostFashionCommentRequestDto, fashionNumber: number | string, accessToken: string) => {
    const responseBody = await axios.post(POST_FASHION_COMMENT_API_URL(fashionNumber), requestbody, bearerAuthorization(accessToken))
        .then(responseDataHandler<ResponseDto>)
        .catch(responseErrorHandler);
    return responseBody;
};

//function : 해당 패션 게시판 댓글 삭제 요청 함수 //
export const deleteFashionCommentRequest = async (fashionCommentNumber: number | string, accessToken: string) => {
    const responseBody = await axios.delete(DELETE_FASHION_COMMENT_API_URL(fashionCommentNumber), bearerAuthorization(accessToken))
        .then(responseDataHandler<ResponseDto>)
        .catch(responseErrorHandler);
    return responseBody;
};

// function : 패션 좋아요 버튼 클릭 요청 함수 //
export const putFashionLikeRequest = async (fashionNumber: number | string, accessToken: string) => {
    const responseBody = await axios.put(PUT_FASHION_LIKE_API_URL(fashionNumber), {}, bearerAuthorization(accessToken))
        .then(responseDataHandler<ResponseDto>)
        .catch(responseErrorHandler);
    return responseBody;
};
export const getFashionLikeListRequest = async (fashionNumber: number | string) => {
    const responseBody = await axios.get(GET_FASHION_LIKE_LIST_API_URL(fashionNumber))
        .then(responseDataHandler<GetFashionLikeListResponseDto>)
        .catch(responseErrorHandler);
    return responseBody;
};

// function : 패션 저장 버튼 클릭 요청 함수 //
export const putFashionSaveRequest = async (fashionNumber: number | string, accessToken: string) => {
    const responseBody = await axios.put(PUT_FASHION_SAVE_API_URL(fashionNumber),{}, bearerAuthorization(accessToken))
        .then(responseDataHandler<ResponseDto>)
        .catch(responseErrorHandler);
    return responseBody;
};

// function : 패션 저장 리스트 요청 함수 //
export const getFashionSaveListRequest = async (fashionNumber: number | string) => {
    const responseBody = await axios.get(GET_FASHION_SAVE_LIST_API_URL(fashionNumber))
        .then(responseDataHandler<GetFashionSaveListResponseDto>)
        .catch(responseErrorHandler);
    return responseBody;
};