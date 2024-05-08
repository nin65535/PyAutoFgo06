import { getApiBase } from './getApiBase'
import React from 'react'
import axios from "axios"
import { useListenWebSocket } from '../modules/websocket/useListenWebSocket'


export const useTest2 = () => {
    const url = getApiBase() + '/test2'

    const test2 = React.useCallback((msg: string) =>
        axios.post(url, { msg })
            .then(res => console.log(res.data)),
        [])

    const listener = React.useCallback((ev: CustomEvent<string>) => {
        console.log('broadcast catch')
        console.log(ev.detail)

    }, [])
    useListenWebSocket(listener)

    return test2
}