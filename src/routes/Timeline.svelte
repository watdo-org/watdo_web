<script lang="ts">
    import FirebaseAuth from "$lib/firebase/auth";

    async function handleSignOut() {
        await FirebaseAuth.signOut();
    }
</script>

<div class="font-[Kalam]">
    <div class="absolute top-0 left-0 w-full h-14 bg-white shadow-xs">
        <div class="flex items-center h-full justify-center">
            <button class="m-4 cursor-pointer text-neutral-600">
                Timeline
            </button>
            <button class="m-4 cursor-pointer text-neutral-600">
                Blocks
            </button>
            <button class="m-4 cursor-pointer text-neutral-600">
                Editor
            </button>
            <button class="m-4 cursor-pointer text-neutral-600">
                Help
            </button>
        </div>

        <div class="flex items-center absolute top-0 right-0 h-full px-6 py-3">
            <button on:click={handleSignOut} class="text-neutral-900 cursor-pointer">
                Sign Out
            </button>
        </div>
    </div>
</div>
