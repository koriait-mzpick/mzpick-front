import { ResponseDto } from "src/apis/dto/response";

export default interface GetStayDetailResponseDto extends ResponseDto{
    travelStayNumber : number;
    userId : string;
    travelLocathion: string;
    travelStayTitle : string;
    travelStayPhotoList : string[];
    travelStayCategoryList: string[];
    travelStayHashtagList : string[];
    travelStayLikeUserList : string[];
    travelStaySaveUserList : string[];
    travelStayViewCount : number;
    travelStayLikeCount : number;
    travelStaySaveCount : number;    
    travelStayDate : string;
}