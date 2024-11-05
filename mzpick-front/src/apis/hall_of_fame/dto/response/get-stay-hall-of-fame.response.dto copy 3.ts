import { ResponseDto } from "src/apis/dto/response";

export default interface GetStayHallOfFameResponseDto extends ResponseDto {
    travelStayNumber : number | string;
    photoLink : string;
}