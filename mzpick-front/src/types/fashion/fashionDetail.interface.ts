export default interface FashionDetail {
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
    fashionContent: string;
    fashionDate: string;
}