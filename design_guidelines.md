# Lumio Design Guidelines

## Brand & Visual Identity

**Design Direction:** Olliepop-inspired streetwear aesthetic — bubbly shapes, glossy highlights, sticker-style icons, bold gradients. Playful but premium.

**Color Palette:**
- Citrus Yellow: `#FFD54A`
- Berry Magenta: `#FF5A9E`
- Deep Charcoal: `#0F1115`
- Lavender: `#D6C7FF`
- Cream: `#FFF8F2`
- Neon accents: Use sparingly for CTAs and rim lighting effects

## Typography

**Headline Font:** Poppins or Inter Rounded (rounded geometric style)
- Large, friendly headings
- Bold weights for impact

**Body Font:** Inter Regular
- Clean, readable for product descriptions and body copy

**Tone:** Playful, confident, slightly irreverent. Short, snappy lines.

## Layout & Spacing

**Responsive Strategy:** Mobile-first design
- Desktop: 3-column product grids
- Mobile: 1-column stacked layout

**Tailwind Spacing:** Use consistent spacing units for padding and margins across all components

## Core Components

**Navigation:**
- Sticky header with cart badge
- Mobile hamburger menu
- Clean, minimal navigation structure

**Hero Section:**
- Three back-facing models on urban rooftop at dusk
- Large, bold headline with options: "Light Up Your Day", "Wear the Vibe", or "Glow Up. Go Out."
- Primary CTA with breathing glow effect
- Subtle neon rim-light sweep over hoodies

**Product Cards:**
- Lift on hover (translateY -6px + shadow growth)
- Color swatch interaction with scale/rotate on click
- Price badge flip-in on hover
- Clean product imagery with subtle textures

**Cart System:**
- Floating slideout cart panel
- Sticky checkout CTA on mobile
- Persistent via localStorage

**Forms:**
- Newsletter modal with welcome offer
- Contact form with clean, accessible inputs
- Color contrast minimum 4.5:1 for text

## Animation System

**Global Motion Rules:**
- Respect `prefers-reduced-motion` media query
- Spring physics: stiffness 120, damping 14
- Micro-interactions: 60-90ms for hovers
- Entrances: 300-600ms with bounce
- Rim light sweep: 1200-2000ms loop

**Hero Animations:**
- Title wobble (scale 0.98→1.02→1)
- Model image slide-up with 0.5s stagger
- CTA micro-jiggle on hover

**Add to Cart:**
- Fly-to-cart: clone product image, animate to cart with easing
- Confetti Lottie (6 tiny stars)
- Toast notification: slide in bottom-left with squishy ease, auto-dismiss 3.5s

**Page Transitions:**
- Crossfade with slight slide (0.4s duration)
- Route-based with AnimatePresence

## Images

**Hero Image:**
Three young models (two females, one male) standing side-by-side with backs turned toward camera, wearing Lumio hoodies. Urban rooftop at dusk with skyscrapers, soft rim lighting, subtle neon reflections (citrus & berry accents). Photorealistic, 8K quality, shallow depth of field, professional bokeh, fashion editorial composition, no faces visible.

**Product Photography:**
- Front view
- Back view
- Detail stitching close-up
- On-model front
- On-model back
- Mobile-optimized crops

**Additional Assets:**
- Lookbook: 12 editorial-style images
- Sticker icons (SVG) for feature bullets
- Logo: Centered, minimal SVG + compact favicon
- Lazy-load using WebP/AVIF formats

## Required Pages

Home, Shop (with filters), Product Detail, Lookbook (editorial grid), About, Sizing Guide, FAQ, Shipping & Returns, Privacy Policy, Terms, Contact

## Accessibility

- Alt text for all images
- Keyboard navigation support
- Visible focus states
- Minimum color contrast 4.5:1
- Form labels and ARIA attributes

## Performance

- Lazy-load images
- WebP/AVIF formats
- CDN-ready assets
- Small bundle size (avoid heavy libraries except Framer Motion)