"use client";

import { Loader } from "@/components/Loader";
import AddNote from "@/components/NoteList/AddNote";
import NoteItem from "@/components/NoteList/NoteItem";
import { Note } from "@/lib/models/Note";
import { NotesService } from "@/services/NotesService";
import { useEffect, useState } from "react";

function NotesList(): React.FunctionComponentElement<React.ReactNode> {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        setIsLoading(true);
        const notes = await NotesService.getNotes();
        setNotes(notes);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsError(true);
        throw error;
        //TODO: Send log to sentry
      }
    };
    fetchNotes();
  }, [setIsLoading]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="container mx-auto p-4">
          <h2 className="text-2xl underline font-bold text-customGreen dark:text-customPurple text-center mb-8 uppercase">
            My Notes
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note) => (
              <NoteItem key={note.id} note={note} />
            ))}
            <AddNote />
          </div>
        </div>
      )}
    </>
  );
}

export default NotesList;
