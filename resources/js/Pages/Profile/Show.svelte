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
    <div class="flex flex-col sm:px-6 lg:px-8 gap-8">
        {#if isUpdateProfileEnabled}
            <UpdateProfileInformationForm />
        {/if}

        {#if isUpdatePasswordEnabled}
            <UpdatePasswordForm />
        {/if}

        <DeleteUserForm />
    </div>
</AuthenticatedLayout>
