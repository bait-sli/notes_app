"use client";

import { Loader } from "@/components/Loader";
import BackButton from "@/components/NoteDetails/BackButton";
import DetailsCard from "@/components/NoteDetails/DetailsCard";
import EditForm from "@/components/NoteDetails/EditForm";
import HistoryCard from "@/components/NoteDetails/HistoryCard";
import NotFoundException from "@/lib/exceptions/NotFoundException";
import { Note, NoteLabel } from "@/lib/models/Note";
import { NotesService } from "@/services/NotesService";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const borderColors: Record<NoteLabel, string> = {
  [NoteLabel.BUG]: "border-red-600",
  [NoteLabel.FEATURE]: "border-amber-500",
  [NoteLabel.IMPROVEMENT]: "border-teal-500",
  [NoteLabel.QUESTION]: "border-fuchsia-600",
  [NoteLabel.TASK]: "border-lime-500",
};

interface NoteDetailProps {
  id: string;
}

function NoteDetail({
  id,
}: NoteDetailProps): React.FunctionComponentElement<React.ReactNode> {
  const [noteDetails, setNoteDetails] = useState<Note | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        setIsLoading(true);
        const note = await NotesService.getNote(id);
        if (note) {
          setNoteDetails(note);
          setIsLoading(false);
        }
      } catch (error) {
        if (error instanceof NotFoundException) {
          setIsLoading(false);
          router.push("/404");
        }
        console.error(error);
        throw error;
        //TODO: Log via Sentry
      }
    };
    fetchNote();
  }, [id, router]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : noteDetails ? (
        <div className="container mx-auto p-4">
          <BackButton />

          <div
            className={`bg-white dark:bg-gray-800 dark:text-white shadow-xl rounded-xl p-4 mb-4 border-t-8 ${
              borderColors[noteDetails.label]
            }`}
          >
            {!isEditing ? (
              <>
                <DetailsCard note={noteDetails} setIsEditing={setIsEditing} />
              </>
            ) : (
              <>
                <EditForm
                  note={noteDetails}
                  setIsEditing={setIsEditing}
                  setNote={(note) => setNoteDetails(note as Note)}
                />
              </>
            )}
          </div>

          <HistoryCard note={noteDetails} />
        </div>
      ) : (
        <div className="container mx-auto p-4">
          <h2 className="text-2xl font-bold mb-2">Note not found</h2>
        </div>
      )}
    </>
  );
}

export default NoteDetail;
