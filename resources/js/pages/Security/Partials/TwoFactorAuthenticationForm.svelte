<script lang="ts">
    import ConfirmWithPassword from '$lib/components/ui/custom/confirm-with-password.svelte';
    import { Button } from '$lib/components/ui/button';
    import ErrorFeedback from '$lib/components/ui/custom/error-feedback.svelte';
    import { Input } from '$lib/components/ui/input';
    import { Label } from '$lib/components/ui/label';
    import type { PageProps } from '$lib/types';
    import { page } from '@inertiajs/svelte';
    import { useForm } from '@inertiajs/svelte';
    import axios from 'axios';
    import { CheckCircle, Siren } from 'lucide-svelte';
    import { toast } from 'svelte-sonner';

    // State
    let enabling = $state(false);
    let disabling = $state(false);
    let qrCode = $state<string | null>(null);
    let recoveryCodes = $state<string[]>([]);

    // Form
    const form = useForm({
        code: '',
    });

    // User data
    const auth = $page.props.auth as PageProps['auth'];
    const user = auth.user;
    let twoFactorEnabled = $state(user.two_factor_confirmed_at !== null);

    // Functions
    function enableTwoFactorAuthentication() {
        enabling = true;

        $form.post(route('two-factor.enable'), {
            onSuccess: () => {
                enabling = false;
                showQrCode();
            },
        });
    }

    function showQrCode() {
        axios
            .get(route('two-factor.qr-code'))
            .then((response) => {
                qrCode = response.data.svg;
            })
            .then(() => {
                toast.success('2FA QR Code generated');
            });
    }

    function confirmTwoFactorAuthentication() {
        $form.post(route('two-factor.confirm'), {
            errorBag: 'confirmTwoFactorAuthentication',
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => {
                qrCode = null;
                twoFactorEnabled = true;
                showRecoveryCodes();
                toast.success('2FA successfully enabled');
            },
            onError: () => {
                toast.error('There was an error enabling 2FA');
            },
        });
    }

    function showRecoveryCodes() {
        axios.get(route('two-factor.recovery-codes')).then((response) => {
            recoveryCodes = response.data;
        });
    }

    function disableTwoFactorAuthentication() {
        disabling = true;

        $form.delete(route('two-factor.disable'), {
            preserveScroll: true,
            preserveState: true,
            onBefore: () => {
                disabling = true;
            },
            onSuccess: () => {
                disabling = false;
                twoFactorEnabled = false;
                toast.success('2FA successfully disabled');
            },
            onError: () => {
                disabling = false;
                twoFactorEnabled = true;
                toast.error('There was an error disabling 2FA');
            },
            onFinish: () => {
                disabling = false;
            },
        });
    }
</script>

<section class="flex max-w-xl flex-col gap-6">
    <header class="flex flex-col gap-2">
        <h2 class="text-lg font-medium text-gray-900 dark:text-gray-100">
            Two Factor Authentication
        </h2>

        <p class="text-sm text-gray-600 dark:text-gray-400">
            Add additional security to your account using two factor
            authentication.
        </p>
    </header>

    {#if !twoFactorEnabled && !qrCode}
        <div class="flex flex-col gap-6">
            <div class="flex items-center gap-4 text-sm">
                <Siren class="text-red-500" />
                <h3>
                    Two-factor authentication is not enabled. We recommend
                    enabling it.
                </h3>
            </div>
            <ConfirmWithPassword
                title="Enable 2FA"
                content="To start enabling two-factor authentication, you must confirm your password."
                onConfirmed={enableTwoFactorAuthentication}
            >
                <Button type="button" disabled={enabling}>
                    {enabling ? 'Enabling...' : 'Enable'}
                </Button>
            </ConfirmWithPassword>
        </div>
    {/if}

    {#if qrCode}
        <div class="flex flex-col gap-6">
            <p class="text-sm font-medium text-gray-900 dark:text-gray-100">
                To finish enabling two factor authentication, scan the following
                QR code using your phone's authenticator application or enter
                the setup key and provide the generated OTP code.
            </p>

            <div class="contrast-200">{@html qrCode}</div>

            <div class="flex flex-col gap-2">
                <Label for="code">Code</Label>

                <div class="flex flex-col gap-2">
                    <div class="flex gap-2">
                        <Input
                            id="code"
                            type="text"
                            name="code"
                            class="block"
                            value={$form.code}
                            onchange={(e) =>
                                ($form.code = e.currentTarget.value)}
                        />

                        <Button
                            type="button"
                            onclick={confirmTwoFactorAuthentication}
                            disabled={$form.processing}
                        >
                            {$form.processing ? 'Confirming...' : 'Confirm'}
                        </Button>
                    </div>

                    <ErrorFeedback message={$form.errors.code} />
                </div>
            </div>
        </div>
    {/if}

    {#if twoFactorEnabled && !qrCode}
        <div class="flex flex-col gap-6">
            <div class="flex items-center gap-4 text-sm">
                <CheckCircle class="text-green-500" />
                <h3>You've already enabled 2FA.</h3>
            </div>
            {#if recoveryCodes.length > 0}
                <div class="flex max-w-xl flex-col gap-4">
                    <div class="text-sm">
                        <span
                            class="font-semibold text-red-600 dark:text-red-400"
                        >
                            Important:
                        </span>
                        These recovery codes will only be shown once. Store them
                        in a secure password manager immediately. They can be used
                        to recover access to your account if your two factor authentication
                        device is lost.
                    </div>

                    <div
                        class="grid gap-1 rounded-lg bg-sidebar p-4 font-mono text-xs"
                    >
                        {#each recoveryCodes as code}
                            <div>{code}</div>
                        {/each}
                    </div>
                </div>
            {/if}
            <div class="flex gap-4">
                <ConfirmWithPassword
                    title="Disable 2FA"
                    content="To disable two-factor authentication, you must confirm your password."
                    onConfirmed={disableTwoFactorAuthentication}
                >
                    <Button type="button" disabled={disabling}>
                        {disabling ? 'Disabling...' : 'Disable'}
                    </Button>
                </ConfirmWithPassword>
            </div>
        </div>
    {/if}
</section>
