import { create } from "zustand";

interface CategoryStore {
    category:string|null;
    setCategory: (category:string)=>void
}
const useCategoryStore = create<CategoryStore>(set => ({
    category:'전체',
    setCategory: (category: string|null) => set(state => ({...state, category}))

}))

export default useCategoryStore;