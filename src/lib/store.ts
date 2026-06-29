import { create } from 'zustand';

export type Section =
  | 'dashboard'
  | 'products'
  | 'inventory'
  | 'orders'
  | 'suppliers'
  | 'categories'
  | 'warehouses';

export const SECTION_LABELS: Record<Section, string> = {
  dashboard: 'Dashboard',
  products: 'Products',
  inventory: 'Inventory',
  orders: 'Orders',
  suppliers: 'Suppliers',
  categories: 'Categories',
  warehouses: 'Warehouses',
};

interface AppStore {
  activeSection: Section;
  setActiveSection: (section: Section) => void;
}

export const useAppStore = create<AppStore>((set) => ({
  activeSection: 'dashboard',
  setActiveSection: (section: Section) => set({ activeSection: section }),
}));
