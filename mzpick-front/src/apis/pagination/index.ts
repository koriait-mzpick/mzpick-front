import axios from "axios";
import { MZPICK_API_DOMAIN } from "..";
import { GetCafeTotalCountResponseDto, GetFashionTotalCountResponseDto, GetFoodTotalCountResponseDto, GetStayTotalCountResponseDto, GetTotalCountResponseDto } from "./response";

const GET_TRAVEL_TOTAL_COUNT_API_URL = `${MZPICK_API_DOMAIN}/api/v1/travel/totalCount`;
const GET_TRAVEL_CAFE_TOTAL_COUNT_API_URL = `${MZPICK_API_DOMAIN}/api/v1/cafe/totalCount`;
const GET_TRAVEL_FOOD_TOTAL_COUNT_API_URL = `${MZPICK_API_DOMAIN}/api/v1/food/totalCount`;
const GET_TRAVEL_STAY_TOTAL_COUNT_API_URL = `${MZPICK_API_DOMAIN}/api/v1/stay/totalCount`;
const GET_TRAVEL_FASHION_TOTAL_COUNT_API_URL = `${MZPICK_API_DOMAIN}/api/v1/fashion/totalCount`;


// function: 여행 리스트 게시판 페이지네이션 요청 함수
export const getTotalCountRequest = async () => {
    try {
        const response = await axios.get<GetTotalCountResponseDto>(GET_TRAVEL_TOTAL_COUNT_API_URL);
        return response.data;
    } catch (error) {
        return null;
    }
};

// function: 여행 카페 리스트 게시판 페이지네이션 요청 함수
export const getCafeTotalCountRequest = async () => {
    try {
        const response = await axios.get<GetCafeTotalCountResponseDto>(GET_TRAVEL_CAFE_TOTAL_COUNT_API_URL);
        return response.data;
    } catch (error) {
        return null;
    }
};

// function: 여행 음식 리스트 게시판 페이지네이션 요청 함수
export const getFoodTotalCountRequest = async () => {
    try {
        const response = await axios.get<GetFoodTotalCountResponseDto>(GET_TRAVEL_FOOD_TOTAL_COUNT_API_URL);
        return response.data;
    } catch (error) {
        return null;
    }
};

// function: 여행 음식 리스트 게시판 페이지네이션 요청 함수
export const getStayTotalCountRequest = async () => {
    try {
        const response = await axios.get<GetStayTotalCountResponseDto>(GET_TRAVEL_STAY_TOTAL_COUNT_API_URL);
        return response.data;
    } catch (error) {
        return null;
    }
};

// function: 패션 리스트 게시판 페이지네이션 요청 함수
export const getFashionTotalCountRequest = async () => {
    try {
        const response = await axios.get<GetFashionTotalCountResponseDto>(GET_TRAVEL_FASHION_TOTAL_COUNT_API_URL);
        return response.data;
    } catch (error) {
        return null;
    }
};