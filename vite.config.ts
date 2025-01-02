import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    plugins: [react()],
    optimizeDeps: {
      exclude: ["lucide-react"],
    },
    define: {
      __VITE_SUPABASE_URL__: JSON.stringify(env.VITE_SUPABASE_URL),
      __VITE_SUPABASE_ANON_KEY__: JSON.stringify(env.VITE_SUPABASE_ANON_KEY),
      __VITE_CLERK_PUBLISHABLE_KEY__: JSON.stringify(
        env.VITE_CLERK_PUBLISHABLE_KEY
      ),
    },
  };
});
