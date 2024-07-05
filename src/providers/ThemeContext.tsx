import { ThemeProvider } from 'styled-components'
import { createContext } from 'react'
import { Nib } from '../types'
import designToken from '../designToken'

type ThemeContextValue = {
  nib: Nib
  setNib?: (_nib: Nib) => void
}

type ThemeContextProps = {
  children: React.ReactNode
  value?: ThemeContextValue
}

export const ThemeContext = createContext<ThemeContextValue>({
  nib: 'light',
  setNib: () => {},
})

const ThemeContextProvider: React.FC<ThemeContextProps> = ({
  children,
  value = {
    nib: 'light',
  },
}) => {
  return (
    <ThemeContext.Provider value={{ nib: value.nib }}>
      <ThemeProvider theme={designToken}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  )
}

export default ThemeContextProvider
