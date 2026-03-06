import { component$, useStylesScoped$ } from '@builder.io/qwik'
import type { DocumentHead, RequestHandler } from '@builder.io/qwik-city'
import { routeLoader$ } from '@builder.io/qwik-city'

import styles from './index.scss?inline'

import { ChevronLeftIcon, ExternalLinkIcon } from 'lucide-qwik'
import data from '~/data.json'
const GITHUB_USERNAME = 'Johann-Goncalves-Pereira'
const GITHUB_API_VERSION = '2022-11-28'
const GITHUB_PAGE_SIZE = 100

type GitHubRepo = {
	archived: boolean
	created_at: string
	description: string | null
	fork: boolean
	html_url: string
	language: string | null
	name: string
	owner: {
		login: string
	}
	topics?: string[]
}

type ArchiveProject = {
	createdAt: string
	description: string | null
	href: string
	labels: string[]
	name: string
	owner: string
	slug: string
	year: string
}

type ArchiveLoaderData = {
	error?: string
	projects: ArchiveProject[]
}

export const onGet: RequestHandler = async ({ cacheControl }) => {
	cacheControl({
		staleWhileRevalidate: 60 * 60 * 24,
		maxAge: 60 * 30,
	})
}

export const useArchiveProjects = routeLoader$<ArchiveLoaderData>(
	async ({ cacheControl, env }) => {
		cacheControl({
			staleWhileRevalidate: 60 * 60 * 24,
			maxAge: 60 * 30,
		})

		const featuredProjects = new Set(
			data.home.projects.articles
				.map(({ href }) => getGitHubRepoSlug(href))
				.filter((slug): slug is string => Boolean(slug)),
		)

		try {
			const repositories = await fetchGitHubRepositories(
				env.get('GITHUB_TOKEN') || undefined,
			)

			const projects = repositories
				.filter(repository => !repository.fork)
				.filter(repository => !repository.archived)
				.filter(
					repository =>
						repository.name.toLowerCase() !== GITHUB_USERNAME.toLowerCase(),
				)
				.filter(repository => !featuredProjects.has(createRepoSlug(repository)))
				.sort((left, right) => right.created_at.localeCompare(left.created_at))
				.map(mapRepositoryToProject)

			return {
				projects,
			}
		} catch (error) {
			console.error('Unable to load GitHub archive projects.', error)

			return {
				error:
					'Unable to load the GitHub archive right now. Please try again soon.',
				projects: [],
			}
		}
	},
)

