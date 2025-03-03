// interface: 회원가입 request body dto //
export default interface SignUpRequestDto {
    name: string;
    userId: string;
    password: string;
    telNumber: string;
    joinPath: string;
    birth: string;
    snsId: string | null;
    telAuthNumber: string;
}