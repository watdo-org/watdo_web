<script lang="ts">
    import { onMount } from "svelte";
    import Server from "$lib/server";
    import CodeEditor from "$lib/components/code-editor/code-editor.svelte";
    import TopBar from "$lib/components/TopBar.svelte";

    let blocksLoading = $state(true);
    let blocks = $state([]);

    let editor: CodeEditor | undefined | null;
    let code = $state("");

    $effect(() => {
        if (editor) {
            editor.setup();
        }
    });

    onMount(async () => {
        const res = await Server.fetch("/blocks/");
        blocks = await res.json();
        blocksLoading = false;
    });
</script>

<TopBar />

<div class="w-full h-[600px] mt-14">
    <CodeEditor
        bind:this={editor}
        bind:code
        language="plaintext"
        theme="vs"
        onSave={() => {}}
    />
</div>
