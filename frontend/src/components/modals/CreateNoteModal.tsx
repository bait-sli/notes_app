import { FlexLoader } from "@/components/Loader";
import { useToastContext } from "@/contexts/ToastContext";
import { NoteLabel } from "@/lib/models/Note";
import { ToastType } from "@/lib/models/Toast";
import inputStyles from "@/lib/ui/inputStyles";
import { NotesService } from "@/services/NotesService";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface CreateNoteModalProps {
  active: boolean;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
}

function CreateNoteModal({
  active,
  setActive,
}: CreateNoteModalProps): React.FunctionComponentElement<React.ReactNode> {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [label, setLabel] = useState(NoteLabel.BUG);
  const [titleError, setTitleError] = useState("");
  const [contentError, setContentError] = useState("");
  const { toasts, setToasts } = useToastContext();
  const [isLoading, setIsLoading] = useState(false);
  const maxCharacters = 600;
  const router = useRouter();

  const handleSaveNote = async () => {
    let valid = true;
    if (!title.trim()) {
      setTitleError("Title cannot be empty");
      valid = false;
    }
    if (!content.trim()) {
      setContentError("Content cannot be empty");
      valid = false;
    } else if (content.length > maxCharacters) {
      setContentError(`Content cannot exceed ${maxCharacters} characters`);
      valid = false;
    }
    if (!valid) return;
    setIsLoading(true);
    try {
      const notePayload = {
        title,
        content,
        label,
      };
      const note = await NotesService.createNote(notePayload);
      setToasts([
        ...toasts,
        {
          type: ToastType.SUCCESS,
          message: "Note created successfully",
          hasBeenFired: false,
        },
      ]);
      setIsLoading(false);
      setActive(false);
      setTimeout(() => {
        router.push("/");
      }, 1000);
    } catch (error) {
      console.error(error);
      setToasts([
        ...toasts,
        {
          type: ToastType.ERROR,
          message: "Note creation failed",
          hasBeenFired: false,
        },
      ]);
      setIsLoading(false);
      //TODO: Log via Sentry
      throw error;
    }
  };

  const handleCancel = () => {
    setActive(false);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-80 dark:bg-opacity-95 ${
        active ? "" : "hidden"
      }`}
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-white dark:bg-gray-700 dark:text-white shadow-md rounded-lg w-full max-w-lg">
        <div className="flex justify-between items-center mb-4 px-6 bg-customGreen dark:bg-customPurple">
          <h2 className="text-xl font-bold">Create Note</h2>
          <button
            className="p-2 hover:opacity-80"
            onClick={handleCancel}
            aria-label="Close"
          >
            <svg
              className="w-9 h-9 text-gray-100"
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
                d="m15 9-6 6m0-6 6 6"
              />
            </svg>
          </button>
        </div>
        <div className="mb-4 p-6">
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
              value={title}
              onChange={(e) => setTitle(e.target.value)}
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
              maxLength={maxCharacters}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            {contentError && (
              <p className="text-red-500 text-sm">{contentError}</p>
            )}
            <span className="absolute bottom-1 right-2 text-xs text-gray-500">
              {maxCharacters - content.length} characters remaining
            </span>
          </div>
          <div className="mb-4">
            <label
              htmlFor="label"
              className="block mb-1 text-base font-medium text-gray-600 dark:text-white"
            >
              label
            </label>
            <select
              id="label"
              className={inputStyles}
              value={label}
              onChange={(e) => setLabel(e.target.value as NoteLabel)}
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
          <div className="flex justify-center space-x-2">
            {isLoading ? (
              <FlexLoader />
            ) : (
              <>
                <button
                  className="p-2 hover:opacity-80"
                  onClick={handleSaveNote}
                  aria-label="Save"
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
                <button
                  className="p-2 hover:opacity-80"
                  onClick={handleCancel}
                  aria-label="Cancel"
                >
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
        </div>
      </div>
    </div>
  );
}

export default CreateNoteModal;
