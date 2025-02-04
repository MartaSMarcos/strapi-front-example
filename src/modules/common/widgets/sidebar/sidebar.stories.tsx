import type { Meta, StoryObj } from '@storybook/react'
import { expect } from '@storybook/jest'
import { within } from '@storybook/testing-library'
import { SidebarWidget } from './sidebar.widget'

const meta: Meta<typeof SidebarWidget> = {
    title: 'SidebarWidget',
    component: SidebarWidget,
    argTypes: {},
    parameters: {
        nextjs: {
            appDirectory: true,
        },
    },
}

export default meta
type Story = StoryObj<typeof SidebarWidget>

export const Default: Story = {
    args: {},
    async play({ canvasElement }) {
        const canvas = within(canvasElement)
        const container = canvas.getByTestId('sidebar-widget')

        void expect(container).toBeTruthy()
    },
}
