import React from "react";
import { useTest } from "../../hooks/useTest";

export const Dashboard: React.FC = () => {

    const test = useTest()

    console.log( test.data)

    return <div>
        this is dashboard
    </div>
}