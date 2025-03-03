import { create } from "zustand";


interface RankingClickResult {
  clickRank: boolean;
  setClickRank: (clickRank: boolean) => void;
}

const RankingClickResultStore = create<RankingClickResult>(set => ({
  clickRank: false,
  setClickRank: (clickRank: boolean) => set(state => ({ ...state, clickRank }))
}))

export default RankingClickResultStore;