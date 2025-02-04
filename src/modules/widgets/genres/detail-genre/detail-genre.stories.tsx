import type { Meta, StoryObj } from '@storybook/react'
import { expect } from '@storybook/jest'
import { within } from '@storybook/testing-library'
import { DetailGenreWidget } from './detail-genre.widget'

const meta: Meta<typeof DetailGenreWidget> = {
    title: 'DetailGenreWidget',
    component: DetailGenreWidget,
    argTypes: {},
}

export default meta
type Story = StoryObj<typeof DetailGenreWidget>

export const Default: Story = {
    args: {},
    async play({ canvasElement }) {
        const canvas = within(canvasElement)
        const container = canvas.getByTestId('detail-genre-widget')

        void expect(container).toBeTruthy()
    },
}
