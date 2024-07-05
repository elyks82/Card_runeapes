// src/components/Chart/Chart.stories.tsx
import { useRef } from 'react'
import { Meta, StoryFn } from '@storybook/react'
import Chart from './Chart'
import { ChartProps, ChartRef } from './types'

export default {
  title: 'Apebrush/Chart',
  component: Chart,
  argTypes: {
    variant: {
      description: 'Select between tooltip and no tooltip',
      control: { type: 'select' },
      options: ['notooltip', 'tooltip'],
      defaultValue: 'notooltip',
    },
  },
} as Meta

const generateRandomData = (numPoints: number) => {
  const data = []
  const baseValue = 70000
  for (let i = 0; i < numPoints; i++) {
    const time = `2023-04-${String(i + 1).padStart(2, '0')}`
    const value = baseValue + Math.random() * 1000 - 100
    data.push({ time, value })
  }
  return data
}

const Template: StoryFn<ChartProps> = args => {
  const chartRef = useRef<ChartRef>(null)
  return (
    <div>
      <Chart {...args} ref={chartRef} />
    </div>
  )
}

export const Default = Template.bind({})
Default.args = {
  initialData: generateRandomData(10),
  width: 300,
  height: 100,
  variant: 'notooltip',
}

export const WithSelection = Template.bind({})
WithSelection.args = {
  initialData: generateRandomData(10),
  width: 300,
  height: 100,
  setSelection: () => {},
  variant: 'notooltip',
}
