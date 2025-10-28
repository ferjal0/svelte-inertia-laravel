import {
    renderComponent,
    renderSnippet,
} from '$lib/components/ui/data-table/index.js';
import type { ColumnDef } from '@tanstack/table-core';
import { createRawSnippet } from 'svelte';
import DataTableActions from './data-table/data-table-actions.svelte';
import DataTableCheckbox from './data-table/data-table-checkbox.svelte';
import DataTableSortableHeader from './data-table/data-table-sortable-header.svelte';

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
        accessorKey: 'roles',
        header: 'Role',
        cell: ({ row }) => {
            const rolesSnippet = createRawSnippet<[{ roles: Role[] }]>(
                (getRoles) => {
                    const { roles } = getRoles();
                    if (roles.length === 0) {
                        return {
                            render: () =>
                                `<span class="text-sm text-muted-foreground">No role</span>`,
                        };
                    }
                    const badges = roles
                        .map(
                            (role) =>
                                `<span class="inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${role.slug === 'admin' ? 'bg-blue-50 text-blue-700 ring-blue-600/20' : 'bg-gray-50 text-gray-700 ring-gray-600/20'}">
                                ${role.name}
                            </span>`,
                        )
                        .join('');
                    return {
                        render: () =>
                            `<div class="flex items-center gap-2">${badges}</div>`,
                    };
                },
            );
            return renderSnippet(rolesSnippet, {
                roles: row.original.roles,
            });
        },
        enableSorting: false,
    },
    {
        accessorKey: 'email_verified_at',
        header: 'Status',
        cell: ({ row }) => {
            const statusSnippet = createRawSnippet<[{ verified: boolean }]>(
                (getVerified) => {
                    const { verified } = getVerified();
                    return {
                        render: () =>
                            verified
                                ? `<span class="inline-flex items-center rounded-md border px-2 py-1 text-xs font-medium bg-green-50">Verified</span>`
                                : `<span class="inline-flex items-center rounded-md border px-2 py-1 text-xs font-medium bg-yellow-50">Unverified</span>`,
                    };
                },
            );
            return renderSnippet(statusSnippet, {
                verified: row.original.email_verified_at !== null,
            });
        },
        enableSorting: false,
    },
    {
        accessorKey: 'created_at',
        header: ({ column }) =>
            renderComponent(DataTableSortableHeader, {
                onclick: column.getToggleSortingHandler(),
                label: 'Created At',
            }),
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
