import { component$ } from '@builder.io/qwik'
import { twMerge } from 'tailwind-merge'

import data from '~/data.json'
import { CodePen, GitHub, Twitter } from '~/components/Svg/social'

export default component$(({ section }: HeaderProps) => {
	const { title, subtitle, description, navSections, socials } =
		data.home.header

	return (
		<header class='pointer-events-none flex h-full w-auto flex-col place-content-center justify-between gap-y-12 px-4 pr-2 pt-24 sm:pt-28 md:px-12 lg:sticky lg:top-0 lg:z-10 lg:row-span-2 lg:mx-auto lg:w-1/2 lg:max-w-screen-sm lg:-translate-x-1/2 lg:pb-32 lg:pl-24 lg:pr-0 lg:pt-32'>
			<Titles title={title} subtitle={subtitle} description={description} />
			<NavSection section={section} sections={navSections} />
			<Social socials={socials} />
		</header>
	)
})

export const Titles = component$(
	({ title, subtitle, description }: TitlesProps) => (
		<div class='pointer-events-auto'>
			<h1 class='text-5xl font-bold'>{title}</h1>
			<h2 class='mt-3 text-3xl font-normal'>{subtitle}</h2>
			<h3 class='mt-4 whitespace-pre-wrap'>{description}</h3>
		</div>
	),
)

export const NavSection = component$((props: NavSectionProps) => (
	<nav class='pointer-events-auto grid gap-y-4 font-medium uppercase'>
		{props.sections.map(title => (
			<a
				class={twMerge(
					'flex items-center gap-4 opacity-75 hover:opacity-100 focus-visible:opacity-100 [&>span]:hover:w-16 [&>span]:focus-visible:w-16 ',
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
	<nav class='pointer-events-auto mt-auto flex gap-4 pt-12'>
		{socials.map(({ title, href }) => {
			const icon = title.toLowerCase()
			return (
				<a
					class='block opacity-75 transition-opacity hover:opacity-100 focus-visible:opacity-100'
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
					{icon === 'twitter' && <Twitter />}
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
