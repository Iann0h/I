import { db } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const [totalProducts, totalOrders, totalWarehouses, totalSuppliers, pendingOrders, lowStockProducts] = await Promise.all([
      db.product.count({ where: { deletedAt: null } }),
      db.order.count({ where: { deletedAt: null } }),
      db.warehouse.count(),
      db.supplier.count(),
      db.order.count({ where: { status: 'PENDING', deletedAt: null } }),
      db.product.count({ where: { deletedAt: null, quantity: { lt: 10 } } }),
    ]);

    // Calculate total inventory value
    const products = await db.product.findMany({
      where: { deletedAt: null },
      select: { price: true, quantity: true },
    });

    const totalInventoryValue = products.reduce((sum, p) => sum + p.price * p.quantity, 0);

    return NextResponse.json({
      success: true,
      data: {
        totalProducts,
        totalOrders,
        totalWarehouses,
        totalSuppliers,
        lowStockProducts,
        pendingOrders,
        totalInventoryValue,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch dashboard stats' },
      { status: 500 }
    );
  }
}
