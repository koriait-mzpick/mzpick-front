import { ResponseDto } from "src/apis/dto/response";

export default interface GetCafeTotalCountResponseDto extends ResponseDto {
    count: number;
}