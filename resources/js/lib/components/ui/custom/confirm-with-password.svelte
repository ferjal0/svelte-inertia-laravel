<script lang="ts">
    import { Button } from '$lib/components/ui/button';
    import * as Dialog from '$lib/components/ui/dialog';
    import ErrorFeedback from '$lib/components/ui/custom/error-feedback.svelte';
    import { Input } from '$lib/components/ui/input';
    import { Label } from '$lib/components/ui/label';
    import type { Snippet } from 'svelte';
    import axios, { AxiosError } from 'axios';

    let {
        title = 'Confirm action with Password',
        content = 'This action is irreversible. Please type your password to confirm.',
        button = 'Confirm',
        onConfirmed,
        children,
    } = $props<{
        title?: string;
        content?: string;
        button?: string;
        onConfirmed: () => void;
        children?: Snippet;
    }>();

    let confirmingPassword = $state(false);
    let error = $state('');
    let processing = $state(false);
    let password = $state('');

    async function startConfirmingPassword() {
        const response = await axios.get(route('password.confirmation'));
        if (response.data.confirmed) {
            onConfirmed();
        } else {
            confirmingPassword = true;
        }
    }

    async function confirmPassword() {
        processing = true;

        try {
            await axios.post(route('password.confirm'), {
                password: password,
            });
            closeModal();
            onConfirmed();
        } catch (e: any) {
            processing = false;
            error = e.response.data.message;
        }
    }

    function closeModal() {
        confirmingPassword = false;
        password = '';
        error = '';
        processing = false;
    }

    function handleKeyup(e: KeyboardEvent) {
        if (e.key === 'Enter') {
            confirmPassword();
        }
    }

    $effect(() => {
        console.log(error);
    });
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div onclick={startConfirmingPassword} class="w-fit">
    {@render children?.()}
</div>

<Dialog.Root
    bind:open={confirmingPassword}
    onOpenChange={(open) => {
        if (!open) closeModal();
    }}
>
    <Dialog.Content>
        <Dialog.Header>
            <Dialog.Title>{title}</Dialog.Title>
        </Dialog.Header>

        <div class="flex flex-col gap-4">
            <p class="text-sm text-gray-600 dark:text-gray-400">
                {content}
            </p>

            <div class="flex flex-col gap-2">
                <Label for="password">Password</Label>
                <Input
                    type="password"
                    id="password"
                    bind:value={password}
                    autocomplete="current-password"
                    onkeyup={handleKeyup}
                />
            </div>

            <ErrorFeedback message={error} />
        </div>

        <Dialog.Footer>
            <Button variant="outline" onclick={closeModal}>Cancel</Button>

            <Button onclick={confirmPassword} disabled={processing}>
                {button}
            </Button>
        </Dialog.Footer>
    </Dialog.Content>
</Dialog.Root>
