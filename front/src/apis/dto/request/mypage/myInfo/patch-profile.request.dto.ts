// interface: profile patch request body dto //
export default interface PatchProfileRequestDto {
    nickName: string;
    profileImage: string | null;
    statusMessage: string | null;
}