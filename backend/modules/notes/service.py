from modules.notes.model import Note, History
from contextlib import contextmanager
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from modules.notes.repository import NotesRepository, HistoryRepository


class NotesService:
    def __init__(
        self, note_repository: NotesRepository, history_repository: HistoryRepository
    ):
        self.note_repository = note_repository
        self.history_repository = history_repository

    def get_all_notes(self):
        with self.note_repository.get_session() as session:
            notes = session.query(Note).all()
            return notes

    def create_note(
        self,
        title: str,
        content: str,
        label: str,
        created_at: str,
        updated_at: str,
    ):
        with self.note_repository.get_session() as session:
            new_note = Note(
                title=title,
                content=content,
                label=label,
                created_at=created_at,
                updated_at=updated_at,
            )
            session.add(new_note)
            session.commit()
            session.refresh(new_note)
            return new_note

    def get_note_by_id(self, note_id: int):
        with self.note_repository.get_session() as session:
            note = session.query(Note).filter_by(id=note_id).first()
            return note

    def create_history(
        self,
        note_id: int,
        type: str,
        title: str,
        content: str,
        created_at: str,
        updated_at: str,
    ):
        with self.history_repository.get_session() as session:
            new_history = History(
                note_id=note_id,
                type=type,
                title=title,
                content=content,
                created_at=created_at,
                updated_at=updated_at,
            )
            session.add(new_history)
            session.commit()
            session.refresh(new_history)
            return new_history

    def update_note(
        self,
        note_id: int,
        title: str,
        content: str,
        label: str,
        updated_at: str,
    ):
        with self.note_repository.get_session() as session:
            session.query(Note).filter_by(id=note_id).update(
                dict(
                    title=title,
                    content=content,
                    label=label,
                    updated_at=updated_at,
                )
            )
            session.commit()

    def delete_note(self, note_id: int):
        with self.note_repository.get_session() as session:
            session.query(Note).filter_by(id=note_id).delete()
            session.commit()
