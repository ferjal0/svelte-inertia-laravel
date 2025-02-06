<script lang="ts">
    import { Ellipsis, Folder, Share, Trash2 } from 'lucide-svelte';
    import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
    import * as Sidebar from '$lib/components/ui/sidebar';
    import { useSidebar } from '$lib/components/ui/sidebar';

    interface NavProjectMembersProps {
        members: {
            name: string;
            url: string;
            isConnected: boolean;
        }[];
    }

    export let members: NavProjectMembersProps['members'];
    const { isMobile } = useSidebar();
</script>

<Sidebar.Group class="group-data-[collapsible=icon]:hidden">
    <Sidebar.GroupLabel>Project Members</Sidebar.GroupLabel>
    <Sidebar.Menu>
        {#each members as member (member.name)}
            <Sidebar.MenuItem>
                <Sidebar.MenuButton>
                    {#snippet child({ props })}
                        <a href={member.url} {...props}>
                            {#if member.isConnected}
                                <div
                                    class="h-2 w-2 rounded-full bg-green-500"
                                ></div>
                            {:else}
                                <div
                                    class="h-2 w-2 rounded-full bg-gray-500"
                                ></div>
                            {/if}
                            <span>{member.name}</span>
                        </a>
                    {/snippet}
                </Sidebar.MenuButton>
                <DropdownMenu.Root>
                    <DropdownMenu.Trigger>
                        {#snippet child({ props })}
                            <Sidebar.MenuAction showOnHover {...props}>
                                <Ellipsis />
                                <span class="sr-only">More</span>
                            </Sidebar.MenuAction>
                        {/snippet}
                    </DropdownMenu.Trigger>
                    <DropdownMenu.Content
                        class="w-48"
                        side={isMobile ? 'bottom' : 'right'}
                        align={isMobile ? 'end' : 'start'}
                    >
                        <DropdownMenu.Item>
                            <Folder class="text-muted-foreground" />
                            <span>View Member</span>
                        </DropdownMenu.Item>
                        <DropdownMenu.Item>
                            <Share class="text-muted-foreground" />
                            <span>Share Member</span>
                        </DropdownMenu.Item>
                        <DropdownMenu.Separator />
                        <DropdownMenu.Item>
                            <Trash2 class="text-muted-foreground" />
                            <span>Delete Member</span>
                        </DropdownMenu.Item>
                    </DropdownMenu.Content>
                </DropdownMenu.Root>
            </Sidebar.MenuItem>
        {/each}
    </Sidebar.Menu>
</Sidebar.Group>
