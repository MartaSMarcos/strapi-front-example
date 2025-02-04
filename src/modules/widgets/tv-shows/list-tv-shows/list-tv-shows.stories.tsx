import type { Meta, StoryObj } from '@storybook/react'
import { expect } from '@storybook/jest'
import { within } from '@storybook/testing-library'
import { ListTvShowsWidget } from './list-tv-shows.widget'

const meta: Meta<typeof ListTvShowsWidget> = {
    title: 'ListTvShowsWidget',
    component: ListTvShowsWidget,
    argTypes: {},
}

export default meta
type Story = StoryObj<typeof ListTvShowsWidget>

export const Default: Story = {
    args: {},
    async play({ canvasElement }) {
        const canvas = within(canvasElement)
        const container = canvas.getByTestId('list-tv-shows-widget')

        void expect(container).toBeTruthy()
    },
}
