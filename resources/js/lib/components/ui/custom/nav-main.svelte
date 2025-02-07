<script lang="ts">
    import { ChevronRight, type Icon } from 'lucide-svelte';
    import * as Collapsible from '$lib/components/ui/collapsible';
    import * as Sidebar from '$lib/components/ui/sidebar';
    import { Link } from '@inertiajs/svelte';

    interface NavMainProps {
        items: {
            title: string;
            url: string;
            icon: typeof Icon;
            isActive?: boolean;
            items?: {
                title: string;
                url: string;
            }[];
        }[];
    }

    const { items }: NavMainProps = $props();
</script>

<Sidebar.Group>
    <Sidebar.GroupLabel>Platform</Sidebar.GroupLabel>
    <Sidebar.Menu>
        {#each items as mainItem}
            <Collapsible.Root open={false} class="group/collapsible">
                {#snippet child({ props })}
                    <Sidebar.MenuItem {...props}>
                        {#if mainItem.items}
                            <Collapsible.Trigger>
                                {#snippet child({ props })}
                                    <Sidebar.MenuButton {...props}>
                                        {#snippet tooltipContent()}
                                            {mainItem.title}
                                        {/snippet}
                                        {#if mainItem.icon}
                                            <mainItem.icon />
                                        {/if}
                                        <span>{mainItem.title}</span>
                                        <ChevronRight
                                            class="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90"
                                        />
                                    </Sidebar.MenuButton>
                                {/snippet}
                            </Collapsible.Trigger>
                            <Collapsible.Content>
                                <Sidebar.MenuSub>
                                    {#each mainItem.items as subItem}
                                        <Sidebar.MenuSubItem>
                                            <Sidebar.MenuSubButton>
                                                {#snippet child({ props })}
                                                    <Link
                                                        href={subItem.url}
                                                        {...props}
                                                    >
                                                        <span
                                                            >{subItem.title}</span
                                                        >
                                                    </Link>
                                                {/snippet}
                                            </Sidebar.MenuSubButton>
                                        </Sidebar.MenuSubItem>
                                    {/each}
                                </Sidebar.MenuSub>
                            </Collapsible.Content>
                        {:else}
                            <Sidebar.MenuButton {...props}>
                                {#snippet child({ props })}
                                    <Link href={mainItem.url} {...props}>
                                        {#snippet tooltipContent()}
                                            {mainItem.title}
                                        {/snippet}
                                        {#if mainItem.icon}
                                            <mainItem.icon />
                                        {/if}
                                        <span>{mainItem.title}</span>
                                    </Link>
                                {/snippet}
                            </Sidebar.MenuButton>
                        {/if}
                    </Sidebar.MenuItem>
                {/snippet}
            </Collapsible.Root>
        {/each}
    </Sidebar.Menu>
</Sidebar.Group>
