import { IsMobile } from '$lib/hooks/is-mobile.svelte.js';
import { getContext, setContext } from 'svelte';
import {
    SIDEBAR_COOKIE_MAX_AGE,
    SIDEBAR_COOKIE_NAME,
    SIDEBAR_KEYBOARD_SHORTCUT,
} from './constants.js';

type Getter<T> = () => T;

function setCookie(name: string, value: string, maxAge: number) {
    if (typeof document === 'undefined') return;
    document.cookie = `${name}=${value};path=/;max-age=${maxAge}`;
}

function getCookie(name: string): string | null {
    if (typeof document === 'undefined') return null;
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift() ?? null;
    return null;
}

export type SidebarStateProps = {
    /**
     * A getter function that returns the current open state of the sidebar.
     * We use a getter function here to support `bind:open` on the `Sidebar.Provider`
     * component.
     */
    open: Getter<boolean>;

    /**
     * A function that sets the open state of the sidebar. To support `bind:open`, we need
     * a source of truth for changing the open state to ensure it will be synced throughout
     * the sub-components and any `bind:` references.
     */
    setOpen: (open: boolean) => void;
};

class SidebarState {
    readonly props: SidebarStateProps;
    open = $derived.by(() => this.props.open());
    openMobile = $state(false);
    setOpen: SidebarStateProps['setOpen'];
    #isMobile: IsMobile;
    state = $derived.by(() => (this.open ? 'expanded' : 'collapsed'));

    constructor(props: SidebarStateProps) {
        this.props = props;
        this.#isMobile = new IsMobile();

        // Wrap the setOpen function to persist state in cookie
        this.setOpen = (open: boolean) => {
            setCookie(
                SIDEBAR_COOKIE_NAME,
                open.toString(),
                SIDEBAR_COOKIE_MAX_AGE,
            );
            props.setOpen(open);
        };

        // Initialize from cookie if available
        const stored = getCookie(SIDEBAR_COOKIE_NAME);
        if (stored !== null) {
            props.setOpen(stored === 'true');
        }
    }

    // Convenience getter for checking if the sidebar is mobile
    // without this, we would need to use `sidebar.isMobile.current` everywhere
    get isMobile() {
        return this.#isMobile.current;
    }

    // Event handler to apply to the `<svelte:window>`
    handleShortcutKeydown = (e: KeyboardEvent) => {
        if (e.key === SIDEBAR_KEYBOARD_SHORTCUT && (e.metaKey || e.ctrlKey)) {
            e.preventDefault();
            this.toggle();
        }
    };

    setOpenMobile = (value: boolean) => {
        this.openMobile = value;
    };

    toggle = () => {
        return this.#isMobile.current
            ? (this.openMobile = !this.openMobile)
            : this.setOpen(!this.open);
    };
}

const SYMBOL_KEY = 'scn-sidebar';

/**
 * Instantiates a new `SidebarState` instance and sets it in the context.
 *
 * @param props The constructor props for the `SidebarState` class.
 * @returns  The `SidebarState` instance.
 */
export function setSidebar(props: SidebarStateProps): SidebarState {
    return setContext(Symbol.for(SYMBOL_KEY), new SidebarState(props));
}

/**
 * Retrieves the `SidebarState` instance from the context. This is a class instance,
 * so you cannot destructure it.
 * @returns The `SidebarState` instance.
 */
export function useSidebar(): SidebarState {
    return getContext(Symbol.for(SYMBOL_KEY));
}
