<script lang="ts">
    import { Badge } from '$lib/components/ui/badge';
    import { Button } from '$lib/components/ui/button';
    import * as Dialog from '$lib/components/ui/dialog';
    import ErrorFeedback from '$lib/components/ui/custom/error-feedback.svelte';
    import { Input } from '$lib/components/ui/input';
    import { Label } from '$lib/components/ui/label';
    import type { Session } from '$lib/types';
    import { useForm } from '@inertiajs/svelte';
    import { Monitor, Phone, Tablet } from 'lucide-svelte';
    import { toast } from 'svelte-sonner';

    type Props = {
        sessions?: Session[];
    };

    const { sessions = [] }: Props = $props();

    let open = $state(false);

    const form = useForm({
        password: '',
    });

    function handleLogoutOtherSessions(e: SubmitEvent) {
        e.preventDefault();
        $form.delete(route('other-browser-sessions.destroy'), {
            preserveScroll: true,
            onSuccess: () => {
                open = false;
                toast.success('Other browser sessions have been logged out.');
            },
            onError: () => {
                $form.reset();
            },
        });
    }

    function isCurrentDevice(session: Session): boolean {
        return session.is_current_device;
    }
</script>

{#if sessions?.length > 0}
    <section class="flex flex-col gap-6">
        <header class="flex flex-col gap-2">
            <h2 class="text-lg font-medium text-gray-900 dark:text-gray-100">
                Active Sessions
            </h2>
            <p class="text-sm text-gray-600 dark:text-gray-400">
                Manage and log out your active sessions on other browsers and
                devices.
            </p>
        </header>

        <div class="flex max-w-xl flex-col gap-4">
            {#each sessions as session, i (i)}
                <div class="flex justify-between rounded-lg bg-sidebar p-4">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center gap-2">
                            <div class="flex flex-col items-start gap-2">
                                <div class="flex gap-2">
                                    <span
                                        class="flex items-center gap-2 text-sm font-medium"
                                    >
                                        <span>
                                            {#if session.device_type === 'mobile'}
                                                <Phone />
                                            {/if}
                                            {#if session.device_type === 'tablet'}
                                                <Tablet />
                                            {/if}
                                            {#if session.device_type === 'desktop'}
                                                <Monitor />
                                            {/if}
                                        </span>
                                        <div class="flex gap-1">
                                            <span>{session.browser}</span>
                                            <span
                                                >{session.browser_version}</span
                                            >
                                        </div>
                                        {#if isCurrentDevice(session)}
                                            <Badge
                                                variant="outline"
                                                class="text-xs"
                                            >
                                                This device
                                            </Badge>
                                        {/if}
                                    </span>
                                </div>
                                <!-- <div class="flex flex-col gap-1">
                                    <div class="text-xs text-gray-500">
                                        {session.platform}, {session.platform_version}
                                    </div>
                                    <div class="text-xs text-gray-500">
                                        {session.last_active}
                                    </div>
                                </div> -->
                            </div>
                        </div>
                    </div>
                </div>
            {/each}
        </div>

        <div class="flex items-center gap-6">
            {#if sessions.length > 1}
                <Button variant="destructive" onclick={() => (open = true)}>
                    Log Out Other Browser Sessions
                </Button>
            {/if}
        </div>

        <Dialog.Root bind:open>
            <Dialog.Content>
                <Dialog.Title>Log Out Other Browser Sessions</Dialog.Title>
                <Dialog.Description>
                    Please enter your password to confirm you would like to log
                    out of your other browser sessions across all of your
                    devices.
                </Dialog.Description>

                <form onsubmit={handleLogoutOtherSessions} class="mt-6">
                    <div>
                        <Label for="password">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            bind:value={$form.password}
                            class="mt-1 block w-3/4"
                            placeholder="Password"
                            autocomplete="current-password"
                        />
                        <ErrorFeedback message={$form.errors.password} />
                    </div>

                    <Dialog.Footer class="mt-6">
                        <Dialog.Close>
                            {#snippet child({ props })}
                                <Button
                                    {...props}
                                    type="button"
                                    variant="secondary"
                                >
                                    Cancel
                                </Button>
                            {/snippet}
                        </Dialog.Close>
                        <Button
                            type="submit"
                            variant="destructive"
                            disabled={$form.processing}
                        >
                            Log Out Other Browser Sessions
                        </Button>
                    </Dialog.Footer>
                </form>
            </Dialog.Content>
        </Dialog.Root>
    </section>
{/if}
