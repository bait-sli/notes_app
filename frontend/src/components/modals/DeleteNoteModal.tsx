import { FlexLoader } from "@/components/Loader";
import { useToastContext } from "@/contexts/ToastContext";
import { ToastType } from "@/lib/models/Toast";
import { NotesService } from "@/services/NotesService";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface DeleteNoteModalProps {
  active: boolean;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
  id: number;
}

function DeleteNoteModal({
  active,
  setActive,
  id,
}: DeleteNoteModalProps): React.FunctionComponentElement<React.ReactNode> {
  const [isLoading, setIsLoading] = useState(false);
  const { toasts, setToasts } = useToastContext();
  const router = useRouter();

  const handleConfirmDelete = async () => {
    setIsLoading(true);
    try {
      await NotesService.deleteNote(id);
      setActive(false);
      setIsLoading(false);
      setToasts([
        ...toasts,
        {
          type: ToastType.SUCCESS,
          message: "Note deleted successfully",
          hasBeenFired: false,
        },
      ]);
      setTimeout(() => {
        router.push("/notes");
      }, 1000);
    } catch (error) {
      setIsLoading(false);
      setToasts([
        ...toasts,
        {
          type: ToastType.ERROR,
          message: "Note could not be deleted",
          hasBeenFired: false,
        },
      ]);
      console.error(error);
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
      <div className="bg-white dark:bg-gray-700 dark:text-white shadow-md rounded-lg w-full max-w-sm">
        <div className="flex justify-between items-center mb-4 px-6 bg-red-600 dark:bg-red-800">
          <h2 className="text-xl font-bold">Delete Note</h2>
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
          <p className="mb-6 font-medium text-gray-600 dark:text-gray-100">
            Are you sure you want to delete this note? This action cannot be
            undone.
          </p>
          <div className="flex justify-center space-x-4">
            {isLoading ? (
              <FlexLoader />
            ) : (
              <>
                <button
                  className="p-2 hover:opacity-80"
                  onClick={handleConfirmDelete}
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
                <button className="p-2 hover:opacity-80" onClick={handleCancel}>
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

export default DeleteNoteModal;
