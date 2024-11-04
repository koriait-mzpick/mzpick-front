import { ResponseDto } from "src/apis/dto/response";

export default interface GetTravelHallOfFameResponseDto extends ResponseDto {
    travelNumber : number | string;
    photoLink : string;
}