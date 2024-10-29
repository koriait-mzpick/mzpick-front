import axios, { AxiosResponse } from "axios";
import { ResponseDto } from "./dto/response";
import { IdCheckRequestDto, SignInRequestDto, SignUpRequestDto, TelAuthCheckRequestDto, TelAuthRequestDto } from "./dto/request/auth";
import { SignInResponseDto } from "./dto/response/auth";
import { GetTravelCommentResponseDto, GetTravelDetailResponseDto, GetTravelListResponseDto } from "./dto/response/travel";
import { PatchTravelRequestDto, PostTravelCommentRequestDto, PostTravelRequestDto } from "./dto/request/travel";

// variable: API URL 상수 //
const MZPICK_API_DOMAIN = 'http://localhost:4000';

const AUTH_MODULE_URL = `${MZPICK_API_DOMAIN}/api/v1/auth`;

const ID_CHECK_API_URL = `${AUTH_MODULE_URL}/id-check`;
const TEL_AUTH_API_URL = `${AUTH_MODULE_URL}/tel-auth`;
const TEL_AUTH_CHECK_API_URL = `${AUTH_MODULE_URL}/tel-auth-check`;
const SIGN_UP_API_URL = `${AUTH_MODULE_URL}/sign-up`;
const SIGN_IN_API_URL = `${AUTH_MODULE_URL}/sign-in`;

// travel
const TRAVEL_MODULE_URL = `${MZPICK_API_DOMAIN}/api/v1/travel`;

const GET_TRAVEL_LIST_API_URL = `${TRAVEL_MODULE_URL}/`;
const GET_TRAVEL_DETAIL_API_URL = (travelNumber: number) => `${TRAVEL_MODULE_URL}/${travelNumber}`;
const POST_TRAVEL_API_URL = `${TRAVEL_MODULE_URL}/}`;
const PATCH_TRAVEL_API_URL = (travelNumber: number) => `${TRAVEL_MODULE_URL}/${travelNumber}`;
const DELETE_TRAVEL_API_URL = (travelNumber:number) => `${TRAVEL_MODULE_URL}/${travelNumber}`;
const POST_UP_VIEW_TRAVEL_API_URL = (travelNumber:number) => `${TRAVEL_MODULE_URL}/view/${travelNumber}`;
const GET_TRAVEL_COMMENT_LIST_API_URL = (travelNumber:number) => `${TRAVEL_MODULE_URL}/comment/${travelNumber}`;
const POST_TRAVEL_COMMENT_API_URL = (travelNumber:number) => `${TRAVEL_MODULE_URL}/comment/${travelNumber}`;
const DELETE_TRAVEL_COMMENT_API_URL = (travelCommentNumber:number) => `${TRAVEL_MODULE_URL}/comment/${travelCommentNumber}`;
const PUT_TRAVEL_LIKE_API_URL = (travelNumber:number) => `${TRAVEL_MODULE_URL}/like/${travelNumber}`;
const PUT_TRAVEL_SAVE_API_URL = (travelNumber:number) => `${TRAVEL_MODULE_URL}/save/${travelNumber}`;


// function: Authorizarion Bearer 헤더 //
const bearerAuthorization = (accessToken: string) => ({ headers: { 'Authorization': `Bearer ${accessToken}` } })

// function: response data 처리 함수 //
const responseDataHandler = <T>(response: AxiosResponse<T, any>) => {
    const { data } = response;
    return data;
};

// function: response error 처리 함수 //
const responseErrorHandler = (error: any) => {
    if (!error.response) return null;
    const { data } = error.response;
    return data as ResponseDto;
};

// function: id check api 요청 함수 //
export const idCheckRequest = async (requestBody: IdCheckRequestDto) => {
    const responseBody = await axios.post(ID_CHECK_API_URL, requestBody)
        .then(responseDataHandler<ResponseDto>)
        .catch(responseErrorHandler);
    return responseBody;
};

// function: tel auth api 요청 함수 //
export const telAuthRequest = async (requestBody: TelAuthRequestDto) => {
    const responseBody = await axios.post(TEL_AUTH_API_URL, requestBody)
        .then(responseDataHandler<ResponseDto>)
        .catch(responseErrorHandler);
    return responseBody;
};

// function: tel auth check 요청 함수 //
export const telAuthCheckRequest = async (requestBody: TelAuthCheckRequestDto) => {
    const responseBody = await axios.post(TEL_AUTH_CHECK_API_URL, requestBody)
        .then(responseDataHandler<ResponseDto>)
        .catch(responseErrorHandler);
    return responseBody;
};

// function: sign up 요청 함수 //
export const signUpRequest = async (requestBody: SignUpRequestDto) => {
    const responseBody = await axios.post(SIGN_UP_API_URL, requestBody)
        .then(responseDataHandler<ResponseDto>)
        .catch(responseErrorHandler);
    return responseBody;
};

