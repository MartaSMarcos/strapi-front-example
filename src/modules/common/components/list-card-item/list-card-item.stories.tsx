import type { Meta, StoryObj } from '@storybook/react'
import { expect } from '@storybook/jest'
import { within } from '@storybook/testing-library'
import { ListCardItem } from './list-card-item.component'

const meta: Meta<typeof ListCardItem> = {
    title: 'ListCardItem',
    component: ListCardItem,
    argTypes: {},
}

export default meta
type Story = StoryObj<typeof ListCardItem>

export const Default: Story = {
    args: {},
    async play({ canvasElement }) {
        const canvas = within(canvasElement)
        const container = canvas.getByTestId('list-card-item')

        void expect(container).toBeTruthy()
    },
}
