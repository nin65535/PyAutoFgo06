from fastapi import FastAPI, Request, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse
from my_websocket import WebsocketManager
from routes import get_router


class App:
    ws_manager: WebsocketManager

    def __init__(self):
        self.fast_api = FastAPI()
        self.ws_manager = WebsocketManager()

        origins = [
            "http://localhost",
            "http://localhost:8081",
        ]

        self.fast_api.add_middleware(
            CORSMiddleware,
            allow_origins=origins,
            allow_credentials=True,
            allow_methods=["*"],
            allow_headers=["*"],
        )

        self.fast_api.include_router(get_router())
        self.fast_api.include_router(
            self.ws_manager.get_router(), prefix='/ws',)
        self.fast_api.mount(
            "/files", StaticFiles(directory="files"), name="files")

        self.fast_api.exception_handler(
            [RequestValidationError, App.on_request_validation_error])

        pass

    @staticmethod
    async def on_request_validation_error(request: Request, exc: RequestValidationError):
        print(exc)
        return JSONResponse(content={}, status_code=status.HTTP_422_UNPROCESSABLE_ENTITY)



app = App()
api = app.fast_api