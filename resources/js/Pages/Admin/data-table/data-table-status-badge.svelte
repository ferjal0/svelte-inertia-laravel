<script lang="ts">
    import { Badge } from '$lib/components/ui/badge/index.js';
    import { CheckCircleIcon, AlertCircleIcon } from '@lucide/svelte';

    let { verified }: { verified: boolean } = $props();
</script>

<Badge
    variant={verified ? 'green' : 'amber'}
    icon={verified ? CheckCircleIcon : AlertCircleIcon}
>
    {verified ? 'Verified' : 'Unverified'}
</Badge>
