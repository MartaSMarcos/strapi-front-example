import {
    BookCopy,
    LogOut,
    SlidersVertical,
    Tag,
    UserCog,
    FileText,
} from 'lucide-react'
import { SidebarWidgetParams } from './sidebar.widget'

export const sectionsSidebar: SidebarWidgetParams = {
    section: [
        {
            path: '/configuration',
            label: 'Configuración',
            icon: <SlidersVertical />,
        },
        {
            path: '/documentation',
            label: 'Documentación',
            icon: <FileText />,
        },
        {
            path: '/repository',
            label: 'Repositorio',
            icon: <BookCopy />,
        },
        {
            path: '/scoring',
            label: 'Scoring',
            icon: <Tag />,
        },
    ],
}

export const sectionsBottomSidebar: SidebarWidgetParams = {
    section: [
        {
            path: '/users',
            label: 'Usuarios',
            icon: <UserCog />,
        },
        {
            path: '/',
            label: 'Cerrar Sesión',
            icon: <LogOut />,
        },
    ],
}
