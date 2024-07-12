from modules.notes.model import Note, History
from contextlib import contextmanager
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker


class NotesRepository:
    def __init__(self, database_url: str):
        self.engine = create_engine(database_url, echo=False, future=True)
        Note.metadata.create_all(self.engine)
        self.SessionLocal = sessionmaker(bind=self.engine, expire_on_commit=False)

    @contextmanager
    def get_session(self):
        session = self.SessionLocal()
        try:
            yield session
        finally:
            session.expire_all()


class HistoryRepository:
    def __init__(self, database_url: str):
        self.engine = create_engine(database_url, echo=False, future=True)
        History.metadata.create_all(self.engine)
        self.SessionLocal = sessionmaker(bind=self.engine, expire_on_commit=False)

    @contextmanager
    def get_session(self):
        session = self.SessionLocal()
        try:
            yield session
        finally:
            session.expire_all()
