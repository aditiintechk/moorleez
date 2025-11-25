# 🎯 2-Week Plan: Building Portfolio Projects for Spotify Engineering

**Goal:** Ship 3 production-grade projects + build in public daily

**Timeline:** Week 1 (Nov 25 - Dec 1) + Week 2 (Dec 2 - Dec 8)

---

## Week 1: E-Commerce Platform (Nov 25 - Dec 1)

### ✅ Day 1 (Mon, Nov 25) - COMPLETED

-   [x] Project setup (Next.js + TypeScript)
-   [x] Neon database connection
-   [x] Prisma schema + migration
-   [x] Seed 5 products
-   [x] Product listing page
-   [x] Deploy to Vercel
-   [x] First X/LinkedIn post

**What you built:** Live product catalog with database

---

### Day 2 (Tue, Nov 26) - Shopping Cart

**Goal:** Add functional shopping cart

**Tasks (4-6 hours):**

1. **Create Cart Context** (1 hour)

    ```typescript
    // app/context/CartContext.tsx
    - Create CartContext with React Context API
    - Store: cart items, quantities, total
    - Actions: addToCart, removeFromCart, updateQuantity
    ```

2. **Add to Cart Functionality** (1 hour)

    - Update button in product card
    - Show success feedback (toast/alert)
    - Update cart count in header

3. **Cart Icon in Header** (30 mins)

    - Add shopping cart icon
    - Show item count badge
    - Link to /cart page

4. **Build /cart Page** (1.5 hours)

    - List all cart items
    - Show product image, name, price
    - Quantity controls (+/- buttons)
    - Remove item button
    - Calculate subtotal
    - "Proceed to Checkout" button

5. **Deploy** (30 mins)
    - Test locally
    - Commit: "Add shopping cart functionality"
    - Push to GitHub
    - Verify deployment

**Daily Post (X/LinkedIn):**

```
Day 2: Implemented shopping cart with React Context 🛒

✅ Global state management
✅ Add/remove items
✅ Quantity controls
✅ Real-time total calculation

Challenge: Mixing server & client components in Next.js App Router. Solution: Clear separation with 'use client' directive.

Live: [your-url]

#BuildInPublic #100DaysOfCode
```

---

### Day 3 (Wed, Nov 27) - Checkout Page Part 1

**Goal:** Build checkout form

**Tasks (4-6 hours):**

1. **Create /checkout Route** (30 mins)

    - New page: `app/checkout/page.tsx`
    - Protected route (redirect if cart empty)

2. **Checkout Form** (2 hours)

    - Customer information (name, email, phone)
    - Shipping address fields
    - Form validation with Zod
    - Error messages
    - Clean UI with Tailwind

3. **Order Summary Sidebar** (1 hour)

    - List cart items
    - Show subtotal, tax, shipping
    - Calculate total
    - Sticky sidebar on desktop

4. **Save Order Info to State** (30 mins)

    - Store form data before payment
    - Prepare for Stripe integration

5. **Deploy** (30 mins)

**Daily Post:**

```
Day 3: Built checkout flow with form validation ✅

Using Zod for type-safe validation:
- Runtime type checking
- Custom error messages
- Better DX with TypeScript inference

Starting to feel like a real store!

#BuildInPublic #TypeScript
```

---

### Day 4 (Thu, Nov 28) - Stripe Integration Setup

**Goal:** Integrate payment processing

**Tasks (4-6 hours):**

1. **Stripe Account Setup** (30 mins)

    - Sign up at stripe.com
    - Get test API keys
    - Add to Vercel environment variables

2. **Install Stripe SDK** (15 mins)

    ```bash
    npm install stripe @stripe/stripe-js
    ```

3. **Create Payment Intent API** (1.5 hours)

    ```typescript
    // app/api/create-payment-intent/route.ts
    - Calculate order total
    - Create Stripe PaymentIntent
    - Return client secret
    ```

