<script lang="ts" generics="TData, TValue">
    import {
        type ColumnDef,
        type ColumnFiltersState,
        type PaginationState,
        type RowSelectionState,
        type SortingState,
        type VisibilityState,
        getCoreRowModel,
        getFacetedUniqueValues,
        getFilteredRowModel,
        getPaginationRowModel,
        getSortedRowModel,
    } from '@tanstack/table-core';
    import { ChevronDownIcon, XIcon } from '@lucide/svelte';
    import {
        createSvelteTable,
        FlexRender,
    } from '$lib/components/ui/data-table/index.js';
    import * as Table from '$lib/components/ui/table/index.js';
    import { Button } from '$lib/components/ui/button/index.js';
    import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
    import { Input } from '$lib/components/ui/input/index.js';
    import DataTableFacetedFilter from './data-table/data-table-faceted-filter.svelte';
    import {
        ShieldIcon,
        UserIcon,
        CheckCircleIcon,
        AlertCircleIcon,
    } from '@lucide/svelte';

    type DataTableProps<TData, TValue> = {
        columns: ColumnDef<TData, TValue>[];
        data: TData[];
        filterColumn?: string;
        filterPlaceholder?: string;
    };

    let {
        data,
        columns,
        filterColumn = 'email',
        filterPlaceholder = 'Filter by email...',
    }: DataTableProps<TData, TValue> = $props();

    const roleOptions = [
        { label: 'Admin', value: 'admin', icon: ShieldIcon },
        { label: 'User', value: 'user', icon: UserIcon },
    ];

    const statusOptions = [
        { label: 'Verified', value: 'verified', icon: CheckCircleIcon },
        { label: 'Unverified', value: 'unverified', icon: AlertCircleIcon },
    ];

    const isFiltered = $derived(columnFilters.length > 0);

    let pagination = $state<PaginationState>({ pageIndex: 0, pageSize: 10 });
    let sorting = $state<SortingState>([]);
    let columnFilters = $state<ColumnFiltersState>([]);
    let rowSelection = $state<RowSelectionState>({});
    let columnVisibility = $state<VisibilityState>({});

    const table = createSvelteTable({
        get data() {
            return data;
        },
        columns,
        state: {
            get pagination() {
                return pagination;
            },
            get sorting() {
                return sorting;
            },
            get columnVisibility() {
                return columnVisibility;
            },
            get rowSelection() {
                return rowSelection;
            },
            get columnFilters() {
                return columnFilters;
            },
        },
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getFacetedUniqueValues: getFacetedUniqueValues(),
        onPaginationChange: (updater) => {
            if (typeof updater === 'function') {
                pagination = updater(pagination);
            } else {
                pagination = updater;
            }
        },
        onSortingChange: (updater) => {
            if (typeof updater === 'function') {
                sorting = updater(sorting);
            } else {
                sorting = updater;
            }
        },
        onColumnFiltersChange: (updater) => {
            if (typeof updater === 'function') {
                columnFilters = updater(columnFilters);
            } else {
                columnFilters = updater;
            }
        },
        onColumnVisibilityChange: (updater) => {
            if (typeof updater === 'function') {
                columnVisibility = updater(columnVisibility);
            } else {
                columnVisibility = updater;
            }
        },
        onRowSelectionChange: (updater) => {
            if (typeof updater === 'function') {
                rowSelection = updater(rowSelection);
            } else {
                rowSelection = updater;
            }
        },
    });
</script>

<div class="flex w-full flex-col gap-4">
    <div class="flex items-center gap-2">
        <Input
            placeholder={filterPlaceholder}
            value={(table
                .getColumn(filterColumn)
                ?.getFilterValue() as string) ?? ''}
            oninput={(e) =>
                table
                    .getColumn(filterColumn)
                    ?.setFilterValue(e.currentTarget.value)}
            onchange={(e) => {
                table
                    .getColumn(filterColumn)
                    ?.setFilterValue(e.currentTarget.value);
            }}
            class="h-8 w-[150px] lg:w-[250px]"
        />
        {#if table.getColumn('roles')}
            <DataTableFacetedFilter
                column={table.getColumn('roles')}
                title="Role"
                options={roleOptions}
            />
        {/if}
        {#if table.getColumn('email_verified_at')}
            <DataTableFacetedFilter
                column={table.getColumn('email_verified_at')}
                title="Status"
                options={statusOptions}
            />
        {/if}
        {#if isFiltered}
            <Button
                variant="ghost"
                onclick={() => table.resetColumnFilters()}
                class="h-8 px-2 lg:px-3"
            >
                Reset
                <XIcon class="ml-2 size-4" />
            </Button>
        {/if}
        <DropdownMenu.Root>
            <DropdownMenu.Trigger>
                {#snippet child({ props })}
                    <Button
                        {...props}
                        variant="outline"
                        size="sm"
                        class="ml-auto h-8"
                    >
                        Columns <ChevronDownIcon class="ml-2 size-4" />
                    </Button>
                {/snippet}
            </DropdownMenu.Trigger>
            <DropdownMenu.Content align="end">
                {#each table
                    .getAllColumns()
                    .filter((col) => col.getCanHide()) as column (column.id)}
                    <DropdownMenu.CheckboxItem
                        class="capitalize"
                        bind:checked={
                            () => column.getIsVisible(),
                            (v) => column.toggleVisibility(!!v)
                        }
                    >
                        {column.id}
                    </DropdownMenu.CheckboxItem>
                {/each}
            </DropdownMenu.Content>
        </DropdownMenu.Root>
    </div>

    <div class="rounded-md border">
        <Table.Root>
            <Table.Header>
                {#each table.getHeaderGroups() as headerGroup (headerGroup.id)}
                    <Table.Row>
                        {#each headerGroup.headers as header (header.id)}
                            <Table.Head class="[&:has([role=checkbox])]:pl-3">
                                {#if !header.isPlaceholder}
                                    <FlexRender
                                        content={header.column.columnDef.header}
                                        context={header.getContext()}
                                    />
                                {/if}
                            </Table.Head>
                        {/each}
                    </Table.Row>
                {/each}
            </Table.Header>
            <Table.Body>
                {#each table.getRowModel().rows as row (row.id)}
                    <Table.Row data-state={row.getIsSelected() && 'selected'}>
                        {#each row.getVisibleCells() as cell (cell.id)}
                            <Table.Cell class="[&:has([role=checkbox])]:pl-3">
                                <FlexRender
                                    content={cell.column.columnDef.cell}
                                    context={cell.getContext()}
                                />
                            </Table.Cell>
                        {/each}
                    </Table.Row>
                {:else}
                    <Table.Row>
                        <Table.Cell
                            colspan={columns.length}
                            class="h-24 text-center"
                        >
                            No results.
                        </Table.Cell>
                    </Table.Row>
                {/each}
            </Table.Body>
        </Table.Root>
    </div>

    <div class="flex items-center justify-between gap-4">
        <div class="flex-1 text-sm text-gray-600 dark:text-gray-400">
            {table.getFilteredSelectedRowModel().rows.length} of
            {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div class="flex items-center gap-2">
            <div class="text-sm text-gray-600 dark:text-gray-400">
                Page {table.getState().pagination.pageIndex + 1} of
                {table.getPageCount()}
            </div>
            <Button
                variant="outline"
                size="sm"
                onclick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
            >
                Previous
            </Button>
            <Button
                variant="outline"
                size="sm"
                onclick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
            >
                Next
            </Button>
        </div>
    </div>
</div>
