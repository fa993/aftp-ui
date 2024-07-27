import { defineConfig, loadEnv } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode, ssrBuild }) => {
	const env = loadEnv(mode, process.cwd(), '');
	return {
		define: {
			__subpath__: JSON.stringify(env.SUBPATH ?? '/'),
		},
		mode: 'development',
		base: env.SUBPATH ?? '/',
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
	};
});
