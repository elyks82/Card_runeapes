import styled, { css } from 'styled-components'
import { Button as AriaButton } from 'react-aria-components'
import { ButtonProps } from './types'
import { WithNib } from '../../types'

export const StyledButton = styled(AriaButton)<WithNib<ButtonProps>>`
  ${({ theme, nib, isStretched }) => {
    /*

      Variants:
      - primary => full opacity
      - secondary => text with primary color on bg with same primary but lower opacity?
    */

    return css`
      transition: ${theme.timing.fast};
      filter: ${theme.brightness['brightness-100']};
      display: flex;
      justify-content: center;
      align-items: center;
      width: ${isStretched ? '100%' : 'auto'};
      padding: ${theme.space['base-4']};
      border-radius: ${theme.radius['base-15']};
      border: ${theme.border.none};
      color: ${theme.palette.button.primary.text[nib].enabled};
      background-color: ${theme.palette.button.primary.background[nib].enabled};
      outline: none;
      font: ${theme.typography.button.primary.text};

      &[data-hovered] {
        transition: ${theme.timing.fast};
        background-color: ${theme.palette.button.primary.background[nib].hover};
        cursor: pointer;
      }

      &[data-pressed] {
        transition: ${theme.timing.none};
        background-color: ${theme.palette.button.primary.background[nib]
          .enabled};
      }

      &[data-disabled] {
        transition: ${theme.timing.none};
        background-color: ${theme.palette.button.primary.background[nib]
          .disabled};
        cursor: not-allowed;
      }

      &[data-focus-visible] {
        outline: ${theme.palette.outline.light};
      }
    `
  }}
`
