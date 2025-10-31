<script lang="ts">
    import type { ComponentProps } from 'svelte';
    import {
        ArrowUpDownIcon,
        ArrowUpIcon,
        ArrowDownIcon,
    } from '@lucide/svelte';
    import { Button } from '$lib/components/ui/button';
    import * as Tooltip from '$lib/components/ui/tooltip';

    let {
        label,
        sorted = false as false | 'asc' | 'desc',
        variant = 'ghost',
        ...restProps
    }: { label: string; sorted?: false | 'asc' | 'desc' } & ComponentProps<
        typeof Button
    > = $props();
</script>

<div class="flex items-center gap-2">
    <span>{label}</span>
    <Tooltip.Root>
        <Tooltip.Trigger>
            {#snippet child({ props })}
                <Button
                    {variant}
                    size="icon"
                    aria-label="Sort"
                    {...props}
                    {...restProps}
                >
                    {#if sorted === 'asc'}
                        <ArrowUpIcon class="size-4" />
                    {:else if sorted === 'desc'}
                        <ArrowDownIcon class="size-4" />
                    {:else}
                        <ArrowUpDownIcon class="size-4" />
                    {/if}
                </Button>
            {/snippet}
        </Tooltip.Trigger>
        {#if sorted}
            <Tooltip.Content side="top" align="center">
                Current sort: {sorted === 'asc' ? 'Ascending' : 'Descending'}
            </Tooltip.Content>
        {/if}
    </Tooltip.Root>
</div>
