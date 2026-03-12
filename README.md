# Weather App

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Recommended Browser Setup

- Chromium-based browsers (Chrome, Edge, Brave, etc.):
  - [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
  - [Turn on Custom Object Formatter in Chrome DevTools](http://bit.ly/object-formatters)
- Firefox:
  - [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
  - [Turn on Custom Object Formatter in Firefox DevTools](https://fxdx.dev/firefox-devtools-custom-object-formatters/)

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

First install dependencies:

```sh
npm install
```

Before running the app you must create an environment file. Copy the example template and fill in any required values:

```sh
cp .env.example .env
```

(Windows PowerShell users can run `Copy-Item .env.example .env`.)

After the `.env` file is in place the usual scripts work as shown below.

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

---

## Running in a Container

A Dockerfile is included to build the app as a static site and serve it with nginx.

1. Ensure `.env` exists (see above) and contains any required variables.
2. Build the image:

```sh
docker build -t weather-app .
```

3. Run a container, mapping port 80 to your host:

```sh
docker run --rm -p 8080:80 weather-app
```

You can then open http://localhost:8080 in your browser. For production you can push the image to a registry or customize the nginx configuration as needed.
