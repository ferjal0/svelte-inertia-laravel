# Frontend Documentation

## 🏗️ Frontend Architecture

The frontend is built with Svelte 5, TypeScript, and Inertia.js, providing a modern single-page application experience while maintaining the benefits of server-side rendering.

### Directory Structure

```
resources/js/
├── components/     # Reusable UI components
├── layouts/        # Page layouts
├── pages/         # Page components
├── types/         # TypeScript definitions
└── utils/         # Utility functions
```

## 🎨 UI Components

### Shadcn UI Integration

We use Shadcn UI for consistent, accessible components. Components are installed and configured in the `components/ui` directory.

### Custom Components

Custom components using Svelte 5 Runes:

```svelte
<!-- resources/js/components/MyComponent.svelte -->
<script lang="ts">
    import { cn } from '@/lib/utils';

    interface $$Props {
        className?: string;
    }

    let className = $props<$$Props>();
</script>

<div class={cn('base-styles', className)}>
    <slot />
</div>
```

## 🎯 Pages and Routing

### Page Structure

Pages are stored in `resources/js/pages/` and follow the Laravel route structure:

```
pages/
├── Auth/
│   ├── Login.svelte
│   └── Register.svelte
├── Dashboard/
│   └── Index.svelte
└── Welcome.svelte
```

### Inertia Page Component with Runes

```svelte
<script lang="ts">
    import { Head } from '@inertiajs/svelte';
    import type { PageProps } from '@/types';

    let auth = $props<PageProps>();
    let count = $state(0);
    let doubled = $derived(count * 2);

    // Side effects with $effect
    $effect(() => {
        console.log(`Count changed to ${count}`);
    });
</script>

<Head title="Dashboard" />

<h1>Welcome {auth.user.name}</h1>
<p>Count: {count} (Doubled: {doubled})</p>
```

## 📐 Layouts

### Layout Structure

Layouts are in `resources/js/layouts/` and provide consistent page structure:

- `AuthenticatedLayout.svelte`: For authenticated pages
- `GuestLayout.svelte`: For public pages
- `AuthenticationLayout.svelte`: For auth-related pages

### Using Layouts with Snippets (New in Svelte 5)

```svelte
<script lang="ts">
    import AuthenticatedLayout from '@/layouts/AuthenticatedLayout.svelte';
    
    let header = $snippet(() => (
        <h1>Dashboard</h1>
    ));
</script>

<AuthenticatedLayout>
    {header}
    <slot />
</AuthenticatedLayout>
```

## 🔄 State Management

### Inertia.js Form Handling with Runes

```svelte
<script lang="ts">
    import { useForm } from '@inertiajs/svelte';

    let form = $state(useForm({
        email: '',
        password: '',
    }));

    function submit() {
        form.post('/login');
    }
</script>

<form on:submit|preventDefault={submit}>
    <input type="email" bind:value={form.email} />
    <input type="password" bind:value={form.password} />
    <button type="submit" disabled={form.processing}>Login</button>
</form>
```

## 🎭 TypeScript Integration

### Type Definitions

```typescript
// resources/js/types/index.ts
export interface User {
    id: number;
    name: string;
    email: string;
}

export interface PageProps {
    auth: {
        user: User;
    };
}
```

## 🔧 Component Props with Runes

Props should be typed using TypeScript and Runes:

```svelte
<script lang="ts">
    interface $$Props {
        title: string;
        description?: string;
    }

    let { title, description = '' } = $props<$$Props>();
    
    // Derived state from props
    let titleLength = $derived(title.length);
</script>

<div>
    <h2>{title}</h2>
    {#if description}
        <p>{description}</p>
    {/if}
    <small>Title length: {titleLength}</small>
</div>
```

## 🔍 Key Features of Svelte 5 Runes

- **$state**: Explicit reactive state declaration
- **$props**: Type-safe props with better TypeScript integration
- **$derived**: Computed values that update automatically
- **$effect**: Side effects that run when dependencies change
- **$snippet**: New way to handle slots and template fragments
