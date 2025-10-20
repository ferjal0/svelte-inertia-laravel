<script lang="ts">
    import {
        Command,
        CommandDialog,
        CommandEmpty,
        CommandGroup,
        CommandInput,
        CommandItem,
        CommandList,
        CommandSeparator,
    } from '$lib/components/ui/command';
    import { router } from '@inertiajs/svelte';
    import {
        BadgeCheck,
        LayoutDashboard,
        Lock,
        Moon,
        Sun,
    } from '@lucide/svelte';
    import { onMount } from 'svelte';
    import { setMode } from 'mode-watcher';

    interface NavigationItem {
        title: string;
        href: string;
        icon: typeof Moon;
    }

    const navigationItems: NavigationItem[] = [
        {
            title: 'Dashboard',
            href: '/dashboard',
            icon: LayoutDashboard,
        },
        {
            title: 'Profile',
            href: '/account/profile',
            icon: BadgeCheck,
        },
        {
            title: 'Security',
            href: '/account/security',
            icon: Lock,
        },
    ];

    let isOpen = $state(false);

    onMount(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                isOpen = !isOpen;
            }
        };

        document.addEventListener('keydown', down);
        return () => document.removeEventListener('keydown', down);
    });

    function goToRoute(href: string) {
        isOpen = false;
        router.visit(href);
    }

    function setTheme(newMode: 'dark' | 'light') {
        isOpen = false;
        setMode(newMode);
    }
</script>

<CommandDialog bind:open={isOpen}>
    <Command>
        <CommandInput placeholder="Search commands..." />
        <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Go to...">
                {#each navigationItems as item}
                    <CommandItem onSelect={() => goToRoute(item.href)}>
                        <item.icon />
                        <span>{item.title}</span>
                    </CommandItem>
                {/each}
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Theme">
                <CommandItem onSelect={() => setTheme('dark')}>
                    <Moon />
                    <span>Dark Mode</span>
                </CommandItem>
                <CommandItem onSelect={() => setTheme('light')}>
                    <Sun />
                    <span>Light Mode</span>
                </CommandItem>
            </CommandGroup>
        </CommandList>
    </Command>
</CommandDialog>
