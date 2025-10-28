<script lang="ts" module>
    import { type VariantProps, tv } from 'tailwind-variants';

    export const badgeVariants = tv({
        base: 'inline-flex w-fit shrink-0 items-center justify-center gap-1.5 overflow-hidden whitespace-nowrap rounded-md px-1.5 py-0.5 text-xs font-medium transition-colors sm:text-xs [&>svg]:pointer-events-none [&>svg]:size-3',
        variants: {
            variant: {
                // Original shadcn variants
                default:
                    'border border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90',
                secondary:
                    'border border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90',
                destructive:
                    'border border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90',
                outline:
                    'border text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground',

                // Catalyst color variants
                zinc: 'border-transparent bg-zinc-500/15 text-zinc-700 [a&]:hover:bg-zinc-500/25 dark:bg-zinc-500/10 dark:text-zinc-400 dark:[a&]:hover:bg-zinc-500/20',
                red: 'border-transparent bg-red-500/15 text-red-700 [a&]:hover:bg-red-500/25 dark:bg-red-500/10 dark:text-red-400 dark:[a&]:hover:bg-red-500/20',
                orange: 'border-transparent bg-orange-500/15 text-orange-700 [a&]:hover:bg-orange-500/25 dark:bg-orange-500/10 dark:text-orange-400 dark:[a&]:hover:bg-orange-500/20',
                amber: 'border-transparent bg-amber-400/20 text-amber-700 [a&]:hover:bg-amber-400/30 dark:bg-amber-400/10 dark:text-amber-400 dark:[a&]:hover:bg-amber-400/15',
                yellow: 'border-transparent bg-yellow-400/20 text-yellow-700 [a&]:hover:bg-yellow-400/30 dark:bg-yellow-400/10 dark:text-yellow-300 dark:[a&]:hover:bg-yellow-400/15',
                lime: 'border-transparent bg-lime-400/20 text-lime-700 [a&]:hover:bg-lime-400/30 dark:bg-lime-400/10 dark:text-lime-300 dark:[a&]:hover:bg-lime-400/15',
                green: 'border-transparent bg-green-500/15 text-green-700 [a&]:hover:bg-green-500/25 dark:bg-green-500/10 dark:text-green-400 dark:[a&]:hover:bg-green-500/20',
                emerald:
                    'border-transparent bg-emerald-500/15 text-emerald-700 [a&]:hover:bg-emerald-500/25 dark:bg-emerald-500/10 dark:text-emerald-400 dark:[a&]:hover:bg-emerald-500/20',
                teal: 'border-transparent bg-teal-500/15 text-teal-700 [a&]:hover:bg-teal-500/25 dark:bg-teal-500/10 dark:text-teal-300 dark:[a&]:hover:bg-teal-500/20',
                cyan: 'border-transparent bg-cyan-400/20 text-cyan-700 [a&]:hover:bg-cyan-400/30 dark:bg-cyan-400/10 dark:text-cyan-300 dark:[a&]:hover:bg-cyan-400/15',
                sky: 'border-transparent bg-sky-500/15 text-sky-700 [a&]:hover:bg-sky-500/25 dark:bg-sky-500/10 dark:text-sky-300 dark:[a&]:hover:bg-sky-500/20',
                blue: 'border-transparent bg-blue-500/15 text-blue-700 [a&]:hover:bg-blue-500/25 dark:text-blue-400 dark:[a&]:hover:bg-blue-500/20',
                indigo: 'border-transparent bg-indigo-500/15 text-indigo-700 [a&]:hover:bg-indigo-500/25 dark:text-indigo-400 dark:[a&]:hover:bg-indigo-500/20',
                violet: 'border-transparent bg-violet-500/15 text-violet-700 [a&]:hover:bg-violet-500/25 dark:text-violet-400 dark:[a&]:hover:bg-violet-500/20',
                purple: 'border-transparent bg-purple-500/15 text-purple-700 [a&]:hover:bg-purple-500/25 dark:text-purple-400 dark:[a&]:hover:bg-purple-500/20',
                fuchsia:
                    'border-transparent bg-fuchsia-400/15 text-fuchsia-700 [a&]:hover:bg-fuchsia-400/25 dark:bg-fuchsia-400/10 dark:text-fuchsia-400 dark:[a&]:hover:bg-fuchsia-400/20',
                pink: 'border-transparent bg-pink-400/15 text-pink-700 [a&]:hover:bg-pink-400/25 dark:bg-pink-400/10 dark:text-pink-400 dark:[a&]:hover:bg-pink-400/20',
                rose: 'border-transparent bg-rose-400/15 text-rose-700 [a&]:hover:bg-rose-400/25 dark:bg-rose-400/10 dark:text-rose-400 dark:[a&]:hover:bg-rose-400/20',
            },
        },
        defaultVariants: {
            variant: 'default',
        },
    });

    export type BadgeVariant = VariantProps<typeof badgeVariants>['variant'];
</script>

<script lang="ts">
    import type { HTMLAnchorAttributes } from 'svelte/elements';
    import { cn, type WithElementRef } from '$lib/utils.js';

    let {
        ref = $bindable(null),
        href,
        class: className,
        variant = 'default',
        children,
        ...restProps
    }: WithElementRef<HTMLAnchorAttributes> & {
        variant?: BadgeVariant;
    } = $props();
</script>

<svelte:element
    this={href ? 'a' : 'span'}
    bind:this={ref}
    data-slot="badge"
    {href}
    class={cn(badgeVariants({ variant }), className)}
    {...restProps}
>
    {@render children?.()}
</svelte:element>
