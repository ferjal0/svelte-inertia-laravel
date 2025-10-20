# Getting Started

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- PHP 8.x
- Node.js (LTS version recommended)
- Composer
- Git
- Laravel Herd (recommended for local development)

## 🚀 Installation

1. **Clone the Repository**

```bash
git clone <your-repository-url> your-project-name
cd your-project-name
```

2. **Install PHP Dependencies**

```bash
composer install
```

3. **Install Node.js Dependencies**

```bash
pnpm install
```

4. **Environment Setup**

```bash
cp .env.example .env
php artisan key:generate
```

5. **Configure Your Environment**
   Edit `.env` file with your database and other configuration settings.

6. **Create Database**

```bash
php artisan migrate
```

7. **Build Assets**

```bash
pnpm run dev
```

## 🌀 Tailwind CSS 4 (Zero‑Config)

Tailwind v4 is already wired with `@tailwindcss/vite` and `@tailwindcss/postcss`, so utilities work out of the box. Add the standard directives to your CSS entry or component styles and you’re good to go:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Migrating from v3? You likely don’t need a `tailwind.config.*` unless you need advanced customization.

## ⚡ Vite 7

This starter uses Vite 7 for a fast, reliable dev experience.

```bash
pnpm run dev   # start the dev server
pnpm run build # build client + SSR
```

## 🏃‍♂️ Development Workflow

### Start the Development Server

```bash
pnpm run dev
```

Your application will be available at `http://svelte-inertia-laravel.test` (if using Laravel Herd).

### Development Commands

```bash
# Run tests
php artisan test

# Format PHP code
./vendor/bin/pint

# Type check TypeScript and Svelte files
pnpm run check

# Svelte check (includes Runes validation)
pnpm run check:svelte

# Lint JavaScript/TypeScript/Svelte
pnpm run lint

# Format JavaScript/TypeScript/Svelte
pnpm run format
```

### Hot Module Replacement (HMR)

If HMR is not working:

1. Clear your browser cache
2. Restart the Vite 7 development server
3. Check your Vite config and plugins (e.g. `@sveltejs/vite-plugin-svelte`, `@tailwindcss/vite`)

### TypeScript Errors

Run `pnpm run check` to identify type issues. Common fixes:

- Ensure proper type definitions in `resources/js/types`
- Check for missing type imports
- Verify Svelte component prop types

### Svelte 5 Runes Issues

Common issues with Runes and their solutions:

1. **State Not Updating**
    - Ensure you're using `$state` for reactive variables
    - Check that you're modifying the state directly, not through object methods

2. **Props Type Errors**
    - Use `$props<T>()` for type-safe props
    - Ensure your interface extends `$$Props` if needed

3. **Derived Values Not Updating**
    - Make sure all dependencies are reactive (`$state` or `$props`)
    - Verify the computation doesn't have side effects

4. **Effects Not Running**
    - Check that dependencies are actually changing
    - Ensure you're not mutating state inside effects

5. **Snippet Rendering Issues**
    - Verify correct JSX syntax in snippets
    - Check that all variables used in snippets are in scope

## 🔒 Type Safety

To ensure type safety across your application:

1. Enable strict mode in `tsconfig.json`
2. Use TypeScript for all new components
3. Properly type your Inertia page props
4. Use `$props<T>()` for component props
5. Add return types to all functions
