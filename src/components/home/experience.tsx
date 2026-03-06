import type { QRL } from '@builder.io/qwik'
import { component$ } from '@builder.io/qwik'

import Widget from './widget'

import data from '~/data.json'

interface CompanyProps {
	company: {
		title: string
		date: string
		href?: string
		description: string
		labels: string[]
	}[]
}
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

export default component$(({ fnQRL }: ExperienceProps) => {
	const { articles } = data.home.experience

	return (
		<nav id='experience' aria-label='experience' onQVisible$={fnQRL}>
			<Companies company={articles} />
		</nav>
	)
})

interface ExperienceProps {
	fnQRL: QRL<() => Promise<() => void>>
}
