export interface PostAdminMileageRequestDto {
    userId: string;
    amount: number;
    reason: string;
    customReason?: string;
}
