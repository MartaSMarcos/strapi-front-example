import type { Meta, StoryObj } from '@storybook/react'
import { expect } from '@storybook/jest'
import { within } from '@storybook/testing-library'
import { DetailMovieWidget } from './detail-movie.widget'

const meta: Meta<typeof DetailMovieWidget> = {
    title: 'DetailMovieWidget',
    component: DetailMovieWidget,
    argTypes: {},
}

export default meta
type Story = StoryObj<typeof DetailMovieWidget>

export const Default: Story = {
    args: {},
    async play({ canvasElement }) {
        const canvas = within(canvasElement)
        const container = canvas.getByTestId('detail-movie-widget')

        void expect(container).toBeTruthy()
    },
}
