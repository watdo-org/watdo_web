<script lang="ts">
    import { onMount } from "svelte";
    import Server from "$lib/server";
    import TopBar from "$lib/components/TopBar.svelte";

    let blocks = $state([]);
    let activeBlocks = $state([]);

    onMount(async () => {
        const res = await Server.fetch("/blocks/");
        blocks = await res.json();

        for (const block of blocks) {
            const res = await Server.fetch(
                `/blocks/${block["id"]}/call/evaluate_schedule`,
                "POST",
                {
                    "relative_base": new Date().toISOString(),
                    "evaluation_date": new Date().toISOString(),
                }
            );

            if (await res.json()) {
                activeBlocks.push(block["id"]);
            }
        }
    });
</script>

<TopBar />

<div class="flex mt-14">
    <div>
        {#each blocks as block (block["id"])}
            {#if activeBlocks.includes(block["id"])}
                <div class="w-full relative">
                    <pre>{JSON.stringify(block["parsed"], null, "\t")}</pre>

                    <button
                        class="absolute top-0 right-0 cursor-pointer"
                        onclick={async () => {
                            await Server.fetch(
                                `/blocks/${block["id"]}/call/apply_action`,
                                "POST",
                                { "action": "remove" }
                            );
                        }}
                    >Remove</button>
                </div>
            {/if}
        {/each}
    </div>
</div>
