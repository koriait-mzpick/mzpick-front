import { ResponseDto } from "src/apis/dto/response";

export default interface GetStayCommentResponseDto extends ResponseDto {
    travelStayCommentNumeber: number;
    travelStayNumber: number;
    userId: string;
    travelStayComment: string;
}