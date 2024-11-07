import { ResponseDto } from "src/apis/dto/response";

export default interface GetFashionTotalCountResponseDto extends ResponseDto {
    count: number;
}