<script lang="ts">
    import ErrorFeedback from '$lib/components/ui/custom/error-feedback.svelte';
    import * as InputOTP from '$lib/components/ui/input-otp';
    import AuthenticationLayout from '$lib/layouts/AuthenticationLayout.svelte';
    import { useForm } from '@inertiajs/svelte';
    import { ShieldCheck } from 'lucide-svelte';

    const form = useForm({
        code: '',
    });

    async function handleSubmit() {
        if ($form.code.length !== 6) return;
        $form.post(route('two-factor.login.store'));
    }
</script>

<svelte:head>
    <title>Login</title>
</svelte:head>

<AuthenticationLayout>
    <div class="flex flex-col items-center gap-6 text-center">
        <div class="flex flex-col items-center gap-4">
            <ShieldCheck class="size-12" />
            <h1 class="text-2xl font-bold">Two-Factor Authentication</h1>
        </div>

        <InputOTP.Root
            bind:value={$form.code}
            maxlength={6}
            onComplete={handleSubmit}
            autofocus
        >
            {#snippet children({ cells })}
                <InputOTP.Group>
                    {#each cells as cell}
                        <InputOTP.Slot {cell} />
                    {/each}
                </InputOTP.Group>
            {/snippet}
        </InputOTP.Root>

        <p class="text-balance text-sm text-muted-foreground">
            Please enter the one-time password from your authenticator app.
        </p>

        <ErrorFeedback message={$form.errors.code} />
    </div>
</AuthenticationLayout>