4. **Add Stripe Checkout** (2 hours)

    - Stripe Elements on checkout page
    - Card input form
    - Handle payment submission
    - Loading states
    - Error handling

5. **Test with Test Cards** (30 mins)

    - Use Stripe test card: 4242 4242 4242 4242
    - Test successful payment
    - Test failed payment

6. **Deploy** (30 mins)

**Daily Post:**

```
Day 4: Integrated Stripe payments 💳

Key learnings:
- Never trust client-side calculations
- Always verify payment on server
- Use webhooks for order confirmation (async)

Security first. User experience second.

#BuildInPublic #WebDev
```

---

### Day 5 (Fri, Nov 29) - Order Management

**Goal:** Complete order flow

**Tasks (4-6 hours):**

1. **Create Order Model** (30 mins)

    ```prisma
    // prisma/schema.prisma
    model Order {
      id String @id @default(cuid())
      customerName String
      email String
      total Float
      status String
      items OrderItem[]
      createdAt DateTime @default(now())
    }

    model OrderItem {
      id String @id @default(cuid())
      orderId String
      order Order @relation(fields: [orderId], references: [id])
      productId String
      product Product @relation(fields: [productId], references: [id])
      quantity Int
      price Float
    }
    ```

2. **Stripe Webhook Handler** (2 hours)

    ```typescript
    // app/api/webhooks/stripe/route.ts
    - Verify webhook signature
    - Handle payment_intent.succeeded
    - Create order in database
    - Update inventory (reduce stock)
    - Handle idempotency
    ```

3. **Order Confirmation Page** (1 hour)

    - `/order/[id]/confirmation` page
    - Show order details
    - Thank you message
    - Order number
    - Estimated delivery

4. **Inventory Management** (1 hour)

    - Reduce stock after successful payment
    - Prevent overselling
    - Show "Out of Stock" if stock = 0

5. **Deploy & Test End-to-End** (1 hour)
    - Full checkout flow
    - Payment confirmation
    - Order created
    - Stock reduced

**Daily Post:**

```
Day 5: Order management complete 📦

Shipped end-to-end checkout:
✅ Payment processing
✅ Order creation
✅ Inventory management
✅ Webhook handling

Learned: Webhooks are async. Always handle race conditions and idempotency.

#BuildInPublic
```

---

### Day 6 (Sat, Nov 30) - Email & Polish

**Goal:** Email notifications + UI polish

