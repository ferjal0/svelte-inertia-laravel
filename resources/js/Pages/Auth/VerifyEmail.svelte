<script lang="ts">
    import { Button } from '$lib/components/ui/button';
    import AuthenticationLayout from '$lib/layouts/AuthenticationLayout.svelte';
    import { Link, useForm } from '@inertiajs/svelte';

    type Props = {
        status?: string;
    };

    const { status }: Props = $props();

    const form = useForm({});

    function submit(e: SubmitEvent) {
        e.preventDefault();
        $form.post(route('verification.send'));
    }
</script>

<svelte:head>
    <title>Verify Email</title>
</svelte:head>

<AuthenticationLayout>
    <form class="flex flex-col gap-6" onsubmit={submit}>
        <div class="flex flex-col items-center gap-4 text-center">
            <h1 class="text-2xl font-bold">Verify your email</h1>
            <p class="text-balance text-sm text-muted-foreground">
                Please verify your email address by clicking the link in the
                email we sent you. If you haven't received it, we can send a new
                verification link.
            </p>
        </div>

        {#if status === 'verification-link-sent'}
            <div
                class="text-center text-sm font-medium text-green-600 dark:text-green-400"
            >
                A new verification link has been sent to your email address.
            </div>
        {/if}

        <div class="grid gap-6">
            <Button type="submit" class="w-full" disabled={$form.processing}>
                Resend verification link
            </Button>

            <div class="text-center text-sm">
                <Link
                    href={route('logout')}
                    method="post"
                    as="button"
                    class="underline underline-offset-4"
                >
                    Log out
                </Link>
            </div>
        </div>
    </form>
</AuthenticationLayout>
