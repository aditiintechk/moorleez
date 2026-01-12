'use client'

import Link from 'next/link'

// Fake data
const stats = {
  totalRevenue: 245680,
  totalOrders: 487,
  activeProducts: 24,
  avgOrderValue: 504.5,
}

const recentOrders = [
  {
    id: 'ORD-1234',
    customer: { name: 'Priya Sharma', email: 'priya@example.com' },
    items: 3,
    total: 1299,
    status: 'DELIVERED',
    date: '2024-01-10',
  },
  {
    id: 'ORD-1235',
    customer: { name: 'Rahul Patel', email: 'rahul@example.com' },
    items: 1,
    total: 599,
    status: 'SHIPPED',
    date: '2024-01-10',
  },
  {
    id: 'ORD-1236',
    customer: { name: 'Ananya Kumar', email: 'ananya@example.com' },
    items: 2,
    total: 899,
    status: 'PROCESSING',
    date: '2024-01-09',
  },
  {
    id: 'ORD-1237',
    customer: { name: 'Vikram Singh', email: 'vikram@example.com' },
    items: 4,
    total: 2150,
    status: 'DELIVERED',
    date: '2024-01-09',
  },
  {
    id: 'ORD-1238',
    customer: { name: 'Neha Gupta', email: 'neha@example.com' },
    items: 1,
    total: 449,
    status: 'PENDING',
    date: '2024-01-08',
  },
]

const lowStockProducts = [
  {
    id: 'PRD-001',
    name: 'Handwoven Cotton Throw',
    stock: 2,
  },
  {
    id: 'PRD-002',
    name: 'Ceramic Vase Set',
    stock: 4,
  },
  {
    id: 'PRD-003',
    name: 'Crochet Cushion Cover',
    stock: 1,
  },
  {
    id: 'PRD-004',
    name: 'Abstract Wall Art',
    stock: 3,
  },
  {
    id: 'PRD-005',
    name: 'Macrame Plant Hanger',
    stock: 5,
  },
]

