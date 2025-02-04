import type { Meta, StoryObj } from '@storybook/react'
import { expect } from '@storybook/jest'
import { within } from '@storybook/testing-library'
import { HomeView } from './home.view'

const meta: Meta<typeof HomeView> = {
    title: 'HomeView',
    component: HomeView,
    argTypes: {},
}

export default meta
type Story = StoryObj<typeof HomeView>

export const Default: Story = {
    args: {},
    async play({ canvasElement }) {
        const canvas = within(canvasElement)
        const container = canvas.getByTestId('home-view')

        void expect(container).toBeTruthy()
    },
}
