import type { Meta, StoryObj } from '@storybook/react'
import { expect } from '@storybook/jest'
import { within } from '@storybook/testing-library'
import { DetailTvShowWidget } from './detail-tv-show.widget'

const meta: Meta<typeof DetailTvShowWidget> = {
    title: 'DetailTvShowWidget',
    component: DetailTvShowWidget,
    argTypes: {},
}

export default meta
type Story = StoryObj<typeof DetailTvShowWidget>

export const Default: Story = {
    args: {},
    async play({ canvasElement }) {
        const canvas = within(canvasElement)
        const container = canvas.getByTestId('detail-tv-show-widget')

        void expect(container).toBeTruthy()
    },
}
