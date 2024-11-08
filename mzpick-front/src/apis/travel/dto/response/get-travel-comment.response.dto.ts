import { ResponseDto } from "src/apis/dto/response";
import { TravelComment } from "src/types/travel/travelComment.interface";

export default interface GetTravelCommentResponseDto extends ResponseDto {
    travelComments: TravelComment[];

}