import { ResponseDto } from "src/apis/dto/response";

export default interface GetStaySaveListResponseDto extends ResponseDto {
    userIdList: string[];
}