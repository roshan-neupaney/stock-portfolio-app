import { create } from "zustand";

interface ModalState {
  status: boolean;
  id: string;
  toggleDeleteModal: (status: boolean, id: string) => void;
}

const useDeleteModalStore = create<ModalState>((set) => ({
  status: false,
  id: "",
  toggleDeleteModal: (status: boolean, id: string) =>
    set(() => ({ status, id })),
}));

export default useDeleteModalStore;
