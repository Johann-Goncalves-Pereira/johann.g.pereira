import { component$ } from '@builder.io/qwik'
import {
	QwikCityProvider,
	RouterOutlet,
	ServiceWorkerRegister,
} from '@builder.io/qwik-city'
import { RouterHead } from './components/router-head/router-head'

import './root.scss'

export default component$(() => {
	/**
	 * The root of a QwikCity site always start with the <QwikCityProvider> component,
	 * immediately followed by the document's <head> and <body>.
	 *
	 * Don't remove the `<head>` and `<body>` elements.
	 */

	return (
		<QwikCityProvider>
			<head>
				<meta charSet='utf-8' />
				<link rel='manifest' href='/manifest.json' />
				<RouterHead />
				<ServiceWorkerRegister />
			</head>
			<body
				class='m-0 grid h-dvh w-dvw gap-2 bg-surface-950 p-2 font-comic font-light text-surface-700 text-opacity-90 contrast-more:text-opacity-100'
				lang='en'
			>
				<RouterOutlet />
			</body>
		</QwikCityProvider>
	)
})
