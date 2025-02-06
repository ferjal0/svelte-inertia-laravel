<script lang="ts">
    import { ChevronRight } from 'lucide-svelte';
    import * as Collapsible from '$lib/components/ui/collapsible';
    import * as Sidebar from '$lib/components/ui/sidebar';
    import { Link } from '@inertiajs/svelte';

    interface NavMainProps {
        items: {
            title: string;
            url: string;
            icon: any;
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
        {#each items as mainItem (mainItem.title)}
            <Collapsible.Root
                open={mainItem.isActive}
                class="group/collapsible"
            >
                {#snippet child({ props })}
                    <Sidebar.MenuItem {...props}>
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
                                    {#if mainItem.items}
                                        <ChevronRight
                                            class="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90"
                                        />
                                    {/if}
                                </Sidebar.MenuButton>
                            {/snippet}
                        </Collapsible.Trigger>
                        <Collapsible.Content>
                            {#if mainItem.items}
                                <Sidebar.MenuSub>
                                    {#each mainItem.items as subItem (subItem.title)}
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
                            {/if}
                        </Collapsible.Content>
                    </Sidebar.MenuItem>
                {/snippet}
            </Collapsible.Root>
        {/each}
    </Sidebar.Menu>
</Sidebar.Group>
