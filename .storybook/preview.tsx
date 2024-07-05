import React, { useEffect } from 'react'

import { Preview } from '@storybook/react'

import { ThemeContextProvider } from '../src/providers'

function withThemeProvider(Story, context) {
  const isLight =
    context.globals.backgrounds?.value === 'transparent' ||
    context.globals.backgrounds?.value === '#ffffff' ||
    !context.globals.backgrounds?.value

  const nib = isLight ? 'light' : 'dark'

  useEffect(() => {
    document.body.setAttribute('motif', nib)
  }, [nib])

  return (
    <ThemeContextProvider value={{ nib: nib }}>
      <Story />
    </ThemeContextProvider>
  )
}

const preview: Preview = {
  decorators: [withThemeProvider],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      disable: false,
      values: [
        { name: 'light', value: '#ffffff' },
        { name: 'dark', value: '#000000' },
      ],
    },
  },
}

export default preview
