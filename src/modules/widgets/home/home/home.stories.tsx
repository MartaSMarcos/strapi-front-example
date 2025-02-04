import type { Meta, StoryObj } from '@storybook/react'
import { expect } from '@storybook/jest'
import { within } from '@storybook/testing-library'
import { HomeWidget } from './home.widget'

const meta: Meta<typeof HomeWidget> = {
    title: 'HomeWidget',
    component: HomeWidget,
    argTypes: {},
}

export default meta
type Story = StoryObj<typeof HomeWidget>

export const Default: Story = {
    args: {},
    async play({ canvasElement }) {
        const canvas = within(canvasElement)
        const container = canvas.getByTestId('home-widget')

        void expect(container).toBeTruthy()
    },
}
