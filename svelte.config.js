import { vitePreprocess } from '@sveltejs/kit/vite';
import adapter from "@sveltejs/adapter-netlify";

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter({
			edge: true
		})
	},
  preprocess: vitePreprocess()
};

export default config;
