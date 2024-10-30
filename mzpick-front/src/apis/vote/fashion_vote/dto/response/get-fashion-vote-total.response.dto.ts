import { ResponseDto } from "src/apis/dto/response";

export default interface GetFashionVoteTotalResponseDto extends ResponseDto{
    choice : string ;
    count : number
}