<script lang="ts">
    import { Badge } from '$lib/components/ui/badge/index.js';

    let { verified }: { verified: boolean } = $props();
</script>

<Badge variant={verified ? 'green' : 'amber'}>
    {verified ? 'Verified' : 'Unverified'}
</Badge>
