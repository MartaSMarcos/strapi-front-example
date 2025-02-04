import type { Meta, StoryObj } from '@storybook/react'
import { expect } from '@storybook/jest'
import { within } from '@storybook/testing-library'
import { ListActorsWidget } from './list-actors.widget'

const meta: Meta<typeof ListActorsWidget> = {
    title: 'ListActorsWidget',
    component: ListActorsWidget,
    argTypes: {},
}

export default meta
type Story = StoryObj<typeof ListActorsWidget>

export const Default: Story = {
    args: {},
    async play({ canvasElement }) {
        const canvas = within(canvasElement)
        const container = canvas.getByTestId('list-actors-widget')

        void expect(container).toBeTruthy()
    },
}
