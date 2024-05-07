import React from "react"
import { useWebsocket } from "./useWebSocket"

export const useDispatchWebSocket = () => {
    const refWS = useWebsocket()
    const dispatch = React.useCallback((message: string) => refWS.current.send(JSON.stringify({ message })), [refWS])
    return dispatch
}