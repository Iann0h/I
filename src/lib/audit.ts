import { db } from './db';

export async function logAudit(
  userId: string,
  action: string,
  entity: string,
  entityId: string,
  changes?: any
) {
  try {
    await db.auditLog.create({
      data: {
        userId,
        action,
        entity,
        entityId,
        changes: JSON.stringify(changes || {}),
        metadata: JSON.stringify({
          timestamp: new Date().toISOString(),
          userAgent: 'server',
        }),
      },
    });
  } catch (error) {
    console.error('Failed to log audit:', error);
  }
}
