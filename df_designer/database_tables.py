from sqlalchemy import ForeignKey
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
    status: Mapped[str]

    runs: Mapped[list["Runs"]] = relationship(back_populates="builds", lazy="joined")

    builds_status_id: Mapped[int] = mapped_column(ForeignKey("builds_status.id"))
    builds_status: Mapped["BuildsStatus"] = relationship(back_populates="builds")

    def __str__(self) -> str:
        return self.preset_name


class BuildsStatus(Base):
    __tablename__ = "builds_status"

    id: Mapped[int] = mapped_column(primary_key=True)
    status: Mapped[str] = mapped_column(unique=True)
    builds: Mapped[list["Builds"]] = relationship(
        back_populates="builds_status", lazy="joined"
    )

    def __str__(self) -> str:
        return self.status


class Runs(Base):
    __tablename__ = "runs"

    id: Mapped[int] = mapped_column(primary_key=True)
    timestamp: Mapped[str]
    preset_name: Mapped[str]
    logs_path: Mapped[str]
    status: Mapped[str]

    builds_id: Mapped[int] = mapped_column(ForeignKey("builds.id"))
    builds: Mapped["Builds"] = relationship(back_populates="runs")

    def __str__(self) -> str:
        return self.preset_name


class RunsStatus(Base):
    __tablename__ = "runs_status"

    id: Mapped[int] = mapped_column(primary_key=True)
    status: Mapped[str] = mapped_column(unique=True)

    def __str__(self) -> str:
        return self.status


class Logs(Base):
    __tablename__ = "logs"

    id: Mapped[int] = mapped_column(primary_key=True)
    datetime: Mapped[str]
    path: Mapped[str]
    status: Mapped[str]
