<script lang="ts">
    import {
        BookOpen,
        Command,
        GalleryVerticalEnd,
        LayoutDashboard,
        LifeBuoy,
        Send,
    } from 'lucide-svelte';
    import NavMain from '$lib/components/ui/custom/nav-main.svelte';
    import NavProjectMembers from '$lib/components/ui/custom/nav-project-members.svelte';
    import NavSecondary from '$lib/components/ui/custom/nav-secondary.svelte';
    import NavUser from '$lib/components/ui/custom/nav-user.svelte';
    import * as Sidebar from '$lib/components/ui/sidebar';
    import { Link, page } from '@inertiajs/svelte';
    import type { PageProps } from '$lib/types';

    const data = {
        projects: [
            {
                logo: Command,
                title: 'Starter',
                subtitle: 'React - Inertia - Laravel',
            },
        ],
        navMain: [
            {
                title: 'Dashboard',
                url: '/dashboard',
                icon: LayoutDashboard,
                isActive: true,
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
        ],
        navSecondary: [
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
        ],
        projectMembers: [
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
        ],
    };

    const auth = $page.props.auth as PageProps['auth'];
    const user = auth.user;
</script>

<Sidebar.Root variant="inset" collapsible="icon" {...$$restProps}>
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
        <NavMain items={data.navMain} />
        <NavProjectMembers members={data.projectMembers} />
        <NavSecondary items={data.navSecondary} class="mt-auto" />
    </Sidebar.Content>
    <Sidebar.Footer>
        <NavUser {user} />
    </Sidebar.Footer>
</Sidebar.Root>
