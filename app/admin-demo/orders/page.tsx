'use client'

import { useState } from 'react'

type OrderStatus =
  | 'PENDING'
  | 'PROCESSING'
  | 'SHIPPED'
  | 'DELIVERED'
  | 'CANCELLED'

interface OrderItem {
  id: string
  name: string
  quantity: number
  price: number
  image: string
}

interface Order {
  id: string
  customer: {
    name: string
    email: string
    phone: string
  }
  address: {
    street: string
    apartment: string
    city: string
    state: string
    pincode: string
  }
  items: OrderItem[]
  total: number
  status: OrderStatus
  date: string
  time: string
}

const initialOrders: Order[] = [
  {
    id: 'ORD-1234',
    customer: {
      name: 'Priya Sharma',
      email: 'priya@example.com',
      phone: '+91 98765 43210',
    },
    address: {
      street: '123 MG Road',
      apartment: 'Apt 4B',
      city: 'Bangalore',
      state: 'Karnataka',
      pincode: '560001',
    },
    items: [
      {
        id: 'PRD-001',
        name: 'Handwoven Cotton Throw',
        quantity: 1,
        price: 1299,
        image: '/products/throw.jpg',
      },
      {
        id: 'PRD-002',
        name: 'Ceramic Vase Set',
        quantity: 2,
        price: 899,
        image: '/products/vase.jpg',
      },
    ],
    total: 3097,
    status: 'DELIVERED',
    date: '2024-01-10',
    time: '14:30',
  },
  {
    id: 'ORD-1235',
    customer: {
      name: 'Rahul Patel',
      email: 'rahul@example.com',
      phone: '+91 98765 43211',
    },
    address: {
      street: '456 Park Street',
      apartment: '',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400001',
    },
    items: [
      {
        id: 'PRD-004',
        name: 'Abstract Wall Art',
        quantity: 1,
        price: 2499,
        image: '/products/art.jpg',
      },
    ],
    total: 2499,
    status: 'SHIPPED',
    date: '2024-01-10',
    time: '10:15',
  },
  {
    id: 'ORD-1236',
    customer: {
      name: 'Ananya Kumar',
      email: 'ananya@example.com',
      phone: '+91 98765 43212',
    },
    address: {
      street: '789 Lake View',
      apartment: 'Tower A, 12th Floor',
      city: 'Hyderabad',
      state: 'Telangana',
      pincode: '500001',
    },
    items: [
      {
        id: 'PRD-003',
        name: 'Crochet Cushion Cover',
        quantity: 4,
        price: 449,
        image: '/products/cushion.jpg',
      },
    ],
    total: 1796,
    status: 'PROCESSING',
    date: '2024-01-09',
    time: '16:45',
  },
  {
    id: 'ORD-1237',
    customer: {
      name: 'Vikram Singh',
      email: 'vikram@example.com',
      phone: '+91 98765 43213',
    },
    address: {
      street: '321 Garden Road',
      apartment: 'Villa 7',
      city: 'Delhi',
      state: 'Delhi',
      pincode: '110001',
    },
    items: [
      {
        id: 'PRD-005',
        name: 'Macrame Plant Hanger',
        quantity: 3,
        price: 599,
        image: '/products/macrame.jpg',
      },
      {
        id: 'PRD-006',
        name: 'Embroidered Table Runner',
        quantity: 1,
        price: 799,
        image: '/products/runner.jpg',
      },
    ],
    total: 2596,
    status: 'DELIVERED',
    date: '2024-01-09',
    time: '11:20',
  },
  {
    id: 'ORD-1238',
    customer: {
      name: 'Neha Gupta',
      email: 'neha@example.com',
      phone: '+91 98765 43214',
    },
    address: {
      street: '555 Beach Road',
      apartment: '',
      city: 'Chennai',
      state: 'Tamil Nadu',
      pincode: '600001',
    },
    items: [
      {
        id: 'PRD-007',
        name: 'Boho Dream Catcher',
        quantity: 1,
        price: 699,
        image: '/products/dreamcatcher.jpg',
      },
    ],
    total: 699,
    status: 'PENDING',
    date: '2024-01-08',
    time: '09:30',
  },
]

