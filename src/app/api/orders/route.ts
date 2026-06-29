import { db } from '@/lib/db';
import { logAudit } from '@/lib/audit';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const status = searchParams.get('status');
    const skip = (page - 1) * limit;

    const where: any = {
      deletedAt: null,
    };

    if (status) {
      where.status = status;
    }

    const orders = await db.order.findMany({
      include: {
        product: {
          include: {
            category: true,
            supplier: true,
          },
        },
      },
      where,
      skip,
      take: limit,
      orderBy: {
        createdAt: 'desc',
      },
    });

    const total = await db.order.count({ where });

    return NextResponse.json({
      success: true,
      data: orders,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch orders' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const userId = request.headers.get('user-id');
    const body = await request.json();

    const product = await db.product.findUnique({
      where: { id: body.productId },
    });

    if (!product) {
      return NextResponse.json(
        { success: false, error: 'Product not found' },
        { status: 404 }
      );
    }

    const orderNumber = `ORD-${Date.now().toString().slice(-8)}`;
    const totalPrice = product.price * body.quantity;

    const order = await db.order.create({
      data: {
        orderNumber,
        quantity: body.quantity,
        totalPrice,
        productId: body.productId,
        status: 'PENDING',
        notes: body.notes,
      },
    });

    if (userId) {
      await logAudit(userId, 'CREATE', 'Order', order.id, body);
    }

    return NextResponse.json(
      { success: true, data: order },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to create order' },
      { status: 500 }
    );
  }
}
