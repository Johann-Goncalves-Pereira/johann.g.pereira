import { component$ } from '@builder.io/qwik'

import type { WidgetProps } from './widget'
import Widget from './widget'
import Description from './about/description'
import Arrow from '../Svg/arrow'

export default component$(() => (
	<section id='about' aria-label='about'>
		<header>
			{about.map((paragraph, index) => (
				<Description paragraph={paragraph} index={index} key={index} />
			))}
		</header>

		<nav class='mt-24 grid gap-8'>
			{work.map(({ date, url, title, description, labels }, index) => (
				<Widget
					date={date}
					url={url}
					title={title}
					description={description}
					labels={labels}
					key={index}
				/>
			))}
		</nav>

		<footer class='mt-12 text-lg font-semibold '>
			<a href='/johann.pdf' target='_blank' rel='noopener noreferrer'>
				View Full
				<span class='scale-150'>
					<Arrow />
				</span>
			</a>
		</footer>
	</section>
))

const about = [
	'Back in 2012, I decided to try my hand at creating custom Tumblr themes and tumbled head first into the rabbit hole of coding and web development. Fast-forward to today, and I’ve had the privilege of building software for an advertising agency, a start-up, a huge corporation, and a digital product studio.',
	"My main focus these days is building accessible user interfaces for our customers at Klaviyo. I most enjoy building software in the sweet spot where design and engineering meet — things that look good but are also built well under the hood. In my free time, I've also released an online video course that covers everything you need to know to build a web app with the Spotify API.",
	'When I’m not at the computer, I’m usually rock climbing, reading, hanging out with my wife and two cats, or running around Hyrule searching for Korok seeds K o r o k s e e d s .',
]

const work: WidgetProps[] = [
	{
		date: '2024 — Present',
		url: 'https://keysenior.com',
		title: 'test test tesDDDDs',
		description:
			'Build and maintain critical components used to construct Klaviyos frontend, across the whole product. Work closely with cross-functional teams, including developers, designers, and product managers, to implement and advocate for best practices in	web accessibility.',
		labels: ['JavaScript', 'JavaScript', 'JavaScript', 'JavaScript'],
	},
	{
		date: '2024 — Present',
		url: 'https://keysenior.com',
		title: 'keySenior Frontend Engineer, Accessibility',
		description:
			'Build and maintain critical components used to construct Klaviyos frontend, across the whole product. Work closely with cross-functional teams, including developers, designers, and product managers, to implement and advocate for best practices in	web accessibility.',
		labels: ['JavaScript', 'JavaScript', 'JavaScript', 'JavaScript'],
	},
	{
		date: '2024 — Present',
		url: 'https://keysenior.com',
		title: 'keySenior Frontend Engineer, Accessibility',
		description:
			'Build and maintain critical components used to construct Klaviyos frontend, across the whole product. Work closely with cross-functional teams, including developers, designers, and product managers, to implement and advocate for best practices in	web accessibility.',
		labels: ['JavaScript', 'JavaScript', 'JavaScript', 'JavaScript'],
	},
]
