import { db } from '@/lib/db';
import { logAudit } from '@/lib/audit';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;

    const products = await db.product.findMany({
      include: {
        category: true,
        supplier: true,
        warehouse: true,
      },
      where: {
        deletedAt: null,
      },
      skip,
      take: limit,
      orderBy: {
        createdAt: 'desc',
      },
    });

    const total = await db.product.count({
      where: {
        deletedAt: null,
      },
    });

    return NextResponse.json({
      success: true,
      data: products,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const userId = request.headers.get('user-id');
    const body = await request.json();

    const product = await db.product.create({
      data: {
        sku: body.sku,
        name: body.name,
        description: body.description,
        price: body.price,
        quantity: body.quantity || 0,
        reorderLevel: body.reorderLevel || 10,
        categoryId: body.categoryId,
        supplierId: body.supplierId,
        warehouseId: body.warehouseId,
      },
    });

    if (userId) {
      await logAudit(userId, 'CREATE', 'Product', product.id, body);
    }

    return NextResponse.json(
      { success: true, data: product },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to create product' },
      { status: 500 }
    );
  }
}
