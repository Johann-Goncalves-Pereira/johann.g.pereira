import { component$, Slot, $, useStore, useSignal } from '@builder.io/qwik'
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

export default component$(() => {
	const pos = useStore({ x: 0, y: 0 })
	const size = useStore({ w: 0, h: 0 })
	const reduce = useSignal(false)
	const elRef = useSignal<Element>()

	const mediaPreferenceUpdate$ = $(async () => {
		const prefReduce = window.matchMedia('(prefers-reduced-motion: reduce)')
		reduce.value = prefReduce.matches
	})

	const ballUpdate$ = $(async () => {
		const ball = elRef.value
		if (ball) {
			const rect = ball.getBoundingClientRect()
			size.w = Math.round(rect.width)
			size.h = Math.round(rect.height)
		}
	})

	const mouseUpdate$ = $(async (x: number, y: number) => {
		if (reduce.value) return
		const wx = x - size.w * 0.575
		const hy = y - size.h * 0.575
		pos.x = wx
		pos.y = hy
	})

	return (
		<>
			<div
				class='relative z-10 grid h-full w-full grid-rows-[auto_1fr] overflow-y-auto scroll-smooth rounded-lg border-2 border-surface-900 border-opacity-50 backdrop-blur-[6rem] scrollbar-none scrollbar-thumb-primary-700 [&~:not(.pointer-events-none)]:hidden'
				onMouseMove$={async ({ x, y }) => await mouseUpdate$(x, y)}
			>
				<Slot />
			</div>
			<spam
				ref={elRef}
				class='pointer-events-none absolute left-2 top-2 -z-10 h-64 w-64 transform-gpu rounded-full bg-primary-500 opacity-50 will-change-transform'
				style={ballStyle({ x: pos.x, y: pos.y, w: size.w, h: size.h })}
				aria-hidden
				onQVisible$={async () => {
					await mediaPreferenceUpdate$()
					if (reduce.value) return
					await ballUpdate$()
				}}
			/>
		</>
	)
})

interface ballStyleProps {
	x: number
	y: number
	w: number
	h: number
}

const ballStyle = ({ x, y, w, h }: ballStyleProps) => {
	const translate = `translate(
		clamp(2px, ${x}px, 100dvw - ${w + 18}px),
		clamp(2px, ${y}px, 100dvh - ${h + 18}px)
	);`

	return {
		transform: translate,
		transition: 'transform 100ms ease-out',
	}
}
