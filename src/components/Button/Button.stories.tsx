import type { Meta, StoryObj } from '@storybook/react'
import { Button } from '.'

const meta = {
  title: 'Apebrush/Button',
  component: Button,
  parameters: {
    layout: 'fullscreen centered',
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      description: 'The children of the Button',
      control: {
        type: 'text',
      },
    },
  },
} as Meta

export default meta

type Story = StoryObj<typeof Button>

export const Nude: Story = {
  args: {
    children: 'Lorem ipsum',
    isStretched: false,
    isDisabled: false,
  },
}
