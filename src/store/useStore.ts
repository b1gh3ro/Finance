import { create } from 'zustand';
import { initialTransactions, type Transaction } from '../data/mockData';

export type Role = 'Viewer' | 'Admin';
export type Theme = 'light' | 'dark';

interface DashboardState {
  role: Role;
  theme: Theme;
  transactions: Transaction[];
  searchQuery: string;
  setRole: (role: Role) => void;
  toggleTheme: () => void;
  addTransaction: (tx: Transaction) => void;
  deleteTransaction: (id: string) => void;
  setSearchQuery: (query: string) => void;
}

export const useStore = create<DashboardState>((set) => ({
  role: 'Viewer',
  theme: 'light',
  transactions: initialTransactions,
  searchQuery: '',
  setRole: (role) => set({ role }),
  toggleTheme: () => set((state) => {
    const newTheme = state.theme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', newTheme);
    return { theme: newTheme };
  }),
  addTransaction: (tx) => set((state) => ({ transactions: [tx, ...state.transactions] })),
  deleteTransaction: (id) => set((state) => ({
    transactions: state.transactions.filter(t => t.id !== id)
  })),
  setSearchQuery: (query) => set({ searchQuery: query })
}));
