import React from "react";
import { Button } from "react-bootstrap"
import { useDispatchWebSocket } from "../../modules/websocket/useDispatchWebSocket";

export const WsButton: React.FC = () => {

    const ws = useDispatchWebSocket()
    const onClick = React.useCallback(() => {
        ws('aaa')
    }, [ws])

    return <Button onClick={onClick}>
        ws
    </Button>
}