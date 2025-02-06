import { createInertiaApp, type ResolvedComponent } from '@inertiajs/svelte';
import createServer from '@inertiajs/svelte/server';
import type { RouteName } from 'ziggy-js';
import { route } from '../../vendor/tightenco/ziggy';

createServer((page) =>
    createInertiaApp({
        page,
        resolve: (name) => {
            const pages = import.meta.glob<ResolvedComponent>(
                './Pages/**/*.svelte',
                { eager: true },
            );
            return pages[`./Pages/${name}.svelte`];
        },
        setup: ({ el, App, props }) => {
            // @ts-expect-error - Ziggy types
            global.route = (
                name: RouteName,
                params?: any,
                absolute?: boolean,
            ) =>
                route(name, params, absolute, {
                    ...page.props.ziggy,
                    location: new URL(page.props.ziggy.location),
                });

            return new App({ target: el!, props });
        },
    }),
);
