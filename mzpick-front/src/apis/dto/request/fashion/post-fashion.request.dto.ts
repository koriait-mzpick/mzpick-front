// interface: 패션 게시글 작성 Request Body Dto //
export default interface PostFashionRequestDto {
    fashionTitle: string;
    fashionHashtagContent: string[];
    fashionLocation: string;
    fashionPhoto: string[];
    fashionCategoryList: string[];
    fashionTotalPrice: number;
    fashionContent: string;
}