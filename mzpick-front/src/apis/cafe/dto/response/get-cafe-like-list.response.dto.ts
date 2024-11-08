import { ResponseDto } from "src/apis/dto/response";

export default interface GetCafeLikeListResponseDto extends ResponseDto {
    userIdList: string[];
}