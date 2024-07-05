import { LineData } from 'lightweight-charts'
import { MutableRefObject } from 'react'

export interface ChartProps {
  initialData: LineData[]
  width: number
  height: number
  setSelection?: (_point: { time: string; value: number }) => void
  variant?: 'notooltip' | 'tooltip'
}

export interface ChartRef {
  updateData: (_newData: LineData[]) => void
  resize: (_width: number, _height: number) => void
  ref: MutableRefObject<HTMLDivElement | null>
}
