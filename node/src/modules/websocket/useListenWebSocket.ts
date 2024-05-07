import React from "react"


type Listener = (ev: CustomEvent<string>) => void

export const useListenWebSocket = (listener: Listener) => {

    React.useEffect(() => {
        document.addEventListener('web-socket', listener)
        return () => document.removeEventListener('web-socket', listener)
    }, [listener])

}