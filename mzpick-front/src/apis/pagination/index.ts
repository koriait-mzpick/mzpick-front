import axios from "axios";
import { MZPICK_API_DOMAIN } from "..";
import { GetTotalCountResponseDto } from "./response";

const GET_TRAVEL_TOTAL_COUNT_API_URL = `${MZPICK_API_DOMAIN}/api/v1/travel/totalCount`;

export const getTotalCountRequest = async () => {
    try {
        const response = await axios.get<GetTotalCountResponseDto>(GET_TRAVEL_TOTAL_COUNT_API_URL);
        return response.data;
    } catch (error) {
        console.error("Failed to fetch total count:", error);
        return null;
    }
};