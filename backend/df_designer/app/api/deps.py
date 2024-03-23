from app.clients.process_manager import BuildManager, RunManager
from app.clients.websocket_manager import WebSocketManager

build_manager = BuildManager()
def get_build_manager() -> BuildManager:
    return build_manager

run_manager = RunManager()
def get_run_manager() -> RunManager:
    return run_manager

websocket_manager = WebSocketManager()
def get_websocket_manager() -> WebSocketManager:
    return websocket_manager
