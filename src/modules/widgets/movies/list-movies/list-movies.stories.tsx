import type { Meta, StoryObj } from '@storybook/react'
import { expect } from '@storybook/jest'
import { within } from '@storybook/testing-library'
import { ListMoviesWidget } from './list-movies.widget'

const meta: Meta<typeof ListMoviesWidget> = {
    title: 'ListMoviesWidget',
    component: ListMoviesWidget,
    argTypes: {},
}

export default meta
type Story = StoryObj<typeof ListMoviesWidget>

export const Default: Story = {
    args: {},
    async play({ canvasElement }) {
        const canvas = within(canvasElement)
        const container = canvas.getByTestId('list-movies-widget')

        void expect(container).toBeTruthy()
    },
}
