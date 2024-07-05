import { ButtonProps as AriaButtonProps } from 'react-aria-components'
import { Nib } from '../../types'

export interface ButtonProps extends AriaButtonProps {
  children?: React.ReactNode
  /**
   * Stretch the button to fill the width of its container
   * @default false
   */
  isStretched?: boolean
  colorVariant?: 'primary' | 'secondary'
  nib?: Nib
  backgroundColor?: string
}
