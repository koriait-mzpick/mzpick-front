import { ResponseDto } from "src/apis/dto/response";

export default interface GetCafeHallOfFameResponseDto extends ResponseDto {
    getTravelCafeNumber : number;
    photoLink : string;
}