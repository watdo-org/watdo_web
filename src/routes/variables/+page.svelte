<script lang="ts">
    import { onMount } from "svelte";
    import Server from "$lib/server";
    import TopBar from "$lib/components/TopBar.svelte";
    import CodeEditor from "$lib/components/code-editor/code-editor.svelte";

    let variables: {[key: string]: string} = $state({});
    let editor: CodeEditor | undefined | null;

    $effect(() => {
        if (editor) {
            editor.setup();
        }
    });

    onMount(async () => {
        const res = await Server.fetch("/variables/");
        variables = await res.json();
        editor!.syncCode();
    });
</script>

<TopBar />

<div class="mt-14 w-full h-[calc(100vh-56px)]">
    <CodeEditor
        bind:this={editor}
        code={JSON.stringify(variables, null, "\t")}
        language="plaintext"
        theme="vs"
        onSave={async () => {
            variables = JSON.parse(editor!.code);
            await Server.fetch("/variables/", "PUT", { "variables": variables });
            alert(editor!.code);
        }}
    />
</div>
