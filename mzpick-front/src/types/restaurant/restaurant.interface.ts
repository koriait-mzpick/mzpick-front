export default interface Restaurant {
    traveFoodNumber: number;
    travelLocation: string;
    userId: string;
    travelFoodPhoto: string;
    travelFoodHashtagList: string[];
    travelFoodLikeUserList: string[];
    travelFoodSaveUserList: string[];
    travelFoodLikeCount: number;
    travelFoodSaveCount: number;
    travelFoodViewCount: number;
    travelFoodDate: string;
}