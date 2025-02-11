import type { Meta, StoryObj } from '@storybook/react'
import { expect } from '@storybook/jest'
import { within } from '@storybook/testing-library'
import { DescriptionBlock } from './description-block.component'

const meta: Meta<typeof DescriptionBlock> = {
    title: 'DescriptionBlock',
    component: DescriptionBlock,
    argTypes: {},
}

export default meta
type Story = StoryObj<typeof DescriptionBlock>

export const Default: Story = {
    args: {},
    async play({ canvasElement }) {
        const canvas = within(canvasElement)
        const container = canvas.getByTestId('description-block')

        void expect(container).toBeTruthy()
    },
}
