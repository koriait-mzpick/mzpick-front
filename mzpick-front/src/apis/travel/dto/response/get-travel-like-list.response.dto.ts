import { ResponseDto } from "src/apis/dto/response";

export default interface GetTravelLikeListResponseDto extends ResponseDto {
    userIdList: string[];
}