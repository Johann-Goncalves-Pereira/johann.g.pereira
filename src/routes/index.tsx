import { component$ } from '@builder.io/qwik'
import type { DocumentHead } from '@builder.io/qwik-city'

export default component$(() => {
	return (
		<section aria-label='about'>
			<header>
				<p class='first-letter:float-left first-letter:mr-2 first-letter:text-5xl'>
					Back in 2012, I decided to try my hand at creating custom Tumblr
					themes and tumbled head first into the rabbit hole of coding and web
					development. Fast-forward to today, and I’ve had the privilege of
					building software for an advertising agency, a start-up, a huge
					corporation, and a digital product studio.
				</p>
				<br />
				<p>
					My main focus these days is building accessible user interfaces for
					our customers at Klaviyo. I most enjoy building software in the sweet
					spot where design and engineering meet — things that look good but are
					also built well under the hood. In my free time, I've also released an
					online video course that covers everything you need to know to build a
					web app with the Spotify API.
				</p>
				<br />

				<p>
					When I’m not at the computer, I’m usually rock climbing, reading,
					hanging out with my wife and two cats, or running around Hyrule
					searching for Korok seeds K o r o k s e e d s .
				</p>
			</header>
			<nav class='mt-24 grid gap-8'>
				<section
					class='relative isolate flex gap-4 p-4 text-sm [&_a>span]:focus-within:opacity-100 [&_a>span]:hover:opacity-100'
					aria-labelledby='key'
				>
					<i>2024 — Present</i>
					<div class='grid flex-1 gap-2'>
						<header class=''>
							<a
								class='flex gap-4'
								href=''
								target='_blank'
								aria-label='key (opens in a new tab)`'
								title='key'
								id='key'
							>
								<em class='text-lg font-bold not-italic'>
									"keySenior Frontend Engineer, Accessibility ·"
								</em>
								<span
									class='absolute inset-0 -z-10 rounded-md border-t border-t-surface-900 bg-surface-900/20 opacity-0 transition-opacity'
									aria-label='key'
								/>
							</a>
						</header>
						<p>
							Build and maintain critical components used to construct Klaviyo’s
							frontend, across the whole product. Work closely with
							cross-functional teams, including developers, designers, and
							product managers, to implement and advocate for best practices in
							web accessibility.
						</p>
						<footer>
							<ul class='mt-2 flex flex-wrap gap-1'>
								<li class='bg-primary-700/50 text-primary-500 mr-1 flex items-center rounded-full px-3 py-1 text-xs font-medium leading-5 '>
									JavaScript
								</li>
								<li class='bg-primary-700/50 text-primary-500 mr-1 flex items-center rounded-full px-3 py-1 text-xs font-medium leading-5 '>
									JavaScript
								</li>
								<li class='bg-primary-700/50 text-primary-500 mr-1 flex items-center rounded-full px-3 py-1 text-xs font-medium leading-5 '>
									JavaScript
								</li>
								<li class='bg-primary-700/50 text-primary-500 mr-1 flex items-center rounded-full px-3 py-1 text-xs font-medium leading-5 '>
									JavaScript
								</li>
							</ul>
						</footer>
					</div>
				</section>
			</nav>
		</section>
	)
})

export const head: DocumentHead = {
	title: 'Welcome to Qwik',
	meta: [
		{
			name: 'description',
			content: 'Qwik site description',
		},
	],
}
