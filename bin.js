#!/usr/bin/env node

const nodePlop = require('node-plop')
const path = require('path')
const yargs = require('yargs')
const start = require('@4c/start')
const { glob } = require('glob')

yargs
  .help()
  .alias('h', 'help')
  .version()
  .alias(`v`, `version`)
  .wrap(yargs.terminalWidth())
  .strict()
  .command(
    'init [location]',
    true,
    (_) =>
      _.positional('location', {
        type: 'string',
        default: process.cwd(),
        describe: 'the location of the package',
        normalize: true,
      }).option('typescript', {
        type: 'boolean',
      }),

    async ({ location, typescript }) => {
      location = path.resolve(location)

      const plop = nodePlop(`${__dirname}/plopfile.js`)
      const newPkg = plop.getGenerator('mini-storybook')

      const answers = await newPkg.runPrompts(
        [location, typescript].filter((f) => f != null),
      )

      const result = await newPkg.runActions(answers)

      if (result.failures) {
        result.failures.forEach(
          (f) =>
            f.error &&
            !f.error.startsWith('Aborted due to previous') &&
            console.error(f.error),
        )
      } else {
        console.log('Your mini storybook has been set up. To start run:')
        console.log('   yarn mini-storybook start')
        console.log('')
      }
    },
  )
  .command('start', true, async (argv) => {
    const config = glob.sync('**/.mstorybook/webpack.config.js', {
      ignore: ['**/node_modules/**'],
    })[0]
    console.log(`Starting ms using config: ${config}`)
    await start({ ...argv, config: config })
  }).argv
