export default interface Travel{
    travelNumber: number;
    userId: string;
    travelPhoto: string;
    travelHashtagList: string[];
    travelLikeUserList: string[];
    travelSaveUserList: string[];
    travelSaveCount: number;
    travelLikeCount: number;
    travelViewCount: number;
    travelDate: string;
}