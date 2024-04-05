import { component$ } from '@builder.io/qwik'
import Arrow from '~/components/Svg/arrow'

export interface WidgetProps {
	date?: string
	image?: string
	url: string
	title: string
	description: string
	stars?: number
	labels: string[]
}

export default component$(
	({ date, image, url, title, description, stars, labels }: WidgetProps) => {
		const titleToId = title
			.split(' ')
			.join('-')
			.replace(/[,.;'"]/, '')
			.toLocaleLowerCase()
		const videoRatio = (x: number) => Math.floor((x * 9) / 16)

		return (
			<article
				class='relative isolate grid scale-105 gap-4 p-4 text-sm sm:scale-100 sm:grid-cols-[1fr_3fr] [&_a>span]:focus-within:opacity-100 [&_a>span]:hover:opacity-100'
				aria-labelledby={titleToId}
			>
				{date ? (
					<i class='hidden sm:inline-block'>{date}</i>
				) : image ? (
					<div class='mt-1 hidden h-fit w-fit rounded border-2 border-surface-900/75 sm:inline-block'>
						<img
							class='rounded'
							style={{
								aspectRatio: `150/${videoRatio(150)}`,
							}}
							src={image}
							width={150}
							height={videoRatio(150)}
							alt={`Image for ${title}`}
						/>
					</div>
				) : (
					<span class='text-3xl font-black text-primary-700'>Error</span>
				)}
				<div class='grid flex-1 gap-2'>
					<header>
						<a
							class='flex gap-4 rounded'
							href={url}
							target='_blank'
							aria-label={`${title} (opens in a new tab)`}
							id={titleToId}
						>
							<h4 class='text-lg font-bold not-italic first-letter:uppercase'>
								{title} <Arrow />
							</h4>
							<span
								class='absolute inset-0 z-10 cursor-pointer rounded-md border-t border-t-surface-900 bg-surface-900/20 opacity-0 transition-opacity'
								aria-label={titleToId}
							/>
						</a>
					</header>
					<p>{description}</p>
					<footer>
						{stars ? <i>start: {stars}</i> : null}
						<ul class='mt-2 flex cursor-default flex-wrap gap-1 text-xs font-medium capitalize leading-5 text-primary-500 selection:hidden'>
							{labels.map(label => (
								<li
									class='mr-1 flex items-center rounded-full bg-primary-700/50 px-3 py-1'
									key={label}
								>
									{label}
								</li>
							))}
						</ul>
					</footer>
				</div>
			</article>
		)
	},
)
