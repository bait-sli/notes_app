from typing import List
from typing import Optional
from sqlalchemy import ForeignKey
from sqlalchemy import String
from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column
from sqlalchemy.orm import relationship
from sqlalchemy.orm import DeclarativeBase


class Base(DeclarativeBase):
    pass


class Note(Base):
    __tablename__ = "notes"

    id: Mapped[int] = mapped_column(primary_key=True)
    title: Mapped[str] = mapped_column(String(255))
    content: Mapped[str] = mapped_column(String(600))
    label: Mapped[str] = mapped_column(String(255))
    history: Mapped[List["History"]] = relationship("History", back_populates="note")
    created_at: Mapped[str] = mapped_column(String)
    updated_at: Mapped[str] = mapped_column(String)

    def __repr__(self) -> str:
        return f"<Note(id={self.id}, title={self.title}, content={self.content}, history={self.history}, created_at={self.created_at}, updated_at={self.updated_at})>"


class History(Base):
    __tablename__ = "note_histories"

    id: Mapped[int] = mapped_column(primary_key=True)
    note_id: Mapped[int] = mapped_column(ForeignKey("notes.id"))
    note: Mapped[Optional["Note"]] = relationship("Note", back_populates="history")
    type: Mapped[str] = mapped_column(String(255))
    title: Mapped[str] = mapped_column(String)
    content: Mapped[str] = mapped_column(String)
    created_at = mapped_column(String)
    updated_at = mapped_column(String)

    def __repr__(self) -> str:
        return f"<History(id={self.id}, note_id={self.note_id}, title={self.title}, content={self.content}, created_at={self.created_at}, updated_at={self.updated_at})>"
