<script lang="ts">
    import type { PageProps } from '$lib/types';
    import * as Avatar from '$lib/components/ui/avatar';
    import { Button } from '$lib/components/ui/button';
    import ErrorFeedback from '$lib/components/ui/custom/error-feedback.svelte';
    import { Input } from '$lib/components/ui/input';
    import { Label } from '$lib/components/ui/label';
    import { page } from '@inertiajs/svelte';
    import { useForm } from '@inertiajs/svelte';
    import { Pencil } from '@lucide/svelte';
    import { toast } from 'svelte-sonner';

    type Props = {
        className?: string;
    };

    let { className }: Props = $props();

    // State
    let photoPreview: string | null = $state(null);

    // Refs
    let photoInput: HTMLInputElement | undefined = $state();

    const auth = $page.props.auth as PageProps['auth'];
    const user = auth.user;

    const form = useForm({
        _method: 'PATCH',
        name: user.name,
        email: user.email,
        photo: null as File | null,
    });

    function submit(e: SubmitEvent) {
        e.preventDefault();
        updateProfileInformation();
    }

    function updateProfileInformation() {
        if (photoInput?.files?.[0]) {
            $form.photo = photoInput.files[0];
        }

        $form.post(route('profile.update'), {
            onSuccess: () => {
                toast.success('Profile updated successfully');
                clearPhotoFileInput();
            },
            onError: (errors) => {
                toast.error('Something went wrong', errors);
            },
        });
    }

    function selectNewPhoto() {
        photoInput?.click();
    }

    function updatePhotoPreview() {
        const photo = photoInput?.files?.[0];

        if (!photo) return;

        const reader = new FileReader();

        reader.onload = (e) => {
            photoPreview = e.target?.result as string | null;
        };

        reader.readAsDataURL(photo);
    }

    function clearPhotoFileInput() {
        if (photoInput?.value) {
            photoInput.value = '';
        }
    }
</script>

<section class={className}>
    <header class="flex flex-col gap-2">
        <h2 class="text-lg font-medium text-gray-900 dark:text-gray-100">
            Profile Information
        </h2>

        <p class="text-sm text-gray-600 dark:text-gray-400">
            Update your account's profile information and email address.
        </p>
    </header>

    <form onsubmit={submit} class="mt-6 space-y-6">
        <div class="col-span-6 sm:col-span-4">
            <!-- Hidden file input for photo upload -->
            <input
                id="photo"
                bind:this={photoInput}
                name="photo"
                type="file"
                class="hidden"
                onchange={updatePhotoPreview}
                accept="image/*"
            />

            <!-- Current Profile Photo -->
            <div class="flex items-center gap-4">
                <div class="group relative">
                    <Avatar.Root class="size-20 rounded-lg">
                        {#if photoPreview}
                            <Avatar.Image src={photoPreview} alt={$form.name} />
                        {:else if user.profile_photo_url}
                            <Avatar.Image
                                src={user.profile_photo_url}
                                alt={$form.name}
                            />
                        {/if}
                        <Avatar.Fallback class="rounded-lg text-xl"
                            >{user.name
                                .substring(0, 2)
                                .toUpperCase()}</Avatar.Fallback
                        >
                    </Avatar.Root>

                    <!-- Hover Overlay with Edit Button -->
                    <button
                        type="button"
                        class="absolute inset-0 flex cursor-pointer items-center justify-center rounded-lg bg-black/50 opacity-0 transition-opacity group-hover:opacity-100"
                        onclick={selectNewPhoto}
                    >
                        <Pencil class="h-5 w-5 text-white" />
                    </button>
                </div>
            </div>
        </div>

        <div class="col-span-6 sm:col-span-4">
            <Label for="name">Name</Label>
            <Input
                id="name"
                type="text"
                class="max-w-lg"
                bind:value={$form.name}
                required
                autocomplete="name"
            />
            <ErrorFeedback message={$form.errors.name} />
        </div>

        <div class="col-span-6 sm:col-span-4">
            <Label for="email">Email</Label>
            <Input
                id="email"
                type="email"
                class="max-w-lg"
                bind:value={$form.email}
                required
                autocomplete="username"
            />
            <ErrorFeedback message={$form.errors.email} />
        </div>

        <div class="flex items-center gap-4">
            <Button type="submit" disabled={$form.processing}>Save</Button>
        </div>
    </form>
</section>
