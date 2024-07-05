import { useContext } from 'react'
import { Nib as NibType } from '../types'
import { ThemeContext } from '../providers'

export default (providedNib?: NibType) => {
  // Get from context
  const nib = useContext(ThemeContext)
  return providedNib ? { ...nib, nib: providedNib } : nib
}
