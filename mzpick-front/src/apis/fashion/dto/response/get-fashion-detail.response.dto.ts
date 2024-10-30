import { ResponseDto } from "src/apis/dto/response";

export default interface GetFashionDetailResponseDto extends ResponseDto {
    fashionTitle: string;
    userId: string;
    fashionNumber: number;
    fashionPhotoList: string[];
    fashionHashtagList: string[];
    fashionLikeUserList: string[];
    fashionSaveUserList: string[];
    totalPrice: number;
    fashionLikeCount: number;
    fashionSaveCount: number;
    fashionViewCount: number;
    fashionDate: string;
}