import { ResponseDto } from "src/apis/dto/response";

export default interface GetRestaurantHallOfFameResponseDto extends ResponseDto {
    travelNumber : number | string;
    photoLink : string;
}