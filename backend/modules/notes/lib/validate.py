from modules.notes.lib.labels import NoteLabel
from modules.notes.lib.exceptions.ValidationError import ValidationException


def validate_note(note: dict):
    if not note.get("title"):
        raise ValidationException("Note title is required.")
    if not note.get("content"):
        raise ValidationException("Note content is required.")
    if not note.get("label"):
        raise ValidationException(
            "Note label must be one of the following: "
            + str([label.value for label in NoteLabel])
        )
    if note.get("label") not in [label.value for label in NoteLabel]:
        raise ValidationException(
            "Note label must be one of the following: "
            + str([label.value for label in NoteLabel])
        )
    if note.get("title") and len(note.get("title")) > 255:
        raise ValidationException("Note title cannot be longer than 255 characters.")
    if note.get("content") and len(note.get("content")) > 600:
        raise ValidationException("Note content cannot be longer than 2550 characters.")
