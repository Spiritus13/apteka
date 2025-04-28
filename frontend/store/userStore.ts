/* eslint-disable @typescript-eslint/no-explicit-any */
// store/userStore.ts
import { create } from 'zustand';

interface UserStore {
  user: any;
  setUser: (user: any) => void;
}

const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));

export default useUserStore;
