<script lang="ts">
    import FirebaseAuth from "$lib/firebase/auth";

    async function handleSignOut() {
        await FirebaseAuth.signOut();
    }
</script>

<div class="home-container">
    <div class="header">
        <h1>Welcome to WatDo</h1>
        <button on:click={handleSignOut} class="sign-out-btn">
            Sign Out
        </button>
    </div>

    <div class="welcome-section">
        <p>You are logged in as: {FirebaseAuth.user?.email}</p>
        <div class="placeholder-content">
            <p>This is your home page. Content will be added here later.</p>
        </div>
    </div>
</div>

<style>
    .home-container {
        min-height: 100vh;
        padding: 40px 20px;
        background: #f8fafc;
    }

    .header {
        max-width: 800px;
        margin: 0 auto 40px auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    h1 {
        font-size: 48px;
        font-weight: 700;
        color: #1f2937;
        margin: 0;
    }

    .sign-out-btn {
        background: #ef4444;
        color: white;
        border: none;
        padding: 12px 24px;
        border-radius: 8px;
        font-size: 16px;
        font-weight: 500;
        cursor: pointer;
        transition: background-color 0.2s;
    }

    .sign-out-btn:hover {
        background: #dc2626;
    }

    .welcome-section {
        max-width: 800px;
        margin: 0 auto;
        text-align: center;
    }

    p {
        font-size: 18px;
        color: #6b7280;
        margin-bottom: 32px;
    }

    .placeholder-content {
        background: white;
        border-radius: 12px;
        padding: 40px;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        border: 2px dashed #d1d5db;
    }

    .placeholder-content p {
        color: #9ca3af;
        font-style: italic;
        margin: 0;
    }
</style>
