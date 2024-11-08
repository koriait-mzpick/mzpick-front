import { ResponseDto } from "src/apis/dto/response";

export default interface GetTravelSaveListResponseDto extends ResponseDto {
    userIdList: string[];
}