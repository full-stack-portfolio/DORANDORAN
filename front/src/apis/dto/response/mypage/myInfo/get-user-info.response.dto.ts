import ResponseDto from "../../response.dto";

// interface: 로그인 request body dto //
export default interface GetUserInfoResponseDto extends ResponseDto{
    birth: string;
}