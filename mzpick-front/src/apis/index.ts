import axios, { AxiosResponse } from "axios";
import { ResponseDto } from "./dto/response";

// variable: API URL 상수 //
export const MZPICK_API_DOMAIN = 'http://localhost:4000';

//variable : 파일 업로드 API URL 상수 //
const FILE_UPLOAD_URL = `${MZPICK_API_DOMAIN}/file/upload`;
const multipart = { headers: { 'Content-Type': 'multipart/form-data' } };


// function: Authorizarion Bearer 헤더 //
export const bearerAuthorization = (accessToken: string) => ({ headers: { 'Authorization': `Bearer ${accessToken}` } })

// function: response data 처리 함수 //
export const responseDataHandler = <T>(response: AxiosResponse<T, any>) => {
    const { data } = response;
    return data;
};

// function: response error 처리 함수 //
export const responseErrorHandler = (error: any) => {
    if (!error.response) return null;
    const { data } = error.response;
    return data as ResponseDto;
};

// function: file upload 요청 함수 //
export const fileUploadRequest = async (requestBody: FormData) => {
    const url = await axios.post(FILE_UPLOAD_URL, requestBody, multipart)
        .then(responseDataHandler<string>)
        .catch(error => null);
    return url;
};





