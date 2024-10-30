import { ResponseDto } from "src/apis/dto/response";

export default interface GetFashionHallOfFameResponseDto extends ResponseDto {
    getFashionNumber : number | string;
    getPhotoLink : string;
}