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

<div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600 p-5">
    <div class="bg-white rounded-xl shadow-2xl p-10 w-full max-w-md">
        <h1 class="m-0 mb-2 text-3xl font-bold text-gray-800 text-center">Welcome Back</h1>
        <p class="m-0 mb-8 text-gray-600 text-center text-base">Sign in to your account</p>

        <form on:submit|preventDefault={handleEmailLogin} class="mb-6">
            <div class="mb-5">
                <label for="email" class="block mb-1.5 font-medium text-gray-700 text-sm">Email</label>
                <input
                    id="email"
                    type="email"
                    bind:value={email}
                    placeholder="Enter your email"
                    required
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg text-base transition-colors duration-200 focus:outline-none focus:border-indigo-500 focus:ring-3 focus:ring-indigo-100 box-border"
                />
            </div>

            <div class="mb-5">
                <label for="password" class="block mb-1.5 font-medium text-gray-700 text-sm">Password</label>
                <input
                    id="password"
                    type="password"
                    bind:value={password}
                    placeholder="Enter your password"
                    required
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg text-base transition-colors duration-200 focus:outline-none focus:border-indigo-500 focus:ring-3 focus:ring-indigo-100 box-border"
                />
            </div>

            {#if error}
                <div class="bg-red-50 text-red-600 px-3 py-3 rounded-lg mb-5 text-sm border border-red-200">
                    {error}
                </div>
            {/if}

            <button type="submit" class="w-full bg-indigo-500 hover:bg-indigo-600 disabled:opacity-60 disabled:cursor-not-allowed text-white border-none py-3.5 rounded-lg text-base font-semibold cursor-pointer transition-colors duration-200" disabled={isLoading}>
                {isLoading ? "Signing in..." : "Sign In"}
            </button>
        </form>

        <div class="text-center my-6 relative">
            <div class="absolute top-1/2 left-0 right-0 h-px bg-gray-200"></div>
            <span class="bg-white px-4 text-gray-600 text-sm">or</span>
        </div>

        <button on:click={handleGoogleLogin} class="w-full bg-white text-gray-700 border border-gray-300 py-3.5 rounded-lg text-base font-medium cursor-pointer transition-all duration-200 flex items-center justify-center gap-3 hover:bg-gray-50 hover:border-gray-400">
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