export default function OrdersDemoPage() {
  const [orders, setOrders] = useState<Order[]>(initialOrders)
  const [filterStatus, setFilterStatus] = useState<OrderStatus | 'ALL'>('ALL')
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)

  // Format number with commas consistently for both server and client
  const formatCurrency = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }

  const filteredOrders =
    filterStatus === 'ALL'
      ? orders
      : orders.filter((o) => o.status === filterStatus)

  const stats = {
    total: orders.length,
    pending: orders.filter((o) => o.status === 'PENDING').length,
    processing: orders.filter((o) => o.status === 'PROCESSING').length,
    shipped: orders.filter((o) => o.status === 'SHIPPED').length,
    revenue: orders
      .filter((o) => o.status !== 'CANCELLED')
      .reduce((sum, o) => sum + o.total, 0),
  }

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case 'PENDING':
        return 'bg-yellow-500/10 text-yellow-700 border-yellow-500/20'
      case 'PROCESSING':
        return 'bg-blue-500/10 text-blue-700 border-blue-500/20'
      case 'SHIPPED':
        return 'bg-purple-500/10 text-purple-700 border-purple-500/20'
      case 'DELIVERED':
        return 'bg-sage/10 text-sage border-sage/20'
      case 'CANCELLED':
        return 'bg-red-500/10 text-red-700 border-red-500/20'
    }
  }

  const getStatusIcon = (status: OrderStatus) => {
    switch (status) {
      case 'PENDING':
        return <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
      case 'PROCESSING':
        return <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
      case 'SHIPPED':
        return <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" /></svg>
      case 'DELIVERED':
        return <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
      case 'CANCELLED':
        return <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
    }
  }

  const handleStatusUpdate = (orderId: string, newStatus: OrderStatus) => {
    setOrders(
      orders.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    )
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder({ ...selectedOrder, status: newStatus })
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-deep-brown">Orders</h1>
        <p className="mt-2 text-warm-gray">Manage and track customer orders</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <div className="rounded-xl bg-white p-6 shadow-soft">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-warm-gray">Total</p>
              <p className="mt-2 text-2xl font-bold text-deep-brown">
                {stats.total}
              </p>
            </div>
            <svg className="h-5 w-5 text-clay" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
          </div>
        </div>

        <div className="rounded-xl bg-white p-6 shadow-soft">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-warm-gray">Pending</p>
              <p className="mt-2 text-2xl font-bold text-deep-brown">
                {stats.pending}
              </p>
            </div>
            <svg className="h-5 w-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </div>
        </div>

        <div className="rounded-xl bg-white p-6 shadow-soft">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-warm-gray">Processing</p>
              <p className="mt-2 text-2xl font-bold text-deep-brown">
                {stats.processing}
              </p>
            </div>
            <svg className="h-5 w-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
          </div>
        </div>

        <div className="rounded-xl bg-white p-6 shadow-soft">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-warm-gray">Shipped</p>
              <p className="mt-2 text-2xl font-bold text-deep-brown">
                {stats.shipped}
              </p>
            </div>
            <svg className="h-5 w-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" /></svg>
          </div>
        </div>

        <div className="rounded-xl bg-white p-6 shadow-soft">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-warm-gray">Revenue</p>
              <p className="mt-2 text-2xl font-bold text-deep-brown">
                ₹{formatCurrency(stats.revenue)}
              </p>
            </div>
            <svg className="h-5 w-5 text-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="overflow-x-auto">
        <div className="flex gap-2">
          {['ALL', 'PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED'].map(
            (status) => (
              <button
                key={status}
                onClick={() =>
                  setFilterStatus(status as OrderStatus | 'ALL')
                }
                className={`whitespace-nowrap rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                  filterStatus === status
                    ? 'bg-deep-brown text-cream'
                    : 'bg-white text-deep-brown hover:bg-beige'
                }`}
              >
                {status === 'ALL' ? 'All Orders' : status}
              </button>
            )
          )}
        </div>
      </div>

      {/* Orders Table */}
      <div className="overflow-x-auto rounded-xl bg-white shadow-soft">
        <table className="w-full">
          <thead className="border-b border-light-gray bg-beige/30">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-medium text-deep-brown">
                Order ID
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-deep-brown">
                Customer
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-deep-brown">
                Items
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-deep-brown">
                Total
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-deep-brown">
                Status
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-deep-brown">
                Date
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-deep-brown">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-light-gray">
            {filteredOrders.map((order) => (
              <tr
                key={order.id}
                className="transition-colors hover:bg-beige/20"
              >
                <td className="px-6 py-4 text-sm font-medium text-deep-brown">
                  {order.id}
                </td>
                <td className="px-6 py-4">
                  <div>
                    <p className="text-sm font-medium text-deep-brown">
                      {order.customer.name}
                    </p>
                    <p className="text-xs text-warm-gray">
                      {order.customer.email}
                    </p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-2">
                      {order.items.slice(0, 3).map((item, idx) => (
                        <div
                          key={idx}
                          className="h-8 w-8 rounded-full border-2 border-white bg-beige"
                        />
                      ))}
                    </div>
                    <span className="text-sm text-warm-gray">
                      {order.items.length} items
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm font-bold text-deep-brown">
                  ₹{formatCurrency(order.total)}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-medium ${getStatusColor(order.status)}`}
                  >
                    {getStatusIcon(order.status)}
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-warm-gray">
                  {new Date(order.date).toLocaleDateString('en-IN', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => setSelectedOrder(order)}
                    className="inline-flex items-center gap-1 text-sm font-medium text-terracotta hover:underline"
                  >
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-xl bg-white p-6 shadow-dramatic">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-deep-brown">
                  Order {selectedOrder.id}
                </h2>
                <p className="text-sm text-warm-gray">
                  {selectedOrder.date} at {selectedOrder.time}
                </p>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="rounded-lg p-2 transition-colors hover:bg-beige"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            <div className="space-y-6">
              {/* Customer Info */}
              <div>
                <h3 className="mb-3 font-bold text-deep-brown">
                  Customer Information
                </h3>
                <div className="rounded-lg bg-beige p-4">
                  <p className="font-medium text-deep-brown">
                    {selectedOrder.customer.name}
                  </p>
                  <p className="text-sm text-warm-gray">
                    {selectedOrder.customer.email}
                  </p>
                  <p className="text-sm text-warm-gray">
                    {selectedOrder.customer.phone}
                  </p>
                </div>
              </div>

              {/* Shipping Address */}
              <div>
                <h3 className="mb-3 font-bold text-deep-brown">
                  Shipping Address
                </h3>
                <div className="rounded-lg bg-beige p-4">
                  <p className="text-sm text-deep-brown">
                    {selectedOrder.address.street}
                    {selectedOrder.address.apartment &&
                      `, ${selectedOrder.address.apartment}`}
                  </p>
                  <p className="text-sm text-deep-brown">
                    {selectedOrder.address.city}, {selectedOrder.address.state}{' '}
                    {selectedOrder.address.pincode}
                  </p>
                </div>
              </div>

              {/* Order Items */}
              <div>
                <h3 className="mb-3 font-bold text-deep-brown">Order Items</h3>
                <div className="space-y-3">
                  {selectedOrder.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-4 rounded-lg border border-light-gray p-3"
                    >
                      <div className="h-16 w-16 rounded-lg bg-beige" />
                      <div className="flex-1">
                        <p className="font-medium text-deep-brown">
                          {item.name}
                        </p>
                        <p className="text-sm text-warm-gray">
                          {item.quantity} × ₹{item.price}
                        </p>
                      </div>
                      <p className="font-bold text-deep-brown">
                        ₹{formatCurrency(item.quantity * item.price)}
                      </p>
                    </div>
                  ))}
                  <div className="flex justify-between border-t border-light-gray pt-3">
                    <p className="font-bold text-deep-brown">Total</p>
                    <p className="text-xl font-bold text-deep-brown">
                      ₹{formatCurrency(selectedOrder.total)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Status Update */}
              <div>
                <h3 className="mb-3 font-bold text-deep-brown">
                  Update Status
                </h3>
                <div className="flex flex-wrap gap-2">
                  {(['PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED'] as OrderStatus[]).map(
                    (status) => (
                      <button
                        key={status}
                        onClick={() =>
                          handleStatusUpdate(selectedOrder.id, status)
                        }
                        disabled={selectedOrder.status === status}
                        className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                          selectedOrder.status === status
                            ? 'cursor-not-allowed bg-deep-brown text-cream ring-2 ring-clay'
                            : 'bg-beige text-deep-brown hover:bg-clay/30'
                        }`}
                      >
                        {status}
                      </button>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
