import type { JSX } from '@builder.io/qwik'
import { component$ } from '@builder.io/qwik'

import data from '~/data.json'
import { getAgeFromBirthYear, getYearsSinceYear } from '~/utils/date'
import Arrow from '../icons/Arrow'
import Description from './about/description.mdx'

const DescriptionWithProps = Description as (component: {
	age: number
	experienceYears: number
}) => JSX.Element

export default component$(() => {
	const { portfolioLink } = data.home.experience

	const age = getAgeFromBirthYear(2002)
	const experienceYears = getYearsSinceYear(2020)
	return (
		<section class='flex h-max flex-col' id='about' aria-label='about'>
			<header class='flex h-[calc(100dvh-16rem)] min-h-max flex-col justify-between gap-4 text-surface-700/80 [&_a]:text-opacity-100 [&_strong]:font-bold [&_ul]:list-disc [&_ul]:pl-6 [&_ul_li]:leading-relaxed'>
				<DescriptionWithProps age={age} experienceYears={experienceYears} />
			</header>
			<footer class='mt-12 grid text-lg font-semibold'>
				<a
					class='svg--45 text-2xl'
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
