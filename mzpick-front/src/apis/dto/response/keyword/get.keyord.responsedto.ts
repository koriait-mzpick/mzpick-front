import { Keyword } from "../../../../types";
import ResponseDto from "../response.dto";

export default interface GetKeyWordResponseDto extends ResponseDto{
    keywordContent:Keyword[];
}