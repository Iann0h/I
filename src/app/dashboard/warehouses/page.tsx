'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { Product } from '@/lib/types';
import { formatCurrency } from '@/lib/utils';
import { Plus, Edit2, Trash2 } from 'lucide-react';

export default function WarehousesPage() {
  const { toast } = useToast();
  const [warehouses, setWarehouses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingWarehouse, setEditingWarehouse] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    capacity: '',
  });

  useEffect(() => {
    fetchWarehouses();
  }, []);

  const fetchWarehouses = async () => {
    try {
      setLoading(true);
      // TODO: Implement warehouse API endpoint
      setWarehouses([]);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch warehouses',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (warehouse?: any) => {
    if (warehouse) {
      setEditingWarehouse(warehouse);
      setFormData({
        name: warehouse.name,
        location: warehouse.location,
        capacity: warehouse.capacity,
      });
    } else {
      setEditingWarehouse(null);
      setFormData({ name: '', location: '', capacity: '' });
    }
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingWarehouse(null);
    setFormData({ name: '', location: '', capacity: '' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // TODO: Implement create/update warehouse API call
      toast({
        title: 'Success',
        description: editingWarehouse ? 'Warehouse updated' : 'Warehouse created',
      });
      handleCloseDialog();
      fetchWarehouses();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to save warehouse',
        variant: 'destructive',
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this warehouse?')) {
      try {
        // TODO: Implement delete warehouse API call
        toast({
          title: 'Success',
          description: 'Warehouse deleted',
        });
        fetchWarehouses();
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Failed to delete warehouse',
          variant: 'destructive',
        });
      }
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Warehouses</h1>
        <Button onClick={() => handleOpenDialog()}>
          <Plus className="w-4 h-4 mr-2" />
          Add Warehouse
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Warehouse List</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div>Loading...</div>
          ) : warehouses.length === 0 ? (
            <div className="text-center text-muted-foreground">No warehouses found</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="border-b">
                  <tr>
                    <th className="text-left py-2 px-4">Name</th>
                    <th className="text-left py-2 px-4">Location</th>
                    <th className="text-left py-2 px-4">Capacity</th>
                    <th className="text-left py-2 px-4">Usage</th>
                    <th className="text-left py-2 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {warehouses.map((warehouse) => (
                    <tr key={warehouse.id} className="border-b hover:bg-muted/50">
                      <td className="py-2 px-4">{warehouse.name}</td>
                      <td className="py-2 px-4">{warehouse.location}</td>
                      <td className="py-2 px-4">{warehouse.capacity}</td>
                      <td className="py-2 px-4">{warehouse.currentUsage}%</td>
                      <td className="py-2 px-4 space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleOpenDialog(warehouse)}
                        >
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-red-600 hover:text-red-700"
                          onClick={() => handleDelete(warehouse.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Add/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingWarehouse ? 'Edit Warehouse' : 'Add Warehouse'}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Warehouse Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="capacity">Capacity (units)</Label>
              <Input
                id="capacity"
                type="number"
                value={formData.capacity}
                onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                required
              />
            </div>
            <div className="flex gap-2 justify-end">
              <Button type="button" variant="outline" onClick={handleCloseDialog}>
                Cancel
              </Button>
              <Button type="submit">
                {editingWarehouse ? 'Update' : 'Create'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
