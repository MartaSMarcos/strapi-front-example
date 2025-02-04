import type { Meta, StoryObj } from '@storybook/react'
import { expect } from '@storybook/jest'
import { within } from '@storybook/testing-library'
import { DetailActorWidget } from './detail-actor.widget'

const meta: Meta<typeof DetailActorWidget> = {
    title: 'DetailActorWidget',
    component: DetailActorWidget,
    argTypes: {},
}

export default meta
type Story = StoryObj<typeof DetailActorWidget>

export const Default: Story = {
    args: {},
    async play({ canvasElement }) {
        const canvas = within(canvasElement)
        const container = canvas.getByTestId('detail-actor-widget')

        void expect(container).toBeTruthy()
    },
}
