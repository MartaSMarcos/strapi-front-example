import { ApplicationLayout } from '@/common/layouts/application'
import { PropsWithChildren } from 'react'

export const metadata = {
    title: 'Repository',
    description: 'API Repository',
}

export default function Layout(props: PropsWithChildren) {
    return <ApplicationLayout>{props.children}</ApplicationLayout>
}