// function: sign in 요청 함수 //
export const signInRequest = async (requestBody: SignInRequestDto) => {
    const responseBody = await axios.post(SIGN_IN_API_URL, requestBody)
        .then(responseDataHandler<SignInResponseDto>)
        .catch(responseErrorHandler);
    return responseBody;
};

// travel

// function: 여행 리스트 요청 함수 //
export const getTravelListRequest = async (page: number) => {
    const responseBody = await axios.get(GET_TRAVEL_LIST_API_URL, { params: { page } })
        .then(responseDataHandler<GetTravelListResponseDto>)
        .catch(responseErrorHandler);
    return responseBody;
}

// function: 여행 게시판 요청 함수 //
export const getTravelDetailRequest = async (travelNumber : number) => {
    const responseBody = await axios.get(GET_TRAVEL_DETAIL_API_URL(travelNumber))
        .then(responseDataHandler<GetTravelDetailResponseDto>)
        .catch(responseErrorHandler);
    return responseBody;
}

// function: 여행 게시판 작성 요청 함수 //
export const postcTravelRequest = async (requestBody: PostTravelRequestDto, accessToken: string) => {
    const responseBody = await axios.post(POST_TRAVEL_API_URL, requestBody, bearerAuthorization(accessToken))
        .then(responseDataHandler<ResponseDto>)
        .catch(responseErrorHandler);
    return responseBody;
}

// function: 여행 게시판 수정 요청 함수 //
export const pathcTravelRequest = async (requestBody: PatchTravelRequestDto, travelNumber : number, accessToken: string) => {
    const responseBody = await axios.patch(PATCH_TRAVEL_API_URL(travelNumber), requestBody, bearerAuthorization(accessToken))
        .then(responseDataHandler<ResponseDto>)
        .catch(responseErrorHandler);
    return responseBody;
}

// function: 여행 게시판 삭제 요청 함수 //
export const deleteTravelRequest = async (travelNumber : number, accessToken: string) => {
    const responseBody = await axios.delete(DELETE_TRAVEL_API_URL(travelNumber), bearerAuthorization(accessToken))
        .then(responseDataHandler<ResponseDto>)
        .catch(responseErrorHandler);
    return responseBody;
}

//function: 여행 게시판 조회수 증가 요청 함수 //
export const postUpViewTravelRequest = async(travelNumber : number) => {
    const responseBody = await axios.post(POST_UP_VIEW_TRAVEL_API_URL(travelNumber))
        .then(responseDataHandler<ResponseDto>)
        .catch(responseErrorHandler);
    return responseBody;
}

//function : 해당 여행 게시판 댓글 리스트 요청 함수 //
export const getTravelCommentListRequest = async(travelNumber: number) => {
    const responseBody = await axios.get(GET_TRAVEL_COMMENT_LIST_API_URL(travelNumber))
        .then(responseDataHandler<GetTravelCommentResponseDto>)
        .catch(responseErrorHandler);
    return responseBody;
}

//function : 해당 여행 게시판 댓글 작성 요청 함수 //
export const postTravelCommentRequest = async(requestbody:PostTravelCommentRequestDto, travelNumber: number, accessToken: string) => {
    const responseBody = await axios.post(POST_TRAVEL_COMMENT_API_URL(travelNumber), requestbody, bearerAuthorization(accessToken))
        .then(responseDataHandler<ResponseDto>)
        .catch(responseErrorHandler);
    return responseBody;
}

//function : 해당 여행 게시판 댓글 삭제 요청 함수 //
export const deleteTravelCommentRequest = async(travelCommentNumber: number, accessToken:string) => {
    const responseBody = await axios.delete(DELETE_TRAVEL_COMMENT_API_URL(travelCommentNumber), bearerAuthorization(accessToken))
        .then(responseDataHandler<ResponseDto>)
        .catch(responseErrorHandler);
    return responseBody;
}

// function : 여행 좋아요 버튼 클릭 요청 함수 //
export const putTravelLikeRequest = async (travelNumebr:number, accessToken: string) => {
    const responseBody = await axios.put(PUT_TRAVEL_LIKE_API_URL(travelNumebr), bearerAuthorization(accessToken))
        .then(responseDataHandler<ResponseDto>)
        .catch(responseErrorHandler);
    return responseBody;
}

// function : 여행 저장 버튼 클릭 요청 함수 //
export const putTravelSaveRequest = async (travelNumebr:number, accessToken: string) => {
    const responseBody = await axios.put(PUT_TRAVEL_SAVE_API_URL(travelNumebr), bearerAuthorization(accessToken))
        .then(responseDataHandler<ResponseDto>)
        .catch(responseErrorHandler);
    return responseBody;
}


