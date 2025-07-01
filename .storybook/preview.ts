import type { Preview } from '@storybook/react'
import '../src/index.css'
import theme from './theme'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      theme: theme,
    },
    options: {
      storySort: {
        method: 'alphabetical',
        order: [
          'Getting Started',
          'changelog',
          'Components',
          [
            '*',
            [
              'CHANGELOG',
              'docs',
              'Default',
              '*'
            ]
          ]
        ],
        locales: 'en-US',
      },
    },
  },
};

export default preview;