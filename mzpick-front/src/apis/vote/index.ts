import axios from "axios";
import { bearerAuthorization, MZPICK_API_DOMAIN, responseDataHandler, responseErrorHandler } from "src/apis";
import { GetFashionVoteListResponseDto, GetFashionVoteDetailResponseDto, GetFashionVoteTotalResponseDto } from "./fashion_vote/dto/response";
import { PostFashionVoteRequestDto } from "./fashion_vote/dto/request";
import { ResponseDto } from "../dto/response";
import { PostTravelVoteRequestDto } from "./travel_vote/dto/request";
import { GetTravelVoteListResponseDto, GetTravelVoteDetailResponseDto, GetTravelVoteTotalResponseDto } from "./travel_vote/dto/response";


//variable : FASHION VOTE API URL 상수
const FASHION_VOTE_MODULE_URL = `${MZPICK_API_DOMAIN}/api/v1/vote/fashion`

const GET_FASHION_VOTE_LIST_API_URL = `${FASHION_VOTE_MODULE_URL}/`;
const GET_FASHION_VOTE_DETAIL_API_URL = (fashionVoteNumber:number | string) => `${FASHION_VOTE_MODULE_URL}/${fashionVoteNumber}`;
const POST_FASHION_VOTE_API_URL = `${FASHION_VOTE_MODULE_URL}/`
const DELETE_FASHION_VOTE_API_URL = (fashionVoteNumber:number | string) => `${FASHION_VOTE_MODULE_URL}/${fashionVoteNumber}`;
const PUT_FASHION_VOTE_CLICK_API_URL =(fashionVoteNumber:number | string, selectNumber:number | string) => `${FASHION_VOTE_MODULE_URL}/vote-click/${fashionVoteNumber}/${selectNumber}`
const GET_FASHION_VOTE_TOTAL_API_URL = `${FASHION_VOTE_MODULE_URL}/vote-total`

//variable : TRAVEL VOTE API URL 상수
const TRAVEL_VOTE_MODULE_URL  = `${MZPICK_API_DOMAIN}/api/v1/vote/travel`

const GET_TRAVEL_VOTE_LIST_API_URL = `${TRAVEL_VOTE_MODULE_URL}/`;
const GET_TRAVEL_VOTE_DETAIL_API_URL = (travelVoteNumber:number | string) => `${TRAVEL_VOTE_MODULE_URL}/${travelVoteNumber}`;
const POST_TRAVEL_VOTE_API_URL = `${TRAVEL_VOTE_MODULE_URL}/`
const DELETE_TRAVEL_VOTE_API_URL = (travelVoteNumber:number | string) => `${TRAVEL_VOTE_MODULE_URL}/${travelVoteNumber}`;
const PUT_TRAVEL_VOTE_CLICK_API_URL = (travelVoteNumber:number | string, selectNumber:number | string) => `${TRAVEL_VOTE_MODULE_URL}/vote-click/${travelVoteNumber}/${selectNumber}`
const GET_TRAVEL_VOTE_TOTAL_API_URL = `${TRAVEL_VOTE_MODULE_URL}/vote-total`

// ! fahsion vote

//function: fashion vote List 요청 함수
export const getFashionVoteListRequest = async () => {
    const responseBody = await axios.get(GET_TRAVEL_VOTE_LIST_API_URL)
        .then(responseDataHandler<GetFashionVoteListResponseDto>)
        .catch(responseErrorHandler);
    return responseBody;
}

//function: fashion vote Detail 요청 함수
export const getFashionVoteDetailRequest = async (fashionVoteNumber :number | string) => {
    const responseBody = await axios.get(GET_FASHION_VOTE_DETAIL_API_URL(fashionVoteNumber))
        .then(responseDataHandler<GetFashionVoteDetailResponseDto>)
        .catch(responseErrorHandler);
    return responseBody;
}

