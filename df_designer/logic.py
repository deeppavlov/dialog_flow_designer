import json
import os
from datetime import datetime
from pathlib import Path
from typing import Any

import aiofiles
from pydantic import Json
from sqlalchemy import insert
from df_designer.database_tables import BuildsStatus, RunsStatus
from df_designer.db_connection import session

from df_designer.settings import app


async def save_data(path: Path, data: dict[str, str]):
    """Save the json config."""
    async with aiofiles.open(path, "w", encoding="utf-8") as file:
        await file.write(json.dumps(data))


async def get_data(path: Path) -> Json[Any]:
    """Get the json config."""
    if os.path.exists(path):
        async with aiofiles.open(path, "r", encoding="utf-8") as file:
            return json.loads(await file.read())
    else:
        return {}


def log_file_name() -> Path:
    """Create title a log."""
    file_log_name = datetime.now().strftime("%Y_%m_%d_%H_%M_%s") + ".txt"
    return Path(app.dir_logs, file_log_name)


def create_directory_to_log():
    """Create directory to log files."""
    if not Path(app.dir_logs).exists():
        Path(app.dir_logs).mkdir()


def filling_the_database():
    """Adding statuses for builds and runs."""
    with session() as sess:
        sess.execute(
            insert(BuildsStatus),
            [
                {"status": "running"},
                {"status": "completed"},
                {"status": "failed"},
                {"status": "null"},
                {"status": "stopped"},
            ],
        )
        sess.execute(
            insert(RunsStatus),
            [
                {"status": "running"},
                {"status": "failed"},
                {"status": "null"},
                {"status": "stopped"},
            ],
        )
        sess.commit()
