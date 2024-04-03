import { component$ } from '@builder.io/qwik'
import Arrow from '../Svg/arrow'

export default component$(() => {
	return (
		<aside class='mt-40' id='projects'>
			<nav>
				{projects.map(({ title, time }, index) => (
					<Link title={title} time={time} key={index} />
				))}
			</nav>
		</aside>
	)
})

interface ProjectProps {
	title: string
	time: string
}

export const Link = component$(({ title, time }: ProjectProps) => {
	const ratio = (x: number) => Math.floor((x * 12) / 16)

	return (
		<a
			class='relative isolate grid grid-cols-[1fr_3fr] gap-4 rounded p-4 [&>.absolute]:focus-within:opacity-100 [&>.absolute]:hover:opacity-100'
			href='#'
			target='_blank'
			rel='noopener noreferrer'
			aria-label={`${title} (opens in a new tab)`}
			title={title}
		>
			<div class='mt-1 h-fit w-fit rounded border-2 border-surface-900/75'>
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
			<div class='flex-1'>
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

const projects: ProjectProps[] = [
	{
		title:
			'Project this is a long title, that is like a description in the and of the day',
		time: '2020',
	},
	{
		title:
			'Project this is a long title, that is like a description in the and of the day',
		time: '2020',
	},
]
