import type { Meta, StoryObj } from '@storybook/react'
import { expect } from '@storybook/jest'
import { within } from '@storybook/testing-library'
import { ListMoviesView } from './list-movies.view'

const meta: Meta<typeof ListMoviesView> = {
    title: 'ListMoviesView',
    component: ListMoviesView,
    argTypes: {},
}

export default meta
type Story = StoryObj<typeof ListMoviesView>

export const Default: Story = {
    args: {},
    async play({ canvasElement }) {
        const canvas = within(canvasElement)
        const container = canvas.getByTestId('list-movies-view')

        void expect(container).toBeTruthy()
    },
}
