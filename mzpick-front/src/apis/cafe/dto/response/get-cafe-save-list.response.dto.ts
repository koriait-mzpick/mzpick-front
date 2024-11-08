import { ResponseDto } from "src/apis/dto/response";

export default interface GetCafeSaveListResponseDto extends ResponseDto {
    userIdList: string[];
}