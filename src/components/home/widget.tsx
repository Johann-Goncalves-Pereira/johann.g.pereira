import { component$ } from '@builder.io/qwik'

import Arrow from '~/components/icons/Arrow'

export default component$(
	({
		date,
		image,
		href,
		title,
		description,
		stars,
		labels,
		aspectRatio,
	}: WidgetProps) => {
		const titleToId = title
			.split(' ')
			.join('-')
			.replace(/[,.;'"]/, '')
			.toLocaleLowerCase()

		return (
			<article
				class='svg--45 group relative isolate grid scale-105 gap-4 p-4 text-sm sm:scale-100 sm:grid-cols-[1fr_3fr] [&_a>span]:focus-within:opacity-100 [&_a>span]:hover:opacity-100 [&_p]:hover:text-surface-700'
				aria-labelledby={titleToId}
			>
				<Wrapper
					date={date}
					image={image}
					title={title}
					aspectRatio={aspectRatio}
					href={href}
				/>

				<div class='grid flex-1 gap-2'>
					<Header title={title} titleId={titleToId} href={href} />

					<p class='whitespace-pre-wrap text-surface-700/80 transition-colors'>
						{description}
					</p>

					<Footer stars={stars} labels={labels} />
				</div>
			</article>
		)
	},
)

export const Wrapper = component$(
	({ date, image, title, aspectRatio, href }: WrapperProps) => {
		const videoRatio = (x: number) => Math.floor((x * 9) / 16)
		const imageStyle = {
			aspectRatio: aspectRatio ?? `150/${videoRatio(150)}`,
		}
		return (
			<>
				{(!!date && !!image) || (!date && !image) ? (
					<span class='text-3xl font-black text-primary-700'>Error</span>
				) : date ? (
					<i class='hidden sm:inline-block'>{date}</i>
				) : (
					<a
						class='pointer-events-none z-50  hidden h-fit w-fit  origin-top-right scale-100 transform-gpu overflow-clip rounded border-2 border-surface-900/75  transition-transform sm:inline-block lg:group-hover:scale-[3]'
						href={href ?? '#'}
						target='_blank'
						rel='noopener noreferrer'
						aria-label={`${title} (opens in a new tab)`}
					>
						<img
							class=' object-cover object-top'
							src={image}
							width={150}
							height={videoRatio(150)}
							alt={`Image for ${title}`}
							style={imageStyle}
						/>
					</a>
				)}
			</>
		)
	},
)

export const Header = component$(({ title, titleId, href }: HeaderProps) => (
	<header>
		<a
			class='flex gap-4 rounded'
			href={href ?? '#'}
			target='_blank'
			rel='noopener noreferrer'
			aria-label={`${title} (opens in a new tab)`}
			id={titleId}
		>
			<h4 class='text-lg font-bold not-italic first-letter:uppercase'>
				{title} <Arrow />
			</h4>
			<span
				class='absolute inset-0 z-10 cursor-pointer rounded-md border-t border-t-surface-900 bg-surface-900/20 opacity-0 transition-opacity'
				aria-label={titleId}
			/>
		</a>
	</header>
))

export const Footer = component$(({ stars, labels }: FooterProps) => (
	<footer>
		{stars ? <i>Start: {stars}</i> : null}
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
))

interface WidgetProps extends WrapperProps, FooterProps {
	title: string
	description: string
	href?: string
}

interface WrapperProps {
	date?: string
	image?: string
	title: string
	aspectRatio?: string
	href?: string
}

interface HeaderProps {
	title: string
	titleId: string
	href?: string
}

interface FooterProps {
	stars?: number
	labels: string[]
}
