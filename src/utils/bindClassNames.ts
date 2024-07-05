type Arg =
  | undefined
  | null
  | boolean
  | number
  | string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  | Record<string, any>
  | Arg[]

type ClassNameGenerator = {
  (..._args: Arg[]): string
  concat(..._args: Arg[]): (..._args: Arg[]) => string
}

export function classNames(...args: Arg[]): string {
  let result = ''
  let i = 0
  while (i < args.length) {
    const val = args[i++]
    if (!val) continue

    const valType = typeof val
    if (valType === 'boolean') continue

    if (Array.isArray(val)) {
      args.push(...val)
    } else if (valType === 'object') {
      const entries = Object.entries(val)
      let k = 0
      while (k < entries.length) {
        const [key, valid] = entries[k++] as [string, boolean]
        if (valid) result += ` ${key.toString()}`
      }
    } else {
      result += ` ${val.toString()}`
    }
  }

  return result.trim()
}

export function bindClassNames(
  obj: Partial<Record<string, string>>,
): ClassNameGenerator {
  const exec = (...args: Arg[]) => {
    let result = ''
    let j = 0
    while (j < args.length) {
      const val = args[j++]
      if (!val) continue

      const valType = typeof val
      if (valType === 'boolean') continue

      if (Array.isArray(val)) {
        args.push(...val)
      } else if (valType === 'object') {
        const entires = Object.entries(val)
        let k = 0
        while (k < entires.length) {
          const [key, valid] = entires[k++] as [string, boolean]
          if (valid) result += ` ${(obj[key] || key).toString()}`
        }
      } else {
        result += ` ${(obj[val as string] || val).toString()}`
      }
    }

    return result.trim()
  }

  exec.concat = (...args: Arg[]) => {
    const className = classNames(...args)
    if (!className) return exec
    return (...args: Arg[]) => className + ` ${exec(...args)}`
  }

  return exec
}
