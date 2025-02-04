import type { Meta, StoryObj } from '@storybook/react'
import { expect } from '@storybook/jest'
import { within } from '@storybook/testing-library'
import { ApiSideListWidget } from './list-card.widget'

const meta: Meta<typeof ApiSideListWidget> = {
    title: 'ApiSideListWidget',
    component: ApiSideListWidget,
    argTypes: {},
}

export default meta
type Story = StoryObj<typeof ApiSideListWidget>

export const Default: Story = {
    args: {},
    async play({ canvasElement }) {
        const canvas = within(canvasElement)
        const container = canvas.getByTestId('api-side-list-widget')

        void expect(container).toBeTruthy()
    },
}
