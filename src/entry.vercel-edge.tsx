/*
 * WHAT IS THIS FILE?
 *
 * It's the entry point for Vercel Edge when building for production.
 *
 * Learn more about the Vercel Edge integration here:
 * - https://qwik.builder.io/docs/deployments/vercel-edge/
 *
 */
import {
	createQwikCity,
	type PlatformVercel,
} from '@builder.io/qwik-city/middleware/vercel-edge'
import qwikCityPlan from '@qwik-city-plan'
import { manifest } from '@qwik-client-manifest'
import render from './entry.ssr'

declare global {
	interface QwikCityPlatform extends PlatformVercel {}
}

// Create the Qwik City Vercel Edge handler
const qwikCityHandler = createQwikCity({ render, qwikCityPlan, manifest })

// Wrap the handler to apply caching headers for HTML/SSR responses.
// Static assets are served from Vercel's static file handling (see vercel.json).
export default async (request: Request) => {
	const response = await qwikCityHandler(request)

	try {
		const contentType = response.headers.get('content-type') || ''

		// Only modify HTML responses (pages). Leave assets and other responses untouched.
		if (contentType.includes('text/html')) {
			const headers = new Headers(response.headers)

			// Long edge cache per your preference: 24h edge TTL, clients always revalidate.
			headers.set(
				'Cache-Control',
				'public, max-age=0, s-maxage=86400, stale-while-revalidate=3600',
			)

			return new Response(response.body, {
				status: response.status,
				statusText: response.statusText,
				headers,
			})
		}
	} catch (e) {
		console.error('Error applying caching headers:', e)
	}

	return response
}
