import { component$, useSignal } from '@builder.io/qwik'

export default component$(() => {
	const routes = useSignal(['/', 'archive'])

	return (
		<>
			<header class='grid place-items-center p-24'>
				<h1 class='text-9xl font-thin'>404</h1>
				<h2 class='text-5xl'>Page Not Found</h2>
			</header>
			<main class='mx-auto flex h-fit flex-col text-lg'>
				<h3 class='mb-24'>Please go back to one of the following routes:</h3>
				<hr class='text-surface-900/50' />
				<nav class='mb-auto grid gap-4 text-center'>
					{routes.value.map((route, index) => (
						<a class='py-4 capitalize' href={route} key={index}>
							{route === '/' ? 'home' : route}
						</a>
					))}
				</nav>
				<hr class='text-surface-900/50' />
			</main>
			<footer>
				<small class='mb-4 inline-block w-full text-center text-sm font-thin'>
					Made with 💖 by Johann using{' '}
					<a class='font-bold' href='https://qwik.builder.io/' target='_blank'>
						Qwik
					</a>{' '}
					based on the design by{' '}
					<a
						class='font-bold'
						href='https://brittanychiang.com/#projects'
						target='_blank'
					>
						Brittany Chiang
					</a>
					.
				</small>
			</footer>
		</>
	)
})
