<script lang="ts">
    type Props = {
        message?: string;
        class?: string;
    };

    let { message, class: className = '' }: Props = $props();
</script>

{#if message}
    <p
        class="text-center text-balance text-sm text-red-600 dark:text-red-400 {className}"
    >
        {message}
    </p>
{/if}
