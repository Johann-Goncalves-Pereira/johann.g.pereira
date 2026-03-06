import { component$ } from '@builder.io/qwik'

import Arrow from '../Svg/arrow'

import data from '~/data.json'
import Widget from './widget'

export default component$(() => {
	const { articles, archiveLink } = data.home.projects

	return (
		<aside class='mt-24' id='projects'>
			<nav class='mt-24 grid gap-8'>
				{articles.map(
					(
						{ image, href: url, title, description, labels, time, aspectRatio },
						index,
					) => (
						<Widget
							image={image}
							href={url}
							title={title}
							description={description}
							labels={labels}
							stars={Number(time)}
							aspectRatio={aspectRatio}
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
