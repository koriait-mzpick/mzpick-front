import { ResponseDto } from "src/apis/dto/response";


export default interface GetFashionCommentResponseDto extends ResponseDto {
    fashionCommentNumeber: number;
    fashionNumber: number;
    userId: string;
    fashionComment: string;
}