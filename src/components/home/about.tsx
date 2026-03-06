import type { JSX } from '@builder.io/qwik'
import { component$ } from '@builder.io/qwik'

import Description from './about/description.mdx'
import { getAgeFromBirthYear, getYearsSinceYear } from '~/utils/date'

const DescriptionWithProps = Description as (component: {
	age: number
	experienceYears: number
}) => JSX.Element

export default component$(() => {
	const age = getAgeFromBirthYear(2002)
	const experienceYears = getYearsSinceYear(2020)
	return (
		<section id='about' aria-label='about'>
			<header class='first-letter-2 text-surface-700/80 first-letter:float-left first-letter:mr-3 [&_a]:text-opacity-100 [&_strong]:font-bold [&_ul]:list-disc [&_ul]:pl-6 [&_ul_li]:leading-relaxed'>
				<DescriptionWithProps age={age} experienceYears={experienceYears} />
			</header>
		</section>
	)
})
