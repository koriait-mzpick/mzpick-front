import { ResponseDto } from "src/apis/dto/response";

export default interface GetStayLikeListResponseDto extends ResponseDto {
    userIdList: string[];
}