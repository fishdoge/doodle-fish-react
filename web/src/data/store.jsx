import { create } from "zustand";
import { persist } from "zustand/middleware";

const useStore = create(
    persist(
        (set) => ({
            uid: "",
            inviteLink: "",
            setUid: (uid) => set({ uid }),
            setInviteLink: (inviteLink) => set({ inviteLink }),
        }),
        {
            name: "user-store", // Name of the storage key
            getStorage: () => localStorage, // Use localStorage
        },
    ),
);

export default useStore;

