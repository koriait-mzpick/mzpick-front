import { ResponseDto } from "src/apis/dto/response";

export default interface GetCafeHallOfFameResponseDto extends ResponseDto {
    travelCafeNumber : number;
    getPhotoLink : string;
}