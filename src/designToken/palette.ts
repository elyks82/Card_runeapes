import border from './border'

/*
  -------------------------------------
  LEVEL 1 PALETTE
  -------------------------------------
*/
const LEVEL_1_PALETTE = {
  green: {
    dark: {
      100: 'hsl(125, 84%, 10%)',
      200: 'hsl(125, 84%, 20%)',
      300: 'hsl(125, 84%, 30%)',
      400: 'hsl(125, 84%, 40%)',
      500: 'hsl(125, 84%, 50%)',
      600: 'hsl(125, 84%, 60%)',
      700: 'hsl(125, 84%, 70%)',
      800: 'hsl(125, 84%, 80%)',
      900: 'hsl(125, 84%, 90%)',
    },
    light: {
      100: 'hsl(125, 84%, 90%)',
      200: 'hsl(125, 84%, 80%)',
      300: 'hsl(125, 84%, 70%)',
      400: 'hsl(125, 84%, 60%)',
      500: 'hsl(125, 84%, 50%)',
      600: 'hsl(125, 84%, 40%)',
      700: 'hsl(125, 84%, 30%)',
      800: 'hsl(125, 84%, 20%)',
      900: 'hsl(125, 84%, 10%)',
    },
  },
  orange: {
    light: {
      '100': 'hsl(38, 100%, 90%)',
      '200': 'hsl(38, 100%, 80%)',
      '300': 'hsl(38, 100%, 70%)',
      '400': 'hsl(38, 100%, 60%)',
      '500': 'hsl(38, 100%, 50%)',
      '600': 'hsl(38, 100%, 50%)',
      '700': 'hsl(38, 100%, 40%)',
      '800': 'hsl(38, 100%, 30%)',
      '900': 'hsl(38, 100%, 20%)',
    },
    dark: {
      '100': 'hsl(0, 0%, 10%)',
      '200': 'hsl(0, 0%, 20%)',
      '300': 'hsl(0, 0%, 30%)',
      '400': 'hsl(0, 0%, 40%)',
      '500': 'hsl(0, 0%, 50%)',
      '600': 'hsl(0, 0%, 60%)',
      '700': 'hsl(0, 0%, 70%)',
      '800': 'hsl(0, 0%, 80%)',
      '900': 'hsl(0, 0%, 90%)',
    },
  },
  inverse: {
    dark: 'hsl(0, 0%, 100%)',
    light: 'hsl(0, 0%, 0%)',
  },
  neutral: {
    dark: {
      100: 'hsl(0, 0%, 10%)',
      200: 'hsl(0, 0%, 20%)',
      300: 'hsl(0, 0%, 30%)',
      400: 'hsl(0, 0%, 40%)',
      500: 'hsl(0, 0%, 50%)',
      600: 'hsl(0, 0%, 60%)',
      700: 'hsl(0, 0%, 70%)',
      800: 'hsl(0, 0%, 80%)',
      900: 'hsl(0, 0%, 90%)',
    },
    light: {
      100: 'hsl(0, 0%, 90%)',
      200: 'hsl(0, 0%, 80%)',
      300: 'hsl(0, 0%, 70%)',
      400: 'hsl(0, 0%, 60%)',
      500: 'hsl(0, 0%, 50%)',
      600: 'hsl(0, 0%, 40%)',
      700: 'hsl(0, 0%, 30%)',
      800: 'hsl(0, 0%, 20%)',
      900: 'hsl(0, 0%, 10%)',
    },
  },
  outline: {
    light: `${border['base-2']} solid #000`,
  },
}

/*
  -------------------------------------
  LEVEL 2 PALETTE
  -------------------------------------
*/

// const LEVEL_2_PALETTE = {}
/*
  -------------------------------------
  LEVEL 3 PALETTE
  -------------------------------------
*/

const LEVEL_3_PALETTE = {
  button: {
    primary: {
      text: {
        light: {
          enabled: LEVEL_1_PALETTE.inverse.dark,
        },
        dark: {
          enabled: LEVEL_1_PALETTE.inverse.light,
        },
      },
      background: {
        light: {
          enabled: LEVEL_1_PALETTE.inverse.light,
          hover: LEVEL_1_PALETTE.neutral.light[800],
          disabled: LEVEL_1_PALETTE.neutral.light[300],
        },
        dark: {
          enabled: LEVEL_1_PALETTE.green.dark[600],
          hover: LEVEL_1_PALETTE.green.dark[800],
          disabled: LEVEL_1_PALETTE.green.dark[300],
        },
      },
    },
  },
  border: {
    light: {
      enabled: LEVEL_1_PALETTE.inverse.light,
    },
    dark: {
      enabled: LEVEL_1_PALETTE.inverse.dark,
    },
  },
}

export default {
  ...LEVEL_1_PALETTE,
  ...LEVEL_3_PALETTE,
}
