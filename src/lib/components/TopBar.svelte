<script lang="ts">
    import { goto } from "$app/navigation";
    import { resolve } from "$app/paths";
    import FirebaseAuth from "$lib/firebase/auth";

    async function handleSignOut() {
        await FirebaseAuth.signOut();
    }
</script>

<div class="font-[Kalam]">
    <div class="absolute top-0 left-0 w-full h-14 bg-white shadow-xs">
        <div class="flex items-center h-full justify-center">
            <button
                class="m-4 cursor-pointer text-neutral-600"
                onclick={() => goto(resolve("/"))}
            >
                Timeline
            </button>
            <button
                class="m-4 cursor-pointer text-neutral-600"
                onclick={() => goto(resolve("/editor"))}
            >
                Editor
            </button>
            <button
                class="m-4 cursor-pointer text-neutral-600"
                onclick={() => goto(resolve("/variables"))}
            >
                Variables
            </button>
        </div>

        <div class="flex items-center absolute top-0 right-0 h-full px-6 py-3">
            <button onclick={handleSignOut} class="text-neutral-900 cursor-pointer">
                Sign Out
            </button>
        </div>
    </div>
</div>
