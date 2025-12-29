# Moorleez Art Studio - Design System

## Brand Identity

**Brand Name:** Moorleez Art Studio
**Tagline:** "Where handmade meets heart."
**Brand Personality:** Artistic, Cozy, Premium, Handmade, Warm, Emotional, Creative

---

## 🎨 Color Palette

### Primary Colors
| Name | Hex | Usage |
|------|-----|-------|
| Warm Cream | `#FAF7F2` | Background, cards |
| Soft Beige | `#F5EDE4` | Secondary background |
| Clay | `#C4A484` | Accents, buttons |
| Warm Brown | `#8B7355` | Text, borders |
| Deep Brown | `#5C4033` | Headings, strong text |

### Accent Colors
| Name | Hex | Usage |
|------|-----|-------|
| Sage Green | `#A8B5A0` | Success, nature accents |
| Terracotta | `#C9705F` | CTAs, highlights |
| Dusty Rose | `#D4A5A5` | Soft accents |
| Muted Gold | `#C9B896` | Premium highlights |

### Neutral Colors
| Name | Hex | Usage |
|------|-----|-------|
| Charcoal | `#3D3D3D` | Body text |
| Warm Gray | `#6B6B6B` | Secondary text |
| Light Gray | `#E8E4E0` | Borders, dividers |
| White | `#FFFFFF` | Cards, overlays |

---

## 📝 Typography

### Font Families
- **Headings:** `Playfair Display` - Elegant serif for artistic feel
- **Accent/Handwritten:** `Dancing Script` or `Pacifico` - For taglines, special text
- **Body:** `Lora` - Readable serif that feels warm
- **UI/Labels:** `Inter` - Clean sans-serif for buttons, labels

### Font Sizes
```
xs:   0.75rem (12px)
sm:   0.875rem (14px)
base: 1rem (16px)
lg:   1.125rem (18px)
xl:   1.25rem (20px)
2xl:  1.5rem (24px)
3xl:  1.875rem (30px)
4xl:  2.25rem (36px)
5xl:  3rem (48px)
6xl:  3.75rem (60px)
```

---

## 📐 Spacing & Layout

### Container Max Widths
- Mobile: 100% with 16px padding
- Tablet: 768px
- Desktop: 1200px
- Wide: 1400px

### Spacing Scale (Tailwind)
```
1: 0.25rem (4px)
2: 0.5rem (8px)
3: 0.75rem (12px)
4: 1rem (16px)
6: 1.5rem (24px)
8: 2rem (32px)
12: 3rem (48px)
16: 4rem (64px)
20: 5rem (80px)
24: 6rem (96px)
```

---

## 🧩 Component Styles

### Buttons

**Primary Button:**
```css
background: #C9705F (Terracotta)
color: white
padding: 12px 32px
border-radius: 8px
font-weight: 500
transition: all 0.3s ease
hover: darken 10%, slight scale up
```

**Secondary Button:**
```css
background: transparent
border: 1.5px solid #C4A484 (Clay)
color: #5C4033 (Deep Brown)
padding: 12px 32px
border-radius: 8px
hover: background #FAF7F2
```

**Accent Button (handwritten feel):**
```css
background: #5C4033 (Deep Brown)
color: #FAF7F2
font-family: Dancing Script
padding: 14px 36px
border-radius: 50px
```

### Cards

**Product Card:**
```css
background: white
border-radius: 16px
box-shadow: 0 4px 20px rgba(92, 64, 51, 0.08)
overflow: hidden
transition: transform 0.3s, shadow 0.3s
hover: translateY(-4px), shadow increases
```

**Feature Card:**
```css
background: #FAF7F2
border-radius: 20px
padding: 32px
border: 1px solid #E8E4E0
```

### Form Inputs

```css
background: #FFFFFF
border: 1.5px solid #E8E4E0
border-radius: 10px
padding: 14px 18px
font-size: 16px
transition: border-color 0.2s
focus: border-color #C4A484, box-shadow soft
```

---

## 🎭 Shadows

```css
--shadow-sm: 0 2px 8px rgba(92, 64, 51, 0.06);
--shadow-md: 0 4px 20px rgba(92, 64, 51, 0.08);
--shadow-lg: 0 8px 40px rgba(92, 64, 51, 0.12);
--shadow-xl: 0 16px 60px rgba(92, 64, 51, 0.16);
```

---

## ✨ Micro-interactions

### Hover Effects
- Product cards: lift up 4px with enhanced shadow
- Buttons: slight scale (1.02) with color shift
- Links: underline grows from left to right
- Images: subtle zoom (1.05) on hover

### Transitions
```css
--transition-fast: 150ms ease;
--transition-base: 300ms ease;
--transition-slow: 500ms ease;
```

---

## 📱 Breakpoints

```css
sm: 640px   /* Large phones */
md: 768px   /* Tablets */
lg: 1024px  /* Small laptops */
xl: 1280px  /* Desktops */
2xl: 1536px /* Large screens */
```

---

## 🏗️ Page Structure

### Homepage
1. **Hero Section** - Full-width, emotional imagery, tagline
2. **Featured Collections** - 3 collection cards
3. **Best Sellers** - Product carousel/grid
4. **Artist Story** - Image + text split
5. **Testimonials** - Carousel with photos
6. **Newsletter** - Soft CTA section
7. **Footer** - Links, social, payment icons

### Admin Dashboard
1. **Sidebar** - Dark theme for contrast
2. **Stats Cards** - With icons and trends
3. **Recent Orders Table** - Clean, scannable
4. **Quick Actions** - Prominent buttons
5. **Charts** - Simple, readable

---

## 🎯 Design Principles

1. **Breathability** - Generous white space
2. **Warmth** - Earthy colors, soft edges
3. **Authenticity** - Handwritten accents, real photos
4. **Clarity** - Clear hierarchy, easy navigation
5. **Delight** - Subtle animations, attention to detail

