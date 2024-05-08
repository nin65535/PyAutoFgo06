import React from "react"
import { emitWebSocketEvent } from "./types/webSocketEvent"
import { atom, useAtomValue } from 'jotai'
import { PromiseDeferred } from "../promiseDeferred"

const url = 'ws://localhost:8000/ws'

const connect = (): WebSocket => {
    try {
        return new WebSocket(url)
    } catch (e) {
        throw new Error('nankahen')
    }
}

const wsAtom = atom<WebSocket>(connect())

export const useWebsocket = () => useAtomValue(wsAtom)


export const WebSocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => <React.Suspense fallback='connecting'>
    <WebSocketProviderMain>
        {children}
    </WebSocketProviderMain>
</React.Suspense>


const WebSocketProviderMain: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const websocket = useWebsocket()

    React.useEffect(() => {
        const onMessage = (ev: MessageEvent<string>) => emitWebSocketEvent(ev.data)
        websocket.addEventListener('message', onMessage)
        return () => websocket.removeEventListener('message', onMessage)
    }, [websocket])

    if (websocket.readyState != WebSocket.OPEN) {
        const pd = new PromiseDeferred<void>
        websocket.onopen = () => pd.resolve()
        throw pd.promise
    }

    return <>{children}</>
}
