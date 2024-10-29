import ResponseDto from "../response.dto";

export default interface GetTravelCommentResponseDto extends ResponseDto {
    travelCommentNumeber: number;
    travelNumber: number;
    userId: string;
    travelComment: string;
}