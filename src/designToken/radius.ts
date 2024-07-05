const base = 4
const radius: { [key: string]: string } = {}

for (let i = 1; i <= 60; i++) {
  radius[`base-${i}`] = `${base * i}px`
}

export default radius
