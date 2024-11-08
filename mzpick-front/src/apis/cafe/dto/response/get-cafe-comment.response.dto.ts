import { ResponseDto } from "src/apis/dto/response";
import { CafeComment } from "src/types/cafe/cafeComment.interface";


export default interface GetCafeCommentResponseDto extends ResponseDto {
    cafeComments: CafeComment[];

}