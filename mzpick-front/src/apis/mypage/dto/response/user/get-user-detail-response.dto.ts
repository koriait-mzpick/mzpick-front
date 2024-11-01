import { ResponseDto } from "src/apis/dto/response";

export default interface GetMyPageUserDetailResponseDto extends ResponseDto {
    userId: string;
    name: string;
    telNumber: string;
    joinPath: string;
}