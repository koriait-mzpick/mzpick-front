
export default interface Stay {
    traveStayNumber: number;
    userId : string;
    travelLocation: string;
    travelStayPhoto: string;
    travelStayHashtag: string[];
    travelStayCategory: string[];
    travelStayLikeUserList: string[];
    travelStaySaveUserList: string[];
    travelStayViewCount: number;
    travelStayLikeCount: number;
    travelStaySaveCount: number;
    travelStayDate: string;
}