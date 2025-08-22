<script lang="ts">
    import CodeEditor from "$lib/components/code-editor/code-editor.svelte";

    let editor: CodeEditor | undefined | null;
    let code = $state("");

    $effect(() => {
        if (editor) {
            editor.setup();
        }
    });
</script>

<div class="w-full h-[600px]">
    <CodeEditor
        bind:this={editor}
        bind:code
        language="plaintext"
        theme="vs"
        onSave={() => {}}
    />
</div>
