import { component$ } from '@builder.io/qwik'

export default component$(() => {
	return (
		<>
			<header class='mx-auto flex flex-col-reverse gap-y-2 lg:max-w-xl'>
				<h1>Projects Archive</h1>
				<nav>
					<a href='/'>Johann Gonçalves Pereira</a>
				</nav>
			</header>
			<main class='mx-auto lg:max-w-xl'>
				<section role='table'>
					<header></header>
					<ol></ol>
				</section>
			</main>
		</>
	)
})