//function: fashion vote 작성 요청 함수
export const postFashionVoteRequest = async (requestBody: PostFashionVoteRequestDto , accessToken:string) => {
    const responseBody = await axios.post (POST_FASHION_VOTE_API_URL, requestBody , bearerAuthorization(accessToken))
        .then(responseDataHandler<ResponseDto>)
        .catch(responseErrorHandler);
    return responseBody;
}

//function: fashion vote 삭제 요청 함수
export const deleteFashionVoteRequest = async (fashionVoteNumber:number | string , accessToken:string) => {
    const responseBody = await axios.delete (DELETE_FASHION_VOTE_API_URL(fashionVoteNumber) , bearerAuthorization(accessToken))
        .then(responseDataHandler<ResponseDto>)
        .catch(responseErrorHandler);
    return responseBody;
}

//function: fashion vote 투표 요청 함수
export const putFashionVoteClickRequest = async (fashionVoteNumber:number | string , selectNumber:number | string, accessToken:string) => {
    const responseBody = await axios.put (PUT_FASHION_VOTE_CLICK_API_URL(fashionVoteNumber,selectNumber),{}, bearerAuthorization(accessToken))
        .then(responseDataHandler<ResponseDto>)
        .catch(responseErrorHandler);
    return responseBody;
}

//function: fashion vote 투표 결과 요청 함수
export const getFashionVoteTotalRequest = async (fashionVoteNumber: number | string) => {
    const responseBody = await axios.get (GET_FASHION_VOTE_TOTAL_API_URL,{params: {fashionVoteNumber}})
        .then(responseDataHandler<GetFashionVoteTotalResponseDto>)
        .catch(responseErrorHandler);
    return responseBody;
}

// ! travel vote

//function: Travel vote List 요청 함수
export const getTravelVoteListRequest = async () => {
    const responseBody = await axios.get(GET_TRAVEL_VOTE_LIST_API_URL)
        .then(responseDataHandler<GetTravelVoteListResponseDto>)
        .catch(responseErrorHandler);
    return responseBody;
}

//function: Travel vote Detail 요청 함수
export const getTravelVoteDetailRequest = async (travelVoteNumber :number | string) => {
    const responseBody = await axios.get(GET_TRAVEL_VOTE_DETAIL_API_URL(travelVoteNumber))
        .then(responseDataHandler<GetTravelVoteDetailResponseDto>)
        .catch(responseErrorHandler);
    return responseBody;
}

//function: Travel vote 작성 요청 함수
export const postTravelVoteRequest = async (requestBody: PostTravelVoteRequestDto , accessToken:string) => {
    const responseBody = await axios.post (POST_TRAVEL_VOTE_API_URL, requestBody , bearerAuthorization(accessToken))
        .then(responseDataHandler<ResponseDto>)
        .catch(responseErrorHandler);
    return responseBody;
}

//function: Travel vote 삭제 요청 함수
export const deleteTravelVoteRequest = async (travelVoteNumber:number | string , accessToken:string) => {
    const responseBody = await axios.delete (DELETE_TRAVEL_VOTE_API_URL(travelVoteNumber) , bearerAuthorization(accessToken))
        .then(responseDataHandler<ResponseDto>)
        .catch(responseErrorHandler);
    return responseBody;
}

//function: Travel vote 투표 요청 함수
export const putTravelVoteClickRequest = async (travelVoteNumber:number | string , selectNumber:number | string, accessToken:string) => {
    const responseBody = await axios.put (PUT_TRAVEL_VOTE_CLICK_API_URL(travelVoteNumber,selectNumber),{}, bearerAuthorization(accessToken))
        .then(responseDataHandler<ResponseDto>)
        .catch(responseErrorHandler);
    return responseBody;
}

//function: Travel vote 투표 결과 요청 함수
export const getTravelVoteTotalRequest = async (TravelVoteNumber: number | string) => {
    const responseBody = await axios.get (GET_TRAVEL_VOTE_TOTAL_API_URL,{params: {TravelVoteNumber}})
        .then(responseDataHandler<GetTravelVoteTotalResponseDto>)
        .catch(responseErrorHandler);
    return responseBody;
}