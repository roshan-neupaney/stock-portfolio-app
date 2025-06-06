import { create } from 'zustand';

interface ModalState {
  status: boolean;
  id: string;
  toggleAddStockModal: (status: boolean, id: string) => void;
}

const useAddStockModalStore = create<ModalState>((set) => ({
  status: false,
  id: '',
  toggleAddStockModal: (status: boolean, id: string) => set(() => ({ status, id })),
}));

export default useAddStockModalStore;