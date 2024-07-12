export enum NoteLabel {
  BUG = "bug",
  FEATURE = "feature",
  IMPROVEMENT = "improvement",
  QUESTION = "question",
  TASK = "task",
}

export enum HistoryType {
  CREATED = "created",
  UPDATED = "updated",
}

export interface History {
  note_id: string;
  type: HistoryType;
  content: string;
  updated_at: string;
  title: string;
  id: number;
  created_at: string;
}

export interface Note {
  created_at: Date;
  label: NoteLabel;
  title: string;
  content: string;
  updated_at: Date;
  id: number;
  history: History[];
}
