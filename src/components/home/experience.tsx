import { QRL, component$ } from '@builder.io/qwik'

import type { WidgetProps } from './widget'
import Widget from './widget'

interface ExperienceProps {
	fnQRL: QRL<() => Promise<() => void>>
}

export default component$(({ fnQRL }: ExperienceProps) => {
	return (
		<aside id='experience' aria-label='experience' onQVisible$={fnQRL}>
			<nav class='mt-24 grid gap-8'>
				{experiences.map(
					({ image, href: url, title, description, labels }, index) => (
						<Widget
							image={image}
							href={url}
							title={title}
							description={description}
							labels={labels}
							stars={Math.random()}
							key={index}
						/>
					),
				)}
				<a class=' text-lg font-semibold' href='/archive'>
					View Full Project Archive
				</a>
			</nav>
		</aside>
	)
})

const experiences: WidgetProps[] = [
	{
		image: 'https://picsum.photos/1520/840',
		href: 'https://github.com',
		title: 'Experience Title',
		description:
			'Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit quisquam quidem repellendus repellat architecto earum officia voluptates doloribus excepturi nihil? Sapiente, ipsam?',
		labels: ['Label 1', 'Label 2'],
	},
	{
		image: 'https://picsum.photos/1510/820',
		href: 'https://github.com',
		title: 'Experience Title',
		description: 'Lorem ipsum dolor sipsam?',
		labels: ['Label 1', 'Label 2'],
	},
	{
		image: 'https://picsum.photos/1500/830',
		href: 'https://github.com',
		title: 'Experience Title',
		description:
			'Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit quisquam quidem repellendus repellat architecto earum officia voluptates doloribus excepturi nihil? Sapiente, ipsam?',
		labels: ['Label 1', 'Label 2'],
	},
	{
		image: 'https://picsum.photos/1500/830',
		href: 'https://github.com',
		title: 'Experience Title',
		description:
			'Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit quisquam quidem repellendus repellat architecto earum officia voluptates doloribus excepturi nihil? Sapiente, ipsam?',
		labels: ['Label 1', 'Label 2'],
	},
	{
		image: 'https://picsum.photos/1500/830',
		href: 'https://github.com',
		title: 'Experience Title',
		description:
			'Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit quisquam quidem repellendus repellat architecto earum officia voluptates doloribus excepturi nihil? Sapiente, ipsam?',
		labels: ['Label 1', 'Label 2'],
	},
	{
		image: 'https://picsum.photos/1500/830',
		href: 'https://github.com',
		title: 'Experience Title',
		description:
			'Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit quisquam quidem repellendus repellat architecto earum officia voluptates doloribus excepturi nihil? Sapiente, ipsam?',
		labels: ['Label 1', 'Label 2'],
	},
]
