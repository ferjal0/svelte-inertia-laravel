<script lang="ts">
    import AuthenticatedLayout from '$lib/layouts/AuthenticatedLayout.svelte';
</script>

<svelte:head>
    <title>Dashboard</title>
</svelte:head>

<AuthenticatedLayout>
    <div class="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div class="grid auto-rows-min gap-4 md:grid-cols-3">
            <div class="aspect-video rounded-xl bg-sidebar"></div>
            <div class="aspect-video rounded-xl bg-sidebar"></div>
            <div class="aspect-video rounded-xl bg-sidebar"></div>
        </div>
        <div
            class="min-h-[100vh] flex-1 rounded-xl bg-sidebar md:min-h-min"
        ></div>
    </div>
</AuthenticatedLayout>
