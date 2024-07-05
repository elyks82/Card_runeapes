/*
  -------------------------------------
  LEVEL 1 TYPOGRAPHY
  -------------------------------------
*/
const LEVEL_1_TYPOGRAPHY = {
  base: 'hellix',
  weights: {
    light: '300',
    regular: '400',
    medium: '500',
    bold: '700',
    black: '900',
  },
  units: (() => {
    const base = 0.5
    const units: { [key: string]: string } = {}

    for (let i = 1; i <= 60; i++) {
      units[`base-${i}`] = `${base * i}rem`
    }

    return units
  })(),
}
/*
  -------------------------------------
  LEVEL 3 TYPOGRAPHY
  -------------------------------------
*/
const LEVEL_3_TYPOGRAPHY = {
  button: {
    primary: {
      text: `${LEVEL_1_TYPOGRAPHY.weights.medium} ${LEVEL_1_TYPOGRAPHY.units['base-2']}/1.5 ${LEVEL_1_TYPOGRAPHY.base}`,
    },
  },
}

export default {
  ...LEVEL_1_TYPOGRAPHY,
  ...LEVEL_3_TYPOGRAPHY,
}
