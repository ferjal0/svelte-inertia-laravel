# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a full-stack monolithic application using Laravel 12 (backend), Svelte 5 with Runes (frontend), connected via Inertia.js. The stack includes TypeScript, Tailwind CSS 4, and Shadcn UI components, all powered by Vite 7.

## Development Commands

### Setup

```bash
# Install dependencies
composer install
pnpm install

# Environment setup
cp .env.example .env
php artisan key:generate
php artisan migrate
```

### Running the Application

```bash
# Start dev server (frontend only)
pnpm run dev

# Start all services (Laravel server, queue, logs, Vite)
composer dev

# The application runs on http://svelte-inertia-laravel.test (via Laravel Herd)
```

### Building

```bash
# Build for production (builds both client and SSR)
pnpm run build
```

### Code Quality

```bash
# PHP formatting
./vendor/bin/pint

# TypeScript/Svelte linting
pnpm run lint
pnpm run lint:fix

# TypeScript/Svelte formatting
pnpm run format
pnpm run format:check
```

### Testing

```bash
# Run all tests (uses Pest)
php artisan test

# Run specific test
php artisan test --filter=UserTest

# Run with coverage
php artisan test --coverage
```

### Artisan Commands

```bash
# Create controller
php artisan make:controller NameController

# Create model with migration
php artisan make:model ModelName -m

# Create test
php artisan make:test TestName

# Clear cache
php artisan cache:clear
```

## Architecture

### Stack Integration

- **Laravel 12** handles routing, authentication (via Fortify), and backend logic
- **Inertia.js** acts as the bridge between Laravel and Svelte, enabling SPA-like behavior without building an API
- **Svelte 5 with Runes** provides the reactive frontend with explicit state management
- **Ziggy** makes Laravel named routes available in JavaScript/TypeScript

### Key Directories

**Backend (Laravel):**

- `app/Http/Controllers/` - Request handlers, organized by domain (Auth, Account)
- `app/Actions/Fortify/` - Fortify authentication actions (registration, password updates, etc.)
- `app/Http/Middleware/HandleInertiaRequests.php` - Shares common data to all Inertia pages (auth user, ziggy routes)
- `routes/web.php` - Main application routes
- `routes/auth.php` - Authentication-related routes

**Frontend (Svelte):**

- `resources/js/Pages/` - Page components matching Laravel routes (Auth/, Profile/, Security/, Dashboard.svelte, Welcome.svelte)
- `resources/js/lib/layouts/` - Layout components (AuthenticatedLayout.svelte, AuthenticationLayout.svelte)
- `resources/js/lib/components/ui/` - Shadcn UI components
- `resources/js/lib/types/` - TypeScript type definitions
- `resources/js/app.ts` - Frontend entry point
- `resources/js/ssr.ts` - SSR entry point

### Path Aliases

TypeScript and Vite are configured with:

- `@/*` → `resources/js/*`
- `$lib` → `resources/js/lib`
- `$lib/*` → `resources/js/lib/*`

Use these aliases in imports instead of relative paths.

### Inertia Integration

The `HandleInertiaRequests` middleware shares global data with all pages:

- `auth.user` - Current authenticated user
- `ziggy` - Laravel routes for use in JavaScript

Access this shared data in page components via props.

## Svelte 5 Runes System

This project uses Svelte 5's new Runes API for explicit reactivity:

**State Management:**

```svelte
<script lang="ts">
    // Reactive state
    let count = $state(0);

    // Computed/derived values
    let doubled = $derived(count * 2);

    // Props (type-safe)
    let { title, description = '' } = $props<{
        title: string;
        description?: string;
    }>();

    // Side effects
    $effect(() => {
        console.log(`Count changed to ${count}`);
    });

    // Snippets (replacement for slots)
    let header = $snippet(() => <h1>{title}</h1>);
</script>
```

**Key differences from Svelte 4:**

- Use `$state()` instead of `let` for reactive variables
- Use `$derived()` instead of `$:` reactive declarations
- Use `$props()` instead of `export let` for props
- Use `$effect()` instead of `$:` for side effects
- Use `$snippet` for template fragments/slots

### Form Handling with Inertia

```svelte
<script lang="ts">
    import { useForm } from '@inertiajs/svelte';

    let form = $state(
        useForm({
            email: '',
            password: '',
        }),
    );

    function submit() {
        form.post('/login');
    }
</script>

<form on:submit|preventDefault={submit}>
    <input type="email" bind:value={form.email} />
    {#if form.errors.email}
        <span>{form.errors.email}</span>
    {/if}
    <button type="submit" disabled={form.processing}>Login</button>
</form>
```

## Authentication

Uses Laravel Fortify with these features enabled:

- Registration
- Login/Logout
- Password Reset
- Email Verification
- Two-Factor Authentication
- Profile Updates

**Auth Routes:**

- `POST /login` - User login
- `POST /register` - User registration
- `POST /logout` - User logout
- `POST /forgot-password` - Request password reset
- `POST /reset-password` - Reset password
- `POST /user/password` - Update password
- `POST /user/profile-information` - Update profile
- `POST /user/two-factor-authentication` - Enable 2FA
- `DELETE /user/two-factor-authentication` - Disable 2FA

Authentication logic is in `app/Actions/Fortify/` and configured in `config/fortify.php`.

## Styling

### Tailwind CSS 4

This project uses Tailwind CSS 4 with zero-config setup via `@tailwindcss/vite` and `@tailwindcss/postcss`.

The standard directives are available:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### Shadcn UI

UI components are in `resources/js/lib/components/ui/`. These are built with `bits-ui`, `tailwind-variants`, and other utility libraries.

Use the `cn()` utility from `$lib/utils` to merge Tailwind classes:

```typescript
import { cn } from '$lib/utils';

<div class={cn('base-class', conditionalClass, className)} />
```

## Database

Default database is SQLite (`database/database.sqlite`), but any database is supported.

**Configuration:** `.env` file

```env
DB_CONNECTION=sqlite
DB_DATABASE=database.sqlite
```

**Key Models:**

- `User` - User accounts
- `Session` - User sessions

Run migrations with: `php artisan migrate`

## Common Patterns

### Creating a New Page

1. Add route in `routes/web.php` or `routes/auth.php`
2. Create page component in `resources/js/Pages/`
3. Use `Inertia::render('PageName', [...data])` in controller/route
4. Apply appropriate layout (AuthenticatedLayout or AuthenticationLayout)

### Adding a New Feature

1. Create controller if needed: `php artisan make:controller FeatureController`
2. Define routes in `routes/web.php`
3. Create page components in `resources/js/Pages/`
4. Use Inertia forms for data submission
5. Follow Svelte 5 Runes patterns for state management

### Working with Forms

Always use Inertia's `useForm()` helper for form handling. It provides:

- Form state management
- Validation error handling
- Loading states
- Automatic CSRF token handling

## Important Notes

- **Package Manager:** Use `pnpm` (not npm or yarn)
- **PHP Code Style:** Follows PSR-12, enforced by Laravel Pint
- **TypeScript:** Strict mode is enabled
- **Server-Side Rendering:** Both client and SSR builds are generated on production build
- **Environment:** Designed to run with Laravel Herd, but works with any Laravel-compatible server
