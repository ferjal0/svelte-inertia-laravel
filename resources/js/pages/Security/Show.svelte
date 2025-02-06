<script lang="ts">
    import AuthenticatedLayout from '$lib/layouts/AuthenticatedLayout.svelte';
    import OpenSessionsForm from './Partials/OpenSessionsForm.svelte';
    import TwoFactorAuthenticationForm from './Partials/TwoFactorAuthenticationForm.svelte';
    import type { Session } from '$lib/types';

    type Props = {
        sessions: Session[];
        isTwoFactorAuthenticationFeatureEnabled: boolean;
    };

    const { sessions, isTwoFactorAuthenticationFeatureEnabled }: Props =
        $props();
</script>

<svelte:head>
    <title>Security</title>
</svelte:head>

<AuthenticatedLayout>
    <div class="flex max-w-7xl flex-col sm:px-6 lg:px-8">
        {#if isTwoFactorAuthenticationFeatureEnabled}
            <div class="p-4 sm:p-8">
                <TwoFactorAuthenticationForm />
            </div>
        {/if}

        <div class="p-4 sm:p-8">
            <OpenSessionsForm {sessions} />
        </div>
    </div>
</AuthenticatedLayout>
