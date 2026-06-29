# Inventory Management System

A comprehensive, full-featured inventory management system built with Next.js, TypeScript, and Tailwind CSS.

## Features

- 👤 **User Authentication** - JWT-based authentication with login/register
- 📦 **Product Management** - Create, read, update, delete products with SKU tracking
- 🛒 **Order Management** - Track orders with status updates (PENDING, CONFIRMED, SHIPPED, DELIVERED)
- 🏢 **Warehouse Management** - Manage multiple warehouses with capacity tracking
- 👥 **Supplier Management** - Maintain supplier information and contact details
- 📊 **Dashboard** - Real-time analytics and inventory overview
- 📋 **Audit Logs** - Complete audit trail of all system activities
- 🔐 **Role-Based Access** - User and Admin roles
- 🎨 **Modern UI** - Built with shadcn/ui components and Tailwind CSS

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT with bcryptjs
- **State Management**: Zustand
- **Icons**: Lucide React

## Installation

### Prerequisites

- Node.js 18+
- PostgreSQL database
- npm or yarn

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/Iann0h/I.git
   cd I
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Update `.env.local` with your configuration:
   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/inventory_db"
   JWT_SECRET="your-secret-key"
   NODE_ENV="development"
   ```

4. **Run database migrations**
   ```bash
   npx prisma migrate dev
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   ```
   http://localhost:3000
   ```

## Project Structure

```
src/
├── app/
│   ├── api/                 # API routes
│   │   ├── auth/           # Authentication endpoints
│   │   ├── products/       # Product CRUD endpoints
│   │   └── orders/         # Order CRUD endpoints
│   ├── auth/               # Auth pages (login, register)
│   ├── dashboard/          # Dashboard pages
│   │   ├── products/       # Products management
│   │   ├── orders/         # Orders management
│   │   ├── warehouses/     # Warehouses management
│   │   ├── suppliers/      # Suppliers management
│   │   ├── audit-logs/     # Audit logs view
│   │   └── settings/       # User settings
│   ├── layout.tsx          # Root layout
│   └── globals.css         # Global styles
├── components/
│   ├── ui/                 # shadcn/ui components
│   ├── sidebar.tsx         # Navigation sidebar
│   └── topbar.tsx          # Top navigation
├── lib/
│   ├── auth.ts             # Authentication utilities
│   ├── auth-service.ts     # Auth business logic
│   ├── audit.ts            # Audit logging
│   ├── db.ts               # Prisma client
│   ├── store.ts            # Zustand store
│   ├── types.ts            # TypeScript interfaces
│   └── utils.ts            # Helper functions
├── hooks/
│   ├── use-auth.ts         # Auth hook
│   └── use-toast.ts        # Toast notifications
└── middleware.ts           # Next.js middleware
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/session` - Check authentication status
- `POST /api/auth/session` - Logout

### Products
- `GET /api/products` - Get all products (paginated)
- `POST /api/products` - Create new product
- `GET /api/products/[id]` - Get product details
- `PUT /api/products/[id]` - Update product
- `DELETE /api/products/[id]` - Delete product

### Orders
- `GET /api/orders` - Get all orders (paginated)
- `POST /api/orders` - Create new order
- `GET /api/orders/[id]` - Get order details
- `PUT /api/orders/[id]` - Update order status
- `DELETE /api/orders/[id]` - Delete order

## Database Schema

See `prisma/schema.prisma` for the complete database schema.

### Main Models:
- **User** - System users with roles
- **Product** - Inventory products with SKU tracking
- **Order** - Purchase orders with status tracking
- **Category** - Product categories
- **Supplier** - Supplier information
- **Warehouse** - Storage locations
- **AuditLog** - System activity audit trail

## Usage Examples

### Create a Product
```bash
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "sku": "PROD-001",
    "name": "Sample Product",
    "price": 99.99,
    "quantity": 100,
    "categoryId": "cat-123"
  }'
```

### Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123"
  }'
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, please open an issue on GitHub.
