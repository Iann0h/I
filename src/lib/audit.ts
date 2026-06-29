import { db } from '@/lib/db';

export async function logAudit(
  userId: string,
  action: string,
  entity: string,
  entityId: string,
  changes: Record<string, any> = {},
  metadata: Record<string, any> = {}
) {
  try {
    await db.auditLog.create({
      data: {
        userId,
        action,
        entity,
        entityId,
        changes: JSON.stringify(changes),
        metadata: JSON.stringify(metadata),
      },
    });
  } catch (error) {
    console.error('Failed to log audit:', error);
  }
}

export async function getAuditLogs(
  limit: number = 100,
  offset: number = 0
) {
  const logs = await db.auditLog.findMany({
    include: {
      user: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
    take: limit,
    skip: offset,
  });

  const total = await db.auditLog.count();

  return { logs, total };
}

export async function getUserAuditLogs(
  userId: string,
  limit: number = 50,
  offset: number = 0
) {
  const logs = await db.auditLog.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
    take: limit,
    skip: offset,
  });

  const total = await db.auditLog.count({ where: { userId } });

  return { logs, total };
}
