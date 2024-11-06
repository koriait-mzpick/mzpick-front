export default interface StayDetail {
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
    travelStayContent : string;
    travelStayDate : string;
}