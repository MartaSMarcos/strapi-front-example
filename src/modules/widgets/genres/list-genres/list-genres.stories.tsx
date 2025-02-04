import type { Meta, StoryObj } from '@storybook/react'
import { expect } from '@storybook/jest'
import { within } from '@storybook/testing-library'
import { ListGenresWidget } from './list-genres.widget'

const meta: Meta<typeof ListGenresWidget> = {
    title: 'ListGenresWidget',
    component: ListGenresWidget,
    argTypes: {},
}

export default meta
type Story = StoryObj<typeof ListGenresWidget>

export const Default: Story = {
    args: {},
    async play({ canvasElement }) {
        const canvas = within(canvasElement)
        const container = canvas.getByTestId('list-genres-widget')

        void expect(container).toBeTruthy()
    },
}
