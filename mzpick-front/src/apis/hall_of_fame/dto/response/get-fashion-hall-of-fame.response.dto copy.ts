import { ResponseDto } from "src/apis/dto/response";

export default interface GetFashionHallOfFameResponseDto extends ResponseDto {
    fashionNumber : number | string;
    getPhotoLink : string;
}