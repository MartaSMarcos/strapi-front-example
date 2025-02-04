import type { Meta, StoryObj } from '@storybook/react'
import { expect } from '@storybook/jest'
import { within } from '@storybook/testing-library'
import { ListGenresView } from './list-genres.view'

const meta: Meta<typeof ListGenresView> = {
    title: 'ListGenresView',
    component: ListGenresView,
    argTypes: {},
}

export default meta
type Story = StoryObj<typeof ListGenresView>

export const Default: Story = {
    args: {},
    async play({ canvasElement }) {
        const canvas = within(canvasElement)
        const container = canvas.getByTestId('list-genres-view')

        void expect(container).toBeTruthy()
    },
}
