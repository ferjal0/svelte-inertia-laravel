<script lang="ts" module>
    import { cn, type WithElementRef } from '$lib/utils.js';
    import type {
        HTMLAnchorAttributes,
        HTMLButtonAttributes,
    } from 'svelte/elements';
    import { type VariantProps, tv } from 'tailwind-variants';

    export const buttonVariants = tv({
        base: [
            // Base layout and typography
            'relative isolate inline-flex items-center justify-center gap-x-2',
            'rounded-lg border text-base/6 font-semibold sm:text-sm/6',
            // Focus states
            'focus:outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 focus-visible:ring-offset-white dark:focus-visible:ring-offset-black',
            // Transition
            'transition-[color,box-shadow]',
            // Disabled states
            'data-disabled:opacity-50 disabled:opacity-50',
            // Icon handling
            '*:data-[slot=icon]:-mx-0.5 *:data-[slot=icon]:my-0.5 *:data-[slot=icon]:size-5 *:data-[slot=icon]:shrink-0 *:data-[slot=icon]:self-center *:data-[slot=icon]:text-(--btn-icon)',
            'sm:*:data-[slot=icon]:my-1 sm:*:data-[slot=icon]:size-4',
            'forced-colors:[--btn-icon:ButtonText] forced-colors:data-hover:[--btn-icon:ButtonText]',
            // Touch target for mobile
            'cursor-default',
        ].join(' '),
        variants: {
            variant: {
                ghost: [
                    'border-transparent bg-transparent dark:bg-transparent hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50',
                ],
                // Solid variants
                default: [
                    'border-transparent bg-(--btn-border) dark:bg-(--btn-bg)',
                    'before:absolute before:inset-0 before:-z-10 before:rounded-[calc(var(--radius-lg)-1px)] before:bg-(--btn-bg) before:shadow-sm',
                    'dark:before:hidden dark:border-white/5',
                    'after:absolute after:inset-0 after:-z-10 after:rounded-[calc(var(--radius-lg)-1px)] after:shadow-[inset_0_1px_--theme(--color-white/15%)]',
                    'data-active:after:bg-(--btn-hover-overlay) data-hover:after:bg-(--btn-hover-overlay)',
                    'dark:after:-inset-px dark:after:rounded-lg',
                    'data-disabled:before:shadow-none data-disabled:after:shadow-none',
                    'text-white [--btn-bg:var(--color-zinc-900)] [--btn-border:var(--color-zinc-950)]/90 [--btn-hover-overlay:var(--color-white)]/10',
                    'dark:[--btn-hover-overlay:var(--color-white)]/5 dark:[--btn-bg:var(--color-zinc-800)]',
                    '[--btn-icon:var(--color-zinc-400)] data-active:[--btn-icon:var(--color-zinc-300)] data-hover:[--btn-icon:var(--color-zinc-300)]',
                ].join(' '),
                'solid-white': [
                    'border-transparent bg-(--btn-border) dark:bg-(--btn-bg)',
                    'before:absolute before:inset-0 before:-z-10 before:rounded-[calc(var(--radius-lg)-1px)] before:bg-(--btn-bg) before:shadow-sm',
                    'dark:before:hidden dark:border-white/5',
                    'after:absolute after:inset-0 after:-z-10 after:rounded-[calc(var(--radius-lg)-1px)] after:shadow-[inset_0_1px_--theme(--color-white/15%)]',
                    'data-active:after:bg-(--btn-hover-overlay) data-hover:after:bg-(--btn-hover-overlay)',
                    'dark:after:-inset-px dark:after:rounded-lg',
                    'data-disabled:before:shadow-none data-disabled:after:shadow-none',
                    'text-zinc-950 [--btn-bg:white] [--btn-border:var(--color-zinc-950)]/10 [--btn-hover-overlay:var(--color-zinc-950)]/2.5',
                    'dark:text-white dark:[--btn-hover-overlay:var(--color-white)]/5 dark:[--btn-bg:var(--color-zinc-800)]',
                    '[--btn-icon:var(--color-zinc-400)] data-active:[--btn-icon:var(--color-zinc-500)] data-hover:[--btn-icon:var(--color-zinc-500)]',
                ].join(' '),
                'solid-zinc': [
                    'border-transparent bg-(--btn-border) dark:bg-(--btn-bg)',
                    'before:absolute before:inset-0 before:-z-10 before:rounded-[calc(var(--radius-lg)-1px)] before:bg-(--btn-bg) before:shadow-sm',
                    'dark:before:hidden dark:border-white/5',
                    'after:absolute after:inset-0 after:-z-10 after:rounded-[calc(var(--radius-lg)-1px)] after:shadow-[inset_0_1px_--theme(--color-white/15%)]',
                    'data-active:after:bg-(--btn-hover-overlay) data-hover:after:bg-(--btn-hover-overlay)',
                    'dark:after:-inset-px dark:after:rounded-lg',
                    'data-disabled:before:shadow-none data-disabled:after:shadow-none',
                    'text-white [--btn-bg:var(--color-zinc-900)] [--btn-border:var(--color-zinc-950)]/90 [--btn-hover-overlay:var(--color-white)]/10',
                    'dark:[--btn-hover-overlay:var(--color-white)]/5 dark:[--btn-bg:var(--color-zinc-600)]',
                    '[--btn-icon:var(--color-zinc-400)] data-active:[--btn-icon:var(--color-zinc-300)] data-hover:[--btn-icon:var(--color-zinc-300)]',
                ].join(' '),
                destructive: [
                    'border-transparent bg-(--btn-border) dark:bg-(--btn-bg)',
                    'before:absolute before:inset-0 before:-z-10 before:rounded-[calc(var(--radius-lg)-1px)] before:bg-(--btn-bg) before:shadow-sm',
                    'dark:before:hidden dark:border-white/5',
                    'after:absolute after:inset-0 after:-z-10 after:rounded-[calc(var(--radius-lg)-1px)] after:shadow-[inset_0_1px_--theme(--color-white/15%)]',
                    'data-active:after:bg-(--btn-hover-overlay) data-hover:after:bg-(--btn-hover-overlay)',
                    'dark:after:-inset-px dark:after:rounded-lg',
                    'data-disabled:before:shadow-none data-disabled:after:shadow-none',
                    'text-white [--btn-bg:var(--color-red-600)] [--btn-border:var(--color-red-700)]/90 [--btn-hover-overlay:var(--color-white)]/10',
                    'dark:[--btn-hover-overlay:var(--color-white)]/5',
                    '[--btn-icon:var(--color-red-300)] data-active:[--btn-icon:var(--color-red-200)] data-hover:[--btn-icon:var(--color-red-200)]',
                ].join(' '),
                'solid-orange': [
                    'border-transparent bg-(--btn-border) dark:bg-(--btn-bg)',
                    'before:absolute before:inset-0 before:-z-10 before:rounded-[calc(var(--radius-lg)-1px)] before:bg-(--btn-bg) before:shadow-sm',
                    'dark:before:hidden dark:border-white/5',
                    'after:absolute after:inset-0 after:-z-10 after:rounded-[calc(var(--radius-lg)-1px)] after:shadow-[inset_0_1px_--theme(--color-white/15%)]',
                    'data-active:after:bg-(--btn-hover-overlay) data-hover:after:bg-(--btn-hover-overlay)',
                    'dark:after:-inset-px dark:after:rounded-lg',
                    'data-disabled:before:shadow-none data-disabled:after:shadow-none',
                    'text-white [--btn-bg:var(--color-orange-600)] [--btn-border:var(--color-orange-700)]/90 [--btn-hover-overlay:var(--color-white)]/10',
                    'dark:[--btn-hover-overlay:var(--color-white)]/5',
                    '[--btn-icon:var(--color-orange-300)] data-active:[--btn-icon:var(--color-orange-200)] data-hover:[--btn-icon:var(--color-orange-200)]',
                ].join(' '),
                'solid-amber': [
                    'border-transparent bg-(--btn-border) dark:bg-(--btn-bg)',
                    'before:absolute before:inset-0 before:-z-10 before:rounded-[calc(var(--radius-lg)-1px)] before:bg-(--btn-bg) before:shadow-sm',
                    'dark:before:hidden dark:border-white/5',
                    'after:absolute after:inset-0 after:-z-10 after:rounded-[calc(var(--radius-lg)-1px)] after:shadow-[inset_0_1px_--theme(--color-white/15%)]',
                    'data-active:after:bg-(--btn-hover-overlay) data-hover:after:bg-(--btn-hover-overlay)',
                    'dark:after:-inset-px dark:after:rounded-lg',
                    'data-disabled:before:shadow-none data-disabled:after:shadow-none',
                    'text-amber-950 [--btn-bg:var(--color-amber-500)] [--btn-border:var(--color-amber-600)]/90 [--btn-hover-overlay:var(--color-amber-950)]/10',
                    'dark:text-white dark:[--btn-hover-overlay:var(--color-white)]/5',
                    '[--btn-icon:var(--color-amber-600)] data-active:[--btn-icon:var(--color-amber-700)] data-hover:[--btn-icon:var(--color-amber-700)]',
                ].join(' '),
                'solid-yellow': [
                    'border-transparent bg-(--btn-border) dark:bg-(--btn-bg)',
                    'before:absolute before:inset-0 before:-z-10 before:rounded-[calc(var(--radius-lg)-1px)] before:bg-(--btn-bg) before:shadow-sm',
                    'dark:before:hidden dark:border-white/5',
                    'after:absolute after:inset-0 after:-z-10 after:rounded-[calc(var(--radius-lg)-1px)] after:shadow-[inset_0_1px_--theme(--color-white/15%)]',
                    'data-active:after:bg-(--btn-hover-overlay) data-hover:after:bg-(--btn-hover-overlay)',
                    'dark:after:-inset-px dark:after:rounded-lg',
                    'data-disabled:before:shadow-none data-disabled:after:shadow-none',
                    'text-yellow-950 [--btn-bg:var(--color-yellow-400)] [--btn-border:var(--color-yellow-500)]/90 [--btn-hover-overlay:var(--color-yellow-950)]/10',
                    'dark:text-white dark:[--btn-hover-overlay:var(--color-white)]/5',
                    '[--btn-icon:var(--color-yellow-600)] data-active:[--btn-icon:var(--color-yellow-700)] data-hover:[--btn-icon:var(--color-yellow-700)]',
                ].join(' '),
                'solid-lime': [
                    'border-transparent bg-(--btn-border) dark:bg-(--btn-bg)',
                    'before:absolute before:inset-0 before:-z-10 before:rounded-[calc(var(--radius-lg)-1px)] before:bg-(--btn-bg) before:shadow-sm',
                    'dark:before:hidden dark:border-white/5',
                    'after:absolute after:inset-0 after:-z-10 after:rounded-[calc(var(--radius-lg)-1px)] after:shadow-[inset_0_1px_--theme(--color-white/15%)]',
                    'data-active:after:bg-(--btn-hover-overlay) data-hover:after:bg-(--btn-hover-overlay)',
                    'dark:after:-inset-px dark:after:rounded-lg',
                    'data-disabled:before:shadow-none data-disabled:after:shadow-none',
                    'text-lime-950 [--btn-bg:var(--color-lime-500)] [--btn-border:var(--color-lime-600)]/90 [--btn-hover-overlay:var(--color-lime-950)]/10',
                    'dark:text-white dark:[--btn-hover-overlay:var(--color-white)]/5',
                    '[--btn-icon:var(--color-lime-600)] data-active:[--btn-icon:var(--color-lime-700)] data-hover:[--btn-icon:var(--color-lime-700)]',
                ].join(' '),
                'solid-green': [
                    'border-transparent bg-(--btn-border) dark:bg-(--btn-bg)',
                    'before:absolute before:inset-0 before:-z-10 before:rounded-[calc(var(--radius-lg)-1px)] before:bg-(--btn-bg) before:shadow-sm',
                    'dark:before:hidden dark:border-white/5',
                    'after:absolute after:inset-0 after:-z-10 after:rounded-[calc(var(--radius-lg)-1px)] after:shadow-[inset_0_1px_--theme(--color-white/15%)]',
                    'data-active:after:bg-(--btn-hover-overlay) data-hover:after:bg-(--btn-hover-overlay)',
                    'dark:after:-inset-px dark:after:rounded-lg',
                    'data-disabled:before:shadow-none data-disabled:after:shadow-none',
                    'text-white [--btn-bg:var(--color-green-600)] [--btn-border:var(--color-green-700)]/90 [--btn-hover-overlay:var(--color-white)]/10',
                    'dark:[--btn-hover-overlay:var(--color-white)]/5',
                    '[--btn-icon:var(--color-green-300)] data-active:[--btn-icon:var(--color-green-200)] data-hover:[--btn-icon:var(--color-green-200)]',
                ].join(' '),
                'solid-emerald': [
                    'border-transparent bg-(--btn-border) dark:bg-(--btn-bg)',
                    'before:absolute before:inset-0 before:-z-10 before:rounded-[calc(var(--radius-lg)-1px)] before:bg-(--btn-bg) before:shadow-sm',
                    'dark:before:hidden dark:border-white/5',
                    'after:absolute after:inset-0 after:-z-10 after:rounded-[calc(var(--radius-lg)-1px)] after:shadow-[inset_0_1px_--theme(--color-white/15%)]',
                    'data-active:after:bg-(--btn-hover-overlay) data-hover:after:bg-(--btn-hover-overlay)',
                    'dark:after:-inset-px dark:after:rounded-lg',
                    'data-disabled:before:shadow-none data-disabled:after:shadow-none',
                    'text-white [--btn-bg:var(--color-emerald-600)] [--btn-border:var(--color-emerald-700)]/90 [--btn-hover-overlay:var(--color-white)]/10',
                    'dark:[--btn-hover-overlay:var(--color-white)]/5',
                    '[--btn-icon:var(--color-emerald-300)] data-active:[--btn-icon:var(--color-emerald-200)] data-hover:[--btn-icon:var(--color-emerald-200)]',
                ].join(' '),
                'solid-teal': [
                    'border-transparent bg-(--btn-border) dark:bg-(--btn-bg)',
                    'before:absolute before:inset-0 before:-z-10 before:rounded-[calc(var(--radius-lg)-1px)] before:bg-(--btn-bg) before:shadow-sm',
                    'dark:before:hidden dark:border-white/5',
                    'after:absolute after:inset-0 after:-z-10 after:rounded-[calc(var(--radius-lg)-1px)] after:shadow-[inset_0_1px_--theme(--color-white/15%)]',
                    'data-active:after:bg-(--btn-hover-overlay) data-hover:after:bg-(--btn-hover-overlay)',
                    'dark:after:-inset-px dark:after:rounded-lg',
                    'data-disabled:before:shadow-none data-disabled:after:shadow-none',
                    'text-white [--btn-bg:var(--color-teal-600)] [--btn-border:var(--color-teal-700)]/90 [--btn-hover-overlay:var(--color-white)]/10',
                    'dark:[--btn-hover-overlay:var(--color-white)]/5',
                    '[--btn-icon:var(--color-teal-300)] data-active:[--btn-icon:var(--color-teal-200)] data-hover:[--btn-icon:var(--color-teal-200)]',
                ].join(' '),
                'solid-cyan': [
                    'border-transparent bg-(--btn-border) dark:bg-(--btn-bg)',
                    'before:absolute before:inset-0 before:-z-10 before:rounded-[calc(var(--radius-lg)-1px)] before:bg-(--btn-bg) before:shadow-sm',
                    'dark:before:hidden dark:border-white/5',
                    'after:absolute after:inset-0 after:-z-10 after:rounded-[calc(var(--radius-lg)-1px)] after:shadow-[inset_0_1px_--theme(--color-white/15%)]',
                    'data-active:after:bg-(--btn-hover-overlay) data-hover:after:bg-(--btn-hover-overlay)',
                    'dark:after:-inset-px dark:after:rounded-lg',
                    'data-disabled:before:shadow-none data-disabled:after:shadow-none',
                    'text-white [--btn-bg:var(--color-cyan-600)] [--btn-border:var(--color-cyan-700)]/90 [--btn-hover-overlay:var(--color-white)]/10',
                    'dark:[--btn-hover-overlay:var(--color-white)]/5',
                    '[--btn-icon:var(--color-cyan-300)] data-active:[--btn-icon:var(--color-cyan-200)] data-hover:[--btn-icon:var(--color-cyan-200)]',
                ].join(' '),
                'solid-sky': [
                    'border-transparent bg-(--btn-border) dark:bg-(--btn-bg)',
                    'before:absolute before:inset-0 before:-z-10 before:rounded-[calc(var(--radius-lg)-1px)] before:bg-(--btn-bg) before:shadow-sm',
                    'dark:before:hidden dark:border-white/5',
                    'after:absolute after:inset-0 after:-z-10 after:rounded-[calc(var(--radius-lg)-1px)] after:shadow-[inset_0_1px_--theme(--color-white/15%)]',
                    'data-active:after:bg-(--btn-hover-overlay) data-hover:after:bg-(--btn-hover-overlay)',
                    'dark:after:-inset-px dark:after:rounded-lg',
                    'data-disabled:before:shadow-none data-disabled:after:shadow-none',
                    'text-white [--btn-bg:var(--color-sky-600)] [--btn-border:var(--color-sky-700)]/90 [--btn-hover-overlay:var(--color-white)]/10',
                    'dark:[--btn-hover-overlay:var(--color-white)]/5',
                    '[--btn-icon:var(--color-sky-300)] data-active:[--btn-icon:var(--color-sky-200)] data-hover:[--btn-icon:var(--color-sky-200)]',
                ].join(' '),
                'solid-blue': [
                    'border-transparent bg-(--btn-border) dark:bg-(--btn-bg)',
                    'before:absolute before:inset-0 before:-z-10 before:rounded-[calc(var(--radius-lg)-1px)] before:bg-(--btn-bg) before:shadow-sm',
                    'dark:before:hidden dark:border-white/5',
                    'after:absolute after:inset-0 after:-z-10 after:rounded-[calc(var(--radius-lg)-1px)] after:shadow-[inset_0_1px_--theme(--color-white/15%)]',
                    'data-active:after:bg-(--btn-hover-overlay) data-hover:after:bg-(--btn-hover-overlay)',
                    'dark:after:-inset-px dark:after:rounded-lg',
                    'data-disabled:before:shadow-none data-disabled:after:shadow-none',
                    'text-white [--btn-bg:var(--color-blue-600)] [--btn-border:var(--color-blue-700)]/90 [--btn-hover-overlay:var(--color-white)]/10',
                    'dark:[--btn-hover-overlay:var(--color-white)]/5',
                    '[--btn-icon:var(--color-blue-400)] data-active:[--btn-icon:var(--color-blue-300)] data-hover:[--btn-icon:var(--color-blue-300)]',
                ].join(' '),
                'solid-indigo': [
                    'border-transparent bg-(--btn-border) dark:bg-(--btn-bg)',
                    'before:absolute before:inset-0 before:-z-10 before:rounded-[calc(var(--radius-lg)-1px)] before:bg-(--btn-bg) before:shadow-sm',
                    'dark:before:hidden dark:border-white/5',
                    'after:absolute after:inset-0 after:-z-10 after:rounded-[calc(var(--radius-lg)-1px)] after:shadow-[inset_0_1px_--theme(--color-white/15%)]',
                    'data-active:after:bg-(--btn-hover-overlay) data-hover:after:bg-(--btn-hover-overlay)',
                    'dark:after:-inset-px dark:after:rounded-lg',
                    'data-disabled:before:shadow-none data-disabled:after:shadow-none',
                    'text-white [--btn-bg:var(--color-indigo-600)] [--btn-border:var(--color-indigo-700)]/90 [--btn-hover-overlay:var(--color-white)]/10',
                    'dark:[--btn-hover-overlay:var(--color-white)]/5',
                    '[--btn-icon:var(--color-indigo-400)] data-active:[--btn-icon:var(--color-indigo-300)] data-hover:[--btn-icon:var(--color-indigo-300)]',
                ].join(' '),
                'solid-violet': [
                    'border-transparent bg-(--btn-border) dark:bg-(--btn-bg)',
                    'before:absolute before:inset-0 before:-z-10 before:rounded-[calc(var(--radius-lg)-1px)] before:bg-(--btn-bg) before:shadow-sm',
                    'dark:before:hidden dark:border-white/5',
                    'after:absolute after:inset-0 after:-z-10 after:rounded-[calc(var(--radius-lg)-1px)] after:shadow-[inset_0_1px_--theme(--color-white/15%)]',
                    'data-active:after:bg-(--btn-hover-overlay) data-hover:after:bg-(--btn-hover-overlay)',
                    'dark:after:-inset-px dark:after:rounded-lg',
                    'data-disabled:before:shadow-none data-disabled:after:shadow-none',
                    'text-white [--btn-bg:var(--color-violet-600)] [--btn-border:var(--color-violet-700)]/90 [--btn-hover-overlay:var(--color-white)]/10',
                    'dark:[--btn-hover-overlay:var(--color-white)]/5',
                    '[--btn-icon:var(--color-violet-400)] data-active:[--btn-icon:var(--color-violet-300)] data-hover:[--btn-icon:var(--color-violet-300)]',
                ].join(' '),
                'solid-purple': [
                    'border-transparent bg-(--btn-border) dark:bg-(--btn-bg)',
                    'before:absolute before:inset-0 before:-z-10 before:rounded-[calc(var(--radius-lg)-1px)] before:bg-(--btn-bg) before:shadow-sm',
                    'dark:before:hidden dark:border-white/5',
                    'after:absolute after:inset-0 after:-z-10 after:rounded-[calc(var(--radius-lg)-1px)] after:shadow-[inset_0_1px_--theme(--color-white/15%)]',
                    'data-active:after:bg-(--btn-hover-overlay) data-hover:after:bg-(--btn-hover-overlay)',
                    'dark:after:-inset-px dark:after:rounded-lg',
                    'data-disabled:before:shadow-none data-disabled:after:shadow-none',
                    'text-white [--btn-bg:var(--color-purple-600)] [--btn-border:var(--color-purple-700)]/90 [--btn-hover-overlay:var(--color-white)]/10',
                    'dark:[--btn-hover-overlay:var(--color-white)]/5',
                    '[--btn-icon:var(--color-purple-400)] data-active:[--btn-icon:var(--color-purple-300)] data-hover:[--btn-icon:var(--color-purple-300)]',
                ].join(' '),
                'solid-fuchsia': [
                    'border-transparent bg-(--btn-border) dark:bg-(--btn-bg)',
                    'before:absolute before:inset-0 before:-z-10 before:rounded-[calc(var(--radius-lg)-1px)] before:bg-(--btn-bg) before:shadow-sm',
                    'dark:before:hidden dark:border-white/5',
                    'after:absolute after:inset-0 after:-z-10 after:rounded-[calc(var(--radius-lg)-1px)] after:shadow-[inset_0_1px_--theme(--color-white/15%)]',
                    'data-active:after:bg-(--btn-hover-overlay) data-hover:after:bg-(--btn-hover-overlay)',
                    'dark:after:-inset-px dark:after:rounded-lg',
                    'data-disabled:before:shadow-none data-disabled:after:shadow-none',
                    'text-white [--btn-bg:var(--color-fuchsia-600)] [--btn-border:var(--color-fuchsia-700)]/90 [--btn-hover-overlay:var(--color-white)]/10',
                    'dark:[--btn-hover-overlay:var(--color-white)]/5',
                    '[--btn-icon:var(--color-fuchsia-400)] data-active:[--btn-icon:var(--color-fuchsia-300)] data-hover:[--btn-icon:var(--color-fuchsia-300)]',
                ].join(' '),
                'solid-pink': [
                    'border-transparent bg-(--btn-border) dark:bg-(--btn-bg)',
                    'before:absolute before:inset-0 before:-z-10 before:rounded-[calc(var(--radius-lg)-1px)] before:bg-(--btn-bg) before:shadow-sm',
                    'dark:before:hidden dark:border-white/5',
                    'after:absolute after:inset-0 after:-z-10 after:rounded-[calc(var(--radius-lg)-1px)] after:shadow-[inset_0_1px_--theme(--color-white/15%)]',
                    'data-active:after:bg-(--btn-hover-overlay) data-hover:after:bg-(--btn-hover-overlay)',
                    'dark:after:-inset-px dark:after:rounded-lg',
                    'data-disabled:before:shadow-none data-disabled:after:shadow-none',
                    'text-white [--btn-bg:var(--color-pink-600)] [--btn-border:var(--color-pink-700)]/90 [--btn-hover-overlay:var(--color-white)]/10',
                    'dark:[--btn-hover-overlay:var(--color-white)]/5',
                    '[--btn-icon:var(--color-pink-400)] data-active:[--btn-icon:var(--color-pink-300)] data-hover:[--btn-icon:var(--color-pink-300)]',
                ].join(' '),
                'solid-rose': [
                    'border-transparent bg-(--btn-border) dark:bg-(--btn-bg)',
                    'before:absolute before:inset-0 before:-z-10 before:rounded-[calc(var(--radius-lg)-1px)] before:bg-(--btn-bg) before:shadow-sm',
                    'dark:before:hidden dark:border-white/5',
                    'after:absolute after:inset-0 after:-z-10 after:rounded-[calc(var(--radius-lg)-1px)] after:shadow-[inset_0_1px_--theme(--color-white/15%)]',
                    'data-active:after:bg-(--btn-hover-overlay) data-hover:after:bg-(--btn-hover-overlay)',
                    'dark:after:-inset-px dark:after:rounded-lg',
                    'data-disabled:before:shadow-none data-disabled:after:shadow-none',
                    'text-white [--btn-bg:var(--color-rose-600)] [--btn-border:var(--color-rose-700)]/90 [--btn-hover-overlay:var(--color-white)]/10',
                    'dark:[--btn-hover-overlay:var(--color-white)]/5',
                    '[--btn-icon:var(--color-rose-400)] data-active:[--btn-icon:var(--color-rose-300)] data-hover:[--btn-icon:var(--color-rose-300)]',
                ].join(' '),
                // Outline variant
                outline: [
                    'border-zinc-950/10 text-zinc-950 data-active:bg-zinc-950/2.5 data-hover:bg-zinc-950/2.5',
                    'dark:border-white/15 dark:text-white dark:[--btn-bg:transparent]',
                    'dark:data-active:bg-white/5 dark:data-hover:bg-white/5',
                    '[--btn-icon:var(--color-zinc-500)] data-active:[--btn-icon:var(--color-zinc-700)] data-hover:[--btn-icon:var(--color-zinc-700)]',
                    'dark:data-active:[--btn-icon:var(--color-zinc-400)] dark:data-hover:[--btn-icon:var(--color-zinc-400)]',
                ].join(' '),
                // Plain variant
                plain: [
                    'border-transparent text-zinc-950 data-active:bg-zinc-950/5 data-hover:bg-zinc-950/5',
                    'dark:text-white dark:data-active:bg-white/10 dark:data-hover:bg-white/10',
                    '[--btn-icon:var(--color-zinc-500)] data-active:[--btn-icon:var(--color-zinc-700)] data-hover:[--btn-icon:var(--color-zinc-700)]',
                    'dark:[--btn-icon:var(--color-zinc-500)]',
                    'dark:data-active:[--btn-icon:var(--color-zinc-400)] dark:data-hover:[--btn-icon:var(--color-zinc-400)]',
                ].join(' '),
            },
            size: {
                icon: 'size-8 p-0',
                default:
                    'px-[calc(theme(spacing[3.5])-1px)] py-[calc(theme(spacing[2.5])-1px)] sm:px-[calc(theme(spacing[3])-1px)] sm:py-[calc(theme(spacing[1.5])-1px)]',
                sm: 'px-[calc(theme(spacing[3])-1px)] py-[calc(theme(spacing[1.5])-1px)] sm:px-[calc(theme(spacing[2.5])-1px)] sm:py-[calc(theme(spacing[1])-1px)]',
                lg: 'px-[calc(theme(spacing[4])-1px)] py-[calc(theme(spacing[3])-1px)] sm:px-[calc(theme(spacing[3.5])-1px)] sm:py-[calc(theme(spacing[2.5])-1px)]',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
        },
    });

    export type ButtonVariant = VariantProps<typeof buttonVariants>['variant'];
    export type ButtonSize = VariantProps<typeof buttonVariants>['size'];

    export type ButtonProps = WithElementRef<HTMLButtonAttributes> &
        WithElementRef<HTMLAnchorAttributes> & {
            variant?: ButtonVariant;
            size?: ButtonSize;
        };
</script>

<script lang="ts">
    let {
        class: className,
        variant = 'default',
        size = 'default',
        ref = $bindable(null),
        href = undefined,
        type = 'button',
        disabled,
        children,
        ...restProps
    }: ButtonProps = $props();
</script>

{#if href}
    <a
        bind:this={ref}
        data-slot="button"
        class={cn(buttonVariants({ variant, size }), className)}
        href={disabled ? undefined : href}
        aria-disabled={disabled}
        role={disabled ? 'link' : undefined}
        tabindex={disabled ? -1 : undefined}
        {...restProps}
    >
        {@render children?.()}
    </a>
{:else}
    <button
        bind:this={ref}
        data-slot="button"
        class={cn(buttonVariants({ variant, size }), className)}
        {type}
        {disabled}
        {...restProps}
    >
        {@render children?.()}
    </button>
{/if}
