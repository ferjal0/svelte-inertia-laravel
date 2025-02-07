<script lang="ts">
    import * as Sidebar from '$lib/components/ui/sidebar';
    import { Link } from '@inertiajs/svelte';
    import type { Icon } from 'lucide-svelte';

    interface NavSecondaryProps {
        items: {
            title: string;
            url: string;
            icon: typeof Icon;
        }[];
        class?: string;
    }

    const { items, class: className }: NavSecondaryProps = $props();
</script>

<Sidebar.Group class={className}>
    <Sidebar.GroupContent>
        <Sidebar.Menu>
            {#each items as item (item.title)}
                <Sidebar.MenuItem>
                    <Sidebar.MenuButton size="sm">
                        {#snippet child({ props })}
                            <Link href={item.url} {...props}>
                                {#if item.icon}
                                    <item.icon />
                                {/if}
                                <span>{item.title}</span>
                            </Link>
                        {/snippet}
                    </Sidebar.MenuButton>
                </Sidebar.MenuItem>
            {/each}
        </Sidebar.Menu>
    </Sidebar.GroupContent>
</Sidebar.Group>
