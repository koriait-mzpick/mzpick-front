import ResponseDto from "../response.dto";

export default interface GetHofResponseDto extends ResponseDto {
    travelNumber : number;
    getPhotoLink : string;
}