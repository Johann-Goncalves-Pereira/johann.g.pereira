import type { DocumentHead } from '@builder.io/qwik-city'
import { component$ } from '@builder.io/qwik'

export default component$(() => {
	return (
		<>
			<header class='mx-auto flex w-full max-w-screen-xl flex-col-reverse gap-y-2 px-24 pt-24 capitalize'>
				<h1 class='text-5xl font-bold'>Projects Archive</h1>
				<nav class='text-lg font-semibold'>
					<h2>
						<a href='/'>Johann Gonçalves Pereira</a>
					</h2>
				</nav>
				{/* {width.value} */}
			</header>
			<main class='mx-auto mt-24 w-full max-w-screen-xl px-24 pb-24'>
				<table class='flex h-full flex-col gap-y-8 overflow-auto'>
					<thead>
						<tr class='relative grid grid-cols-table gap-4 font-medium'>
							<th>Year</th>
							<th>Project</th>
							<th>Made at</th>
							<th>Built with</th>
							<th>Link</th>
							<th class='absolute -bottom-4 left-0 right-0 h-px text-surface-900/50'>
								<hr />
							</th>
						</tr>
					</thead>
					<tbody class='grid gap-y-8'>
						<tr class='relative grid grid-cols-table gap-4'>
							<td>
								<time dateTime='2022'>2022</time>
							</td>
							<td>
								<strong class='font-medium'>Emerson Collective</strong>``
							</td>
							<td>Upstatement</td>
							<td>
								<ul class='mt-2 flex cursor-default flex-wrap gap-1 text-xs font-medium capitalize text-primary-500 selection:hidden'>
									<li class='mr-1 flex items-center rounded-full bg-primary-700/50 px-3 py-1'>
										React
									</li>
									<li class='mr-1 flex items-center rounded-full bg-primary-700/50 px-3 py-1'>
										Tailwind
									</li>
									<li class='mr-1 flex items-center rounded-full bg-primary-700/50 px-3 py-1'>
										Next
									</li>
									<li class='mr-1 flex items-center rounded-full bg-primary-700/50 px-3 py-1'>
										Netlify
									</li>
								</ul>
							</td>
							<td>
								<a
									href='https://emersoncollective.com'
									target='_blank'
									rel='noopener noreferrer'
								>
									Link
								</a>
							</td>
							<td class='absolute -bottom-4 left-0 right-0 h-px text-surface-900/50'>
								<hr />
							</td>
						</tr>
						<tr class='relative grid grid-cols-table gap-4'>
							<td>
								<time dateTime='2022'>2022</time>
							</td>
							<td>
								<strong class='font-medium'>Emerson Collective</strong>
							</td>
							<td>Upstatement</td>
							<td>
								<ul class='mt-2 flex cursor-default flex-wrap gap-1 text-xs font-medium capitalize text-primary-500 selection:hidden'>
									<li class='mr-1 flex items-center rounded-full bg-primary-700/50 px-3 py-1'>
										Next
									</li>
									<li class='mr-1 flex items-center rounded-full bg-primary-700/50 px-3 py-1'>
										Netlify
									</li>
								</ul>
							</td>
							<td>
								<a
									href='https://emersoncollective.com'
									target='_blank'
									rel='noopener noreferrer'
								>
									Link
								</a>
							</td>
							<td class='absolute -bottom-4 left-0 right-0 h-px text-surface-900/50'>
								<hr />
							</td>
						</tr>
					</tbody>
				</table>
			</main>
		</>
	)
})

export const head: DocumentHead = {
	title: 'Archive Projects - Johann Pereira',
	meta: [
		{
			name: 'description',
			content:
				'This is archive of my projects, here you will find information about my career and projects.',
		},
	],
}
