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
					? 'first-letter-2 first-letter:float-left first-letter:mr-3'
					: ''
			}
		>
			{paragraph}
		</p>
		<br />
	</>
))
