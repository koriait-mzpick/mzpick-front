import { ResponseDto } from "src/apis/dto/response";
import { StayComment } from "src/types/stay/stayComment.interface";

export default interface GetStayCommentResponseDto extends ResponseDto {
    stayComments: StayComment[];

}