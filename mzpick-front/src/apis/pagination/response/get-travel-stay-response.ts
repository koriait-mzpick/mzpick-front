import { ResponseDto } from "src/apis/dto/response";

export default interface GetStayTotalCountResponseDto extends ResponseDto {
    count: number;
}