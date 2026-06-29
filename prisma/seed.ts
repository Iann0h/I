import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create sample categories
  const electronics = await prisma.category.create({
    data: {
      name: 'Electronics',
      description: 'Electronic devices and components',
    },
  });

  const furniture = await prisma.category.create({
    data: {
      name: 'Furniture',
      description: 'Office and home furniture',
    },
  });

  // Create sample suppliers
  const supplier1 = await prisma.supplier.create({
    data: {
      name: 'Tech Supplies Inc',
      email: 'contact@techsupplies.com',
      phone: '+1-555-0123',
      address: '123 Tech Street',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94102',
      country: 'USA',
    },
  });

  // Create sample warehouse
  const warehouse = await prisma.warehouse.create({
    data: {
      name: 'Main Warehouse',
      location: 'New York, NY',
      capacity: 10000,
    },
  });

  // Create sample products
  await prisma.product.create({
    data: {
      sku: 'LAPTOP-001',
      name: 'Professional Laptop',
      description: '15" business laptop',
      price: 1299.99,
      quantity: 50,
      reorderLevel: 10,
      categoryId: electronics.id,
      supplierId: supplier1.id,
      warehouseId: warehouse.id,
    },
  });

  await prisma.product.create({
    data: {
      sku: 'DESK-001',
      name: 'Office Desk',
      description: 'Ergonomic office desk',
      price: 399.99,
      quantity: 25,
      reorderLevel: 5,
      categoryId: furniture.id,
      supplierId: supplier1.id,
      warehouseId: warehouse.id,
    },
  });

  console.log('Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
