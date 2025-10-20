<script lang="ts">
    import * as Sidebar from '$lib/components/ui/sidebar';
    import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
    import { ChevronsUpDown, type Icon, Plus } from '@lucide/svelte';

    interface Project {
        logo: typeof Icon;
        subtitle: string;
        title: string;
    }

    let { projects } = $props<{ projects: Project[] }>();
    let activeProject = $state(projects[0]);
    let { isMobile } = Sidebar.useSidebar();
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
                        <div
                            class="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground"
                        >
                            <activeProject.logo class="size-4" />
                        </div>
                        <div
                            class="grid flex-1 text-left text-sm leading-tight"
                        >
                            <span class="truncate font-semibold"
                                >{activeProject.title}</span
                            >
                            <span class="truncate text-xs"
                                >{activeProject.subtitle}</span
                            >
                        </div>
                        <ChevronsUpDown class="ml-auto" />
                    </Sidebar.MenuButton>
                {/snippet}
            </DropdownMenu.Trigger>
            <DropdownMenu.Content
                class="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                align="start"
                side={isMobile ? 'bottom' : 'right'}
                sideOffset={4}
            >
                <DropdownMenu.Label class="text-xs text-muted-foreground">
                    Projects
                </DropdownMenu.Label>
                {#each projects as project, index}
                    <DropdownMenu.Item
                        onclick={() => (activeProject = project)}
                        class="gap-2 p-2"
                    >
                        <div
                            class="flex size-6 items-center justify-center rounded-sm border"
                        >
                            <project.logo class="size-4 shrink-0" />
                        </div>
                        {project.title}
                        <DropdownMenu.Shortcut>
                            ⌘{index + 1}
                        </DropdownMenu.Shortcut>
                    </DropdownMenu.Item>
                {/each}
                <DropdownMenu.Separator />
                <DropdownMenu.Item class="gap-2 p-2">
                    <div
                        class="flex size-6 items-center justify-center rounded-md border bg-background"
                    >
                        <Plus class="size-4" />
                    </div>
                    <div class="font-medium text-muted-foreground">
                        Add project
                    </div>
                </DropdownMenu.Item>
            </DropdownMenu.Content>
        </DropdownMenu.Root>
    </Sidebar.MenuItem>
</Sidebar.Menu>
