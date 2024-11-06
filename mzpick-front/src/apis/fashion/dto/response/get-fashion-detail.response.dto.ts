import { ResponseDto } from "src/apis/dto/response";
import { FashionDetail } from "src/types";

export default interface GetFashionDetailResponseDto extends ResponseDto {
    fashionDetail : FashionDetail
}