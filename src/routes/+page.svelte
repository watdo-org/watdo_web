<script lang="ts">
    import FirebaseAuth, { type User } from "$lib/firebase/auth";
    import Login from "$lib/components/Login.svelte";
    import Home from "$lib/components/Home.svelte";

    let user: User | null = $state(null);
    let isLoading: boolean = $state(true);

    FirebaseAuth.onAuthStateChange((_user) => {
        user = _user;
        isLoading = false;
    });
</script>

{#if isLoading}
    <div class="loading-container">
        <div class="loading-spinner"></div>
        <p>Loading...</p>
    </div>
{:else if user}
    <Home />
{:else}
    <Login />
{/if}

<style>
    .loading-container {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background: #f8fafc;
    }

    .loading-spinner {
        width: 40px;
        height: 40px;
        border: 4px solid #e5e7eb;
        border-top: 4px solid #667eea;
        border-radius: 50%;
        animation: spin 1s linear infinite;
        margin-bottom: 16px;
    }

    p {
        color: #6b7280;
        font-size: 16px;
    }

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
</style>
