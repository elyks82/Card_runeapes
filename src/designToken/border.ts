const base = 1

const border: { [key: string]: string } = {
  none: 'none',
}

for (let i = 1; i <= 60; i++) {
  border[`base-${i}`] = `${base * i}px`
}

export default border
