<script lang="ts">
    import FirebaseAuth from "$lib/firebase/auth";
    import CodeEditor from "$lib/components/code-editor/code-editor.svelte";

    let editor: CodeEditor | undefined | null;

    $effect(() => {
        if (editor) {
            editor.setup();
        }
    });

    async function handleSignOut() {
        await FirebaseAuth.signOut();
    }

    let editorContent = "Welcome to WatDo!\n\nThis is a plain text editor powered by Monaco Editor.\nYou can start typing here to create your content.\n\nFeatures:\n- Plain text editing\n- Line numbers\n- Word wrap\n- Responsive design";
</script>

<div class="h-full bg-gray-50 p-10">
    <div class="max-w-4xl mx-auto mb-10 flex justify-between items-center">
        <button on:click={handleSignOut} class="bg-red-500 hover:bg-red-600 text-white border-none px-6 py-3 rounded-lg text-base font-medium cursor-pointer transition-colors duration-200">
            Sign Out
        </button>
    </div>

    <div class="w-full h-[600px]">
        <CodeEditor
            bind:this={editor}
            bind:code={editorContent}
            language="plaintext"
            theme="vs"
            onSave={() => {}}
        />
    </div>
</div>
