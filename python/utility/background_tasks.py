import asyncio


class BackgroundTasks:
    def __init__(self):
        self.background_tasks: Set[asyncio.Task] = set()

    # 非同期関数を実行する　結果を待っても待たなくてもよい
    def fire(self, coroutine):
        task = asyncio.create_task(coroutine)
        # asyncio.cretate_task の結果はどこかに保持しておかないと実行が保証されない
        self.background_tasks.add(task)
        # 終わったらbackgroud_tasks から消す
        task.add_done_callback(self.background_tasks.discard)

        return task


background_tasks = BackgroundTasks()
