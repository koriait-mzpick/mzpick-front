import { ResponseDto } from "src/apis/dto/response";
import { TravelDetail } from "src/types";

export default interface GetTravelDetailResponseDto extends ResponseDto{
   travelDetail : TravelDetail;

   // travelNumber : number;
   // userId : string;
   // travelLocation : string;
   // travelTitle : string;
   // travelPhotoList : string[];
   // travelHashtagList : string[];
   // travelLikeUserList : string[];
   // travelSaveUserList : string[];
   // travelViewCount : number;
   // travelLikeCount : number;
   // travelSaveCount : number;
   // travelContent: string;    
   // travelDate : string;
}