<script lang="ts">
    import { Button } from '$lib/components/ui/button';
    import { Input } from '$lib/components/ui/input';
    import { Label } from '$lib/components/ui/label';
    import AuthenticationLayout from '$lib/layouts/AuthenticationLayout.svelte';
    import { useForm } from '@inertiajs/svelte';
    import ErrorFeedback from '$lib/components/ui/custom/error-feedback.svelte';

    type Props = {
        token: string;
    };

    const { token }: Props = $props();

    const form = useForm({
        _method: 'POST',
        token,
        email: new URLSearchParams(window.location.search).get('email') || '',
        password: '',
        password_confirmation: '',
    });

    function submit(e: SubmitEvent) {
        e.preventDefault();
        $form.post(route('password.update'), {
            onFinish: () => $form.reset('password', 'password_confirmation'),
        });
    }
</script>

<svelte:head>
    <title>Reset Password</title>
</svelte:head>

<AuthenticationLayout>
    <form class="flex flex-col gap-6" onsubmit={submit}>
        <div class="flex flex-col items-center gap-4 text-center">
            <h1 class="text-2xl font-bold">Reset your password</h1>
            <p class="text-balance text-sm text-muted-foreground">
                Please enter your new password below to reset your account
                password.
            </p>
        </div>

        <ErrorFeedback message={$form.errors.token} />

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
                    required
                    disabled
                />
                <ErrorFeedback message={$form.errors.email} />
            </div>

            <div class="grid gap-2">
                <Label for="password">New Password</Label>
                <Input
                    id="password"
                    type="password"
                    name="password"
                    bind:value={$form.password}
                    class="block w-full"
                    autocomplete="new-password"
                    required
                />
                <ErrorFeedback message={$form.errors.password} />
            </div>

            <div class="grid gap-2">
                <Label for="password_confirmation">Confirm New Password</Label>
                <Input
                    id="password_confirmation"
                    type="password"
                    name="password_confirmation"
                    bind:value={$form.password_confirmation}
                    class="block w-full"
                    autocomplete="new-password"
                    required
                />
                <ErrorFeedback message={$form.errors.password_confirmation} />
            </div>

            <Button type="submit" class="w-full" disabled={$form.processing}>
                Reset Password
            </Button>

            <div class="text-center text-sm">
                Remember your password?{' '}
                <a href={route('login')} class="underline underline-offset-4">
                    Log in
                </a>
            </div>
        </div>
    </form>
</AuthenticationLayout>
