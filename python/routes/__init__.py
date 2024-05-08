# apiのルーティング関連

from fastapi import APIRouter
from pydantic import BaseModel  # リクエストbodyを定義するために必要
import json


def get_router():
    router = APIRouter()

    @router.get('/')
    def index():
        return {'msg': 'hello world'}

    class Test2Params(BaseModel):
        msg: str

    @router.post('/test2')
    def test2(params: Test2Params):
        from app import app

        app.ws_manager.broadcast(json.dumps({'msg': params.msg}))

        return {'msg': params.msg}

    return router
