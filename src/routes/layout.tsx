import {
	component$,
	Slot,
	$,
	useStore,
	useSignal,
	useComputed$,
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

export default component$(() => {
	const reduce = useSignal(false)
	const ref = useSignal<Element>()
	const rect = useStore({ w: 0, h: 0, x: 0, y: 0 })
	const pos = useComputed$(() => ({
		x: (rect.x - rect.w * 0.5) & 0xffffffffffff,
		y: (rect.y - rect.h * 0.525) & 0xffffffffffff,
	}))

	const mediaPreferenceUpdate$ = $(async () => {
		const prefReduce = window.matchMedia('(prefers-reduced-motion: reduce)')
		await Promise.resolve(prefReduce.matches).then(
			() => (reduce.value = prefReduce.matches),
		)
	})

	const rectUpdate$ = $(async () => {
		if (ref.value) {
			const rectElement = ref.value.getBoundingClientRect()
			await Promise.resolve(rectElement).then(({ width, height }) => {
				rect.w = (width + 18) & 0xffffffffffff
				rect.h = (height + 18) & 0xffffffffffff
			})
		}
	})

	return (
		<>
			<div
				class='relative z-10 grid h-full w-full grid-rows-[auto_1fr] overflow-y-auto scroll-smooth rounded-lg border-2 border-surface-900 border-opacity-50 backdrop-blur-4xl scrollbar-none scrollbar-thumb-primary-700 [&~:not(.pointer-events-none)]:hidden'
				id='layout'
				onMouseEnter$={async () => {
					await mediaPreferenceUpdate$()
					if (reduce.value) return
					await rectUpdate$()
				}}
				onMouseMove$={async ({ x, y }) => {
					if (reduce.value) return
					await Promise.resolve((rect.x = x))
					await Promise.resolve((rect.y = y))
				}}
			>
				<Slot />
			</div>
			<rect
				class='pointer-events-none fixed left-2 top-2 h-64 w-64 rounded-full bg-primary-500 opacity-50 will-change-transform'
				ref={ref}
				aria-hidden
				style={{
					transition: 'transform 100ms ease-out',
					transform: `translate3d(clamp(2px,${pos.value.x}px,var(--vw) - ${rect.w}px),clamp(2px,${pos.value.y}px,var(--vh) - ${rect.h}px),0px);`,
				}}
			/>
		</>
	)
})
