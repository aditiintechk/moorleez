'use client'

import { useState } from 'react'

// Fake products data
const initialProducts = [
  {
    id: 'PRD-001',
    name: 'Handwoven Cotton Throw',
    description: 'Soft and cozy throw blanket with traditional patterns',
    price: 1299,
    stock: 2,
    category: 'Crafts',
    isDeleted: false,
  },
  {
    id: 'PRD-002',
    name: 'Ceramic Vase Set',
    description: 'Set of 3 handmade ceramic vases in earthy tones',
    price: 899,
    stock: 4,
    category: 'Crafts',
    isDeleted: false,
  },
  {
    id: 'PRD-003',
    name: 'Crochet Cushion Cover',
    description: 'Bohemian style crochet cushion cover',
    price: 449,
    stock: 1,
    category: 'Crochet',
    isDeleted: false,
  },
  {
    id: 'PRD-004',
    name: 'Abstract Wall Art',
    description: 'Original acrylic painting on canvas',
    price: 2499,
    stock: 3,
    category: 'Paintings',
    isDeleted: false,
  },
  {
    id: 'PRD-005',
    name: 'Macrame Plant Hanger',
    description: 'Handcrafted macrame plant hanger',
    price: 599,
    stock: 5,
    category: 'Crafts',
    isDeleted: false,
  },
  {
    id: 'PRD-006',
    name: 'Embroidered Table Runner',
    description: 'Hand-embroidered table runner with floral motifs',
    price: 799,
    stock: 8,
    category: 'Crafts',
    isDeleted: false,
  },
  {
    id: 'PRD-007',
    name: 'Boho Dream Catcher',
    description: 'Large dream catcher with feathers and beads',
    price: 699,
    stock: 0,
    category: 'Crafts',
    isDeleted: false,
  },
  {
    id: 'PRD-008',
    name: 'Vintage Storage Basket',
    description: 'Woven storage basket with handles',
    price: 549,
    stock: 12,
    category: 'Crafts',
    isDeleted: true,
  },
]

