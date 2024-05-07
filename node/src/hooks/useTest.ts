import useSWR, { Fetcher as FetcherBase, SWRConfiguration } from 'swr'
import { getApiBase } from './getApiBase'
import React from 'react'
import axios from "axios"
import * as z from 'zod'

const resultSchema = z.object({
    msg: z.string()
})

type Result = z.infer<typeof resultSchema>

type Fetcher = FetcherBase<Result, string>
type Options = SWRConfiguration<Result, any, Fetcher> | undefined

export const useTest = (options: Options = undefined) => {
    const url = getApiBase()


    const fetcher = React.useCallback<Fetcher>(
        (url) => axios.get(url)
            .then(res => resultSchema.parse(res.data)),
        [resultSchema])

    return useSWR(url, fetcher, options)
}