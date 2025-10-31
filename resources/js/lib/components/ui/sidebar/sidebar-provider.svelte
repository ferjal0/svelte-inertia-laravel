<script lang="ts">
    import * as Tooltip from '$lib/components/ui/tooltip/index.js';
    import { cn, type WithElementRef } from '$lib/utils.js';
    import type { HTMLAttributes } from 'svelte/elements';
    import {
        SIDEBAR_COOKIE_MAX_AGE,
        SIDEBAR_COOKIE_NAME,
        SIDEBAR_WIDTH,
        SIDEBAR_WIDTH_ICON,
    } from './constants.js';
    import { setSidebar } from './context.svelte.js';

    /**
     * Reads the sidebar state from the cookie.
     * @returns The sidebar state from the cookie, or true if the cookie is not set.
     */
    function getCookieValue(): boolean {
        if (typeof document === 'undefined') return true;

        const name = SIDEBAR_COOKIE_NAME + '=';
        const decodedCookie = decodeURIComponent(document.cookie);
        const cookieArray = decodedCookie.split(';');

        for (let i = 0; i < cookieArray.length; i++) {
            let cookie = cookieArray[i];
            while (cookie.charAt(0) === ' ') {
                cookie = cookie.substring(1);
            }
            if (cookie.indexOf(name) === 0) {
                const value = cookie.substring(name.length, cookie.length);
                return value === 'true';
            }
        }
        return true; // Default to open if cookie is not set
    }

    let {
        ref = $bindable(null),
        open = $bindable(getCookieValue()),
        onOpenChange = () => {},
        class: className,
        style,
        children,
        ...restProps
    }: WithElementRef<HTMLAttributes<HTMLDivElement>> & {
        open?: boolean;
        onOpenChange?: (open: boolean) => void;
    } = $props();

    const sidebar = setSidebar({
        open: () => open,
        setOpen: (value: boolean) => {
            open = value;
            onOpenChange(value);

            // This sets the cookie to keep the sidebar state.
            document.cookie = `${SIDEBAR_COOKIE_NAME}=${open}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;
        },
    });
</script>

<svelte:window onkeydown={sidebar.handleShortcutKeydown} />

<Tooltip.Provider delayDuration={0}>
    <div
        data-slot="sidebar-wrapper"
        style="--sidebar-width: {SIDEBAR_WIDTH}; --sidebar-width-icon: {SIDEBAR_WIDTH_ICON}; {style}"
        class={cn(
            'group/sidebar-wrapper has-data-[variant=inset]:bg-sidebar flex min-h-svh w-full',
            className,
        )}
        bind:this={ref}
        {...restProps}
    >
        {@render children?.()}
    </div>
</Tooltip.Provider>
