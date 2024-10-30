import { ResponseDto } from "src/apis/dto/response";

export default interface GetTravelCommentResponseDto extends ResponseDto {
    travelCommentNumeber: number;
    travelNumber: number;
    userId: string;
    travelComment: string;
}