export interface RefundHistoryItem {
    transactionDate: string;
    amount: number;
    status: string;
}

export interface GetMileageResponseDto {
    code: string;
    message: string;
    totalMileage: number;
    totalRefundedMileage: number;
    availableMileage: number;
    refundHistory: RefundHistoryItem[];
    earningHistory: EarningHistoryItem[];
}

export interface EarningHistoryItem {
    transactionDate: string; 
    reason: string; 
    amount: number;
}

export interface MileageRequestDto {
    mileageId: number;
    userId: string;
    accountNumber: string;
    bankName: string;
    amount: number;
    status: string;
    transactionDate: string;
}