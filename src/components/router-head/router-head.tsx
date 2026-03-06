import { useDocumentHead, useLocation } from '@builder.io/qwik-city'

import { component$ } from '@builder.io/qwik'
import data from '~/data.json'

/**
 * The RouterHead component is placed inside of the document `<head>` element.
 */
export const RouterHead = component$(() => {
	const head = useDocumentHead()
	const loc = useLocation()

	const siteDescription =
		'A compact portfolio for Johann G. Pereira — frontend engineer crafting accessible, high-performance web apps. Includes project case studies, experience, and contact links.'
	const previewPath = '/preview.png'
	const title = head.title || data.home.header.title

	return (
		<>
			<title>{title}</title>

			<meta name='viewport' content='width=device-width, initial-scale=1.0' />
			<meta name='color-scheme' content='dark light' />

			{/* Primary description + social preview image */}
			<meta name='description' content={siteDescription} />
			<meta property='og:title' content={title} />
			<meta property='og:description' content={siteDescription} />
			<meta property='og:image' content={`${loc.url.origin}${previewPath}`} />
			<meta property='og:url' content={loc.url.href} />
			<meta property='og:type' content='website' />
			<meta name='twitter:card' content='summary_large_image' />
			<meta name='twitter:title' content={title} />
			<meta name='twitter:description' content={siteDescription} />
			<meta name='twitter:image' content={`${loc.url.origin}${previewPath}`} />

			{/* rel=me links for socials (helps identity/social verification) */}
			{data.home.header.socials.map(s => (
				<link key={s.href} rel='me' href={s.href} />
			))}

			<link rel='canonical' href={loc.url.href} />

			<link rel='icon' type='image/svg+xml' href='/favicon.svg' />
			<link rel='preconnect' href='https://fonts.googleapis.com' />
			<link
				rel='preconnect'
				href='https://fonts.gstatic.com'
				crossOrigin='anonymous'
			/>
			<link
				href='https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400..800;1,400..800&display=swap'
				rel='stylesheet'
			/>

			{head.meta.map(m => (
				<meta key={m.key} {...m} />
			))}
			{head.links.map(l => (
				<link key={l.key} {...l} />
			))}
			{head.styles.map(s => (
				<style key={s.key} {...s.props} />
			))}
			{head.scripts.map(s => (
				<script key={s.key} {...s.props} />
			))}
		</>
	)
})
