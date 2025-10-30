<script lang="ts">
    import AuthenticatedLayout from '$lib/layouts/AuthenticatedLayout.svelte';
    import DataTable from './data-table.svelte';
    import { columns, type User } from './columns';

    let { users = [] } = $props<{
        users: User[];
    }>();

    // Set page title
    $effect(() => {
        if (typeof document !== 'undefined') {
            document.title = 'User Management';
        }
    });
</script>

<AuthenticatedLayout>
    <div class="flex flex-col sm:px-6 lg:px-8">
        <div class="pt-3">
            <section class="flex flex-col gap-6">
                <header class="flex flex-col gap-2">
                    <h2
                        class="text-lg font-medium text-gray-900 dark:text-gray-100"
                    >
                        User Management
                    </h2>

                    <p class="text-sm text-gray-600 dark:text-gray-400">
                        Manage user accounts and their roles.
                    </p>
                </header>

                <DataTable
                    data={users}
                    {columns}
                    filterColumn="email"
                    filterPlaceholder="Filter by email..."
                />
            </section>
        </div>
    </div>
</AuthenticatedLayout>