export default function ProductsDemoPage() {
  const [products, setProducts] = useState(initialProducts)
  const [showModal, setShowModal] = useState(false)

  const activeProducts = products.filter((p) => !p.isDeleted)
  const lowStockProducts = activeProducts.filter((p) => p.stock <= 5)
  const archivedProducts = products.filter((p) => p.isDeleted)

  const getStockColor = (stock: number) => {
    if (stock === 0) return 'bg-red-500/10 text-red-700 border-red-500/20'
    if (stock <= 5)
      return 'bg-terracotta/10 text-terracotta border-terracotta/20'
    return 'bg-sage/10 text-sage border-sage/20'
  }

  const getStockStatus = (stock: number) => {
    if (stock === 0) return 'Out of Stock'
    if (stock <= 5) return `${stock} left`
    return 'In Stock'
  }

  const handleDelete = (id: string) => {
    setProducts(
      products.map((p) => (p.id === id ? { ...p, isDeleted: true } : p))
    )
  }

  const handleRestore = (id: string) => {
    setProducts(
      products.map((p) => (p.id === id ? { ...p, isDeleted: false } : p))
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-deep-brown">Products</h1>
          <p className="mt-2 text-warm-gray">Manage your product catalog</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="rounded-lg bg-terracotta px-4 py-2 text-sm font-medium text-cream transition-colors hover:bg-terracotta/90"
        >
          Add Product
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-xl bg-white p-6 shadow-soft">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-warm-gray">
                Active Products
              </p>
              <p className="mt-2 text-2xl font-bold text-deep-brown">
                {activeProducts.length}
              </p>
            </div>
            <div className="rounded-xl bg-sage/10 p-3">
              <svg className="h-6 w-6 text-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
          </div>
        </div>

        <div className="rounded-xl bg-white p-6 shadow-soft">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-warm-gray">Low Stock</p>
              <p className="mt-2 text-2xl font-bold text-deep-brown">
                {lowStockProducts.length}
              </p>
            </div>
            <div className="rounded-xl bg-terracotta/10 p-3">
              <svg className="h-6 w-6 text-terracotta" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="rounded-xl bg-white p-6 shadow-soft">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-warm-gray">Archived</p>
              <p className="mt-2 text-2xl font-bold text-deep-brown">
                {archivedProducts.length}
              </p>
            </div>
            <div className="rounded-xl bg-clay/10 p-3">
              <svg className="h-6 w-6 text-clay" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="group overflow-hidden rounded-xl bg-white shadow-soft transition-shadow hover:shadow-medium"
          >
            {/* Image Section */}
            <div className="relative aspect-square bg-beige">
              <div className="flex h-full w-full items-center justify-center text-sm text-warm-gray">
                Product Image
              </div>

              {/* Category Badge */}
              <div className="absolute left-3 top-3 rounded-full bg-deep-brown/90 px-3 py-1 text-xs font-medium text-cream">
                {product.category}
              </div>

              {/* Archived Badge */}
              {product.isDeleted && (
                <div className="absolute right-3 top-3 rounded-full bg-warm-gray/90 px-3 py-1 text-xs font-medium text-cream">
                  Archived
                </div>
              )}

              {/* Stock Badge */}
              {!product.isDeleted && (
                <div
                  className={`absolute bottom-3 left-3 rounded-full border px-3 py-1 text-xs font-medium ${getStockColor(product.stock)}`}
                >
                  {getStockStatus(product.stock)}
                </div>
              )}
            </div>

            {/* Info Section */}
            <div className="p-4">
              <h3 className="line-clamp-1 font-bold text-deep-brown">
                {product.name}
              </h3>
              <p className="mt-1 line-clamp-1 text-sm text-warm-gray">
                {product.description}
              </p>
              <div className="mt-3 flex items-center justify-between">
                <div>
                  <p className="text-lg font-bold text-deep-brown">
                    ₹{product.price}
                  </p>
                  <p className="text-xs text-warm-gray">{product.id}</p>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => setShowModal(true)}
                  className="flex-1 rounded-lg bg-beige px-3 py-2 text-sm font-medium text-deep-brown transition-colors hover:bg-beige/80"
                >
                  <svg className="mx-auto h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
                {product.isDeleted ? (
                  <button
                    onClick={() => handleRestore(product.id)}
                    className="flex-1 rounded-lg bg-sage px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-sage/90"
                  >
                    Restore
                  </button>
                ) : (
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="flex-1 rounded-lg bg-terracotta px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-terracotta/90"
                  >
                    <svg className="mx-auto h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Product Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-2xl rounded-xl bg-white p-6 shadow-dramatic">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-deep-brown">
                Add Product
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="rounded-lg p-2 transition-colors hover:bg-beige"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-4">
              <div className="rounded-lg bg-terracotta/10 p-4 text-sm text-terracotta">
                This is a demo. Product creation is disabled in demo mode.
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-deep-brown">
                  Product Name
                </label>
                <input
                  type="text"
                  className="w-full rounded-lg border border-light-gray px-4 py-2"
                  placeholder="Enter product name"
                  disabled
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-deep-brown">
                  Description
                </label>
                <textarea
                  className="w-full rounded-lg border border-light-gray px-4 py-2"
                  rows={3}
                  placeholder="Enter description"
                  disabled
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-deep-brown">
                    Price (₹)
                  </label>
                  <input
                    type="number"
                    className="w-full rounded-lg border border-light-gray px-4 py-2"
                    placeholder="0"
                    disabled
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-deep-brown">
                    Stock
                  </label>
                  <input
                    type="number"
                    className="w-full rounded-lg border border-light-gray px-4 py-2"
                    placeholder="0"
                    disabled
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 rounded-lg border border-light-gray bg-white px-4 py-2 text-sm font-medium text-deep-brown transition-colors hover:bg-beige"
                >
                  Cancel
                </button>
                <button
                  disabled
                  className="flex-1 rounded-lg bg-terracotta/50 px-4 py-2 text-sm font-medium text-cream"
                >
                  Create Product (Demo)
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
