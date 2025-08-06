# Overview

This is a real estate lead generation website for "Enmirex Homes," a cash house buying business. The application features a modern single-page design with sections for hero content, process explanation, lead capture form, property showcase, testimonials, and FAQ. The primary goal is to capture leads from homeowners interested in selling their properties quickly for cash.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React with TypeScript using Vite as the build tool
- **Styling**: Tailwind CSS with shadcn/ui component library for consistent design
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query (React Query) for server state management
- **Form Handling**: React Hook Form with Zod validation for type-safe form validation
- **UI Components**: Comprehensive set of Radix UI primitives wrapped in custom components

## Backend Architecture
- **Runtime**: Node.js with Express.js server
- **Language**: TypeScript with ES modules
- **Development Setup**: Custom Vite integration for hot reloading in development
- **API Design**: RESTful endpoints with structured error handling and request logging
- **Storage**: In-memory storage implementation with interface for easy database migration

## Data Storage Solutions
- **Current**: In-memory storage using Map data structure
- **Database Ready**: Drizzle ORM configured for PostgreSQL with schema definitions
- **Schema**: Lead entity with comprehensive property and contact information fields
- **Migration Support**: Drizzle-kit configured for database schema management

## Authentication and Authorization
- **Current Implementation**: No authentication system implemented
- **Session Handling**: Basic session configuration present but not actively used
- **Security**: CORS and basic Express security middleware

## External Service Integrations
- **Google Sheets**: Integration for lead data export using Google Sheets API
- **Environment Variables**: Configured for Google service account credentials and spreadsheet ID
- **Email/SMS**: No current integration but architecture supports future additions

## Key Design Decisions
- **Monorepo Structure**: Shared schema and types between client and server
- **Type Safety**: End-to-end TypeScript with shared validation schemas
- **Component Architecture**: Atomic design with reusable UI components
- **Development Experience**: Hot reloading, error overlays, and TypeScript checking
- **Deployment Ready**: Production build configuration with static asset serving

# External Dependencies

- **Database**: PostgreSQL (configured but not required for current in-memory storage)
- **Google Services**: Google Sheets API for lead data export
- **Build Tools**: Vite for frontend bundling, esbuild for backend compilation
- **UI Framework**: Radix UI primitives, Tailwind CSS, Lucide icons
- **Validation**: Zod for runtime type validation and schema generation
- **HTTP Client**: Fetch API with custom request wrapper for API communication