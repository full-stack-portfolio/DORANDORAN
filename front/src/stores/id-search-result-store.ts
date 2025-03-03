//# userId Search result store
// 이름, 전화번호 인증 ->
// 전화번호, 인증번호 인증 ->
// 이름, 아이디, 전화번호 결과

import { create } from "zustand";

interface IdSearchResult {
	name: string;
	userId: string;
	telNumber: string;
	telAuthNumber: string;
	setName: (name: string) => void;
	setUserId: (userId: string) => void 
	setTelNumber: (telNumber: string) => void;
	setTelAuthNumber: (telAuthNumber: string) => void;
}

const useIdSearchResultZustand = create<IdSearchResult>(set => ({
	name: '',
	userId: '',
	telNumber: '',
	telAuthNumber: '',
	setName: (name: string) => set(state => ({...state, name})),
	setUserId: (userId: string) => set(state => ({...state, userId})),
	setTelNumber: (telNumber: string) => set(state => ({...state, telNumber})),
	setTelAuthNumber: (telAuthNumber: string) => set(state => ({...state, telAuthNumber}))
}))

export default useIdSearchResultZustand;