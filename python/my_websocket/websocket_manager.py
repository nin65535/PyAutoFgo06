from fastapi import WebSocket, WebSocketDisconnect, APIRouter
import json
import asyncio
import time
from utility.background_tasks import background_tasks


class WebsocketManager:
    def __init__(self):
        self.connections: List[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.connections.append(websocket)
        print(len(self.connections))
        await self.listen(websocket)

    def disconnect(self, websocket: WebSocket):
        if (websocket in self.connections):
            self.connections.remove(websocket)
            print(len(self.connections))

    async def listen(self, websocket: WebSocket):
        try:
            while True:
                event = await websocket.receive_text()
                await self.on_event(websocket, event)

        except WebSocketDisconnect:
            self.disconnect(websocket)

    async def on_event(self, websocket: WebSocket, event: str):
        data = json.loads(event)
        print(data)
        pass

    def broadcast(self, message: str):
        # 同期関数から非同期関数を呼ぶ処理 broadcast_async が終わるまで待つ
        asyncio.run(self.broadcast_async(message))

        # broadcast_async がws.send_text の完了を待たないので broadcast もすぐ処理を返す

    async def broadcast_async(self, message: str):
        for ws in self.connections:
            background_tasks.fire(ws.send_text(message))

    def get_router(self) -> APIRouter:
        router = APIRouter()

        @router.websocket('')
        async def websocket_endpoint(websocket: WebSocket):
            await self.connect(websocket)

        return router
