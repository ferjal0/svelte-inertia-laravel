<script lang="ts" generics="TData, TValue">
    import type { Column } from '@tanstack/table-core';
    import { CirclePlusIcon, CheckIcon } from '@lucide/svelte';
    import { Badge } from '$lib/components/ui/badge';
    import { Button } from '$lib/components/ui/button';
    import * as Command from '$lib/components/ui/command';
    import * as Popover from '$lib/components/ui/popover';
    import { Separator } from '$lib/components/ui/separator';

    import type { Component } from 'svelte';
    import { Checkbox } from '$lib/components/ui/checkbox';

    type FilterOption = {
        label: string;
        value: string;
        icon?: Component;
    };

    let {
        column,
        title,
        options,
    }: {
        column?: Column<TData, TValue>;
        title: string;
        options: FilterOption[];
    } = $props();

    const facets = $derived(column?.getFacetedUniqueValues());
    const selectedValues = $derived(
        new Set(column?.getFilterValue() as string[] | undefined),
    );

    let open = $state(false);

    function handleSelect(value: string) {
        const isSelected = selectedValues.has(value);
        if (isSelected) {
            selectedValues.delete(value);
        } else {
            selectedValues.add(value);
        }
        const filterValues = Array.from(selectedValues);
        column?.setFilterValue(filterValues.length ? filterValues : undefined);
    }

    function clearFilters() {
        column?.setFilterValue(undefined);
    }
</script>

<Popover.Root bind:open>
    <Popover.Trigger>
        {#snippet child({ props })}
            <Button
                {...props}
                variant="outline"
                size="sm"
                class="h-8 border-dashed"
            >
                <CirclePlusIcon class="size-4" />
                {title}
                {#if selectedValues.size > 0}
                    <Separator orientation="vertical" class="mx-2 h-4" />
                    <Badge
                        variant="secondary"
                        class="rounded-sm px-1 font-normal lg:hidden"
                    >
                        {selectedValues.size}
                    </Badge>
                    <div class="hidden space-x-1 lg:flex">
                        {#if selectedValues.size > 2}
                            <Badge
                                variant="secondary"
                                class="rounded-sm px-1 font-normal"
                            >
                                {selectedValues.size} selected
                            </Badge>
                        {:else}
                            {#each options.filter( (option) => selectedValues.has(option.value), ) as option (option.value)}
                                <Badge
                                    variant="secondary"
                                    class="rounded-sm px-1 font-normal"
                                >
                                    {option.label}
                                </Badge>
                            {/each}
                        {/if}
                    </div>
                {/if}
            </Button>
        {/snippet}
    </Popover.Trigger>
    <Popover.Content class="w-[200px] p-0" align="start">
        <Command.Root>
            <Command.Input placeholder={title} />
            <Command.List>
                <Command.Empty>No results found.</Command.Empty>
                <Command.Group>
                    {#each options as option (option.value)}
                        {@const isSelected = selectedValues.has(option.value)}
                        <Command.Item
                            value={option.value}
                            onSelect={() => handleSelect(option.value)}
                        >
                            <Checkbox checked={isSelected} />
                            {#if option.icon}
                                {@const Icon = option.icon}
                                <Icon class="size-4 text-muted-foreground" />
                            {/if}
                            <span>{option.label}</span>
                            {#if facets?.get(option.value)}
                                <span
                                    class="ml-auto flex size-4 items-center justify-center font-mono text-xs"
                                >
                                    {facets.get(option.value)}
                                </span>
                            {/if}
                        </Command.Item>
                    {/each}
                </Command.Group>
                {#if selectedValues.size > 0}
                    <Command.Separator />
                    <Command.Group>
                        <Command.Item
                            onSelect={clearFilters}
                            class="justify-center text-center"
                        >
                            Clear filters
                        </Command.Item>
                    </Command.Group>
                {/if}
            </Command.List>
        </Command.Root>
    </Popover.Content>
</Popover.Root>
