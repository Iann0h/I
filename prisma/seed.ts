import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Create default user
  const user = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      password: await bcrypt.hash('admin123', 10),
      name: 'Admin User',
      role: 'ADMIN',
    },
  });
  console.log('✓ Default user created');

  // Create categories
  const electronics = await prisma.category.upsert({
    where: { name: 'Electronics' },
    update: {},
    create: {
      name: 'Electronics',
      description: 'Electronic devices and components',
    },
  });

  const furniture = await prisma.category.upsert({
    where: { name: 'Furniture' },
    update: {},
    create: {
      name: 'Furniture',
      description: 'Office and home furniture',
    },
  });
  console.log('✓ Categories created');

  // Create suppliers
  const supplier1 = await prisma.supplier.upsert({
    where: { name: 'TechCorp' },
    update: {},
    create: {
      name: 'TechCorp',
      email: 'contact@techcorp.com',
      phone: '+1-555-0101',
      address: '123 Tech Street, Silicon Valley, CA',
    },
  });

  const supplier2 = await prisma.supplier.upsert({
    where: { name: 'FurniturePlus' },
    update: {},
    create: {
      name: 'FurniturePlus',
      email: 'sales@furnitureplus.com',
      phone: '+1-555-0102',
      address: '456 Wood Ave, Portland, OR',
    },
  });
  console.log('✓ Suppliers created');

  // Create warehouses
  const warehouse1 = await prisma.warehouse.upsert({
    where: { name: 'Main Warehouse' },
    update: {},
    create: {
      name: 'Main Warehouse',
      location: 'New York, NY',
      capacity: 10000,
    },
  });

  const warehouse2 = await prisma.warehouse.upsert({
    where: { name: 'Secondary Warehouse' },
    update: {},
    create: {
      name: 'Secondary Warehouse',
      location: 'Los Angeles, CA',
      capacity: 5000,
    },
  });
  console.log('✓ Warehouses created');

  // Create products
  const product1 = await prisma.product.upsert({
    where: { sku: 'LAPTOP-001' },
    update: {},
    create: {
      sku: 'LAPTOP-001',
      name: 'ProBook Laptop',
      description: 'High-performance laptop for professionals',
      price: 999.99,
      quantity: 50,
      reorderLevel: 10,
      categoryId: electronics.id,
      supplierId: supplier1.id,
      warehouseId: warehouse1.id,
    },
  });

  const product2 = await prisma.product.upsert({
    where: { sku: 'DESK-001' },
    update: {},
    create: {
      sku: 'DESK-001',
      name: 'Executive Desk',
      description: 'Premium wooden office desk',
      price: 499.99,
      quantity: 30,
      reorderLevel: 5,
      categoryId: furniture.id,
      supplierId: supplier2.id,
      warehouseId: warehouse2.id,
    },
  });

  const product3 = await prisma.product.upsert({
    where: { sku: 'MONITOR-001' },
    update: {},
    create: {
      sku: 'MONITOR-001',
      name: '4K Monitor',
      description: '27-inch 4K resolution monitor',
      price: 399.99,
      quantity: 5,
      reorderLevel: 20,
      categoryId: electronics.id,
      supplierId: supplier1.id,
      warehouseId: warehouse1.id,
    },
  });
  console.log('✓ Products created');

  // Create orders
  await prisma.order.upsert({
    where: { orderNumber: 'ORD-001' },
    update: {},
    create: {
      orderNumber: 'ORD-001',
      quantity: 10,
      totalPrice: 9999.90,
      status: 'DELIVERED',
      productId: product1.id,
    },
  });

  await prisma.order.upsert({
    where: { orderNumber: 'ORD-002' },
    update: {},
    create: {
      orderNumber: 'ORD-002',
      quantity: 5,
      totalPrice: 2499.95,
      status: 'PENDING',
      productId: product2.id,
    },
  });
  console.log('✓ Orders created');

  console.log('✓ Database seeded successfully!');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
