<script lang="ts">
    import { Badge } from '$lib/components/ui/badge';
    import { ShieldIcon, UserIcon } from '@lucide/svelte';
    import type { Role } from '../columns';

    let { roles }: { roles: Role[] } = $props();

    function getRoleBadgeVariant(roleSlug: string) {
        switch (roleSlug) {
            case 'admin':
                return 'violet';
            case 'user':
                return 'zinc';
            default:
                return 'zinc';
        }
    }

    function getRoleIcon(roleSlug: string) {
        switch (roleSlug) {
            case 'admin':
                return ShieldIcon;
            case 'user':
                return UserIcon;
            default:
                return UserIcon;
        }
    }
</script>

{#if roles.length === 0}
    <span class="text-sm text-gray-600 dark:text-gray-400">No role</span>
{:else}
    <div class="flex items-center gap-2">
        {#each roles as role (role.id)}
            <Badge
                variant={getRoleBadgeVariant(role.slug)}
                icon={getRoleIcon(role.slug)}
            >
                {role.name}
            </Badge>
        {/each}
    </div>
{/if}
