import { ResponseDto } from "src/apis/dto/response";

export default interface GetTotalCountResponseDto extends ResponseDto {
    count: number;
}