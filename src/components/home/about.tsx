import { component$ } from '@builder.io/qwik'

import type { WidgetProps } from './widget'
import Widget from './widget'
import Arrow from '../Svg/arrow'

import Description from './about/description.mdx'
import data from '~/routes/data.json'

interface CompanyProps {
	company: {
		title: string
		date: string
		href: string
		description: string
		labels: string[]
	}[]
}

export default component$(() => {
	const { articles, portfolioLink } = data.home.about
	return (
		<section id='about' aria-label='about'>
			<header class='first-letter-2 first-letter:float-left first-letter:mr-3'>
				<Description />
			</header>

			<Companies company={articles} />

			<footer class='mt-12 text-lg font-semibold '>
				<a href={portfolioLink.href} target='_blank' rel='noopener noreferrer'>
					{portfolioLink.href}
					<Arrow />
				</a>
			</footer>
		</section>
	)
})

export const Companies = component$(({ company }: CompanyProps) => (
	<nav class='mt-24 grid gap-8'>
		{company.map(({ title, date, href, description, labels }, index) => (
			<Widget
				title={title}
				date={date}
				href={href}
				description={description}
				labels={labels}
				key={index}
			/>
		))}
	</nav>
))
