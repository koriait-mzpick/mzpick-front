export default interface Travel{
    travelNumber : number;
    userId : string;
    travelphoto : string;
    travelHashtagList : TravelHashtagList[];
    travelLikeUserList : TravelLikeUserList[];
    travelSaveUserList : TravelSaveUserList[];
    travelLikeCount : number;
    travelSaveCount : number;
    travelViewCount : number;
    travelDate : string:
}