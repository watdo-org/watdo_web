<script lang="ts">
    import CodeEditor from "$lib/components/code-editor/code-editor.svelte";
    import TopBar from "$lib/components/TopBar.svelte";

    let editor: CodeEditor | undefined | null;
    let code = $state("");

    $effect(() => {
        if (editor) {
            editor.setup();
        }
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
