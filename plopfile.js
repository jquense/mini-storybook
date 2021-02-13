const path = require('path')
const fs = require('fs')
const { stripIndent } = require('common-tags')
const templatePath = path.resolve(__dirname, './templates')
const has = require('lodash/has')

const prompts = [
  {
    name: 'location',
    type: 'input',
    message: 'package location',
  },
  {
    name: 'typescript',
    type: 'confirm',
    default: false,
    message: 'Do you want to use TypeScript?',
  },
]

module.exports = (plop) => {
  plop.setGenerator('mini-storybook', {
    description: 'Setup up mini-storybook',
    prompts,
    actions(answers) {
      const { type, location, typescript } = answers

      return [
        {
          type: 'add',
          path: '{{location}}/.babelrc.js',
          template: stripIndent`
            module.exports = {
              presets: [
                [
                  require('mini-storybook/babel-preset'),
                  { typescript: ${typescript} }
                ],
              ]
            }
          `,
          skipIfExists: true,
        },
        {
          type: 'addMany',
          base: `${templatePath}/.app/`,
          destination: '{{location}}/.mstorybook/app',
          templateFiles: `${templatePath}/.app/**/*`,
        },
        {
          type: 'addMany',
          base: `${templatePath}/config/`,
          destination: '{{location}}/.mstorybook/',
          templateFiles: `${templatePath}/config/**/*`,
        },
        answers.skipExample
          ? () => {
              fs.mkdirSync(`${plop.getDestBasePath()}/${location}/stories`)
            }
          : {
              type: 'add',
              destination: '{{location}}/stories',
              templateFile: `${templatePath}/Example.js`,
            },
        {
          type: 'modify',
          path: 'package.json',
          abortOnFail: false,
          transform(fileContents, data) {
            const pkg = JSON.parse(fileContents)
            pkg.scripts = pkg.scripts || {}
            pkg.scripts.storybook = 'mini-storybook start'

            if (
              !has(pkg, 'dependencies.react') &&
              !has(pkg, 'devDependencies.react') &&
              !has(pkg, 'peerDependencies.react')
            ) {
              pkg.devDependencies = pkg.devDependencies || {}
              pkg.devDependencies.react = '^17.0.0'
            }
            if (
              !has(pkg, 'dependencies.react-dom') &&
              !has(pkg, 'devDependencies.react-dom') &&
              !has(pkg, 'peerDependencies.react-dom')
            ) {
              pkg.devDependencies = pkg.devDependencies || {}
              pkg.devDependencies['react-dom'] = '^17.0.0'
            }

            return JSON.stringify(pkg, null, 2)
          },
        },
      ]
    },
  })
}
