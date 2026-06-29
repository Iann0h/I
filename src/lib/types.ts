export interface Product {
  id: string;
  sku: string;
  name: string;
  description: string | null;
  price: number;
  quantity: number;
  reorderLevel: number;
  active: boolean;
  categoryId: string;
  supplierId: string;
  warehouseId: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface Category {
  id: string;
  name: string;
  description: string | null;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface Supplier {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  address: string | null;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface Warehouse {
  id: string;
  name: string;
  location: string;
  capacity: number;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface Order {
  id: string;
  orderNumber: string;
  quantity: number;
  status: 'PENDING' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
  totalPrice: number;
  notes: string | null;
  productId: string;
  createdAt: Date;
  updatedAt: Date;
  completedAt: Date | null;
  deletedAt: Date | null;
}

export interface User {
  id: string;
  email: string;
  name: string | null;
  role: 'ADMIN' | 'MANAGER' | 'USER' | 'VIEWER';
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface AuditLog {
  id: string;
  userId: string;
  action: string;
  entity: string;
  entityId: string;
  changes: Record<string, unknown>;
  metadata: Record<string, unknown>;
  createdAt: Date;
}

export interface StockHistory {
  id: string;
  productId: string;
  oldQuantity: number;
  newQuantity: number;
  change: number;
  reason: string;
  createdAt: Date;
}

export interface DashboardStats {
  totalProducts: number;
  totalOrders: number;
  totalWarehouses: number;
  totalSuppliers: number;
  lowStockProducts: number;
  pendingOrders: number;
  totalInventoryValue: number;
}

export type ApiResponse<T> = {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
};
