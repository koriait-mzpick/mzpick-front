import ResponseDto from "../response.dto";

export default interface GetTravelDetailResponseDto extends ResponseDto{
    travelNumber : number;
    travelTitle : string;
    travelPhotoList : string[];
    travelHashtagList : string[];
    travelLikeList : string[];
    travelSaveList : string[];
    travelViewCount : number;
    travelLikeCount : number;
    travelSaveCount : number;    
    travelDate : string;
}