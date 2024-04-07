import { component$ } from '@builder.io/qwik'

import Arrow from '../Svg/arrow'

import data from '~/routes/data.json'

export default component$(() => {
	const { links } = data.home.projects

	return (
		<aside class='mt-24' id='projects'>
			<nav>
				{links.map(({ title, time, href }, index) => (
					<Link title={title} time={time} href={href} key={index} />
				))}
			</nav>
		</aside>
	)
})

interface ProjectProps {
	title: string
	time: string
	href: string
}

export const Link = component$(({ title, time, href }: ProjectProps) => {
	const ratio = (x: number) => Math.floor((x * 12) / 16)

	return (
		<a
			class='svg--45 relative isolate grid scale-105 gap-4 rounded p-4 sm:scale-100 sm:grid-cols-[1fr_3fr] [&>.absolute]:focus-within:opacity-100 [&>.absolute]:hover:opacity-100'
			href={href}
			target='_blank'
			rel='noopener noreferrer'
			aria-label={`${title} (opens in a new tab)`}
			title={title}
		>
			<div class='mt-1 hidden h-fit w-fit rounded border-2 border-surface-900/75 sm:inline-block'>
				<img
					class='rounded'
					src='https://picsum.photos/200/'
					alt={`Image for ${title}`}
					style={{
						aspectRatio: `200/${ratio(200)}`,
					}}
					width={200}
					height={ratio(200)}
				/>
			</div>
			<div class='grid flex-1 gap-2'>
				<time class='font-semibold text-surface-700/75' dateTime={time}>
					{time}
				</time>
				<h5 class='font-normal'>
					{title} <Arrow />
				</h5>
			</div>
			<div class='absolute inset-0 -z-10 rounded-md border-t border-t-surface-900 bg-surface-900/20 opacity-0 transition-opacity' />
		</a>
	)
})
