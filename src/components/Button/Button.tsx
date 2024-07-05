import React from 'react'
import { ButtonProps } from './types'
import { StyledButton } from './Button.styled'
import useNib from '../../utils/useNib'

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    const { children, nib: propNib, ...restProps } = props

    const { nib } = useNib(propNib)

    return (
      <StyledButton
        data-apebrush-component="Button"
        ref={ref}
        {...restProps}
        nib={nib}
      >
        {children}
      </StyledButton>
    )
  },
)

Button.displayName = 'Button'
export default Button
