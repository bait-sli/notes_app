from fastapi import APIRouter, HTTPException, Response, status
from system.logger import Logger
from modules.notes.manager import NotesManager
from modules.notes.lib.exceptions.ValidationError import ValidationException
from modules.notes.lib.exceptions.NotFoundException import NotFoundException


class NotesController:
    def __init__(self):
        self.logger = Logger(
            self.__class__.__name__,
        )
        self.router = APIRouter()
        self.router.add_api_route("/notes", self.get_notes, methods=["GET"])
        self.router.add_api_route("/notes", self.create_note, methods=["POST"])
        self.router.add_api_route(
            "/notes/{note_id}", self.get_note_by_id, methods=["GET"]
        )
        self.router.add_api_route("/notes/{note_id}", self.update_note, methods=["PUT"])
        self.router.add_api_route(
            "/notes/{note_id}", self.delete_note, methods=["DELETE"]
        )
        self.notes_manager = NotesManager()

    def get_notes(self):
        try:
            self.logger.info(
                {
                    "message": "Getting notes request received.",
                }
            )
            notes = self.notes_manager.get_all_notes()
            return {"notes": notes}
        except Exception as e:
            self.logger.error(
                {
                    "message": "Unknown error when getting notes.",
                    "error": str(e),
                }
            )
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Unknown Error when getting notes.",
            )

    def create_note(self, data: dict):
        try:
            self.logger.info(
                {
                    "message": "Creating note request received.",
                    "data": data,
                }
            )
            note = self.notes_manager.create_note(data)
            return {"note": note}
        except Exception as e:
            self.logger.error(
                {
                    "message": "Error creating note.",
                    "error": str(e),
                }
            )
            if isinstance(e, ValidationException):
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST, detail=str(e)
                )
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Unknown Error when creating note.",
            )

    def get_note_by_id(self, note_id: int):
        try:
            self.logger.info(
                {
                    "message": "Getting note by id request received.",
                    "note_id": note_id,
                }
            )
            note = self.notes_manager.get_note_by_id(note_id)
            return {"note": note}
        except Exception as e:
            self.logger.error(
                {
                    "message": "Unknown error when getting note by id.",
                    "error": str(e),
                }
            )
            if isinstance(e, NotFoundException):
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND, detail="Note not found."
                )
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Unknown Error when getting note by id.",
            )

    def update_note(self, note_id: int, data: dict):
        try:
            self.logger.info(
                {
                    "message": "Updating note request received.",
                    "note_id": note_id,
                    "data": data,
                }
            )
            self.notes_manager.update_note(note_id, data)
            return Response(status_code=status.HTTP_204_NO_CONTENT)
        except Exception as e:
            self.logger.error(
                {
                    "message": "Error updating note.",
                    "error": str(e),
                }
            )
            if isinstance(e, ValidationException):
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST, detail=str(e)
                )
            if isinstance(e, NotFoundException):
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND, detail="Note not found."
                )
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Unknown Error when updating note.",
            )

    def delete_note(self, note_id: int):
        try:
            self.logger.info(
                {
                    "message": "Deleting note request received.",
                    "note_id": note_id,
                }
            )
            self.notes_manager.delete_note(note_id)
            return Response(status_code=status.HTTP_204_NO_CONTENT)
        except Exception as e:
            self.logger.error(
                {
                    "message": "Error deleting note.",
                    "error": str(e),
                }
            )
            if isinstance(e, NotFoundException):
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND, detail="Note not found."
                )
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Unknown Error when deleting note.",
            )
