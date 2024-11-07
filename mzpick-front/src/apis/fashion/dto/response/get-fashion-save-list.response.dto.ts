import { ResponseDto } from "src/apis/dto/response";

export default interface GetFashionSaveListResponseDto extends ResponseDto {
    userIdList: string[];
}