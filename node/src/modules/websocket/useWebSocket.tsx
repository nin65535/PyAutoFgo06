import React from "react"
import { emitWebSocketEvent } from "./types/webSocketEvent"


const wsContext = React.createContext<React.MutableRefObject<WebSocket> | undefined>(undefined)
const url = 'ws://localhost:8000/ws'

const connect = (): WebSocket => {
    return new WebSocket(url)
}

export const useWebsocket = () => React.useContext(wsContext)!


export const WebSocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const refWS = React.useRef(connect())

    React.useEffect(() => {
        const onMessage = (ev: MessageEvent<string>) => emitWebSocketEvent(ev.data)
        refWS.current.addEventListener('message', onMessage)
        return () => refWS.current.removeEventListener('message', onMessage)
    }, [refWS])

    return <wsContext.Provider value={refWS}>
        {children}
    </wsContext.Provider>
}
