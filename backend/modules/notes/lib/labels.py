import enum


class NoteLabel(enum.Enum):
    BUG = "bug"
    FEATURE = "feature"
    IMPROVEMENT = "improvement"
    QUESTION = "question"
    TASK = "task"


class HistoryUpdateLabel(enum.Enum):
    CREATED = "created"
    UPDATED = "updated"
