import type { SVGProps } from '@builder.io/qwik'
import { component$ } from '@builder.io/qwik'

const UpWork = component$((rest: SVGProps<SVGSVGElement>) => {
	return (
		<svg
			width={rest.width || '366'}
			height={rest.height || '227'}
			viewBox={rest.viewBox || '0 0 366 227'}
			fill={rest.fill || 'none'}
			{...rest}
		>
			<path
				d='M282.1 0C235.3 0 209.1 30.5 201.6 61.9C193.1 45.9 186.8 24.5 181.9 4.6H117.2V85.1C117.2 114.3 103.9 135.9 77.9 135.9C51.9 135.9 37 114.3 37 85.1L37.3 4.6H0V85.1C0 108.6 7.6 129.9 21.5 145.1C35.8 160.8 55.3 169 77.9 169C122.9 169 154.3 134.5 154.3 85.1V31C159 48.8 170.2 83 191.6 113L171.6 226.9H209.5L222.7 146.2C227 149.8 231.6 153 236.5 155.9C249.2 163.9 263.7 168.4 278.7 168.9C278.7 168.9 281 169 282.2 169C328.6 169 365.5 133.1 365.5 84.6C365.5 36.1 328.5 0 282.1 0ZM282.1 135.8C253.4 135.8 234.4 113.6 229.1 105C235.9 50.6 255.8 33.4 282.1 33.4C308.1 33.4 328.3 54.2 328.3 84.6C328.3 115 308.1 135.8 282.1 135.8Z'
				fill='currentColor'
			/>
		</svg>
	)
})

export default UpWork
