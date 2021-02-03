const path = require('path')
const { stripIndent } = require('common-tags')
const templatePath = path.resolve(__dirname, './templates')

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
  // controller generator
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
          destination: '{{location}}/.app/',
          templateFiles: `${templatePath}/.app/**/*`,
        },
        {
          type: 'addMany',
          base: `${templatePath}/config/`,
          destination: '{{location}}/config/',
          templateFiles: `${templatePath}/config/**/*`,
        },
      ]
    },
  })
}
