# apiのルーティング関連

from fastapi import APIRouter


def get_router():
    router = APIRouter()

    @router.get('/')
    def index():
        return {'msg': 'hello world'}
    return router
