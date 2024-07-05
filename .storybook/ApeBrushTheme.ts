import { create } from '@storybook/theming/create'

export default create({
  base: 'light',
  // Typography
  fontBase: '"Hellix", sans-serif', // Add font
  fontCode: 'monospace',

  brandTitle: 'ApeBrush Design System',
  brandUrl: 'https://runeapes.io',
  brandImage: '/images/logo.svg',
  brandTarget: '_self',

  //
  colorPrimary: '#4bf05b',
  colorSecondary: '#36ad42',

  // UI
  appBg: '#ffffff',
  appContentBg: '#ffffff',
  appPreviewBg: '#ffffff',
  appBorderRadius: 4,

  // Text colors
  textColor: '#10162F',
  textInverseColor: '#ffffff',

  // Toolbar default and active colors
  barTextColor: '#9E9E9E',
  barSelectedColor: '#585C6D',
  barHoverColor: '#585C6D',
  barBg: '#ffffff',

  // Form colors
  inputBg: '#ffffff',
  inputBorder: '#10162F',
  inputTextColor: '#10162F',
  inputBorderRadius: 2
})
