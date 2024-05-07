
/**
 * 外部から操作できるPromise
 */
export class PromiseDeferred<DATA = void>{
    promise: Promise<DATA>
    resolve: (value: DATA | PromiseLike<DATA>) => void
    reject: (reason?: any) => void
    isCompleted: boolean = false

    constructor() {
        let res: ((value: DATA | PromiseLike<DATA>) => void) | undefined = undefined
        let rej: ((reason?: any) => void) | undefined = undefined

        this.promise = new Promise<DATA>((resolve, reject) => {
            res = resolve
            rej = reject
        })

        if (res == undefined || rej == undefined) {
            throw new Error('通常発生しない')
        }

        this.resolve = res
        this.reject = rej

        this.promise
            .then(() => this.isCompleted = true)
            .catch(() => this.isCompleted = true)
    }

}

/** promiseDefreed から結果型情報を類推する */
export type PromiseDefreedResult<T extends PromiseDeferred<any> | undefined> = T extends PromiseDeferred<infer RESULT> ? RESULT : never
