import '../css/app.css';
import './bootstrap';

import { createInertiaApp, type ResolvedComponent } from '@inertiajs/svelte';
import { mount } from 'svelte';

createInertiaApp({
    resolve: (name) => {
        const pages = import.meta.glob<ResolvedComponent>(
            './Pages/**/*.svelte',
            { eager: true },
        );
        return pages[`./Pages/${name}.svelte`];
    },
    setup({ el, App, props }) {
        mount(App, { target: el!, props });
    },
    progress: {
        color: '#ffffff',
    },
});
