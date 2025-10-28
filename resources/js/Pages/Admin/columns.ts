import {
    renderComponent,
    renderSnippet,
} from '$lib/components/ui/data-table/index.js';
import type { ColumnDef } from '@tanstack/table-core';
import { createRawSnippet } from 'svelte';
import DataTableActions from './data-table/data-table-actions.svelte';
import DataTableCheckbox from './data-table/data-table-checkbox.svelte';
import DataTableRoleBadges from './data-table/data-table-role-badges.svelte';
import DataTableSortableHeader from './data-table/data-table-sortable-header.svelte';
import DataTableStatusBadge from './data-table/data-table-status-badge.svelte';

export type Role = {
    id: number;
    name: string;
    slug: string;
};

export type User = {
    id: number;
    name: string;
    email: string;
    email_verified_at: string | null;
    roles: Role[];
    created_at: string;
};

export const columns: ColumnDef<User>[] = [
    {
        id: 'select',
        header: ({ table }) =>
            renderComponent(DataTableCheckbox, {
                checked: table.getIsAllPageRowsSelected(),
                indeterminate:
                    table.getIsSomePageRowsSelected() &&
                    !table.getIsAllPageRowsSelected(),
                onCheckedChange: (value) =>
                    table.toggleAllPageRowsSelected(!!value),
                'aria-label': 'Select all',
            }),
        cell: ({ row }) =>
            renderComponent(DataTableCheckbox, {
                checked: row.getIsSelected(),
                onCheckedChange: (value) => row.toggleSelected(!!value),
                'aria-label': 'Select row',
            }),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: 'name',
        header: ({ column }) =>
            renderComponent(DataTableSortableHeader, {
                onclick: column.getToggleSortingHandler(),
                label: 'Name',
            }),
        cell: ({ row }) => {
            const nameSnippet = createRawSnippet<[{ name: string }]>(
                (getName) => {
                    const { name } = getName();
                    return {
                        render: () => `<div class="font-medium">${name}</div>`,
                    };
                },
            );
            return renderSnippet(nameSnippet, {
                name: row.original.name,
            });
        },
    },
    {
        accessorKey: 'email',
        header: ({ column }) =>
            renderComponent(DataTableSortableHeader, {
                onclick: column.getToggleSortingHandler(),
                label: 'Email',
            }),
        cell: ({ row }) => {
            const emailSnippet = createRawSnippet<[{ email: string }]>(
                (getEmail) => {
                    const { email } = getEmail();
                    return {
                        render: () => `<div class="lowercase">${email}</div>`,
                    };
                },
            );
            return renderSnippet(emailSnippet, {
                email: row.original.email,
            });
        },
    },
    {
        id: 'roles',
        accessorFn: (row) => {
            return row.roles.map((role) => role.slug);
        },
        header: 'Role',
        cell: ({ row }) =>
            renderComponent(DataTableRoleBadges, {
                roles: row.original.roles,
            }),
        enableSorting: false,
        filterFn: (row, id, value) => {
            const roleSlugs = row.getValue(id) as string[];
            return value.some((filterValue: string) =>
                roleSlugs.includes(filterValue),
            );
        },
    },
    {
        id: 'email_verified_at',
        accessorFn: (row) => {
            return row.email_verified_at !== null ? 'verified' : 'unverified';
        },
        header: 'Status',
        cell: ({ row }) =>
            renderComponent(DataTableStatusBadge, {
                verified: row.original.email_verified_at !== null,
            }),
        enableSorting: false,
        enableHiding: false,
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id));
        },
    },
    {
        accessorKey: 'created_at',
        header: ({ column }) =>
            renderComponent(DataTableSortableHeader, {
                onclick: column.getToggleSortingHandler(),
                label: 'Created At',
            }),
        enableHiding: false,
        cell: ({ row }) => {
            const dateSnippet = createRawSnippet<[{ date: string }]>(
                (getDate) => {
                    const { date } = getDate();
                    return {
                        render: () =>
                            `<div class="text-sm text-muted-foreground">${date}</div>`,
                    };
                },
            );
            return renderSnippet(dateSnippet, {
                date: row.original.created_at,
            });
        },
    },
    {
        id: 'actions',
        enableHiding: false,
        cell: ({ row }) =>
            renderComponent(DataTableActions, {
                user: row.original,
            }),
    },
];
