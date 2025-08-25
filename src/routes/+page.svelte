<script lang="ts">
    import { onMount } from "svelte";
    import Server from "$lib/server";
    import TopBar from "$lib/components/TopBar.svelte";
    import { type BlockJSON } from ".";

    let blocks: BlockJSON[] = $state([]);
    let activeBlocks: string[] = $state([]);

    onMount(async () => {
        const res = await Server.fetch("/blocks/?parse_if_possible=1");
        blocks = await res.json();

        for (const block of blocks) {
            if (block["parsed"] === null) {
                alert("⚠️ Error ⚠️");
                continue;
            }

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

                    <div class="absolute top-0 right-0 flex gap-2">
                        <button
                            class="cursor-pointer bg-gray-300 rounded p-1 text-sm"
                            onclick={async () => {
                                await Server.fetch(
                                    `/blocks/${block["id"]}/call/apply_action`,
                                    "POST",
                                    { "action": "dismiss" }
                                );
                                window.location.reload();
                            }}
                        >Dismiss</button>

                        <button
                            class="cursor-pointer bg-green-300 rounded p-1 text-sm"
                            onclick={async () => {
                                await Server.fetch(
                                    `/blocks/${block["id"]}/call/apply_action`,
                                    "POST",
                                    { "action": "done" }
                                );
                                window.location.reload();
                            }}
                        >Done</button>
                    </div>
                </div>
            {/if}
        {/each}
    </div>
</div>
