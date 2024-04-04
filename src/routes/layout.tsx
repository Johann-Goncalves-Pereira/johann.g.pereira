import {
	component$,
	Slot,
	useOnDocument,
	$,
	useStore,
	useSignal,
} from '@builder.io/qwik'
import { routeLoader$ } from '@builder.io/qwik-city'
import type { RequestHandler } from '@builder.io/qwik-city'

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
		clamp(2px, ${x}px, 100dvw - ${ww}px),
		clamp(2px, ${y}px, 100dvh - ${hh}px)
	);`

	return {
		transform: translate,
		transition: 'transform 100ms ease-out',
	}
}

export default component$(() => {
	const pos = useStore({ x: 0, y: 0 })
	const size = useStore({ w: 0, h: 0 })
	const reduce = useSignal(false)
	const ballRef = useSignal<Element>()

	useOnDocument(
		'qinit',
		$(() => {
			const preferReduceMotion = window.matchMedia(
				'(prefers-reduced-motion: reduce)',
			)
			reduce.value = preferReduceMotion.matches

			const ball = ballRef.value
			if (ball) {
				const rect = ball.getBoundingClientRect()
				size.w = Math.round(rect.width)
				size.h = Math.round(rect.height)
			}
		}),
	)

	return (
		<>
			<div
				class='relative z-10 grid h-full w-full overflow-y-auto scroll-smooth rounded-lg border-2 border-surface-900 border-opacity-50 backdrop-blur-[6rem] scrollbar-none scrollbar-thumb-primary-700 [&~:not(.pointer-events-none)]:hidden'
				onMouseMove$={({ x, y }) => {
					if (reduce.value) return
					const wx = x - size.w * 0.575
					const wy = y - size.h * 0.575
					pos.x = wx
					pos.y = wy
				}}
			>
				<Slot />
			</div>
			<div
				ref={ballRef}
				class='pointer-events-none absolute left-2 top-2 z-[9] h-64 w-64 transform-gpu rounded-full bg-primary-500 opacity-50 will-change-transform'
				style={ballStyle(pos.x, pos.y, size.w, size.h)}
				aria-hidden
			/>
		</>
	)
})
