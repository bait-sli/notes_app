import NotFoundException from "@/lib/exceptions/NotFoundException";
import { Note, NoteLabel } from "@/lib/models/Note";
import axios, { AxiosError } from "axios";

export class NotesService {
  static async getNotes(): Promise<Note[]> {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!baseUrl) {
      throw new Error("NEXT_PUBLIC_API_URL is not set");
    }

    const axiosConfig = {
      url: `${baseUrl}/notes`,
      headers: {
        "Content-Type": "application/json",
      },
      method: "GET",
    };

    const { data } = await axios<{ notes: Array<Record<string, string>> }>(
      axiosConfig
    );

    return data.notes.map((note: any) => ({
      created_at: note.created_at,
      label: note.label,
      title: note.title,
      content: note.content,
      updated_at: note.updated_at,
      id: note.id,
      history: note.history.map((history: any) => ({
        note_id: history.note_id,
        type: history.type,
        content: history.content,
        updated_at: history.updated_at,
        title: history.title,
        id: history.id,
        created_at: history.created_at,
      })),
    }));
  }

  static async getNote(id: string): Promise<Note | undefined> {
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL;
      if (!baseUrl) {
        throw new Error("NEXT_PUBLIC_API_URL is not set");
      }

      const axiosConfig = {
        url: `${baseUrl}/notes/${id}`,
        headers: {
          "Content-Type": "application/json",
        },
        method: "GET",
      };

      const { data } = await axios(axiosConfig);

      return {
        created_at: data.note.created_at,
        label: data.note.label,
        title: data.note.title,
        content: data.note.content,
        updated_at: data.note.updated_at,
        id: data.note.id,
        history: data.note.history.map((history: any) => ({
          note_id: history.note_id,
          type: history.type,
          content: history.content,
          updated_at: history.updated_at,
          title: history.title,
          id: history.id,
          created_at: history.created_at,
        })),
      };
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response?.status === 404) {
        throw new NotFoundException("Note not found");
      }
    }
  }

  static async createNote(notePayload: {
    title: string;
    content: string;
    label: NoteLabel;
  }): Promise<Note> {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!baseUrl) {
      throw new Error("NEXT_PUBLIC_API_URL is not set");
    }

    const axiosConfig = {
      url: `${baseUrl}/notes`,
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      data: notePayload,
    };

    const { data } = await axios<{ note: Note }>(axiosConfig);

    return {
      created_at: data.note.created_at,
      label: data.note.label,
      title: data.note.title,
      content: data.note.content,
      updated_at: data.note.updated_at,
      id: data.note.id,
      history: [],
    };
  }

  static async updateNote(
    noteId: number,
    notePayload: {
      title: string;
      content: string;
      label: NoteLabel;
    }
  ): Promise<void> {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!baseUrl) {
      throw new Error("NEXT_PUBLIC_API_URL is not set");
    }

    const axiosConfig = {
      url: `${baseUrl}/notes/${noteId}`,
      headers: {
        "Content-Type": "application/json",
      },
      method: "PUT",
      data: notePayload,
    };

    await axios<{ note: Note }>(axiosConfig);
  }

  static async deleteNote(noteId: number): Promise<void> {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!baseUrl) {
      throw new Error("NEXT_PUBLIC_API_URL is not set");
    }

    const axiosConfig = {
      url: `${baseUrl}/notes/${noteId}`,
      headers: {
        "Content-Type": "application/json",
      },
      method: "DELETE",
    };

    await axios(axiosConfig);
  }
}
