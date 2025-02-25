<script lang="ts">
    import AuthenticatedLayout from '$lib/layouts/AuthenticatedLayout.svelte';
    import DeleteUserForm from './Partials/DeleteUserForm.svelte';
    import UpdatePasswordForm from './Partials/UpdatePasswordForm.svelte';
    import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm.svelte';

    type Props = {
        isUpdatePasswordEnabled: boolean;
        isUpdateProfileEnabled: boolean;
    };

    const { isUpdatePasswordEnabled, isUpdateProfileEnabled }: Props = $props();
</script>

<svelte:head>
    <title>Profile</title>
</svelte:head>

<AuthenticatedLayout>
    <div class="flex max-w-7xl flex-col sm:px-6 lg:px-8">
        {#if isUpdateProfileEnabled}
            <div class="p-4 sm:p-8">
                <UpdateProfileInformationForm />
            </div>
        {/if}

        {#if isUpdatePasswordEnabled}
            <div class="p-4 sm:p-8">
                <UpdatePasswordForm />
            </div>
        {/if}

        <div class="p-4 sm:p-8">
            <DeleteUserForm />
        </div>
    </div>
</AuthenticatedLayout>
