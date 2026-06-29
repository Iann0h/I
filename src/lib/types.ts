export interface User {
  id: string;
  email: string;
  name: string;
  role: 'USER' | 'ADMIN';
  createdAt: Date;
  updatedAt: Date;
}

export interface Category {
  id: string;
  name: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Supplier {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Warehouse {
  id: string;
  name: string;
  location: string;
  capacity: number;
  currentUsage: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Product {
  id: string;
  sku: string;
  name: string;
  description?: string;
  price: number;
  quantity: number;
  reorderLevel: number;
  categoryId?: string;
  category?: Category;
  supplierId?: string;
  supplier?: Supplier;
  warehouseId?: string;
  warehouse?: Warehouse;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
}

export interface Order {
  id: string;
  orderNumber: string;
  quantity: number;
  totalPrice: number;
  status: 'PENDING' | 'CONFIRMED' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
  productId: string;
  product?: Product;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
  completedAt?: Date | null;
  deletedAt?: Date | null;
}

export interface AuditLog {
  id: string;
  userId: string;
  user?: User;
  action: string;
  entity: string;
  entityId: string;
  changes: string;
  metadata: string;
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

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}
