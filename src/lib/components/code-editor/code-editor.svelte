<svelte:options accessors />

<script lang="ts">
    import { onDestroy } from "svelte";
    import type * as Monaco from "monaco-editor/esm/vs/editor/editor.api";

    export let code: string;
    export let language: string;
    export let theme: string = "vs-dark";
    export let onSave: () => void;
    export let onChange: ((value: string) => void) | null = null;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    export let keyBinds: ((e: Monaco.IKeyboardEvent) => any)[] = [];

    export function syncCode() {
        model?.setValue(code);
    }

    export function isChanged() {
        return initialCode !== code;
    }

    const editorOptions: Monaco.editor.IStandaloneEditorConstructionOptions = {
        theme: theme,
        automaticLayout: true,
        renderWhitespace: "trailing",
        trimAutoWhitespace: false,
        fontFamily: "monospace",
        cursorStyle: "line-thin",
        comments: { ignoreEmptyLines: false },
        dragAndDrop: false,
        fastScrollSensitivity: 10,
        foldingHighlight: false,
        guides: {
            bracketPairs: "active",
            bracketPairsHorizontal: false,
        },
        linkedEditing: true,
        occurrencesHighlight: "off",
        overviewRulerBorder: false,
        renderLineHighlight: "all",
        roundedSelection: false,
        scrollbar: {
            verticalScrollbarSize: 8,
            horizontalScrollbarSize: 8,
        },
        scrollBeyondLastColumn: 1,
        showFoldingControls: "always",
        smoothScrolling: true,
        stickyTabStops: true,
        cursorBlinking: "phase",
        acceptSuggestionOnEnter: "off",
        suggest: { preview: true },
        multiCursorModifier: "ctrlCmd",
        mouseWheelZoom: true,
        wordSeparators: "./\\\\()\\\"':,.;<>~!@#$%^&*|+=[]{}`~?",
        minimap: { showSlider: "always" },
    };

    let initialCode: string;
    let monaco: typeof Monaco;
    let editor: Monaco.editor.IStandaloneCodeEditor;
    let editorContainer: HTMLElement;
    let model: Monaco.editor.ITextModel;

    function createContainer(): HTMLElement {
        const outer = document.createElement("div");
        const inner = document.createElement("div");

        inner.classList.add("h-full");
        outer.classList.add("h-full");

        outer.appendChild(inner);
        document.getElementById("code-editor")!.appendChild(outer);

        return inner;
    }

    export async function setup() {
        if (editorContainer) {
            editorContainer.parentElement!.remove();
        }

        editorContainer = createContainer();
        monaco = (await import("./monaco")).default;

        editor = monaco.editor.create(editorContainer, editorOptions);
        model = monaco.editor.createModel(code, language);
        editor.setModel(model);

        initialCode = code;

        model.onDidChangeContent(() => {
            const value = model.getValue();
            code = value;
            if (onChange !== null) onChange(value);
        });

        editor.onKeyDown((e: Monaco.IKeyboardEvent) => {
            if (e.keyCode === 49 && e.ctrlKey) {
                // Ctrl + s
                e.preventDefault();
                onSave();
            }
        });

        for (const listener of keyBinds) {
            editor.onKeyDown(listener);
        }
    }

    onDestroy(() => {
        monaco?.editor.getModels().forEach((model) => model.dispose());
        editor?.dispose();
    });
</script>

<div id="code-editor" class="h-full"></div>
