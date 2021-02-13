# mini-storybook

A bare bones storybook setup that builds a simple site for viewing story files. Unlike storybook itself there are no addons or plugins, all it does is render some stories but does allow for whatever customization makes sense for your use-case.

## Getting started

Run the following inside your existing projects root directory

```sh
npx mini-storybook init
```

mini storybook will scaffold itself as well as add and install required dependencies.
After it's done run:

```sh
npm run storybook
```

### Writing stories

Any files in `/stories` are loaded up and displayed as stories. Mini storybook supports
a narrow subset of the [Component Story Format](https://storybook.js.org/docs/react/api/csf), basically just the `title` and `storyName` properties;

### Customizing

Rather than abstract away the storybook app, it's fully scaffolded in your project
under `.mstorybook/`. If you want to tweak the storybook app edit `.mstorybook/app/index.js`
and if you need to customize the webpack config it's located at `.mstorybook/app/webpack.config.js`.

### Setup code

You can add any setup code to `.mstorybook/setup.js`, import CSS, set up app wide configuration, etc, here.

### Theme

There is very little default theming but all of TailwindCSS is setup and it's config is
located at `.mstorybook/tailwind.config.js`
