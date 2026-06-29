'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { formatDateTime } from '@/lib/utils';
import { AuditLog } from '@/lib/types';

export default function AuditLogsPage() {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [searchEntity, setSearchEntity] = useState('');

  useEffect(() => {
    fetchAuditLogs();
  }, [page]);

  const fetchAuditLogs = async () => {
    try {
      setLoading(true);
      // TODO: Implement audit logs API endpoint
      setLogs([]);
    } catch (error) {
      console.error('Failed to fetch audit logs:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold tracking-tight">Audit Logs</h1>

      <Card>
        <CardHeader>
          <CardTitle>Activity Log</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4 space-y-2">
            <Label htmlFor="search">Search by Entity</Label>
            <Input
              id="search"
              placeholder="e.g., Product, Order"
              value={searchEntity}
              onChange={(e) => setSearchEntity(e.target.value)}
            />
          </div>

          {loading ? (
            <div>Loading...</div>
          ) : logs.length === 0 ? (
            <div className="text-center text-muted-foreground">No audit logs found</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="border-b">
                  <tr>
                    <th className="text-left py-2 px-4">User</th>
                    <th className="text-left py-2 px-4">Action</th>
                    <th className="text-left py-2 px-4">Entity</th>
                    <th className="text-left py-2 px-4">Entity ID</th>
                    <th className="text-left py-2 px-4">Timestamp</th>
                  </tr>
                </thead>
                <tbody>
                  {logs.map((log) => (
                    <tr key={log.id} className="border-b hover:bg-muted/50">
                      <td className="py-2 px-4">{log.user?.name}</td>
                      <td className="py-2 px-4">
                        <span
                          className={`px-2 py-1 rounded text-xs font-medium ${
                            log.action === 'CREATE'
                              ? 'bg-green-100 text-green-800'
                              : log.action === 'DELETE'
                              ? 'bg-red-100 text-red-800'
                              : 'bg-blue-100 text-blue-800'
                          }`}
                        >
                          {log.action}
                        </span>
                      </td>
                      <td className="py-2 px-4">{log.entity}</td>
                      <td className="py-2 px-4 font-mono text-xs">{log.entityId.slice(0, 8)}...</td>
                      <td className="py-2 px-4 text-xs text-muted-foreground">
                        {formatDateTime(new Date(log.createdAt))}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
