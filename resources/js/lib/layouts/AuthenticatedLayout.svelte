<script lang="ts">
    import AppBreadcrumb from '$lib/components/ui/custom/app-breadcrumb.svelte';
    import AppCommand from '$lib/components/ui/custom/app-command.svelte';
    import AppSidebar from '$lib/components/ui/custom/app-sidebar.svelte';
    import { Separator } from '$lib/components/ui/separator';
    import {
        SidebarInset,
        SidebarProvider,
        SidebarTrigger,
    } from '$lib/components/ui/sidebar';
    import { Toaster } from '$lib/components/ui/sonner';
    import { ModeWatcher } from 'mode-watcher';
</script>

<ModeWatcher />
<SidebarProvider>
    <AppSidebar />
    <SidebarInset>
        <header
            class="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12"
        >
            <div class="flex items-center gap-2 px-4">
                <SidebarTrigger class="-ml-1" />
                <Separator orientation="vertical" class="mr-2 h-4" />
                <AppBreadcrumb />
            </div>
        </header>
        <div class="flex flex-1 flex-col gap-4 p-4 pt-0">
            <slot />
        </div>
    </SidebarInset>
    <Toaster position="top-right" />
    <AppCommand />
</SidebarProvider>
