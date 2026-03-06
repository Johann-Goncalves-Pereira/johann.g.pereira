import { component$, useStylesScoped$ } from '@builder.io/qwik'
import { twMerge } from 'tailwind-merge'

import { CodePen, GitHub, Medium } from '~/components/Svg/social'
import data from '~/data.json'
import styles from './header.scss?inline'

export default component$(({ section }: HeaderProps) => {
	useStylesScoped$(styles)
	const { title, subtitle, description, navSections, socials } =
		data.home.header

	return (
		<header class='-z-10'>
			<Titles title={title} subtitle={subtitle} description={description} />
			<NavSection section={section} sections={navSections} />
			<Social socials={socials} />
		</header>
	)
})

export const Titles = component$(
	({ title, subtitle, description }: TitlesProps) => (
		<div>
			<a class='text-5xl font-bold text-surface-700/100' href='/'>
				<h1>{title}</h1>
			</a>
			<h2 class='mt-2 text-3xl font-normal text-surface-700/90'>{subtitle}</h2>
			<h3 class='mt-4 whitespace-pre-wrap text-surface-700/80'>
				{description}
			</h3>
		</div>
	),
)

export const NavSection = component$((props: NavSectionProps) => (
	<nav class='pointer-events-auto grid font-medium uppercase'>
		{props.sections.map(title => (
			<a
				class={twMerge(
					'flex w-fit -translate-x-2 items-center gap-4 px-4 py-2 opacity-75 hover:opacity-100 focus-visible:opacity-100 [&>span]:hover:w-16 [&>span]:focus-visible:w-16 ',
					`${title === props.section && 'opacity-100 [&>span]:w-16'}`,
				)}
				href={`#${title}`}
				key={`${title}`}
			>
				<span class='h-px w-8 bg-surface-700 transition-width will-change-[width]' />
				{title}
			</a>
		))}
	</nav>
))

const Social = component$(({ socials }: SocialProps) => (
	<nav class='pointer-events-auto mt-auto flex -translate-x-2 translate-y-2 pt-12'>
		{socials.map(({ title, href }) => {
			const icon = title.toLowerCase()
			return (
				<a
					class='block p-2 opacity-75 transition-opacity hover:opacity-100 focus-visible:opacity-100'
					href={href}
					target='_blank'
					rel='noreferrer noopener'
					aria-label={`${title} (opens in a new tab)`}
					title={title}
					key={title}
				>
					<span class='sr-only'>{title}</span>
					{icon === 'github' && <GitHub />}
					{icon === 'linkedin' && <CodePen />}
					{icon === 'medium' && <Medium />}
				</a>
			)
		})}
	</nav>
))

interface HeaderProps {
	section: string
}

interface TitlesProps {
	title: string
	subtitle: string
	description: string
}

interface NavSectionProps {
	section: string
	sections: string[]
}

interface SocialProps {
	socials: { title: string; href: string }[]
}
