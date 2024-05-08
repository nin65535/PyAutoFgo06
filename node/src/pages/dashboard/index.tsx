import React from "react";
import { useTest } from "../../hooks/useTest";
import { WsButton } from "./wsButton";
import { WsButton2 } from "./wsButton2";

export const Dashboard: React.FC = () => {

    const test = useTest()

    console.log( test.data)

    return <div>
        this is dashboard

        <div>
            <WsButton/>
        </div>
        <div>
            <WsButton2/>
        </div>
    </div>
}