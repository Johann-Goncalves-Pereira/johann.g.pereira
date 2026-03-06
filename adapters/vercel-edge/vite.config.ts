import { vercelEdgeAdapter } from '@builder.io/qwik-city/adapters/vercel-edge/vite'
import { extendConfig } from '@builder.io/qwik-city/vite'
import baseConfig from '../../vite.config'

export default extendConfig(baseConfig, () => {
	return {
		build: {
			ssr: true,
			rollupOptions: {
				input: ['src/entry.vercel-edge.tsx', '@qwik-city-plan'],
			},
			// The Vercel Edge adapter outputs the server function to this directory.
			// Keep `vercel.json` headers aligned: static assets are served by Vercel
			// (use long immutable caching for fingerprinted assets), while HTML
			// responses are controlled at runtime by the edge function (`entry.vercel-edge.tsx`).
			outDir: '.vercel/output/functions/_qwik-city.func',
		},
		plugins: [vercelEdgeAdapter()],
	}
})
