import { ResponseDto } from "src/apis/dto/response";
import { FashionComment } from "src/types";


export default interface GetFashionCommentResponseDto extends ResponseDto {
    fashionComments: FashionComment[];
}