export default component$(() => {
	useStylesScoped$(styles)
	const archiveProjects = useArchiveProjects()
	const { error, projects } = archiveProjects.value

	return (
		<>
			<header class='mx-auto flex w-full max-w-screen-xl flex-col-reverse gap-y-2 px-4 pt-24 capitalize md:px-10 lg:px-24'>
				<a
					class='flex items-center justify-between gap-4 [&_svg]:hover:-translate-x-3'
					href='/'
				>
					<div class='grid gap-4'>
						<h1 class='text-5xl font-bold'>Projects Archive</h1>
						<h2 class='text-lg font-semibold'>Johann Gonçalves Pereira</h2>
					</div>
					<ChevronLeftIcon class='size-10 transition-transform' />
				</a>
				{/* {width.value} */}
			</header>
			<main class='mx-auto mt-24 w-full max-w-screen-xl px-4 pb-24 md:px-10 lg:px-24'>
				<table class='flex h-max flex-col gap-y-8 '>
					<thead>
						<tr class='relative grid grid-cols-table gap-4 font-medium'>
							<th>Year</th>
							<th class='w-full'>Project</th>
							<th class='hidden lg:block'>Built with</th>
							<th class='hidden px-4 sm:block'>Link</th>
							<Stroke />
						</tr>
					</thead>
					<tbody class='grid gap-y-8'>
						{error ? (
							<tr class='relative grid grid-cols-table gap-4'>
								<td class='col-span-full text-sm normal-case text-surface-900/75'>
									{error}
								</td>
								<Stroke />
							</tr>
						) : null}
						{!error && projects.length === 0 ? (
							<tr class='relative grid grid-cols-table gap-4'>
								<td class='col-span-full text-sm normal-case text-surface-900/75'>
									No extra public GitHub projects to show yet.
								</td>
								<Stroke />
							</tr>
						) : null}
						{projects.map(
							({ createdAt, description, href, labels, name, slug, year }) => (
								<tr class='relative grid grid-cols-table gap-4' key={slug}>
									<td>
										<time dateTime={createdAt}>{year}</time>
									</td>
									<td class='w-full'>
										<div class='grid gap-2'>
											<strong class='text-xl font-medium capitalize'>
												{name.replace(/[-_]/g, ' ')}
											</strong>
											{description ? (
												<p class='text-surface-300/75 max-w-prose text-sm normal-case'>
													{description}
												</p>
											) : null}
										</div>
									</td>
									<td class='hidden lg:block'>
										{labels.length > 0 ? (
											<ul class='mt-2 flex cursor-default flex-wrap gap-1 text-xs font-medium capitalize text-primary-500 selection:hidden'>
												{labels.map(label => (
													<li
														class='mr-1 flex items-center rounded-full bg-primary-700/50 px-3 py-1'
														key={`${slug}-${label}`}
													>
														{label}
													</li>
												))}
											</ul>
										) : (
											<span class='text-sm normal-case text-surface-900/75'>
												—
											</span>
										)}
									</td>
									<td class='relative px-4 opacity-75 transition-opacity hover:opacity-100'>
										<ExternalLinkIcon />
										<a
											class='absolute inset-0 z-10'
											href={href}
											target='_blank'
											rel='noopener noreferrer'
											aria-label={href.replace(
												/^https?:\/\/(www\.)?github.com\/Johann-Goncalves-Pereira\//,
												'',
											)}
										></a>
									</td>
									<Stroke />
								</tr>
							),
						)}
					</tbody>
				</table>
			</main>
		</>
	)
})

const Stroke = component$(() => (
	<td class='absolute -bottom-4 left-0 right-0 h-px text-surface-900/50'>
		<hr />
	</td>
))
const fetchGitHubRepositories = async (
	token?: string,
): Promise<GitHubRepo[]> => {
	const repositories: GitHubRepo[] = []

	for (let page = 1; ; page += 1) {
		const response = await fetch(
			`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=${GITHUB_PAGE_SIZE}&page=${page}&sort=updated&direction=desc&type=owner`,
			{
				headers: {
					Accept: 'application/vnd.github+json',
					...(token ? { Authorization: `Bearer ${token}` } : {}),
					'X-GitHub-Api-Version': GITHUB_API_VERSION,
				},
			},
		)

		if (!response.ok) {
			throw new Error(`GitHub API responded with ${response.status}.`)
		}

		const pageRepositories = (await response.json()) as GitHubRepo[]
		repositories.push(...pageRepositories)

		if (pageRepositories.length < GITHUB_PAGE_SIZE) {
			break
		}
	}

	return repositories
}

const getGitHubRepoSlug = (href: string): string | null => {
	try {
		const url = new URL(href)

		if (url.hostname !== 'github.com') {
			return null
		}

		const [owner, repository] = url.pathname
			.split('/')
			.filter(Boolean)
			.map(value => value.replace(/\.git$/u, ''))

		if (!owner || !repository) {
			return null
		}

		return `${owner}/${repository}`.toLowerCase()
	} catch {
		return null
	}
}

const createRepoSlug = ({ name, owner }: GitHubRepo) =>
	`${owner.login}/${name}`.toLowerCase()

const formatLabel = (value: string) => value.replace(/[-_]/gu, ' ')

const mapRepositoryToProject = (repository: GitHubRepo): ArchiveProject => {
	const labels = [repository.language, ...(repository.topics || [])]
		.filter((value): value is string => Boolean(value))
		.map(formatLabel)
		.filter(
			(label, index, collection) =>
				collection.findIndex(
					candidate => candidate.toLowerCase() === label.toLowerCase(),
				) === index,
		)
		.slice(0, 4)

	return {
		createdAt: repository.created_at,
		description: repository.description,
		href: repository.html_url,
		labels,
		name: repository.name,
		owner: repository.owner.login,
		slug: createRepoSlug(repository),
		year: repository.created_at.slice(0, 4),
	}
}

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
