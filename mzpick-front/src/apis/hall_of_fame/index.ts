import axios from "axios";
import { responseDataHandler, responseErrorHandler, MZPICK_API_DOMAIN } from "..";
import { GetCafeHallOfFameResponseDto, GetFashionHallOfFameResponseDto, GetRestaurantHallOfFameResponseDto, GetStayHallOfFameResponseDto, GetTravelHallOfFameResponseDto } from "./dto/response";

const HAll_OF_FAME_MODULE_URL = `${MZPICK_API_DOMAIN}/api/v1/hall-of-fame`;

const GET_TRAVEL_HALL_OF_FAME_API_URL = `${HAll_OF_FAME_MODULE_URL}/travel`;
const GET_STAY_HALL_OF_FAME_API_URL = `${HAll_OF_FAME_MODULE_URL}/stay`;
const GET_RESTAURANT_HALL_OF_FAME_API_URL = `${HAll_OF_FAME_MODULE_URL}/food`;
const GET_CAFE_HALL_OF_FAME_API_URL = `${HAll_OF_FAME_MODULE_URL}/cafe`;
const GET_FASHION_HALL_OF_FAME_API_URL = `${HAll_OF_FAME_MODULE_URL}/fashion`;

export const getTravelHallOfFameRequest = async () => {
    const responseBody = await axios.get(GET_TRAVEL_HALL_OF_FAME_API_URL)
        .then(responseDataHandler<GetTravelHallOfFameResponseDto>)
        .catch(responseErrorHandler);
    return responseBody;
}

export const getStayHallOfFameRequest = async () => {
    const responseBody = await axios.get(GET_STAY_HALL_OF_FAME_API_URL)
        .then(responseDataHandler<GetStayHallOfFameResponseDto>)
        .catch(responseErrorHandler);
    return responseBody;
}

export const getRestaurantHallOfFameRequest = async () => {
    const responseBody = await axios.get(GET_RESTAURANT_HALL_OF_FAME_API_URL)
        .then(responseDataHandler<GetRestaurantHallOfFameResponseDto>)
        .catch(responseErrorHandler);
    return responseBody;
}

export const getCafeHallOfFameRequest = async () => {
    const responseBody = await axios.get(GET_CAFE_HALL_OF_FAME_API_URL)
        .then(responseDataHandler<GetCafeHallOfFameResponseDto>)
        .catch(responseErrorHandler);
    return responseBody;
}

export const getFashionHallOfFameRequest = async () => {
    const responseBody = await axios.get(GET_FASHION_HALL_OF_FAME_API_URL)
        .then(responseDataHandler<GetFashionHallOfFameResponseDto>)
        .catch(responseErrorHandler);
    return responseBody;
}