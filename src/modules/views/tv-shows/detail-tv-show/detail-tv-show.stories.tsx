import type { Meta, StoryObj } from '@storybook/react'
import { expect } from '@storybook/jest'
import { within } from '@storybook/testing-library'
import { DetailTvShowView } from './detail-tv-show.view'

const meta: Meta<typeof DetailTvShowView> = {
    title: 'DetailTvShowView',
    component: DetailTvShowView,
    argTypes: {},
}

export default meta
type Story = StoryObj<typeof DetailTvShowView>

export const Default: Story = {
    args: {},
    async play({ canvasElement }) {
        const canvas = within(canvasElement)
        const container = canvas.getByTestId('detail-tv-show-view')

        void expect(container).toBeTruthy()
    },
}
