import { $, component$ } from '@builder.io/qwik'

import Arrow from '../icons/Arrow'

import data from '~/data.json'
import Widget from './widget'

let archiveWarmupPromise: Promise<void> | undefined

const warmArchiveRoute = (href: string) => {
	if (typeof window === 'undefined' || archiveWarmupPromise) {
		return archiveWarmupPromise
	}

	archiveWarmupPromise = fetch(new URL(href, window.location.origin), {
		credentials: 'same-origin',
		headers: {
			'x-archive-prefetch': 'true',
		},
	})
		.then(() => undefined)
		.catch(() => undefined)

	return archiveWarmupPromise
}

export default component$(() => {
	const { articles, archiveLink } = data.home.projects
	const warmArchive$ = $(async () => warmArchiveRoute(archiveLink.href))

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
				<a
					class='svg--45 text-lg font-semibold'
					href={archiveLink.href}
					onFocus$={warmArchive$}
					onPointerEnter$={warmArchive$}
				>
					{archiveLink.title}
					<Arrow />
				</a>
			</nav>
		</aside>
	)
})
