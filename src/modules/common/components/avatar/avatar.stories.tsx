import type { Meta, StoryObj } from '@storybook/react'
import { expect } from '@storybook/jest'
import { within } from '@storybook/testing-library'
import * as Avatar from './avatar.component'

const meta: Meta<typeof Avatar.Root> = {
    title: 'Avatar',
    component: Avatar.Root,
    argTypes: {},
}

export default meta
type Story = StoryObj<typeof Avatar.Root>

export const Default: Story = {
    render: (p) => (
        <Avatar.Root {...p}>
            <Avatar.Image src="/assets/uxcale.svg" alt="@uxcale" />
            <Avatar.Fallback>UX</Avatar.Fallback>
        </Avatar.Root>
    ),
    args: {},
    async play({ canvasElement }) {
        const canvas = within(canvasElement)
        const container = canvas.getByTestId('avatar')

        void expect(container).toBeTruthy()
    },
}

export const DefaultFallback: Story = {
    render: (p) => (
        <Avatar.Root {...p}>
            <Avatar.Image
                src="https://terrible-invalid-url.com/invalid-image.png"
                alt="@uxcale"
            />
            <Avatar.Fallback>UX</Avatar.Fallback>
        </Avatar.Root>
    ),
    args: {},
    async play({ canvasElement }) {
        const canvas = within(canvasElement)
        const container = canvas.getByTestId('avatar')

        void expect(container).toBeTruthy()
    },
}
