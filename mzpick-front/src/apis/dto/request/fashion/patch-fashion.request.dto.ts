// interface: 패션 게시글 수정 Request Body Dto //
export default interface PatchFashionRequestDto {
    fashionTitle: string;
    fashionHashtagContent: string[];
    fashionLocation: string;
    fashionPhoto: string[];
    fashionCategoryList: string[];
    fashionTotalPrice: number;
    fashionContent: string;
}