import SignInUser from "../types/sign-in-user.interface";
import { create } from "zustand";

interface SignInUserStore {
    signInUser: SignInUser | null;
    setSignInUser: (signInUser: SignInUser | null) => void;
}

const useSignInUserStore = create<SignInUserStore>(set => ({
    signInUser: null, 
    setSignInUser: (signInUser: SignInUser | null) => set(state => ({...state, signInUser}))
}));

export default useSignInUserStore;