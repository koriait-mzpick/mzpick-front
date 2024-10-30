// interface: 패션 게시글 수정 Request Body Dto //
export default interface PatchFashionRequestDto {
    fashionTitle: string;
    fashionHashtagContent: string[];
    fashionPhoto: string[];
    fashionTotalPrice: number;
    fashionContent: string;
}