import { create } from "zustand";

interface SearchLocationStore {
    searchLocation: string;
    setSearchLocation: (searchLocation: string) => void;
}

const useStore = create<SearchLocationStore>(set => ({
    searchLocation: '',
    setSearchLocation: (searchLocation: string) => set(state => ({ ...state, searchLocation }))
}));

export default useStore;