**Tasks (8-10 hours - it's Saturday!):**

**Morning (4-5 hours):**

1. **Email Integration (Resend)** (2 hours)

    - Sign up for Resend (free tier)
    - Install: `npm install resend`
    - Create email templates
    - Send order confirmation email
    - Test email delivery

2. **Email Queue (Optional)** (1 hour)

    - Use Vercel KV or Upstash Redis
    - Queue emails for reliability
    - Retry failed sends

3. **Polish Product Listing** (1 hour)
    - Better hover effects
    - Loading skeletons
    - Empty state
    - Responsive design tweaks

**Afternoon (4-5 hours):**

4. **Error Handling** (1 hour)

    - Error boundaries
    - 404 page
    - 500 page
    - Toast notifications for errors

5. **Performance Optimization** (1.5 hours)

    - Image optimization (next/image)
    - Lazy loading
    - Code splitting
    - Run Lighthouse audit

6. **Add Basic Analytics** (30 mins)

    - Vercel Analytics (built-in)
    - Track page views
    - Track checkout funnel

7. **SEO Basics** (1 hour)

    - Meta tags
    - Open Graph tags
    - Sitemap
    - robots.txt

8. **Final Testing** (1 hour)
    - Test on mobile
    - Test on different browsers
    - Fix any bugs
    - Deploy

**Daily Post:**

```
Day 6: Polish day 🎨

Added:
✅ Email notifications (Resend)
✅ Error boundaries
✅ Performance optimization (Lighthouse 95+)
✅ SEO meta tags
✅ Mobile responsive

Almost production-ready!

#BuildInPublic
```

---

### Day 7 (Sun, Dec 1) - Write Article + Admin Panel Prep

**Goal:** Reflect, document, prepare for Week 2

**Tasks (4-6 hours):**

**Morning (2-3 hours): Write Article**

Write comprehensive article on Medium/Dev.to:

**Title:** "Building a Production E-Commerce Platform: Week 1 Learnings"

**Sections:**

1. **Why I Built This**

    - Building towards Spotify Engineering
    - Real client (friend's art studio)
    - Learning by shipping

2. **Tech Stack Decisions**

    - Why Next.js 14 (Server Components)
    - Why Prisma (type safety)
    - Why Neon (serverless Postgres)
    - Why Vercel (deployment)

3. **Key Challenges & Solutions**

    - Server vs Client components
    - Stripe webhook handling
    - Inventory management race conditions
    - Performance optimization

4. **Architecture Overview**

    - Diagram of system
    - Data flow
    - Payment flow

5. **What I Learned**

    - Technical skills
    - Product thinking
    - Deployment best practices

6. **Next Steps**
    - Admin panel (Week 2)
    - Analytics dashboard
    - Then: AI projects

**Length:** 1000-1500 words
**Include:** Code snippets, screenshots, architecture diagram

**Afternoon (2-3 hours): Admin Panel Planning**

1. **Sketch Admin Features** (1 hour)

    - Product management (CRUD)
    - Order viewing
    - Inventory tracking
    - Sales analytics
    - Basic reporting

2. **Design Database Schema Updates** (30 mins)

    - User model for admin auth
    - Admin activity logs (optional)

3. **Create Wireframes** (30 mins)

    - Sketch admin dashboard layout
    - Product management UI
    - Order list view

4. **Rest & Recharge** (1 hour)
    - You shipped a LOT this week
    - Take a break
    - Review your progress
    - Celebrate wins

**Daily Post:**

```
Week 1 Complete! 🎉

Built a full-stack e-commerce platform:
✅ Product catalog
✅ Shopping cart
✅ Stripe checkout
✅ Order management
✅ Email notifications
✅ Deployed to production

Read my detailed breakdown: [link to article]

Next week: Admin panel + Analytics

#BuildInPublic #100DaysOfCode
```

---

## Week 2: Admin Panel + Analytics (Dec 2 - Dec 8)

### Day 8 (Mon, Dec 2) - Authentication Setup

**Goal:** Add admin authentication

**Tasks (4-6 hours):**

1. **Choose Auth Solution** (15 mins)

    - Use **Clerk** (easiest for portfolio projects)
    - OR NextAuth.js (more control)
    - Recommendation: Clerk for speed

2. **Install & Configure Clerk** (1 hour)

    ```bash
    npm install @clerk/nextjs
    ```

    - Sign up for Clerk
    - Get API keys
    - Add to environment variables
    - Wrap app with ClerkProvider

3. **Protect Admin Routes** (1 hour)

    - Create `/admin` route
    - Add middleware protection
    - Redirect if not authenticated

4. **Admin Dashboard Layout** (2 hours)

    - Sidebar navigation
    - Header with user info
    - Main content area
    - Responsive design

5. **Deploy** (30 mins)

**Daily Post:**

```
Day 8: Added authentication with Clerk 🔐

Why Clerk?
- 5-minute setup
- Beautiful UI out of box
- Handles everything (2FA, social login, etc.)
- Focus on features, not auth boilerplate

Admin panel taking shape!

#BuildInPublic
```

---

### Day 9 (Tue, Dec 3) - Product Management (CRUD)

**Goal:** Admin can manage products

**Tasks (4-6 hours):**

1. **Product List View** (1 hour)

    - Table showing all products
    - Columns: Image, Name, Price, Stock, Category
    - Edit/Delete buttons
    - Pagination (if >20 products)

2. **Create Product Form** (1.5 hours)

    - Modal or separate page
    - All product fields
    - Image URL input (or upload later)
    - Form validation
    - Submit to API

3. **Edit Product** (1 hour)

    - Pre-fill form with existing data
    - Update product API route
    - Optimistic UI updates

4. **Delete Product** (30 mins)

    - Confirmation modal
    - Delete API route
    - Remove from list

5. **API Routes** (1 hour)

    ```typescript
    // app/api/admin/products/route.ts - GET, POST
    // app/api/admin/products/[id]/route.ts - PUT, DELETE
    ```

6. **Deploy** (30 mins)

**Daily Post:**

```
Day 9: Product management CRUD complete ✅

Admin can now:
- View all products
- Add new products
- Edit existing
- Delete products

Using Prisma for type-safe database operations. Zero runtime errors.

#BuildInPublic
```

---

### Day 10 (Wed, Dec 4) - Order Management

**Goal:** Admin can view and manage orders

**Tasks (4-6 hours):**

1. **Orders List View** (1.5 hours)

    - Table of all orders
    - Columns: Order #, Customer, Date, Total, Status
    - Sort by date (newest first)
    - Filter by status
    - Search by customer name/email

2. **Order Detail View** (1.5 hours)

    - Click order → see full details
    - Customer information
    - Shipping address
    - List of items ordered
    - Payment status
    - Order timeline

3. **Update Order Status** (1 hour)

    - Dropdown: Pending → Processing → Shipped → Delivered
    - Update in database
    - Send email notification to customer (optional)

4. **Export Orders (CSV)** (1 hour)

    - Export button
    - Generate CSV file
    - Download all orders or filtered
    - Useful for accounting

5. **Deploy** (30 mins)

**Daily Post:**

```
Day 10: Order management dashboard 📦

Built:
- Order list with filters
- Order details view
- Status updates
- CSV export

My friend can now manage the entire business from the admin panel!

#BuildInPublic
```

---

### Day 11 (Thu, Dec 5) - Analytics Dashboard Part 1

**Goal:** Show sales insights

**Tasks (4-6 hours):**

1. **Sales Overview Cards** (1 hour)

    - Total Revenue (all time)
    - Total Orders (all time)
    - Average Order Value
    - Total Products Sold
    - Use Prisma aggregations

2. **Revenue Chart** (1.5 hours)

    - Line chart showing daily/weekly/monthly revenue
    - Use Recharts library
    - Last 30 days by default
    - Toggle between time periods

3. **Top Products** (1 hour)

    - Bar chart or table
    - Most sold products
    - Revenue by product
    - Stock levels

4. **Recent Orders Widget** (1 hour)

    - Last 10 orders
    - Quick status view
    - Click to see details

5. **Deploy** (30 mins)

**Daily Post:**

```
Day 11: Analytics dashboard coming together 📊

Built:
- Revenue overview cards
- Sales chart (last 30 days)
- Top products analysis
- Recent orders feed

Leveraging SAP analytics experience for modern web!

#BuildInPublic #DataVisualization
```

---

### Day 12 (Fri, Dec 6) - Analytics Dashboard Part 2 + Polish

**Goal:** Advanced analytics + final touches

**Tasks (4-6 hours):**

1. **Category Performance** (1 hour)

    - Pie chart: Revenue by category
    - Which categories sell best?
    - Stock levels by category

2. **Customer Insights** (1 hour)

    - Total unique customers
    - Returning customer rate
    - Top customers by spend

3. **Inventory Alerts** (1 hour)

    - Low stock warnings
    - Out of stock products
    - Restock recommendations

4. **Date Range Picker** (1 hour)

    - Filter all analytics by date range
    - Compare time periods
    - Year-over-year growth

5. **Final Polish** (1 hour)

    - Responsive design
    - Loading states
    - Empty states
    - Error handling

6. **Deploy** (30 mins)

**Daily Post:**

```
Day 12: Advanced analytics complete 🎯

Added:
- Category performance analysis
- Customer insights
- Low stock alerts
- Date range filtering

This admin panel is more powerful than some actual e-commerce platforms!

#BuildInPublic
```

---

### Day 13 (Sat, Dec 7) - Testing + Handoff Prep

**Goal:** Production-ready, hand to friend

**Tasks (8-10 hours):**

**Morning (4-5 hours):**

1. **Comprehensive Testing** (2 hours)

    - Test all user flows
    - Test all admin features
    - Test on mobile/tablet/desktop
    - Test different browsers
    - Fix bugs

2. **Add Tests (Critical Paths)** (2 hours)

    - Install Playwright: `npm install -D @playwright/test`
    - Write E2E test for checkout flow
    - Write test for order creation
    - Run in CI/CD

3. **Performance Audit** (1 hour)
    - Run Lighthouse
    - Fix any performance issues
    - Optimize images
    - Check load times

**Afternoon (4-5 hours):**

4. **Documentation** (2 hours)

    - Admin user guide (how to add products, manage orders)
    - README with setup instructions
    - Architecture documentation
    - API documentation (if needed)

5. **Create Demo Video** (1 hour)

    - Screen recording
    - Walk through customer flow
    - Walk through admin flow
    - Upload to YouTube (unlisted)

6. **Handoff to Friend** (1 hour)

    - Set up their admin account
    - Walk them through admin panel
    - Show them how to add products
    - Answer questions

7. **Final Deploy** (1 hour)
    - One last check
    - Push to production
    - Verify everything works
    - Monitor for errors

**Daily Post:**

```
Day 13: E-commerce platform COMPLETE! 🎉

✅ Full customer checkout flow
✅ Admin panel with analytics
✅ Order management
✅ Inventory tracking
✅ Email notifications
✅ Production-ready

Handing it off to my friend today. Time to build project #2!

Demo video: [link]

#BuildInPublic
```

---

### Day 14 (Sun, Dec 8) - Week 2 Article + Project 2 Planning

**Goal:** Document learnings, plan AI dashboard

**Tasks (4-6 hours):**

**Morning (2-3 hours): Write Article**

**Title:** "Building an Admin Dashboard with Next.js: Analytics, CRUD, and Real-Time Insights"

**Sections:**

1. **Why Admin Panels Matter**

    - Business value
    - User empowerment
    - Data-driven decisions

2. **Authentication Strategy**

    - Why Clerk
    - Protecting routes
    - Role-based access (future)

3. **Building Analytics Dashboard**

    - Data aggregation with Prisma
    - Chart libraries (Recharts)
    - Performance considerations

4. **Key Features Built**

    - Product management
    - Order management
    - Sales analytics
    - Inventory tracking

5. **Challenges Solved**

    - Real-time data updates
    - Complex Prisma queries
    - Date range filtering
    - Export functionality

6. **What I Learned**
    - Admin UX is different from customer UX
    - Data visualization best practices
    - Think like a business owner

**Afternoon (2-3 hours): Plan Project 2**

**Project 2: AI-Powered Analytics Dashboard**

1. **Define Core Features** (1 hour)

    - CSV/Excel upload
    - AI-generated SQL queries
    - Natural language questions
    - Data visualization
    - Insight generation

2. **Tech Stack Selection** (30 mins)

    - Next.js (same as Project 1)
    - Prisma + Neon (consistency)
    - OpenAI API or Claude API
    - Redis for caching
    - Recharts for viz

3. **Sketch Architecture** (1 hour)

    - Data flow diagram
    - How AI processes requests
    - Security considerations
    - Cost optimization

4. **Create Task Breakdown** (30 mins)
    - Week 3 daily tasks
    - Similar to Week 1/2 structure

**Daily Post:**

```
Week 2 Complete! Admin panel shipped 🚀

Two weeks, one production app:
- Customer-facing store
- Admin dashboard
- Analytics & insights
- Order management

Article: [link]

Next up: AI-powered analytics dashboard

The momentum is real. 42 days until portfolio complete.

#BuildInPublic #100DaysOfCode #SpotifyEngineering
```

---

## Summary: What You'll Have After 2 Weeks

### Project 1: E-Commerce Platform ✅

**Customer Features:**

-   Product browsing
-   Shopping cart
-   Checkout with Stripe
-   Order confirmation
-   Email notifications

**Admin Features:**

-   Product management (CRUD)
-   Order management
-   Sales analytics dashboard
-   Inventory tracking
-   Customer insights

**Technical Highlights:**

-   Next.js 14 with Server Components
-   Prisma ORM with Neon PostgreSQL
-   Stripe payment processing
-   Clerk authentication
-   Responsive design
-   CI/CD with GitHub Actions
-   Deployed on Vercel

**What This Proves:**
✅ Full-stack development
✅ Payment integration
✅ Database design
✅ Authentication
✅ Data visualization
✅ Production deployment
✅ Real client project

---

## Daily Checklist Template

Use this every day:

**Morning:**

-   [ ] Review today's tasks
-   [ ] Set up environment
-   [ ] Check yesterday's deployment

**During Work:**

-   [ ] Complete main tasks (4-6 hours)
-   [ ] Test locally
-   [ ] Fix bugs as you go

**Evening:**

-   [ ] Commit code with clear message
-   [ ] Push to GitHub
-   [ ] Verify Vercel deployment
-   [ ] Write X/LinkedIn post
-   [ ] Screenshot for post
-   [ ] Post before bed

**Weekly:**

-   [ ] Write technical article
-   [ ] Review progress
-   [ ] Plan next week
-   [ ] Rest & recharge

---

## Key Success Metrics

**By End of Week 2:**

✅ **Shipped:** 1 complete production app
✅ **Posted:** 14 daily updates on X/LinkedIn
✅ **Written:** 2 technical articles
✅ **Deployed:** Live, working application
✅ **Proven:** Can ship fast and consistently

**Interview Impact:**

-   "I built a production e-commerce platform in 2 weeks"
-   "Handles real payments and orders"
-   "Built for a real client"
-   "Includes admin dashboard with analytics"

This is a killer portfolio piece.

---

## Tips for Success

**1. Time Management**

-   Set daily alarm for 8 PM: "Time to post on X"
-   Block 4-6 hours daily (no distractions)
-   Weekends = 8-10 hours (catch-up buffer)

**2. When Stuck (>20 mins)**

-   Google it
-   Ask ChatGPT/Claude
-   Check documentation
-   Skip and move on
-   Come back later

**3. Prevent Burnout**

-   Take Sunday afternoons off
-   Celebrate small wins
-   Don't aim for perfection
-   Ship messy code

**4. Build in Public Benefits**

-   Accountability (can't skip days)
-   Network building (people will follow along)
-   Interview talking points
-   Proof of consistency

**5. Focus on Shipping**

-   Done > Perfect
-   Deployed > Local
-   Working > Beautiful
-   Progress > Perfection

---

## Next Steps (After Week 2)

**Week 3-4:** AI-Powered Analytics Dashboard
**Week 5-6:** Real-Time Collaboration Tool
**Week 7:** Mock interviews + Polish
**Week 8:** Resume + Apply to jobs
**Week 9+:** Interview prep + Applications

**You're on track for Spotify (or anywhere) by March 2025.**

---

**Last Reminder:**

This plan is aggressive but DOABLE. You have:

-   ✅ The skills (6 years SAP + 2 years learning)
-   ✅ The time (4-6 hours daily)
-   ✅ The motivation (Spotify goal)
-   ✅ The plan (this roadmap)

The only thing between you and success is EXECUTION.

**Start tomorrow (Day 2). Build the shopping cart. Post about it.**

**Let's fucking go. 🚀**
