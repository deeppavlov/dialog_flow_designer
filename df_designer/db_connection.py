from sqlalchemy import create_engine
from sqlalchemy.ext.asyncio import async_sessionmaker, create_async_engine
from sqlalchemy.orm import sessionmaker

from df_designer.settings import app


async_engine = create_async_engine(f"sqlite+aiosqlite:///{app.database_file}")
async_session = async_sessionmaker(async_engine, expire_on_commit=False)

engine = create_engine(f"sqlite:///{app.database_file}", echo=True)
session = sessionmaker(engine, expire_on_commit=False)
