import type { Meta, StoryObj } from '@storybook/react'
import { expect } from '@storybook/jest'
import { within } from '@storybook/testing-library'
import { DetailGenreView } from './detail-genre.view'

const meta: Meta<typeof DetailGenreView> = {
    title: 'DetailGenreView',
    component: DetailGenreView,
    argTypes: {},
}

export default meta
type Story = StoryObj<typeof DetailGenreView>

export const Default: Story = {
    args: {},
    async play({ canvasElement }) {
        const canvas = within(canvasElement)
        const container = canvas.getByTestId('detail-genre-view')

        void expect(container).toBeTruthy()
    },
}
