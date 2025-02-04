import { ApplicationLayout } from '@/common/layouts/application'
import { PropsWithChildren } from 'react'

export const metadata = {
    title: 'API Users',
    description: 'API Users',
}

export default function Layout(props: PropsWithChildren) {
    return <ApplicationLayout>{props.children}</ApplicationLayout>
}
