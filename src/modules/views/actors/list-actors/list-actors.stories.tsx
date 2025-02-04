import type { Meta, StoryObj } from '@storybook/react'
import { expect } from '@storybook/jest'
import { within } from '@storybook/testing-library'
import { ListActorsView } from './list-actors.view'

const meta: Meta<typeof ListActorsView> = {
    title: 'ListActorsView',
    component: ListActorsView,
    argTypes: {},
}

export default meta
type Story = StoryObj<typeof ListActorsView>

export const Default: Story = {
    args: {},
    async play({ canvasElement }) {
        const canvas = within(canvasElement)
        const container = canvas.getByTestId('list-actors-view')

        void expect(container).toBeTruthy()
    },
}
