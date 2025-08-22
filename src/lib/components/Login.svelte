<script lang="ts">
    import FirebaseAuth from "$lib/firebase/auth";

    let email = "";
    let password = "";
    let error = "";
    let isLoading = false;

    async function handleEmailLogin() {
        if (!email || !password) {
            error = "Please fill in all fields";
            return;
        }

        isLoading = true;
        error = "";

        const result = await FirebaseAuth.signInWithEmail(email, password);

        if (result.success) {
            // Login successful, auth state will update automatically
            error = "";
        } else {
            error = result.error || "Login failed";
        }

        isLoading = false;
    }

    function handleGoogleLogin() {
        // TODO: Implement Google sign-in
        console.log("Google sign-in requested");
    }
</script>

<div class="login-container">
    <div class="login-card">
        <h1>Welcome Back</h1>
        <p class="subtitle">Sign in to your account</p>

        <form on:submit|preventDefault={handleEmailLogin} class="login-form">
            <div class="form-group">
                <label for="email">Email</label>
                <input
                    id="email"
                    type="email"
                    bind:value={email}
                    placeholder="Enter your email"
                    required
                />
            </div>

            <div class="form-group">
                <label for="password">Password</label>
                <input
                    id="password"
                    type="password"
                    bind:value={password}
                    placeholder="Enter your password"
                    required
                />
            </div>

            {#if error}
                <div class="error-message">
                    {error}
                </div>
            {/if}

            <button type="submit" class="btn-primary" disabled={isLoading}>
                {isLoading ? "Signing in..." : "Sign In"}
            </button>
        </form>

        <div class="divider">
            <span>or</span>
        </div>

        <button on:click={handleGoogleLogin} class="btn-google">
            <svg width="20" height="20" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
        </button>
    </div>
</div>

<style>
    .login-container {
        min-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        padding: 20px;
    }

    .login-card {
        background: white;
        border-radius: 12px;
        box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        padding: 40px;
        width: 100%;
        max-width: 400px;
    }

    h1 {
        margin: 0 0 8px 0;
        font-size: 28px;
        font-weight: 700;
        color: #1f2937;
        text-align: center;
    }

    .subtitle {
        margin: 0 0 32px 0;
        color: #6b7280;
        text-align: center;
        font-size: 16px;
    }

    .login-form {
        margin-bottom: 24px;
    }

    .form-group {
        margin-bottom: 20px;
    }

    label {
        display: block;
        margin-bottom: 6px;
        font-weight: 500;
        color: #374151;
        font-size: 14px;
    }

    input {
        width: 100%;
        padding: 12px 16px;
        border: 1px solid #d1d5db;
        border-radius: 8px;
        font-size: 16px;
        transition: border-color 0.2s;
        box-sizing: border-box;
    }

    input:focus {
        outline: none;
        border-color: #667eea;
        box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    }

    .error-message {
        background: #fef2f2;
        color: #dc2626;
        padding: 12px;
        border-radius: 8px;
        margin-bottom: 20px;
        font-size: 14px;
        border: 1px solid #fecaca;
    }

    .btn-primary {
        width: 100%;
        background: #667eea;
        color: white;
        border: none;
        padding: 14px;
        border-radius: 8px;
        font-size: 16px;
        font-weight: 600;
        cursor: pointer;
        transition: background-color 0.2s;
    }

    .btn-primary:hover:not(:disabled) {
        background: #5a67d8;
    }

    .btn-primary:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }

    .divider {
        text-align: center;
        margin: 24px 0;
        position: relative;
    }

    .divider::before {
        content: "";
        position: absolute;
        top: 50%;
        left: 0;
        right: 0;
        height: 1px;
        background: #e5e7eb;
    }

    .divider span {
        background: white;
        padding: 0 16px;
        color: #6b7280;
        font-size: 14px;
    }

    .btn-google {
        width: 100%;
        background: white;
        color: #374151;
        border: 1px solid #d1d5db;
        padding: 14px;
        border-radius: 8px;
        font-size: 16px;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.2s;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 12px;
    }

    .btn-google:hover {
        background: #f9fafb;
        border-color: #9ca3af;
    }
</style>
