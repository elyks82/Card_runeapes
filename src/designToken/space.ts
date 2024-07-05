const base = 4
const space: { [key: string]: string } = {}

for (let i = 0; i <= 60; i++) {
  space[`base-${i}`] = `${base * i}px`
}

export default space
