<script lang="ts">
    import { router } from '@inertiajs/svelte';
    import { EllipsisIcon, Trash2Icon } from '@lucide/svelte';
    import { Button } from '$lib/components/ui/button/index.js';
    import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
    import * as AlertDialog from '$lib/components/ui/alert-dialog/index.js';
    import { toast } from 'svelte-sonner';
    import type { User } from '../columns.js';

    let { user }: { user: User } = $props();

    function deleteUser() {
        router.delete(`/admin/users/${user.id}`, {
            preserveState: true,
            preserveScroll: true,
            onSuccess: () => {
                toast.success('User deleted successfully');
            },
            onError: () => {
                toast.error('Failed to delete user');
            },
        });
    }

    let showDeleteDialog = $state(false);
</script>

<div class="flex items-center justify-end gap-2">
    <DropdownMenu.Root>
        <DropdownMenu.Trigger>
            {#snippet child({ props })}
                <Button
                    {...props}
                    variant="ghost"
                    size="icon"
                    class="relative size-8 p-0"
                >
                    <span class="sr-only">Open menu</span>
                    <EllipsisIcon class="size-4" />
                </Button>
            {/snippet}
        </DropdownMenu.Trigger>
        <DropdownMenu.Content align="end">
            <DropdownMenu.Group>
                <DropdownMenu.Label>Actions</DropdownMenu.Label>
                <DropdownMenu.Item
                    onclick={() =>
                        navigator.clipboard.writeText(user.id.toString())}
                >
                    Copy user ID
                </DropdownMenu.Item>
                <DropdownMenu.Item
                    onclick={() => navigator.clipboard.writeText(user.email)}
                >
                    Copy email
                </DropdownMenu.Item>
            </DropdownMenu.Group>
            <DropdownMenu.Separator />
            <DropdownMenu.Item>View details</DropdownMenu.Item>
            <DropdownMenu.Item
                onclick={() => (showDeleteDialog = true)}
                variant="destructive"
            >
                <Trash2Icon class="size-4" />
                Delete user
            </DropdownMenu.Item>
        </DropdownMenu.Content>
    </DropdownMenu.Root>

    <AlertDialog.Root bind:open={showDeleteDialog}>
        <AlertDialog.Content>
            <AlertDialog.Header>
                <AlertDialog.Title>Delete User</AlertDialog.Title>
                <AlertDialog.Description>
                    Are you sure you want to delete {user.name}? This action
                    cannot be undone.
                </AlertDialog.Description>
            </AlertDialog.Header>
            <AlertDialog.Footer>
                <AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
                <AlertDialog.Action onclick={deleteUser}>
                    Delete
                </AlertDialog.Action>
            </AlertDialog.Footer>
        </AlertDialog.Content>
    </AlertDialog.Root>
</div>
