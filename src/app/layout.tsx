import '../styles/main.css'
import { RootLayout } from '@/common/layouts/root'
import { PropsWithChildren } from 'react'
import { AppProvider } from '@/common/providers/app'

export const metadata = {
    title: 'Next Boilerplate',
    description: 'Uxcale Next Boilerplate',
}

export default function Layout(props: PropsWithChildren) {
    return (
        <RootLayout>
            <AppProvider>{props.children}</AppProvider>
        </RootLayout>
    )
}
