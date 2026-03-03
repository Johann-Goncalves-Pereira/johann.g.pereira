import type { JSX } from '@builder.io/qwik'
import { component$ } from '@builder.io/qwik'

import Widget from './widget'
import Arrow from '../Svg/arrow'

import Description from './about/description.mdx'
import data from '~/data.json'
import { getAgeFromBirthYear, getYearsSinceYear } from '~/utils/date'

const DescriptionWithProps = Description as (component: {
	age: number
	experienceYears: number
}) => JSX.Element

export default component$(() => {
	const { articles, portfolioLink } = data.home.about
	const age = getAgeFromBirthYear(2002)
	const experienceYears = getYearsSinceYear(2020)
	return (
		<section id='about' aria-label='about'>
			<header class='first-letter-2 text-surface-700/80 first-letter:float-left first-letter:mr-3 [&_a]:text-opacity-100 [&_strong]:font-bold [&_ul]:list-disc [&_ul]:pl-6 [&_ul_li]:leading-relaxed'>
				<DescriptionWithProps age={age} experienceYears={experienceYears} />
			</header>

			<Companies company={articles} />

			<footer class='mt-12 grid text-lg font-semibold'>
				<a
					class='svg--45'
					href={portfolioLink.href}
					target='_blank'
					rel='noopener noreferrer'
				>
					{portfolioLink.title}
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

interface CompanyProps {
	company: {
		title: string
		date: string
		href: string
		description: string
		labels: string[]
	}[]
}
