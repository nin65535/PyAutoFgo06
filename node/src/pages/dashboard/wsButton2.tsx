import React from "react";
import { Button } from "react-bootstrap"
import { useTest2 } from "../../hooks/useTest2";

export const WsButton2: React.FC = () => {

    const test2 = useTest2()
    const onClick = React.useCallback(() => {
        test2('bbb')
    }, [test2])

    return <Button onClick={onClick}>
        ws2
    </Button>
}