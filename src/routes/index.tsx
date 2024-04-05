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

			<div class='row-span-2 m-auto grid h-full w-full max-w-screen-xl gap-4 px-4 md:px-10 lg:absolute lg:left-0 lg:right-0 lg:top-0 lg:grid-cols-2 lg:px-24'>
				<main class='grid gap-y-24 py-32 lg:col-start-2'>
					<About />
					<Experience />
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
