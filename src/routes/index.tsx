import { component$, useSignal, $ } from '@builder.io/qwik'
import type { DocumentHead } from '@builder.io/qwik-city'
import About from '~/components/home/about'
import Experience from '~/components/home/experience'
import Projects from '~/components/home/projects'
import Footer from '~/components/layout/footer/footer'
import Header from '~/components/layout/header/header'

export default component$(() => {
	const currentSection = useSignal('about')

	const updateObserver$ = $(async () => {
		const observer = new IntersectionObserver(async entries => {
			entries.forEach(
				entry => {
					if (
						!entry.isIntersecting &&
						entry.target.id === 'projects' &&
						currentSection.value !== 'about'
					)
						currentSection.value = 'experience'
					if (entry.isIntersecting) currentSection.value = entry.target.id
				},
				{ rootMargin: '-96px' },
			)
		})
		return observer
	})

	const updateNav$ = $(async (observer: IntersectionObserver) => {
		const elements = document.querySelectorAll<HTMLElement>(
			'#about, #experience, #projects',
		)
		if (elements.length > 0)
			elements.forEach(element => observer.observe(element))
		return () => elements.forEach(element => observer.unobserve(element))
	})

	return (
		<>
			<Header section={currentSection.value} />

			<div class='row-span-2 m-auto grid h-full w-full max-w-screen-xl gap-4 px-4 md:px-10 lg:absolute lg:left-0 lg:right-0 lg:top-0 lg:grid-cols-2 lg:px-24'>
				<main class='grid gap-y-24 py-24 lg:col-start-2'>
					<About />
					<Experience
						fnQRL={$(async () => await updateNav$(await updateObserver$()))}
					/>
					<Projects />
				</main>

				<Footer />
			</div>
		</>
	)
})

export const head: DocumentHead = {
	title: 'Johann Pereira Portfolio',
	meta: [
		{
			name: 'description',
			content:
				'This is Johann Pereira portfolio website, here you will find information about my career and projects.',
		},
	],
}
