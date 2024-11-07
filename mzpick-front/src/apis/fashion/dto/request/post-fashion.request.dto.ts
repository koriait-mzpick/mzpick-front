// interface: 패션 게시글 작성 Request Body Dto //
export default interface PostFashionRequestDto {
    fashionTitle: string;
    fashionHashtagContentList: string[];
    fashionPhoto: string[];
    fashionTotalPrice: number;
    fashionContent: string;
}