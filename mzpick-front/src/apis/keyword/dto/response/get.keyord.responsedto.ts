import { ResponseDto } from "src/apis/dto/response";

export default interface GetKeyWordResponseDto extends ResponseDto{
    count: number;
    keywordContent: string;
}