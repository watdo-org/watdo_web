<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import FirebaseAuth, { type User } from "$lib/firebase/auth";
	import Login from "./Login.svelte";

	let { children } = $props();
	let user: User | null = $state(null);
    let isLoading: boolean = $state(true);

    FirebaseAuth.onAuthStateChange((_user) => {
        user = _user;
        isLoading = false;
    });
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{#if isLoading}
    <div class="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <div class="w-10 h-10 border-4 border-gray-200 border-t-indigo-500 rounded-full animate-spin mb-4"></div>
        <p class="text-gray-600 text-base">Loading...</p>
    </div>
{:else if user}
	{@render children?.()}
{:else}
    <Login />
{/if}
