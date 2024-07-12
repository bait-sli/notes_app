import DeleteNoteModal from "@/components/modals/DeleteNoteModal";
import { Note, NoteLabel } from "@/lib/models/Note";
import { useState } from "react";

const itemColors: Record<NoteLabel, string> = {
  [NoteLabel.BUG]: "bg-red-600",
  [NoteLabel.FEATURE]: "bg-amber-500",
  [NoteLabel.IMPROVEMENT]: "bg-teal-500",
  [NoteLabel.QUESTION]: "bg-fuchsia-600",
  [NoteLabel.TASK]: "bg-lime-500",
};

interface DetailsCardProps {
  note: Note;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
}

function DetailsCard({
  note,
  setIsEditing,
}: DetailsCardProps): React.FunctionComponentElement<React.ReactNode> {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const handleEditClick = () => {
    setIsEditing(true);
  };

  return (
    <>
      <DeleteNoteModal
        active={showDeleteModal}
        setActive={setShowDeleteModal}
        id={note.id}
      />
      <h2 className="text-2xl font-bold mb-4 text-gray-600 dark:text-gray-100">
        {note.title}
      </h2>
      <p className="mb-4 text-gray-600 dark:text-gray-100">{note.content}</p>
      <div className="flex space-x-2 py-6 text-gray-400">
        <svg
          className="w-5 h-5 "
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            fillRule="evenodd"
            d="M5 5a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1h1a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1h1a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1 2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a2 2 0 0 1 2-2ZM3 19v-7a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Zm6.01-6a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm2 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm6 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm-10 4a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm6 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm2 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0Z"
            clipRule="evenodd"
          />
        </svg>
        <span className="text-sm font-medium">
          {new Intl.DateTimeFormat("en-EN", {
            dateStyle: "full",
            timeStyle: "medium",
          }).format(new Date(note.created_at))}
        </span>
      </div>
      <span
        className={`text-sm uppercase font-bold me-2 px-3 py-1 rounded-lg px-4 ${
          itemColors[note.label]
        }`}
      >
        {note.label}
      </span>
      <div className="flex space-x-4 px-4 justify-center">
        <button className="p-2 hover:opacity-80" onClick={handleEditClick}>
          <svg
            className="w-8 h-8 text-amber-500"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10.779 17.779 4.36 19.918 6.5 13.5m4.279 4.279 8.364-8.643a3.027 3.027 0 0 0-2.14-5.165 3.03 3.03 0 0 0-2.14.886L6.5 13.5m4.279 4.279L6.499 13.5m2.14 2.14 6.213-6.504M12.75 7.04 17 11.28"
            />
          </svg>
        </button>
        <button
          className="p-2 hover:opacity-80"
          onClick={() => setShowDeleteModal(true)}
        >
          <svg
            className="w-8 h-8 text-red-500"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"
            />
          </svg>
        </button>
      </div>
    </>
  );
}

export default DetailsCard;
