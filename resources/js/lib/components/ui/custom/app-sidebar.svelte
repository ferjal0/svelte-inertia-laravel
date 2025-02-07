<script lang="ts">
    import {
        BookOpen,
        Command,
        GalleryVerticalEnd,
        LayoutDashboard,
        LifeBuoy,
        Send,
    } from 'lucide-svelte';
    import type { Icon } from 'lucide-svelte';
    import NavMain from '$lib/components/ui/custom/nav-main.svelte';
    import NavProjectMembers from '$lib/components/ui/custom/nav-project-members.svelte';
    import NavSecondary from '$lib/components/ui/custom/nav-secondary.svelte';
    import NavUser from '$lib/components/ui/custom/nav-user.svelte';
    import * as Sidebar from '$lib/components/ui/sidebar';
    import { Link } from '@inertiajs/svelte';

    type MainNavigationItem = {
        title: string;
        url: string;
        icon: typeof Icon;
        items?: {
            title: string;
            url: string;
        }[];
    };

    const navMain: MainNavigationItem[] = [
        {
            title: 'Dashboard',
            url: '/dashboard',
            icon: LayoutDashboard,
        },
        {
            title: 'Projects',
            url: '/dashboard',
            icon: GalleryVerticalEnd,
            items: [
                {
                    title: 'Board',
                    url: '/dashboard',
                },
                {
                    title: 'Tasks',
                    url: '/dashboard',
                },
                {
                    title: 'Reports',
                    url: '/dashboard',
                },
            ],
        },
        {
            title: 'Documentation',
            url: '/dashboard',
            icon: BookOpen,
            items: [
                {
                    title: 'Getting Started',
                    url: '/dashboard',
                },
                {
                    title: 'Backend Setup',
                    url: '/dashboard',
                },
                {
                    title: 'Frontend Setup',
                    url: '/dashboard',
                },
                {
                    title: 'Changelog',
                    url: '/dashboard',
                },
            ],
        },
    ];

    type SecondaryNavigationItem = {
        title: string;
        url: string;
        icon: typeof Icon;
    };

    const navSecondary: SecondaryNavigationItem[] = [
        {
            title: 'Support',
            url: '/dashboard',
            icon: LifeBuoy,
        },
        {
            title: 'Feedback',
            url: '/dashboard',
            icon: Send,
        },
    ];

    type ProjectMember = {
        name: string;
        url: string;
        isConnected: boolean;
    };

    const projectMembers: ProjectMember[] = [
        {
            name: 'Tylor Otwell',
            url: '#',
            isConnected: true,
        },
        {
            name: 'Jonathan Reinink',
            url: '#',
            isConnected: false,
        },
        {
            name: 'Adam Wathan',
            url: '#',
            isConnected: false,
        },
    ];
</script>

<Sidebar.Root variant="inset" collapsible="icon">
    <Sidebar.Header>
        <Sidebar.Menu>
            <Sidebar.MenuItem>
                <Sidebar.MenuButton size="lg">
                    {#snippet child({ props })}
                        <Link href="/dashboard" {...props}>
                            <div
                                class="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg"
                            >
                                <Command class="size-4" />
                            </div>
                            <div
                                class="grid flex-1 text-left text-sm leading-tight"
                            >
                                <span class="truncate font-semibold"
                                    >Starter</span
                                >
                                <span class="truncate text-xs"
                                    >Svelte - Inertia - Laravel</span
                                >
                            </div>
                        </Link>
                    {/snippet}
                </Sidebar.MenuButton>
            </Sidebar.MenuItem>
        </Sidebar.Menu>
    </Sidebar.Header>
    <Sidebar.Content>
        <NavMain items={navMain} />
        <NavProjectMembers members={projectMembers} />
        <NavSecondary items={navSecondary} class="mt-auto" />
    </Sidebar.Content>
    <Sidebar.Footer>
        <NavUser />
    </Sidebar.Footer>
</Sidebar.Root>
