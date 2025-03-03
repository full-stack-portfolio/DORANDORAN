import ResponseDto from "../response.dto";

// interface: 사용자 정보 가져오기 response Body dto //
export default interface GetSignInResponseDto extends ResponseDto {
    userId: string;

}