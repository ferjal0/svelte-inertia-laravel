<script lang="ts">
    import { Button } from '$lib/components/ui/button';
    import { Input } from '$lib/components/ui/input';
    import { Label } from '$lib/components/ui/label';
    import AuthenticationLayout from '$lib/layouts/AuthenticationLayout.svelte';
    import { Link, router, useForm } from '@inertiajs/svelte';
    import ErrorFeedback from '$lib/components/ui/custom/error-feedback.svelte';

    type Props = {
        status?: string;
    };

    const { status }: Props = $props();

    const form = useForm({
        email: '',
    });

    function submit(e: SubmitEvent) {
        e.preventDefault();
        $form.post(route('password.email'), {
            onSuccess: () => router.visit(route('forgot-password.sent')),
        });
    }
</script>

<svelte:head>
    <title>Forgot Password</title>
</svelte:head>

<AuthenticationLayout>
    <form class="flex flex-col gap-6" onsubmit={submit}>
        <div class="flex flex-col items-center gap-4 text-center">
            <h1 class="text-2xl font-bold">Forgot your password?</h1>
            <p class="text-balance text-sm text-muted-foreground">
                No problem. Let us know your email address and we will email you
                a password reset link.
            </p>
        </div>

        {#if status}
            <div
                class="text-center text-sm font-medium text-green-600 dark:text-green-400"
            >
                {status}
            </div>
        {/if}

        <ErrorFeedback message={$form.errors.email} />

        <div class="grid gap-6">
            <div class="grid gap-2">
                <Label for="email">Email</Label>
                <Input
                    id="email"
                    type="email"
                    name="email"
                    bind:value={$form.email}
                    class="block w-full"
                    autocomplete="username"
                    placeholder="m@example.com"
                    required
                    autofocus
                />
            </div>

            <Button type="submit" class="w-full" disabled={$form.processing}>
                Send
            </Button>

            <div class="text-center text-sm">
                Did you remember?{' '}
                <Link
                    href={route('login')}
                    class="underline underline-offset-4"
                >
                    Log in
                </Link>
            </div>
        </div>
    </form>
</AuthenticationLayout>
