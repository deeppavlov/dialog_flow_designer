from sqlalchemy import Column, ForeignKey, Integer, Table
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column
from sqlalchemy.orm import relationship


class Base(DeclarativeBase):
    pass


class Builds(Base):
    __tablename__ = "builds"

    id: Mapped[int] = mapped_column(primary_key=True)
    timestamp: Mapped[str]
    preset_name: Mapped[str]
    logs_path: Mapped[str]

    def __str__(self) -> str:
        return self.preset_name


class BuildsStatus(Base):
    __tablename__ = "builds_status"

    id: Mapped[int] = mapped_column(primary_key=True)
    status: Mapped[str] = mapped_column(unique=True)

    def __str__(self) -> str:
        return self.status


class RunsStatus(Base):
    __tablename__ = "runs_status"

    id: Mapped[int] = mapped_column(primary_key=True)
    timestamp: Mapped[str]
    path: Mapped[str]
    status: Mapped[str]

    def __str__(self) -> str:
        return self.status


class Runs(Base):
    __tablename__ = "runs"

    id: Mapped[int] = mapped_column(primary_key=True)
    timestamp: Mapped[str]
    preset_name: Mapped[str]
    status = relationship("RunsStatus", backref="status")
    logs_path: Mapped[str]
    build_id = relationship("Builds", backref="build")

    def __str__(self) -> str:
        return self.status


class Logs(Base):
    __tablename__ = "logs"

    id: Mapped[int] = mapped_column(primary_key=True)
    datetime: Mapped[str]
    path: Mapped[str]
    status: Mapped[str]
