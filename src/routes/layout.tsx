import {
	component$,
	Slot,
	useStylesScoped$,
	useOnDocument,
	$,
	useStore,
	useSignal,
	useVisibleTask$,
} from '@builder.io/qwik'
import { routeLoader$ } from '@builder.io/qwik-city'
import type { RequestHandler } from '@builder.io/qwik-city'

import Header from '../components/layout/header/header'
import Footer from '../components/layout/footer/footer'

import styles from './layout.scss?inline'

export const onGet: RequestHandler = async ({ cacheControl }) => {
	// Control caching for this request for best performance and to reduce hosting costs:
	// https://qwik.builder.io/docs/caching/
	cacheControl({
		// Always serve a cached response by default, up to a week stale
		staleWhileRevalidate: 60 * 60 * 24 * 7,
		// Max once every 5 seconds, revalidate on the server to get a fresh version of this page
		maxAge: 5,
	})
}

export const useServerTimeLoader = routeLoader$(() => {
	return {
		date: new Date().toISOString(),
	}
})

const ballStyle = (x: number, y: number, w: number, h: number) => {
	const ww = w + 18
	const hh = h + 18

	const translate = `translate(
		clamp(0px, ${x}px, 100dvw - ${ww}px),
		clamp(0px, ${y}px, 100dvh - ${hh}px)
	);`

	return {
		transform: translate,
		transition: 'transform 100ms ease-out',
	}
}

export default component$(() => {
	useStylesScoped$(styles)

	const pos = useStore({ x: 0, y: 0 })
	const size = useStore({ w: 0, h: 0 })
	const reduce = useSignal(false)
	const ballRef = useSignal<Element>()

	// eslint-disable-next-line qwik/no-use-visible-task
	useVisibleTask$(() => {
		const isReduced = window.matchMedia(
			'(prefers-reduced-motion: reduce)',
		).matches
		reduce.value = isReduced

		if (isReduced) return

		const ball = ballRef.value
		if (ball) {
			const rect = ball.getBoundingClientRect()
			size.w = Math.round(rect.width)
			size.h = Math.round(rect.height)
		}
	})

	return (
		<>
			<div
				class='z-10 h-full w-full overflow-auto rounded-lg border-2 border-surface-900 border-opacity-50 backdrop-blur-3xl [&~:not(.pointer-events-none)]:hidden'
				onMouseMove$={({ x, y }) => {
					if (reduce.value) return
					const wx = x - size.w * 0.575
					const wy = y - size.h * 0.575
					pos.x = wx
					pos.y = wy
				}}
			>
				<div class='m-auto grid h-full w-full max-w-screen-xl grid-cols-2 gap-4 px-24'>
					<Header />
					<article class='col-start-2 py-24'>
						<main>
							<Slot />
						</main>
						<Footer />
					</article>
				</div>
			</div>
			<div
				ref={ballRef}
				class='pointer-events-none absolute left-2 top-2 z-[9] h-64 w-64 rounded-full bg-surface-800 opacity-50'
				style={ballStyle(pos.x, pos.y, size.w, size.h)}
				aria-hidden
			/>
		</>
	)
})
