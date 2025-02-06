import type { Meta, StoryObj } from '@storybook/react'
import { expect } from '@storybook/jest'
import { within } from '@storybook/testing-library'
import { NavbarWidget } from './navbar.widget'

const meta: Meta<typeof NavbarWidget> = {
    title: 'NavbarWidget',
    component: NavbarWidget,
    argTypes: {},
}

export default meta
type Story = StoryObj<typeof NavbarWidget>

export const Default: Story = {
    args: {},
    async play({ canvasElement }) {
        const canvas = within(canvasElement)
        const container = canvas.getByTestId('navbar-widget')

        void expect(container).toBeTruthy()
    },
}
