<script lang="ts">
    const mainCircleSize: number = $state(210);
    const mainCircleOpacity: number = $state(0.24);
</script>

<div
    class="absolute inset-0 flex items-center justify-center mask-[linear-gradient(to_bottom,white,transparent)]"
>
    {#each { length: 8 } as iteration, i}
        <div
            id={`ripple-${iteration}`}
            class="absolute animate-ripple rounded-full bg-foreground/30 shadow-xl border top-1/2 left-1/2"
            style="width: {mainCircleSize + i * 70}px;
           height: {mainCircleSize + i * 70}px;
           opacity: {mainCircleOpacity - i * 0.03};
           animation-delay: {i * 0.1}s;
           border-style:{i === 7 ? 'dashed' : 'solid'};
           border-width: 1px;
           border-color: rgba(var(--foreground-rgb), {(5 + i * 5) / 100});
          "
        ></div>
    {/each}
</div>
