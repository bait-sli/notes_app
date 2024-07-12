import os
from modules.notes.service import NotesService
from modules.notes.repository import NotesRepository, HistoryRepository
import datetime
from system.logger import Logger
from modules.notes.lib.validate import validate_note
from modules.notes.lib.labels import HistoryUpdateLabel
from modules.notes.lib.exceptions.NotFoundException import NotFoundException


class NotesManager:
    def __init__(self):
        db_path = "sqlite:///./db_notes.db"
        self.note_repository = NotesRepository(db_path)
        self.history_repository = HistoryRepository(db_path)
        self.note_service = NotesService(self.note_repository, self.history_repository)
        self
        self.logger = Logger(
            self.__class__.__name__,
        )

    def get_all_notes(self):
        all_notes = self.note_service.get_all_notes()
        self.logger.info(
            {
                "message": "Getting all notes.",
                "notes": all_notes,
            }
        )
        return all_notes

    def create_note(self, data: dict):
        validate_note(data)
        note = self.note_service.create_note(
            title=data.get("title"),
            content=data.get("content"),
            label=data.get("label"),
            created_at=datetime.datetime.now(),
            updated_at=datetime.datetime.now(),
        )
        self.logger.info(
            {
                "message": "Note created.",
                "note": note,
            }
        )
        self.note_service.create_history(
            note_id=note.id,
            type=HistoryUpdateLabel.CREATED.value,
            title=data.get("title"),
            content=data.get("content"),
            created_at=datetime.datetime.now(),
            updated_at=datetime.datetime.now(),
        )
        return note

    def get_note_by_id(self, note_id: int):
        note = self.note_service.get_note_by_id(note_id)
        if not note or note == None:
            raise NotFoundException("Note not found.")
        self.logger.info(
            {
                "message": "Note by id retrieved.",
                "note": note,
            }
        )
        return note

    def update_note(self, note_id: int, data: dict):
        validate_note(data)
        note = self.note_service.get_note_by_id(note_id)
        if not note:
            raise NotFoundException("Note not found.")
        self.note_service.update_note(
            note_id=note_id,
            title=data.get("title"),
            content=data.get("content"),
            label=data.get("label"),
            updated_at=datetime.datetime.now(),
        )
        self.logger.info(
            {
                "message": "Note updated.",
                "note": note,
            }
        )
        self.note_service.create_history(
            note_id=note.id,
            type=HistoryUpdateLabel.UPDATED.value,
            title=data.get("title"),
            content=data.get("content"),
            created_at=datetime.datetime.now(),
            updated_at=datetime.datetime.now(),
        )

    def delete_note(self, note_id: int):
        self.note_service.delete_note(note_id)
        self.logger.info(
            {
                "message": "Note deleted.",
                "note": note_id,
            }
        )
