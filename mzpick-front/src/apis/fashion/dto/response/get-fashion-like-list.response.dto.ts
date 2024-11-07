import { ResponseDto } from "src/apis/dto/response";

export default interface GetFashionLikeListResponseDto extends ResponseDto {
    userIdList: string[];
}