export default function AdminDemoPage() {
  // Format number with commas consistently for both server and client
  const formatCurrency = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'DELIVERED':
        return 'bg-sage/10 text-sage border-sage/20'
      case 'SHIPPED':
        return 'bg-terracotta/10 text-terracotta border-terracotta/20'
      case 'PROCESSING':
        return 'bg-clay/10 text-clay border-clay/20'
      case 'PENDING':
        return 'bg-yellow-500/10 text-yellow-700 border-yellow-500/20'
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200'
    }
  }

  const getStockColor = (stock: number) => {
    if (stock === 0) return 'bg-red-500'
    if (stock <= 2) return 'bg-terracotta'
    if (stock <= 5) return 'bg-yellow-500'
    return 'bg-sage'
  }

  const getStockStatus = (stock: number) => {
    if (stock === 0) return 'Out of Stock'
    if (stock <= 2) return 'Critical'
    if (stock <= 5) return 'Low Stock'
    return 'In Stock'
  }

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-deep-brown">Dashboard</h1>
        <p className="mt-2 text-warm-gray">
          Overview of your store performance
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {/* Total Revenue */}
        <div className="group rounded-xl bg-white p-6 shadow-soft transition-shadow hover:shadow-medium">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-warm-gray">
                Total Revenue
              </p>
              <p className="mt-2 text-2xl font-bold text-deep-brown">
                ₹{formatCurrency(stats.totalRevenue)}
              </p>
              <p className="mt-1 text-xs text-sage">+12% from last month</p>
            </div>
            <div className="rounded-xl bg-sage/10 p-3">
              <svg className="h-6 w-6 text-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Total Orders */}
        <div className="group rounded-xl bg-white p-6 shadow-soft transition-shadow hover:shadow-medium">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-warm-gray">Total Orders</p>
              <p className="mt-2 text-2xl font-bold text-deep-brown">
                {stats.totalOrders}
              </p>
              <p className="mt-1 text-xs text-warm-gray">All time</p>
            </div>
            <div className="rounded-xl bg-terracotta/10 p-3">
              <svg className="h-6 w-6 text-terracotta" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Active Products */}
        <div className="group rounded-xl bg-white p-6 shadow-soft transition-shadow hover:shadow-medium">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-warm-gray">
                Active Products
              </p>
              <p className="mt-2 text-2xl font-bold text-deep-brown">
                {stats.activeProducts}
              </p>
              <p className="mt-1 text-xs text-warm-gray">In catalog</p>
            </div>
            <div className="rounded-xl bg-clay/10 p-3">
              <svg className="h-6 w-6 text-clay" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
          </div>
        </div>

        {/* Avg Order Value */}
        <div className="group rounded-xl bg-white p-6 shadow-soft transition-shadow hover:shadow-medium">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-warm-gray">
                Avg Order Value
              </p>
              <p className="mt-2 text-2xl font-bold text-deep-brown">
                ₹{formatCurrency(stats.avgOrderValue)}
              </p>
              <p className="mt-1 text-xs text-warm-gray">Per order</p>
            </div>
            <div className="rounded-xl bg-dusty-rose/10 p-3">
              <svg className="h-6 w-6 text-dusty-rose" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Two Column Section */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Orders */}
        <div className="rounded-xl bg-white p-6 shadow-soft">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-bold text-deep-brown">Recent Orders</h2>
            <Link
              href="/admin-demo/orders"
              className="text-sm font-medium text-terracotta hover:underline"
            >
              View all
            </Link>
          </div>
          <div className="space-y-3">
            {recentOrders.map((order) => (
              <div
                key={order.id}
                className="flex items-center gap-4 rounded-lg border border-light-gray p-3 transition-all hover:border-clay/30 hover:bg-beige/30"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-beige text-sm font-bold text-deep-brown">
                  {getInitials(order.customer.name)}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-deep-brown">
                    {order.customer.name}
                  </p>
                  <p className="text-xs text-warm-gray">
                    {order.items} items • {order.date}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-deep-brown">
                    ₹{formatCurrency(order.total)}
                  </p>
                  <span
                    className={`inline-block rounded-full border px-2 py-0.5 text-xs font-medium ${getStatusColor(order.status)}`}
                  >
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Low Stock Alert */}
        <div className="rounded-xl bg-white p-6 shadow-soft">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-bold text-deep-brown">
              Low Stock Alert
            </h2>
            <Link
              href="/admin-demo/products"
              className="text-sm font-medium text-terracotta hover:underline"
            >
              Manage products
            </Link>
          </div>
          <div className="space-y-3">
            {lowStockProducts.map((product) => (
              <div
                key={product.id}
                className="flex items-center gap-4 rounded-lg border border-light-gray p-3 transition-all hover:border-clay/30 hover:bg-beige/30"
              >
                <div className="relative h-12 w-12 overflow-hidden rounded-lg bg-beige">
                  <div className="flex h-full w-full items-center justify-center text-xs text-warm-gray">
                    IMG
                  </div>
                </div>
                <div className="flex-1">
                  <p className="font-medium text-deep-brown">{product.name}</p>
                  <p className="text-xs text-warm-gray">ID: {product.id}</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-2">
                    <div
                      className={`h-2 w-2 rounded-full ${getStockColor(product.stock)}`}
                    />
                    <span className="text-sm font-bold text-deep-brown">
                      {product.stock} left
                    </span>
                  </div>
                  <span className="text-xs text-warm-gray">
                    {getStockStatus(product.stock)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="rounded-xl bg-deep-brown p-6 shadow-soft">
        <h3 className="mb-4 text-lg font-bold text-cream">Quick Actions</h3>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/admin-demo/products"
            className="inline-flex items-center gap-2 rounded-lg bg-terracotta px-4 py-2 text-sm font-medium text-cream transition-colors hover:bg-terracotta/90"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
            Add Product
          </Link>
          <Link
            href="/admin-demo/orders"
            className="inline-flex items-center gap-2 rounded-lg bg-clay px-4 py-2 text-sm font-medium text-cream transition-colors hover:bg-clay/90"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            View Orders
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-lg bg-cream px-4 py-2 text-sm font-medium text-deep-brown transition-colors hover:bg-beige"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
            Preview Store
          </Link>
        </div>
      </div>
    </div>
  )
}
