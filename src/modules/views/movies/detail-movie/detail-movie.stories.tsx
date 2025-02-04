import type { Meta, StoryObj } from '@storybook/react'
import { expect } from '@storybook/jest'
import { within } from '@storybook/testing-library'
import { DetailMovieView } from './detail-movie.view'

const meta: Meta<typeof DetailMovieView> = {
    title: 'DetailMovieView',
    component: DetailMovieView,
    argTypes: {},
}

export default meta
type Story = StoryObj<typeof DetailMovieView>

export const Default: Story = {
    args: {},
    async play({ canvasElement }) {
        const canvas = within(canvasElement)
        const container = canvas.getByTestId('detail-movie-view')

        void expect(container).toBeTruthy()
    },
}
