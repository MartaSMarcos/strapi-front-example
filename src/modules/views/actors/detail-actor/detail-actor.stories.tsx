import type { Meta, StoryObj } from '@storybook/react'
import { expect } from '@storybook/jest'
import { within } from '@storybook/testing-library'
import { DetailActorView } from './detail-actor.view'

const meta: Meta<typeof DetailActorView> = {
    title: 'DetailActorView',
    component: DetailActorView,
    argTypes: {},
}

export default meta
type Story = StoryObj<typeof DetailActorView>

export const Default: Story = {
    args: {},
    async play({ canvasElement }) {
        const canvas = within(canvasElement)
        const container = canvas.getByTestId('detail-actor-view')

        void expect(container).toBeTruthy()
    },
}
