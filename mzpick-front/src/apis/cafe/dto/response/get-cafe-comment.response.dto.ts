import { ResponseDto } from "src/apis/dto/response";


export default interface GetCafeCommentResponseDto extends ResponseDto {
    travelCafeCommentNumeber: number;
    travelCafeNumber: number;
    userId: string;
    travelCafeComment: string;
}