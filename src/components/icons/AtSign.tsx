import type { SVGProps } from '@builder.io/qwik'
import { component$ } from '@builder.io/qwik'

const AtSign = component$((rest: SVGProps<SVGSVGElement>) => {
	return (
		<svg
			xmlns={rest.xmlns || 'http://www.w3.org/2000/svg'}
			width={rest.width || '24'}
			height={rest.height || '24'}
			viewBox={rest.viewBox || '0 0 24 24'}
			fill={rest.fill || 'none'}
			stroke={rest.stroke || 'currentColor'}
			stroke-width={rest['stroke-width'] || '2'}
			stroke-linecap={rest['stroke-linecap'] || 'round'}
			stroke-linejoin={rest['stroke-linejoin'] || 'round'}
			{...rest}
		>
			<circle cx='12' cy='12' r='4' />
			<path d='M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8' />
		</svg>
	)
})

export default AtSign
