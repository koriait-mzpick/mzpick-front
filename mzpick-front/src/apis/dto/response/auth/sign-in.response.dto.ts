import ResponseDto from "../response.dto";

// interface: 로그인 Response Body Dto //s
export default interface SignInResponseDto extends ResponseDto {
    accessToken: string;
    expiration: number;
}