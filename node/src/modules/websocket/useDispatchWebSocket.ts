import React from "react"
import { useWebsocket } from "./useWebSocket"

export const useDispatchWebSocket = () => {
    const ws = useWebsocket()
    const dispatch = React.useCallback((message: string) => ws.send(JSON.stringify({ message })), [ws])
    return dispatch
}