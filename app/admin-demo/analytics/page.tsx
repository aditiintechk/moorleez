'use client'

import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

// Fake revenue data for the last 30 days
const revenueData = [
  { date: 'Jan 1', revenue: 4200 },
  { date: 'Jan 3', revenue: 5800 },
  { date: 'Jan 5', revenue: 3900 },
  { date: 'Jan 7', revenue: 6500 },
  { date: 'Jan 9', revenue: 7200 },
  { date: 'Jan 11', revenue: 5400 },
  { date: 'Jan 13', revenue: 8100 },
  { date: 'Jan 15', revenue: 6800 },
  { date: 'Jan 17', revenue: 9200 },
  { date: 'Jan 19', revenue: 7500 },
  { date: 'Jan 21', revenue: 8800 },
  { date: 'Jan 23', revenue: 10500 },
  { date: 'Jan 25', revenue: 9100 },
  { date: 'Jan 27', revenue: 11200 },
  { date: 'Jan 29', revenue: 8900 },
]

// Fake top products data
const topProductsData = [
  { name: 'Handwoven Throw', revenue: 24500 },
  { name: 'Ceramic Vase', revenue: 18900 },
  { name: 'Wall Art', revenue: 15600 },
  { name: 'Cushion Cover', revenue: 12300 },
  { name: 'Plant Hanger', revenue: 9800 },
  { name: 'Table Runner', revenue: 7500 },
]

const stats = {
  totalRevenue: 115400,
  totalOrders: 234,
  avgOrderValue: 493.16,
}

export default function AnalyticsDemoPage() {
  // Format number with commas consistently for both server and client
  const formatCurrency = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-deep-brown">Analytics</h1>
        <p className="mt-2 text-warm-gray">
          Revenue insights for the last 30 days
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-3">
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
              <p className="mt-1 text-xs text-sage">Last 30 days</p>
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
              <p className="mt-1 text-xs text-warm-gray">Last 30 days</p>
            </div>
            <div className="rounded-xl bg-terracotta/10 p-3">
              <svg className="h-6 w-6 text-terracotta" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Avg Order Value */}
        <div className="group rounded-xl bg-white p-6 shadow-soft transition-shadow hover:shadow-medium">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-warm-gray">
                Average Order Value
              </p>
              <p className="mt-2 text-2xl font-bold text-deep-brown">
                ₹{formatCurrency(stats.avgOrderValue)}
              </p>
              <p className="mt-1 text-xs text-warm-gray">Per order</p>
            </div>
            <div className="rounded-xl bg-clay/10 p-3">
              <svg className="h-6 w-6 text-clay" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Revenue Chart */}
      <div className="rounded-xl bg-white p-6 shadow-soft">
        <h2 className="mb-6 text-lg font-bold text-deep-brown">
          Revenue Over Time
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={revenueData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E8E4E0" />
            <XAxis
              dataKey="date"
              stroke="#6B6B6B"
              fontSize={12}
              tickLine={false}
            />
            <YAxis
              stroke="#6B6B6B"
              fontSize={12}
              tickLine={false}
              tickFormatter={(value) => `₹${value}`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#FAF7F2',
                border: '1px solid #E8E4E0',
                borderRadius: '8px',
              }}
              formatter={(value) => [`₹${value}`, 'Revenue']}
            />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#8B5A3C"
              strokeWidth={2}
              dot={{ fill: '#8B5A3C', r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Top Products Chart */}
      <div className="rounded-xl bg-white p-6 shadow-soft">
        <h2 className="mb-6 text-lg font-bold text-deep-brown">
          Top Selling Products
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={topProductsData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E8E4E0" />
            <XAxis
              dataKey="name"
              stroke="#6B6B6B"
              fontSize={12}
              tickLine={false}
              angle={-45}
              textAnchor="end"
              height={80}
            />
            <YAxis
              stroke="#6B6B6B"
              fontSize={12}
              tickLine={false}
              tickFormatter={(value) => `₹${value}`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#FAF7F2',
                border: '1px solid #E8E4E0',
                borderRadius: '8px',
              }}
              formatter={(value) => [`₹${value}`, 'Revenue']}
            />
            <Bar dataKey="revenue" fill="#D4A373" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
