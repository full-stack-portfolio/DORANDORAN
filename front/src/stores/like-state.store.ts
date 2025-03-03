import { create } from "zustand";

interface LikeState {
    likeClick: { [key: number]: boolean };
    setLikeClick: (newState: { [key: number]: boolean }) => void; 
    toggleLike: (targetId: number) => void;  // 좋아요 상태 변경 함수
}

export const useLikeStore = create<LikeState>((set) => ({
    // likeClick: {},
    // setLikeClick: (newState) => set({ likeClick: newState }),
    // toggleLike: (targetId) =>
    //     set((state) => ({
    //     likeClick: {
    //         ...state.likeClick,
    //         [targetId]: !state.likeClick[targetId] ,  
    //     },
    // })),
    likeClick: {},
    setLikeClick: (updateFn) => 
        set((state) => ({
            likeClick: { ...state.likeClick, ...updateFn(state.likeClick) } 
        })),
    toggleLike: (targetId) =>
        set((state) => ({
            likeClick: {
                ...state.likeClick,
                [targetId]: !state.likeClick[targetId],
            },
        })),
}));

export default useLikeStore;