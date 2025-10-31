<script lang="ts">
    import { LayoutDashboard, Shell, Shield } from '@lucide/svelte';
    import type { Icon } from '@lucide/svelte';
    import NavMain from '$lib/components/ui/custom/nav-main.svelte';
    import NavUser from '$lib/components/ui/custom/nav-user.svelte';
    import * as Sidebar from '$lib/components/ui/sidebar';
    import ProjectSwitcher from './project-switcher.svelte';
    import { page } from '@inertiajs/svelte';

    type Project = {
        logo: typeof Icon;
        title: string;
        subtitle: string;
    };

    const projects: Project[] = [
        {
            logo: Shell,
            title: 'Starter',
            subtitle: 'Svelte - Inertia - Laravel',
        },
    ];

    type MainNavigationItem = {
        title: string;
        url: string;
        icon: typeof Icon;
        items?: {
            title: string;
            url: string;
        }[];
    };

    const isAdmin = $derived($page.props.auth?.user?.is_admin || false);

    const navMain = $derived<MainNavigationItem[]>([
        {
            title: 'Dashboard',
            url: '/dashboard',
            icon: LayoutDashboard,
        },
        ...(isAdmin
            ? [
                  {
                      title: 'Admin',
                      url: '/admin/users',
                      icon: Shield,
                  },
              ]
            : []),
    ]);
</script>

<Sidebar.Root variant="inset" collapsible="icon">
    <Sidebar.Header>
        <ProjectSwitcher {projects} />
    </Sidebar.Header>
    <Sidebar.Content>
        <NavMain items={navMain} />
    </Sidebar.Content>
    <Sidebar.Footer>
        <NavUser />
    </Sidebar.Footer>
</Sidebar.Root>
