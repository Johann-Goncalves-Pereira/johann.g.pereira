import { component$ } from '@builder.io/qwik'

interface DescriptionProps {
	paragraph: string
	index: number
}

export default component$(({ paragraph, index }: DescriptionProps) => (
	<>
		<p
			class={
				index === 0
					? 'first-letter:float-left first-letter:mr-2 first-letter:text-5xl'
					: ''
			}
		>
			{paragraph}
		</p>
		<br />
	</>
))
