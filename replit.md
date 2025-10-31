# Lumio - Playful Streetwear Hoodies E-commerce

## Overview

Lumio is a vibrant e-commerce website for premium streetwear hoodies featuring an Olliepop-inspired aesthetic with bold colors, playful animations, and a mobile-first design. Built with React, TypeScript, Tailwind CSS, and Framer Motion, the application provides a complete storefront experience including product browsing, detailed product pages, lookbook, cart management, and informational pages.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System**
- **React 18** with TypeScript for type-safe component development
- **Vite** as the build tool and development server with Hot Module Replacement (HMR)
- **Wouter** for lightweight client-side routing (smaller alternative to React Router)
- **TanStack Query** (React Query) for server state management and data fetching

**UI & Styling**
- **Tailwind CSS** for utility-first styling with custom design tokens
- **shadcn/ui** components (New York variant) for consistent, accessible UI primitives
- **Framer Motion** for animations and transitions with reduced motion support
- **Custom design system** with brand colors (Citrus Yellow #FFD54A, Berry Magenta #FF5A9E, Deep Charcoal #0F1115, Lavender #D6C7FF, Cream #FFF8F2)

**Component Structure**
- Reusable UI components in `/client/src/components/ui/` (shadcn/ui primitives)
- Feature components in `/client/src/components/` (Nav, Footer, Cart, Hero, ProductCard, etc.)
- Page components in `/client/src/pages/` for route-level views
- Shared product types and interfaces across components

**State Management**
- Local React state with hooks for cart management
- LocalStorage persistence for cart items
- Query client configuration with infinite stale time and disabled refetching

### Backend Architecture

**Server Framework**
- **Express.js** with TypeScript running on Node.js
- Middleware for JSON parsing, URL encoding, and request logging
- Custom logging middleware tracking API response times and payloads

**Development Environment**
- Vite middleware integration for development with HMR
- Conditional Replit-specific plugins (cartographer, dev banner) in development
- Static file serving for production builds

**Data Layer**
- **In-memory storage** implementation (`MemStorage`) with user CRUD operations
- Storage interface (`IStorage`) for potential database integration
- Drizzle ORM configured for PostgreSQL with schema definitions
- User schema with UUID primary keys and unique username constraints

**API Structure**
- Routes registered through `/server/routes.ts`
- API endpoints prefixed with `/api`
- HTTP server creation with Express app integration

### Design System & Theming

**Typography**
- Headline font: Poppins or Inter Rounded (rounded geometric style)
- Body font: Inter Regular
- Font files loaded from Google Fonts (Architects Daughter, DM Sans, Fira Code, Geist Mono, Inter, Poppins)

**Color Tokens**
- CSS custom properties for theme colors (HSL format with alpha value support)
- Separate definitions for light and dark modes
- Semantic color naming (primary, secondary, accent, destructive, muted)
- Component-specific borders and elevation layers

**Interaction Design**
- Hover elevation effects with `hover-elevate` utility class
- Active state elevation with `active-elevate-2` utility class
- Reduced motion support via `useReducedMotion` hook for accessibility
- Micro-animations on product cards (lift on hover, color swatch interactions)

### Page Structure

**Customer-Facing Pages**
- Home: Hero section, featured products, lookbook preview, value propositions
- Shop: Product grid with filtering, 3-column desktop/1-column mobile layout
- Product: Image gallery, variant selection, size picker, related products
- Lookbook: Editorial grid with full-screen modals
- About: Brand story and mission
- Sizing: Visual size chart with measurement guidance
- FAQ: Accordion-based frequently asked questions
- Contact: Contact form with email submission
- Legal: Privacy Policy, Terms of Service, Shipping & Returns

**UI Components**
- Sticky navigation with cart badge and mobile hamburger menu
- Floating cart slideout panel with quantity controls
- Newsletter modal for email capture
- Animated sun logo with rotating rays
- Sun beams background effect component

### Asset Management

**Image Handling**
- Vite asset resolution with `@assets` alias
- Product images stored in `/attached_assets/` directory
- Hero and lookbook editorial photography
- Hoodie product photos in multiple colorways (yellow, sand, coral)

**Build Configuration**
- Path aliases: `@/` for client source, `@shared/` for shared code, `@assets/` for images
- Build output to `/dist/public/` for client assets
- Server bundle output to `/dist/` directory

## External Dependencies

**Core Framework Dependencies**
- `express` - Web server framework
- `react` and `react-dom` - UI library
- `vite` and `@vitejs/plugin-react` - Build tooling
- `typescript` - Type system
- `wouter` - Routing library

**UI & Animation**
- `@radix-ui/*` packages - Accessible UI primitives (20+ component packages)
- `framer-motion` - Animation library
- `tailwindcss` - Utility CSS framework
- `class-variance-authority` and `clsx` - Conditional className utilities
- `embla-carousel-react` - Carousel component

**Data & Forms**
- `@tanstack/react-query` - Server state management
- `react-hook-form` - Form handling
- `@hookform/resolvers` - Form validation
- `zod` - Schema validation
- `drizzle-zod` - Drizzle schema to Zod validation

**Database & ORM**
- `drizzle-orm` - TypeScript ORM
- `drizzle-kit` - Migration tooling
- `@neondatabase/serverless` - Serverless PostgreSQL driver
- `connect-pg-simple` - PostgreSQL session store

**Development Tools**
- `@replit/vite-plugin-runtime-error-modal` - Error overlay
- `@replit/vite-plugin-cartographer` - Dev tooling (Replit-specific)
- `@replit/vite-plugin-dev-banner` - Dev banner (Replit-specific)
- `tsx` - TypeScript execution
- `esbuild` - JavaScript bundler for server code

**Utilities**
- `lucide-react` - Icon library
- `date-fns` - Date manipulation
- `nanoid` - ID generation
- `cmdk` - Command menu component

**Database Configuration**
- PostgreSQL connection via `DATABASE_URL` environment variable
- Drizzle migrations stored in `/migrations/` directory
- Schema definitions in `/shared/schema.ts`