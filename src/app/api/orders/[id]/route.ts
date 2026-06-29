import { db } from '@/lib/db';
import { logAudit } from '@/lib/audit';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const order = await db.order.findUnique({
      where: { id: params.id },
      include: {
        product: {
          include: {
            category: true,
            supplier: true,
          },
        },
      },
    });

    if (!order) {
      return NextResponse.json(
        { success: false, error: 'Order not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: order });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch order' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = request.headers.get('user-id');
    const body = await request.json();

    const existing = await db.order.findUnique({
      where: { id: params.id },
    });

    if (!existing) {
      return NextResponse.json(
        { success: false, error: 'Order not found' },
        { status: 404 }
      );
    }

    const updateData: any = { ...body };

    if (body.status === 'DELIVERED' && !existing.completedAt) {
      updateData.completedAt = new Date();
    }

    const order = await db.order.update({
      where: { id: params.id },
      data: updateData,
    });

    if (userId) {
      await logAudit(userId, 'UPDATE', 'Order', params.id, {
        before: existing,
        after: body,
      });
    }

    return NextResponse.json({ success: true, data: order });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to update order' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = request.headers.get('user-id');

    const order = await db.order.update({
      where: { id: params.id },
      data: {
        deletedAt: new Date(),
      },
    });

    if (userId) {
      await logAudit(userId, 'DELETE', 'Order', params.id);
    }

    return NextResponse.json({ success: true, data: order });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to delete order' },
      { status: 500 }
    );
  }
}
