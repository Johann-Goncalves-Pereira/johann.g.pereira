import scrollbar from 'tailwind-scrollbar'

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
	theme: {
		colors: {
			inherit: 'inherit',
			current: 'currentColor',
			transparent: 'transparent',
			surface: {
				700: 'hsl(var(--color-values-surface-700) / <alpha-value>) /* hsl(40, 4%, 86%) */',
				800: 'hsl(var(--color-values-surface-800) / <alpha-value>) /* hsl(34, 6%, 76%) */',
				900: 'hsl(var(--color-values-surface-900) / <alpha-value>) /* hsl(38, 16%, 24%) */',
				950: 'hsl(var(--color-values-surface-950) / <alpha-value>) /* hsl(46, 100%, 3%) */',
			},
			primary: {
				500: 'hsl(var(--color-values-primary-500) / <alpha-value>) /* hsl(17, 83%, 46%) */',
				700: 'hsl(var(--color-values-primary-700) / <alpha-value>) /* hsl(25, 85%, 8%) */',
			},
		},
		fontFamily: {
			comic: '"Shantell Sans", "Comic Sans MS", "Comic Sans", cursive',
		},
		extend: {
			gridTemplateColumns: {
				table: '4ch 1fr 12ch repeat(2, 1fr)',
			},
			width: {
				dvw: 'var(--vw)',
			},
			height: {
				dvh: 'var(--vh)',
			},
			transitionDuration: '50ms',
			transitionProperty: {
				width: 'width',
			},
			backdropBlur: {
				'4xl': '96px',
			},
		},
	},
	plugins: [scrollbar],
}
