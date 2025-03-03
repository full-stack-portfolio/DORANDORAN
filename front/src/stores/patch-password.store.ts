//# patch password store
// : 비밀번호 재설정을 위한 (비밀번호 찾기 & 비밀번호 재설정 화면 공유를 위한 zustand)

import { create } from "zustand";

interface PatchPasswordZustand {
	userId: string;
	zusTelNumber: string;
	telAuthNumber: string
	zusPassword: string;
	setUserId: (userId: string) => void;
	setZusTelNumber: (zusTelNumber: string) => void;
	setTelAuthNumber: (telAuthNumber: string) => void;
	setZusPassword: (zusPassword: string) => void;
}

const usePatchPasswordZustand = create<PatchPasswordZustand> (set => ({
	userId: '',
	zusTelNumber: '',
	telAuthNumber: '',
	zusPassword: '',
	setUserId: (userId: string) => set(state => ({...state, userId})),
	setZusTelNumber: (zusTelNumber: string) => set(state => ({...state, zusTelNumber})),
	setTelAuthNumber: (telAuthNumber: string) => set(state => ({...state, telAuthNumber})),
	setZusPassword: (zusPassword: string) => set(state => ({...state, zusPassword}))
}))

export default usePatchPasswordZustand;