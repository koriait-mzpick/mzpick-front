import { ResponseDto } from "src/apis/dto/response";

export default interface GetTravelDetailResponseDto extends ResponseDto{
    travelNumber : number;
    userId : string;
    travelLocation : string;
    travelTitle : string;
    travelPhotoList : string[];
    travelHashtagList : string[];
    travelLikeUserList : string[];
    travelSaveUserList : string[];
    travelViewCount : number;
    travelLikeCount : number;
    travelSaveCount : number;    
    travelDate : string;
}