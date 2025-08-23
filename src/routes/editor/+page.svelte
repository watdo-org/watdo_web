<script lang="ts">
    import { onMount } from "svelte";
    import Server from "$lib/server";
    import CodeEditor from "$lib/components/code-editor/code-editor.svelte";
    import TopBar from "$lib/components/TopBar.svelte";
    import { type BlockJSON } from "../";

    let blocks: BlockJSON[] = $state([]);
    let editor: CodeEditor | undefined | null;
    let selectedBlock: BlockJSON | null = $state(null);
    let code = $state("");

    $effect(() => {
        if (editor) {
            editor.setup();
        }
    });

    async function fetch() {
        const res = await Server.fetch("/blocks/?parse_if_possible=1");
        blocks = await res.json();
    }

    onMount(async () => {
        await fetch();
    });
</script>

<TopBar />

<div class="flex mt-14">
    <div class="w-64">
        {#each blocks as block (block["id"])}
            <button
                class="w-full h-10 cursor-pointer"
                onclick={() => {
                    selectedBlock = block;
                    code = block["code"];
                    editor?.syncCode();
                }}
            >
                {block["parsed"] === null ? "⚠️ Error ⚠️" : block["parsed"]["title"]}
            </button>
        {/each}

        <button
            class="absolute top-2 left-2 cursor-pointer"
            onclick={async () => {
                await Server.fetch(
                    `/blocks/`,
                    "POST",
                    { "code": "Title: New block...\nSchedule: set" }
                );
                await fetch();
            }}
        >New Block</button>
    </div>

    <div class="grow h-[600px]">
        <CodeEditor
            bind:this={editor}
            bind:code
            language="plaintext"
            theme="vs"
            onSave={async () => {
                await Server.fetch(
                    `/blocks/${selectedBlock!["id"]}`,
                    "PUT",
                    { "code": code }
                );
                await fetch();
            }}
        />
    </div>
</div>
