import { component$ } from '@builder.io/qwik'
import { useServerTimeLoader } from '../../../routes/layout'

export default component$(() => {
	return (
		<footer class='pb-24 text-sm lg:col-start-2'>
			<p>
				Loosely designed in Figma and coded in Visual Studio Code by yours
				truly. Built with Next.js and Tailwind CSS, deployed with Vercel. All
				text is set in the Inter typeface.
			</p>
		</footer>
	)
})
