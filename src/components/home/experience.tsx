import type { QRL } from '@builder.io/qwik'
import { component$ } from '@builder.io/qwik'

import Widget from './widget'
import Arrow from '../Svg/arrow'

import data from '~/data.json'

export default component$(({ fnQRL }: ExperienceProps) => {
	const { articles, archiveLink } = data.home.experience
	return (
		<aside id='experience' aria-label='experience' onQVisible$={fnQRL}>
			<nav class='mt-24 grid gap-8'>
				{articles.map(
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
				<a class='svg--45 text-lg font-semibold' href={archiveLink.href}>
					{archiveLink.title}
					<Arrow />
				</a>
			</nav>
		</aside>
	)
})

interface ExperienceProps {
	fnQRL: QRL<() => Promise<() => void>>
}
