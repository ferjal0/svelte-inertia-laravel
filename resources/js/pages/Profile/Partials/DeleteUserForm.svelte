<script lang="ts">
    import { Button } from '$lib/components/ui/button';
    import * as Dialog from '$lib/components/ui/dialog';
    import { Input } from '$lib/components/ui/input';
    import { Label } from '$lib/components/ui/label';
    import { useForm } from '@inertiajs/svelte';
    import { Loader2 } from 'lucide-svelte';

    type Props = {
        className?: string;
    };

    let { className }: Props = $props();

    let confirmingUserDeletion = $state(false);
    let passwordInput: HTMLInputElement | undefined = $state();

    const form = useForm({
        password: '',
    });

    function confirmUserDeletion() {
        confirmingUserDeletion = true;
    }

    function deleteUser(e: SubmitEvent) {
        e.preventDefault();

        $form.delete(route('profile.destroy'), {
            preserveScroll: true,
            onSuccess: () => {
                closeModal();
            },
            onError: () => {
                passwordInput?.focus();
            },
            onFinish: () => {
                $form.reset();
            },
        });
    }

    function closeModal() {
        confirmingUserDeletion = false;
        $form.clearErrors();
        $form.reset();
    }

    $effect(() => {
        if (confirmingUserDeletion) {
            passwordInput?.focus();
        }
    });
</script>

<section class={`flex max-w-xl flex-col gap-6 ${className}`}>
    <header class="flex flex-col gap-2">
        <h2 class="text-lg font-medium text-gray-900 dark:text-gray-100">
            Delete Account
        </h2>

        <p class="text-sm text-gray-600 dark:text-gray-400">
            Once your account is deleted, all of its resources and data will be
            permanently deleted. Before deleting your account, please download
            any data or information that you wish to retain.
        </p>
    </header>

    <Button variant="destructive" class="w-fit" onclick={confirmUserDeletion}>
        Delete Account
    </Button>
</section>

<Dialog.Root
    open={confirmingUserDeletion}
    onOpenChange={(open) => {
        if (!open) closeModal();
    }}
>
    <Dialog.Content>
        <Dialog.Title
            class="text-lg font-medium text-gray-900 dark:text-gray-100"
        >
            Are you sure you want to delete your account?
        </Dialog.Title>

        <Dialog.Description class="text-sm text-gray-600 dark:text-gray-400">
            Once your account is deleted, all of its resources and data will be
            permanently deleted. Please enter your password to confirm you would
            like to permanently delete your account.
        </Dialog.Description>

        <form onsubmit={deleteUser} class="flex flex-col gap-4">
            <div class="flex flex-col gap-2">
                <Label for="password">Password</Label>

                <Input
                    id="password"
                    bind:value={$form.password}
                    type="password"
                    placeholder="••••••••"
                    autocomplete="current-password"
                />

                {#if $form.errors.password}
                    <p class="mt-2 text-sm text-red-600 dark:text-red-400">
                        {$form.errors.password}
                    </p>
                {/if}
            </div>

            <div class="flex justify-end">
                <Button type="button" variant="outline" onclick={closeModal}>
                    Cancel
                </Button>

                <Button
                    type="submit"
                    variant="destructive"
                    class="ml-3"
                    disabled={$form.processing}
                >
                    {#if $form.processing}
                        <Loader2 class="mr-2 size-4 animate-spin" />
                    {/if}
                    Delete Account
                </Button>
            </div>
        </form>
    </Dialog.Content>
</Dialog.Root>
