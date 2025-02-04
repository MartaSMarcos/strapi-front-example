import type { Meta, StoryObj } from '@storybook/react'
import { expect } from '@storybook/jest'
import { within } from '@storybook/testing-library'
import { ThemeSwitch } from './theme-switch.component'

const meta: Meta<typeof ThemeSwitch> = {
    title: 'ThemeSwitch',
    component: ThemeSwitch,
    argTypes: {},
}

export default meta
type Story = StoryObj<typeof ThemeSwitch>

export const Default: Story = {
    args: {},
    async play({ canvasElement }) {
        const canvas = within(canvasElement)
        const container = canvas.getByTestId('theme-switch')

        void expect(container).toBeTruthy()
    },
}
