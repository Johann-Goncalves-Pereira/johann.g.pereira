import {
	component$,
	useSignal,
	$,
	useOnDocument,
	useVisibleTask$,
	useTask$,
	useOn,
} from '@builder.io/qwik'
import { JSX } from '@builder.io/qwik/jsx-runtime'
import { twMerge } from 'tailwind-merge'

export default component$(() => {
	const currentSection = useSignal('about')

	useOn(
		'qvisible',
		$(() => {
			const observer = new IntersectionObserver(entries => {
				entries.forEach(
					entry => {
						if (
							!entry.isIntersecting &&
							currentSection.value !== 'about' &&
							entry.target.id === 'projects'
						)
							currentSection.value = 'experience'

						if (!entry.isIntersecting) return
						if (entry.isIntersecting) currentSection.value = entry.target.id
					},
					{ rootMargin: '-96px' },
				)
			})

			const elements = document.querySelectorAll(
				'#about, #experience, #projects',
			)

			if (elements.length > 0)
				elements.forEach(element => {
					observer.observe(element)
				})

			return () => observer.disconnect()
		}),
	)

	return (
		<header class='pointer-events-none flex h-full w-auto flex-col place-content-center justify-between gap-y-24 px-4 pr-2 pt-24 md:px-10 lg:sticky lg:top-0 lg:z-10 lg:mx-auto lg:w-1/2 lg:max-w-screen-sm lg:-translate-x-1/2 lg:pb-28 lg:pl-16 lg:pr-0 lg:pt-28'>
			<div class='pointer-events-auto grid gap-24'>
				<div>
					<h1 class='text-5xl font-bold'>Johann Pereira</h1>
					<h2 class='mt-3 text-2xl font-normal'>Senior Frontend Engineer</h2>
					<h3 class='mt-4'>
						I build pixel-perfect, engaging,
						<br />
						and accessible digital experiences.
					</h3>
				</div>

				<nav class='pointer-events-auto grid gap-y-4 font-medium uppercase'>
					{['about', 'experience', 'projects'].map(title => (
						<a
							class={twMerge(
								'flex items-center gap-4 opacity-75 hover:opacity-100 focus-visible:opacity-100 [&>span]:hover:w-16 [&>span]:focus-visible:w-16 ',
								`${currentSection.value === title && 'opacity-100 [&>span]:w-16'}`,
							)}
							href={`#${title}`}
							key={`${title}`}
						>
							<span class='h-px w-8 bg-surface-700 transition-width'></span>{' '}
							{title}
						</a>
					))}
				</nav>
			</div>
			<nav class='pointer-events-auto mt-auto flex gap-4'>
				{socials.map((social: SocialProps) => {
					return (
						<a
							class='block opacity-75 transition-opacity hover:opacity-100 focus-visible:opacity-100'
							href={social.href}
							target='_blank'
							rel='noreferrer noopener'
							aria-label={`${social.title} (opens in a new tab)`}
							title={social.title}
							key={social.title}
						>
							<span class='sr-only'>{social.title}</span>
							{social.icon}
						</a>
					)
				})}
			</nav>
		</header>
	)
})

interface SocialProps {
	title: string
	href: string
	icon: JSX.Element
}

const socials: SocialProps[] = [
	{
		title: 'GitHub',
		href: 'https://github.com/brittanychiang',
		icon: (
			<svg
				xmlns='http://www.w3.org/2000/svg'
				viewBox='0 0 16 16'
				fill='currentColor'
				class='h-6 w-6'
				aria-hidden='true'
				data-darkreader-inline-fill=''
				style='--darkreader-inline-fill: currentColor;'
			>
				<path d='M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z' />
			</svg>
		),
	},
	{
		title: 'LinkedIn',
		href: 'https://www.linkedin.com/in/brittanychiang/',
		icon: (
			<svg
				xmlns='http://www.w3.org/2000/svg'
				viewBox='0 0 24 24'
				fill='currentColor'
				class='h-6 w-6'
				aria-hidden='true'
				data-darkreader-inline-fill=''
				style='--darkreader-inline-fill: currentColor;'
			>
				<path d='M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z' />
			</svg>
		),
	},
	{
		title: 'CodePen',
		href: 'https://codepen.io/brittanychiang/',
		icon: (
			<svg
				xmlns='http://www.w3.org/2000/svg'
				viewBox='0 0 64 64'
				fill='none'
				stroke='currentColor'
				stroke-width='2'
				stroke-linecap='round'
				stroke-linejoin='round'
				class='h-6 w-6'
				aria-hidden='true'
				data-darkreader-inline-stroke=''
				style='--darkreader-inline-stroke: currentColor;'
			>
				<path
					d='M3.06 41.732L32 60.932l28.94-19.2V22.268L32 3.068l-28.94 19.2zm57.878 0L32 22.268 3.06 41.732m0-19.463L32 41.47l28.94-19.2M32 3.068v19.2m0 19.463v19.2'
					stroke-width='5'
				/>
			</svg>
		),
	},
	{
		title: 'Twitter',
		href: 'https://twitter.com/bchiang7',
		icon: (
			<svg
				xmlns='http://www.w3.org/2000/svg'
				viewBox='0 0 1200 1227'
				fill='none'
				class='h-5 w-5'
				aria-hidden='true'
			>
				<path
					d='M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z'
					fill='currentColor'
					data-darkreader-inline-fill=''
					style='--darkreader-inline-fill: currentColor;'
				/>
			</svg>
		),
	},
	{
		title: 'Goodreads',
		href: 'https://www.goodreads.com/brittanychiang',
		icon: (
			<svg
				xmlns='http://www.w3.org/2000/svg'
				viewBox='0 0 1024 1024'
				fill='currentColor'
				class='h-6 w-6'
				aria-hidden='true'
				data-darkreader-inline-fill=''
				style='--darkreader-inline-fill: currentColor;'
			>
				<path
					d='M663.8 382.4c10.2 74.6-9.4 158-71.8 201.4-44.6 31-105.6 28.2-141.6 11.4-74.2-34.6-99-117.2-93.6-194.4 8.6-121.8 81.8-175.8 150.6-175 93.8-0.4 143.6 63.6 156.4 156.6zM960 176v672c0 61.8-50.2 112-112 112H176c-61.8 0-112-50.2-112-112V176c0-61.8 50.2-112 112-112h672c61.8 0 112 50.2 112 112zM724 626.4s-0.2-68-0.2-434.6h-58v80.6c-1.6 0.6-2.4-1-3.2-2.4-19.2-41.4-71.8-92.6-152-92-103.8 0.8-174.4 62.4-201.2 155.6-8.6 29.8-11.6 60.2-11 91.2 3.4 155.8 90.2 235.6 224.8 230.4 57.8-2.2 109-34 138-90.4 1-2 2.2-3.8 3.4-5.8 0.4 0.2 0.8 0.2 1.2 0.4 0.6 7.6 0.4 61.4 0.2 69-0.4 29.6-4 59-14.4 87-15.6 42-44.6 69.4-89 79-35.6 7.8-71.2 7.6-106.4-2.4-43-12.2-73-38-82.2-83.6-0.6-3.2-2.6-2.6-4.6-2.6h-53.6c1.6 21.2 6.4 40.6 17 58.4 48.4 81 165.4 97 256.4 74.8 99.8-24.6 134.6-109.8 134.8-212.6z'
					fill=''
				/>
			</svg>
		),
	},
]
