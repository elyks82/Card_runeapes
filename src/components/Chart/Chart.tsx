// src/components/Chart/Chart.tsx
import {
  useRef,
  useEffect,
  useImperativeHandle,
  forwardRef,
  useState,
} from 'react'
import {
  createChart,
  IChartApi,
  ISeriesApi,
  LineData,
  CrosshairMode,
  LineStyle,
} from 'lightweight-charts'
import useNib from '../../utils/useNib'
import { ChartProps, ChartRef } from './types'
import { StyledChartContainer } from './Chart.styled'
import palette from '../../designToken/palette'

// interface ExtendedChartProps extends ChartProps {
//   setSelection?: (_point: { time: string; value: number }) => void
//   variant?: 'notooltip' | 'tooltip'
// }

import theme from '../../../.storybook/ApeBrushTheme'

const Chart = forwardRef<ChartRef, ChartProps>(
  (
    {
      initialData,
      width = 300,
      height = 100,
      setSelection,
      variant = 'notooltip',
    },
    ref,
  ) => {
    const chartContainerRef = useRef<HTMLDivElement>(null)
    const chartRef = useRef<IChartApi | null>(null)
    const lineSeriesRef = useRef<ISeriesApi<'Line'> | null>(null)
    const { nib } = useNib()
    const toolTipRef = useRef<HTMLDivElement | null>(null)
    const [selectedPoint, setSelectedPoint] = useState<{
      time: string
      value: number
    } | null>(null)

    useEffect(() => {
      if (!chartContainerRef.current) return

      const isDarkTheme = nib === 'dark'
      const chart = createChart(chartContainerRef.current, {
        width: width, // Adjust width to account for padding
        height: height, // Adjust height to account for padding overflowing time scale.
        layout: {
          background: { color: 'transparent' },
          textColor: isDarkTheme ? 'white' : 'black',
        },
        handleScroll: {
          mouseWheel: false,
          pressedMouseMove: false,
          horzTouchDrag: false,
          vertTouchDrag: false,
        },
        handleScale: {
          axisPressedMouseMove: false,
          mouseWheel: false,
          pinch: false,
        },
        grid: {
          vertLines: {
            visible: false,
          },
          horzLines: {
            color: `${palette.border[isDarkTheme ? 'dark' : 'light'].enabled.replace('hsl', 'hsla').replace(')', ', 0.1)')}`,
          },
        },
        crosshair: {
          mode:
            variant === 'tooltip' || setSelection
              ? CrosshairMode.Magnet
              : CrosshairMode.Hidden,
          vertLine: {
            color:
              variant === 'tooltip' || setSelection
                ? palette.orange.light[600]
                : 'transparent',
            width: 1,
            style: LineStyle.Dashed,
            visible: !!(variant === 'tooltip' || setSelection),
            labelVisible: !!(variant === 'tooltip' || setSelection),
            labelBackgroundColor: palette.orange.light[600],
          },
          horzLine: {
            color:
              variant === 'tooltip' || setSelection
                ? palette.orange.light[600]
                : 'transparent',
            width: 1,
            style: LineStyle.Dashed,
            visible: !!(variant === 'tooltip' || setSelection),
            labelVisible: !!(variant === 'tooltip' || setSelection),
            labelBackgroundColor: palette.orange.light[600],
          },
        },
      })
      chart.priceScale('right').applyOptions({
        visible: false,
      })
      // Hide the time scale
      chart.timeScale().applyOptions({
        visible: false,
        rightOffset: 1,
        fixLeftEdge: true,
      })
      chart
        .timeScale()
        .setVisibleLogicalRange({ from: 0.5, to: initialData.length - 1.5 })

      // chart.timeScale().fitContent()
      chart.timeScale().scrollToPosition(0, false)
      const lineSeries = chart.addLineSeries({
        color: palette.orange.light[600],
        lineWidth: 3,
        priceLineVisible: false,
      })
      if (variant === 'tooltip' || setSelection) {
        chart.subscribeCrosshairMove(param => {
          if (!param.time || (variant === 'tooltip' && !toolTipRef.current)) {
            if (toolTipRef.current) {
              toolTipRef.current.style.display = 'none'
            }
            setSelectedPoint(null)
            return
          }
          const point = param.seriesData.get(lineSeriesRef.current!)
          if (point && 'value' in point) {
            const dateStr = param.time as string
            const price = (point as LineData).value
            if (variant === 'tooltip' && toolTipRef.current) {
              toolTipRef.current.style.display = 'block'
              toolTipRef.current.innerHTML = `<div style="color: ${palette.neutral.light[600]}">Price</div><div style="font-size: 12px; margin: 2px 0px; color: ${palette.neutral.light}">${Math.round(100 * price) / 100}</div><div style="color: ${palette.neutral.light}">${dateStr}</div>`
              // setSelectedPoint({ time: dateStr, value: price })
              // setSelection({ time: dateStr, value: price })

              const coordinate = lineSeries.priceToCoordinate(price)
              let shiftedCoordinate = (param.point?.x ?? 0) + 10
              if (coordinate === null) {
                return
              }
              shiftedCoordinate = Math.max(
                0,
                Math.min(
                  chartContainerRef.current!.clientWidth - 80,
                  shiftedCoordinate,
                ),
              )
              const coordinateY = (param.point?.y ?? 0) - 45
              // coordinate - 70 - 10 > 0
              //   ? coordinate - 70 - 10
              //   : Math.max(
              //       0,
              //       Math.min(
              //         chartContainerRef.current!.clientHeight - 70 - 10,
              //         coordinate + 10,
              //       ),
              //     )
              toolTipRef.current.style.left = shiftedCoordinate + 'px'
              toolTipRef.current.style.top = coordinateY + 'px'
            } else if (toolTipRef.current) {
              toolTipRef.current.style.display = 'none'
            }

            setSelectedPoint({ time: dateStr, value: price })
            if (setSelection) {
              setSelection({ time: dateStr, value: price })
            }
          }
        })
      }
      lineSeries.setData(initialData)

      chartRef.current = chart
      lineSeriesRef.current = lineSeries

      return () => {
        chart.remove()
      }
    }, [initialData, width, height, nib, setSelection, variant])

    useImperativeHandle(ref, () => ({
      updateData(newData: LineData[]) {
        if (lineSeriesRef.current) {
          lineSeriesRef.current.setData(newData)
        }
      },
      resize(newWidth: number, newHeight: number) {
        if (chartRef.current) {
          chartRef.current.resize(newWidth, newHeight) // Adjust size to account for padding
          chartRef.current.timeScale().fitContent()
          chartRef.current.timeScale().scrollToPosition(0, false)
        }
      },
      ref: chartContainerRef, // Add ref to the returned object
    }))
    const isDarkTheme = nib === 'dark'
    return (
      <div style={{ display: 'flex' }}>
        <StyledChartContainer
          ref={chartContainerRef}
          width={width}
          height={height}
          nib={nib}
        >
          {variant === 'tooltip' && (
            <div
              ref={toolTipRef}
              style={{
                width: '80px',
                height: '50px',
                position: 'absolute',
                display: 'none',
                padding: '4px',
                boxSizing: 'border-box',
                fontSize: '10px',
                textAlign: 'left',
                zIndex: 1000,
                top: '1px',
                left: '1px',
                pointerEvents: 'none',
                border: '1px solid',
                borderRadius: '2px',
                fontFamily: theme.fontBase,
                WebkitFontSmoothing: 'antialiased',
                MozOsxFontSmoothing: 'grayscale',
                background:
                  nib === 'dark' ? palette.inverse.light : palette.inverse.dark,
                color:
                  nib === 'dark' ? palette.inverse.dark : palette.inverse.light,
                borderColor: palette.orange.light[200],
              }}
            />
          )}
        </StyledChartContainer>
        {setSelection && selectedPoint && (
          <div
            style={{
              marginLeft: '10px',
              fontFamily: theme.fontBase,
              color: isDarkTheme
                ? palette.neutral.light[200]
                : palette.neutral.dark[200],
            }}
          >
            <div>Date: {selectedPoint.time}</div>
            <div>Price: {selectedPoint.value}</div>
          </div>
        )}
      </div>
    )
  },
)

export default Chart
