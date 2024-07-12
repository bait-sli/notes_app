import { FlexLoader } from "@/components/Loader";
import { useToastContext } from "@/contexts/ToastContext";
import { Note, NoteLabel } from "@/lib/models/Note";
import { ToastType } from "@/lib/models/Toast";
import inputStyles from "@/lib/ui/inputStyles";
import { NotesService } from "@/services/NotesService";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface EditFormProps {
  note: Note;
  setNote: React.Dispatch<React.SetStateAction<Note>>;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
}

function EditForm({
  note,
  setIsEditing,
  setNote,
}: EditFormProps): React.FunctionComponentElement<React.ReactNode> {
  const [editedTitle, setEditedTitle] = useState(note.title);
  const [editedContent, setEditedContent] = useState(note.content);
  const [titleError, setTitleError] = useState("");
  const [contentError, setContentError] = useState("");
  const [editedLabel, setEditedLabel] = useState(note.label);
  const maxCharacters = 600;
  const router = useRouter();
  const { toasts, setToasts } = useToastContext();
  const [isLoading, setIsLoading] = useState(false);

  const handleSaveChanges = async () => {
    let valid = true;
    if (!editedTitle.trim()) {
      setTitleError("Title cannot be empty");
      valid = false;
    }
    if (!editedContent.trim()) {
      setContentError("Content cannot be empty");
      valid = false;
    } else if (editedContent.length > maxCharacters) {
      setContentError(`Content cannot exceed ${maxCharacters} characters`);
      valid = false;
    }
    if (!valid) return;
    try {
      setIsLoading(true);
      const updatedNotePayload = {
        title: editedTitle,
        content: editedContent,
        label: editedLabel,
      };
      await NotesService.updateNote(note.id, updatedNotePayload);
      setIsLoading(false);
      setToasts([
        ...toasts,
        {
          type: ToastType.SUCCESS,
          message: "Note updated successfully",
          hasBeenFired: false,
        },
      ]);
      setIsEditing(false);
      setNote({
        ...note,
        title: editedTitle,
        content: editedContent,
        label: editedLabel,
      });
    } catch (error) {
      console.error(error);
      setToasts([
        ...toasts,
        {
          type: ToastType.ERROR,
          message: "Note update failed",
          hasBeenFired: false,
        },
      ]);
      setIsLoading(false);
      //TODO: Log via Sentry
      throw error;
    }
  };

  const handleCancelEdit = () => {
    setEditedTitle(note.title);
    setEditedContent(note.content);
    setEditedLabel(note.label);
    setIsEditing(false);
  };

  return (
    <>
      <h2 className="text-2xl font-bold mb-2">Edit Note</h2>
      <div className="mb-4">
        <label
          htmlFor="title"
          className="block mb-1 text-base font-medium text-gray-600 dark:text-white"
        >
          Title
        </label>
        <input
          type="text"
          id="title"
          className={`${inputStyles} ${titleError ? "border-red-500" : ""}`}
          value={editedTitle}
          onChange={(e) => setEditedTitle(e.target.value)}
        />
        {titleError && (
          <p className="text-red-500 text-sm mt-1">{titleError}</p>
        )}
      </div>
      <div className="mb-4 relative">
        <label
          htmlFor="content"
          className="block mb-1 text-base font-medium text-gray-600 dark:text-white"
        >
          Content
        </label>
        <textarea
          id="content"
          className={`${inputStyles} ${
            contentError ? "border-red-500" : ""
          } mb-6`}
          rows={6}
          value={editedContent}
          onChange={(e) => setEditedContent(e.target.value)}
        />
        {contentError && <p className="text-red-500 text-sm">{contentError}</p>}
        <span className="absolute bottom-1 right-2 text-xs text-gray-500">
          {maxCharacters - editedContent.length} characters remaining
        </span>
      </div>
      <div className="mb-4">
        <label
          htmlFor="label"
          className="block mb-1 text-base font-medium text-gray-600 dark:text-white"
        >
          Label
        </label>
        <select
          id="label"
          className={inputStyles}
          value={editedLabel}
          onChange={(e) => setEditedLabel(e.target.value as NoteLabel)}
        >
          {Object.keys(NoteLabel).map((label) => {
            const noteLabelKey = label as keyof typeof NoteLabel;
            return (
              <option value={NoteLabel[noteLabelKey]} key={label}>
                {NoteLabel[noteLabelKey]}
              </option>
            );
          })}
        </select>
      </div>
      <div className="flex justify-center space-x-1 px-8">
        {isLoading ? (
          <FlexLoader />
        ) : (
          <>
            <button
              className="p-2 hover:opacity-80"
              onClick={handleSaveChanges}
            >
              <svg
                className="w-10 h-10 text-green-500"
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
                  d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </button>
            <button className="p-2 hover:opacity-80" onClick={handleCancelEdit}>
              <svg
                className="w-10 h-10 text-red-500"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m15 9-6 6m0-6 6 6m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </button>
          </>
        )}
      </div>
    </>
  );
}

export default EditForm;
