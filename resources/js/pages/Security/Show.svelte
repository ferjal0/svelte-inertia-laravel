<script lang="ts">
    import AuthenticatedLayout from '$lib/layouts/AuthenticatedLayout.svelte';
    import TwoFactorAuthenticationForm from './Partials/TwoFactorAuthenticationForm.svelte';

    type Props = {
        isTwoFactorAuthenticationFeatureEnabled: boolean;
    };

    const { isTwoFactorAuthenticationFeatureEnabled }: Props = $props();
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
    </div>
</AuthenticatedLayout>
