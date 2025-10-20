<script lang="ts">
    import {
        BadgeCheck,
        Bell,
        ChevronsUpDown,
        CreditCard,
        Lock,
        LogOut,
        Moon,
        PaintRoller,
        Sparkles,
        Sun,
    } from 'lucide-svelte';
    import * as Avatar from '$lib/components/ui/avatar';
    import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
    import * as Sidebar from '$lib/components/ui/sidebar';
    import { useSidebar } from '$lib/components/ui/sidebar';
    import type { PageProps } from '$lib/types';
    import { Link, page } from '@inertiajs/svelte';
    import { setMode } from 'mode-watcher';

    let auth = $state($page.props.auth as PageProps['auth']);
    let user = $derived(auth.user);

    const { isMobile } = useSidebar();
</script>

<Sidebar.Menu>
    <Sidebar.MenuItem>
        <DropdownMenu.Root>
            <DropdownMenu.Trigger>
                {#snippet child({ props })}
                    <Sidebar.MenuButton
                        {...props}
                        size="lg"
                        class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                    >
                        <Avatar.Root class="h-8 w-8 rounded-lg">
                            <Avatar.Image
                                src={user.profile_photo_url}
                                alt={user.name}
                            />
                            <Avatar.Fallback class="rounded-lg"
                                >{user.name
                                    .substring(0, 2)
                                    .toUpperCase()}</Avatar.Fallback
                            >
                        </Avatar.Root>
                        <div
                            class="grid flex-1 text-left text-sm leading-tight"
                        >
                            <span class="truncate font-semibold"
                                >{user.name}</span
                            >
                            <span class="truncate text-xs">{user.email}</span>
                        </div>
                        <ChevronsUpDown class="ml-auto size-4" />
                    </Sidebar.MenuButton>
                {/snippet}
            </DropdownMenu.Trigger>
            <DropdownMenu.Content
                class="w-(--bits-dropdown-menu-anchor-width) min-w-56 rounded-lg"
                side={isMobile ? 'bottom' : 'right'}
                align="end"
                sideOffset={4}
            >
                <DropdownMenu.Label class="p-0 font-normal">
                    <div
                        class="flex items-center gap-2 px-1 py-1.5 text-left text-sm"
                    >
                        <Avatar.Root class="h-8 w-8 rounded-lg">
                            <Avatar.Image
                                src={user.profile_photo_url}
                                alt={user.name}
                            />
                            <Avatar.Fallback class="rounded-lg"
                                >{user.name
                                    .substring(0, 2)
                                    .toUpperCase()}</Avatar.Fallback
                            >
                        </Avatar.Root>
                        <div
                            class="grid flex-1 text-left text-sm leading-tight"
                        >
                            <span class="truncate font-semibold"
                                >{user.name}</span
                            >
                            <span class="truncate text-xs">{user.email}</span>
                        </div>
                    </div>
                </DropdownMenu.Label>
                <DropdownMenu.Separator />
                <DropdownMenu.Group>
                    <DropdownMenu.Item disabled>
                        <Sparkles />
                        Upgrade to Pro
                    </DropdownMenu.Item>
                </DropdownMenu.Group>
                <DropdownMenu.Separator />
                <DropdownMenu.Group>
                    <DropdownMenu.Item>
                        {#snippet child({ props })}
                            <Link {...props} href={route('profile.show')}>
                                <BadgeCheck />
                                Profile
                            </Link>
                        {/snippet}
                    </DropdownMenu.Item>
                    <DropdownMenu.Item>
                        {#snippet child({ props })}
                            <Link {...props} href={route('security.show')}>
                                <Lock />
                                Security
                            </Link>
                        {/snippet}
                    </DropdownMenu.Item>
                    <DropdownMenu.Item disabled>
                        <CreditCard />
                        Billing
                    </DropdownMenu.Item>
                    <DropdownMenu.Item disabled>
                        <Bell />
                        Notifications
                    </DropdownMenu.Item>
                    <DropdownMenu.Sub>
                        <DropdownMenu.SubTrigger>
                            <PaintRoller />
                            <span>Theme</span>
                        </DropdownMenu.SubTrigger>
                        <DropdownMenu.SubContent>
                            <DropdownMenu.Item onclick={() => setMode('light')}>
                                <Sun />
                                <span>Light</span>
                            </DropdownMenu.Item>
                            <DropdownMenu.Item onclick={() => setMode('dark')}>
                                <Moon />
                                <span>Dark</span>
                            </DropdownMenu.Item>
                        </DropdownMenu.SubContent>
                    </DropdownMenu.Sub>
                </DropdownMenu.Group>
                <DropdownMenu.Separator />
                <DropdownMenu.Item class="w-full">
                    {#snippet child({ props })}
                        <Link
                            {...props}
                            href={route('logout')}
                            method="post"
                            as="button"
                        >
                            <LogOut />
                            <span>Log out</span>
                        </Link>
                    {/snippet}
                </DropdownMenu.Item>
            </DropdownMenu.Content>
        </DropdownMenu.Root>
    </Sidebar.MenuItem>
</Sidebar.Menu>
