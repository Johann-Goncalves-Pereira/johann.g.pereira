import { component$ } from '@builder.io/qwik'
import type { DocumentHead } from '@builder.io/qwik-city'
import About from '~/components/home/about'
import Experience from '~/components/home/experience'
import Projects from '~/components/home/projects'
import Footer from '~/components/layout/footer/footer'
import Header from '~/components/layout/header/header'

export default component$(() => {
	return (
		<>
			<Header />

			<div class='absolute left-0 right-0 top-0 m-auto grid h-full w-full max-w-screen-xl grid-cols-2 gap-4 px-24'>
				<main class='col-start-2 grid gap-y-24 py-32'>
					<div>
						<About />
						<Experience />
						<Projects />
					</div>
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
