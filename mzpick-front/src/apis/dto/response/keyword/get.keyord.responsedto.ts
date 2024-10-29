import ResponseDto from "../response.dto";

export default interface GetKeyWordResponseDto extends ResponseDto{
    count: number;
    keywordContent: string;
}