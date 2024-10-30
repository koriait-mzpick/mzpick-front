import axios from "axios";
import { bearerAuthorization, MZPICK_API_DOMAIN, responseDataHandler, responseErrorHandler } from "..";
import { GetKeyWordResponseDto } from "./dto/response";
import { access } from "fs";
import { ACCESS_TOKEN } from "src/constants";
import { PostKeywordRequestDto } from "./dto/request";
import { ResponseDto } from "../dto/response";

const KEYWORD_MODULE_URL = `${MZPICK_API_DOMAIN}/api/v1/keyword`;

const GET_KEYWORD_LIST_API_URL = `${KEYWORD_MODULE_URL}/`;
const POST_KEYWORD_API_URL = `${KEYWORD_MODULE_URL}/write}`;

// function: 키워드 리스트 요청 함수 //
export const getkeywordListRequest = async () => {
    const responseBody = await axios.get(GET_KEYWORD_LIST_API_URL)
        .then(responseDataHandler<GetKeyWordResponseDto>)
        .catch(responseErrorHandler);
    return responseBody;
};

// function: 키워드 작성 요청 함수
export const postKeywordWriteRequest = async ( requestBody: PostKeywordRequestDto ,accessToken: string) => {
    const responseBody = await axios.post(POST_KEYWORD_API_URL, requestBody , bearerAuthorization(accessToken))
        .then(responseDataHandler<ResponseDto>)
        .catch(responseErrorHandler);
    return responseBody;
}

