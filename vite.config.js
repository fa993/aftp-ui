import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';

// https://vitejs.dev/config/
export default defineConfig({
	mode: 'development',
	plugins: [
		svelte({
			experimental: {
				dynamicCompileOptions({ filename, compileOptions }) {
					// Dynamically set hydration per Svelte file
					return { dev: true };
				},
			},
			compilerOptions: {
				dev: true,
			},
		}),
	],
});
