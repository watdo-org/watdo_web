<script lang="ts">
    import { onMount } from "svelte";
    import Server from "$lib/server";
    import CodeEditor from "$lib/components/code-editor/code-editor.svelte";
    import TopBar from "$lib/components/TopBar.svelte";

    let blocks = $state([]);
    let editor: CodeEditor | undefined | null;
    let selectedBlock = $state(null);
    let code = $state("");

    $effect(() => {
        if (editor) {
            editor.setup();
        }
    });

    onMount(async () => {
        const res = await Server.fetch("/blocks/");
        blocks = await res.json();
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
                {block["parsed"]["title"]}
            </button>
        {/each}
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
            }}
        />
    </div>
</div>
