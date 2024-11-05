
import { ResponseDto } from "src/apis/dto/response";
import { Fashion } from "src/types";

export default interface GetFashionListResponseDto extends ResponseDto {
    fashionList : Fashion[];
}