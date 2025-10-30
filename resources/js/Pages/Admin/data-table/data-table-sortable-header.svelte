<script lang="ts">
    import type { ComponentProps } from 'svelte';
    import { ArrowUpDownIcon } from '@lucide/svelte';
    import { Button } from '$lib/components/ui/button';

    let {
        label,
        variant = 'ghost',
        ...restProps
    }: { label: string } & ComponentProps<typeof Button> = $props();
</script>

<Button {variant} {...restProps}>
    {label}
    <ArrowUpDownIcon class="ml-2 size-4" />
</Button>
