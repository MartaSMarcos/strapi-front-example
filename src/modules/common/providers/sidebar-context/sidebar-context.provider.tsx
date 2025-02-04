import { PropsWithChildren, createContext, useContext, useState } from 'react'

export type SidebarContextProps = {
    opened: boolean
    setOpened: (opened: boolean) => void
}

const SidebarContext = createContext<SidebarContextProps>({
    opened: true,
    setOpened: () => {},
})

export const SidebarContextProvider = (props: PropsWithChildren) => {
    const [opened, setOpened] = useState<boolean>(true)
    return (
        <SidebarContext.Provider value={{ opened, setOpened }}>
            {props.children}
        </SidebarContext.Provider>
    )
}

export const useSidebarContext = () => useContext(SidebarContext)
