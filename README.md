![Project photo](/public/preview.png)

# About project

The project is a portfolio for myself, It was inspired [Brittany Chiang](https://brittanychiang.com/) a Senior Front-End Engineer that I really respect.

The tools used to make this website where [Qwik](https://qwik.builder.io/), [Tailwind](https://tailwindcss.com/), [Bun](https://bun.sh/) and [Vercel](https://vercel.com/home). The objective was to make a site with a 100 score!

## Project Structure

Inside your project, you'll see the following directory structure:

```
├── public/
│   └── ...
└── src/
    ├── data.json
    ├── components/
    │   └── ...
    └── routes/
        └── ...  
```

If you want to customize the data/information on the website, simply edit the `src/data.json` file. If you want to change the content of the About or Footer sections, you can find the corresponding MDX files at `src/components/home/about/description.mdx` and `src/components/layout/footer/footer.mdx`, respectively.

## Add Integrations and deployment

To deploy the project, simply fork this template on GitHub, go to Vercel, connect your GitHub account and select the forked repository. Set the build command to `bun run build` and `bun install`. Finally, click deploy.

## Development

Development mode uses [Vite's development server](https://vitejs.dev/). The `dev` command will server-side render (SSR) the output during development.

```shell
bun install # install dependencies
```

```shell
bun dev # bun start  
```

> Note: during dev mode, Vite may request a significant number of `.js` files. This does not represent a Qwik production build.

## Preview

The preview command will create a production build of the client modules, a production build of `src/entry.preview.tsx`, and run a local server. The preview server is only for convenience to preview a production build locally and should not be used as a production server.

```shell
bun run preview # run before deploying to check
```

## Production

The production build will generate client and server modules by running both client and server build commands. The build command will use Typescript to run a type check on the source code.

```shell
bun run build # command for deployment
```

## Vercel Edge

This starter site is configured to deploy to [Vercel Edge Functions](https://vercel.com/docs/concepts/functions/edge-functions), which means it will be rendered at an edge location near to your users.

## Installation

The adaptor will add a new `vite.config.ts` within the `adapters/` directory, and a new entry file will be created, such as:

```
└── adapters/
    └── vercel-edge/
        └── vite.config.ts
└── src/
    └── entry.vercel-edge.tsx
```

Additionally, within the `package.json`, the `build.server` script will be updated with the Vercel Edge build.

## Production build

To build the application for production, use the `build` command, this command will automatically run `bun run build.server` and `bun run build.client`:

```shell
npm run build
```

[Read the full guide here](https://github.com/BuilderIO/qwik/blob/main/starters/adapters/vercel-edge/README.md)

## Dev deploy

To deploy the application for development:

```shell
bun run deploy
```

Notice that you might need a [Vercel account](https://docs.Vercel.com/get-started/) in order to complete this step!

## Production deploy

The project is ready to be deployed to Vercel. However, you will need to create a git repository and push the code to it.

You can [deploy your site to Vercel](https://vercel.com/docs/concepts/deployments/overview) either via a Git provider integration or through the Vercel CLI.
