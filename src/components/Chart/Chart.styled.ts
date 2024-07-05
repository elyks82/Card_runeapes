import styled, { css } from 'styled-components'
import { WithNib } from '../../types'
import palette from '../../designToken/palette'

export const StyledChartContainer = styled.div<
  WithNib<{ width: number; height: number }>
>`
  ${({ nib, width, height }) => css`
    width: ${width}px;
    height: ${height}px;
    background-color: transparent;
    position: relative;
    border-radius: 10px;
    border: 2px solid
      ${palette.border[nib].enabled
        .replace('hsl', 'hsla')
        .replace(')', ', 0.15)')};
    padding: 0px; // Add padding to ensure the borders are not clipped
    overflow: hidden; // Ensure the container handles overflow correctly

    .tv-lightweight-charts {
      .pane-legend {
        display: none !important;
      }
    }
  `}
`
