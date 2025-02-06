<script lang="ts">
    import * as Breadcrumb from '$lib/components/ui/breadcrumb';
    import { page } from '@inertiajs/svelte';

    // Remove query parameters and trailing slash
    let pathWithoutQuery = $derived($page.url.split('?')[0]);
    let currentPath = $derived(
        pathWithoutQuery.endsWith('/')
            ? pathWithoutQuery.slice(0, -1)
            : pathWithoutQuery,
    );
    let segments = $derived(currentPath.split('/').filter(Boolean));

    // Generate breadcrumb segments
    let breadcrumbSegments = $derived(
        segments.length
            ? segments.map((segment, index) => {
                  const path = `/${segments.slice(0, index + 1).join('/')}`;
                  return {
                      title:
                          segment.charAt(0).toUpperCase() +
                          segment.slice(1).replace(/-/g, ' '),
                      url: path,
                  };
              })
            : [{ title: 'Dashboard' }],
    );
</script>

<Breadcrumb.Root>
    <Breadcrumb.List>
        {#each breadcrumbSegments as segment, index}
            {#if index < breadcrumbSegments.length - 1}
                <Breadcrumb.Item class="hidden md:block">
                    <Breadcrumb.Link>{segment.title}</Breadcrumb.Link>
                </Breadcrumb.Item>
                <Breadcrumb.Separator class="hidden md:block" />
            {:else}
                <Breadcrumb.Item class="hidden md:block">
                    <Breadcrumb.Page>{segment.title}</Breadcrumb.Page>
                </Breadcrumb.Item>
            {/if}
        {/each}
    </Breadcrumb.List>
</Breadcrumb.Root>
