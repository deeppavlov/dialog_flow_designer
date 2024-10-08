from contextlib import asynccontextmanager

from fastapi import APIRouter, FastAPI, Response
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse, HTMLResponse, RedirectResponse

from chatsky_ui import __version__
from chatsky_ui.api.api_v1.api import api_router
from chatsky_ui.api.deps import get_index
from chatsky_ui.core.config import settings

index_dict = {}


@asynccontextmanager
async def lifespan(app: FastAPI):
    if settings.temp_conf.exists():
        settings.refresh_work_dir()

    index_dict["instance"] = get_index()
    await index_dict["instance"].load()
    yield

    # settings.temp_conf.unlink(missing_ok=True)


app = FastAPI(title="DF Designer", version=__version__, lifespan=lifespan)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

root_router = APIRouter()


@root_router.get("/app/{path:path}")
async def route_static_file(path: str):
    if not settings.start_page.exists():
        return HTMLResponse(content="frontend is not built")
    file_path = settings.static_files / path.split("/")[-1]
    if file_path.suffix in (".js", ".css", ".html", ".ttf"):
        return FileResponse(file_path)
    return FileResponse(settings.static_files / "index.html")


@root_router.get("/")
async def root() -> Response:
    """Redirect '/' to index.html"""
    return RedirectResponse(url="/app")


app.include_router(root_router)
app.include_router(api_router)
