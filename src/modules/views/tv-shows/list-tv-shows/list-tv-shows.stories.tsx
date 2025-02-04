import type { Meta, StoryObj } from '@storybook/react'
import { expect } from '@storybook/jest'
import { within } from '@storybook/testing-library'
import { ListTvShowsView } from './list-tv-shows.view'

const meta: Meta<typeof ListTvShowsView> = {
    title: 'ListTvShowsView',
    component: ListTvShowsView,
    argTypes: {},
}

export default meta
type Story = StoryObj<typeof ListTvShowsView>

export const Default: Story = {
    args: {},
    async play({ canvasElement }) {
        const canvas = within(canvasElement)
        const container = canvas.getByTestId('list-tv-shows-view')

        void expect(container).toBeTruthy()
    },
}
