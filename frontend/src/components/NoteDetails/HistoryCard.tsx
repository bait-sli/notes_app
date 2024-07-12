import CompareTextModal from "@/components/modals/CompareTextModal";
import { useToastContext } from "@/contexts/ToastContext";
import { History, Note } from "@/lib/models/Note";
import { ToastType } from "@/lib/models/Toast";
import { NotesService } from "@/services/NotesService";
import { useState } from "react";

interface HistoryCardProps {
  note: Note;
}

function HistoryCard({
  note,
}: HistoryCardProps): React.FunctionComponentElement<React.ReactNode> {
  const [compareTexts, setCompareTexts] = useState<{
    content1: string;
    content2: string;
  }>({ content1: "", content2: "" });
  const [showCompareModal, setShowCompareModal] = useState(false);
  const { toasts, setToasts } = useToastContext();

  const restoreVersion = async (version: History) => {
    try {
      const updatePayload = {
        title: version.title,
        content: version.content,
        label: note.label,
      };
      await NotesService.updateNote(note.id, updatePayload);
      setToasts([
        ...toasts,
        {
          type: ToastType.SUCCESS,
          message: "Note restored successfully",
          hasBeenFired: false,
        },
      ]);
      window.location.reload();
    } catch (error) {
      console.error(error);
      setToasts([
        ...toasts,
        {
          type: ToastType.ERROR,
          message: "Note could not be restored",
          hasBeenFired: false,
        },
      ]);
      //TODO: Log via Sentry
      throw error;
    }
  };

  const handleCompareTexts = (index: number) => {
    const current = note.history[index].content;
    if (index > 0) {
      const previous = note.history[index - 1].content;
      setCompareTexts({
        content1: previous,
        content2: current,
      });
    } else {
      setCompareTexts({
        content1: "",
        content2: current,
      });
    }
    setShowCompareModal(true);
  };

  return (
    <div className="bg-white dark:bg-gray-800 dark:text-white shadow-xl rounded-xl p-8">
      <CompareTextModal
        active={showCompareModal}
        setActive={setShowCompareModal}
        text1={compareTexts.content1}
        text2={compareTexts.content2}
      />
      <h3 className="text-xl text-gray-600 dark:text-gray-100 font-bold mb-4">
        History of Updates
      </h3>
      <ul className="divide-y divide-gray-200 dark:divide-gray-700">
        {note.history.map((version: History, index: React.Key) => (
          <li key={index} className="py-2">
            <div className="flex justify-between items-center">
              <div className="flex flex-col">
                <span className="text-gray-500 dark:text-gray-400 text-xs">
                  {new Intl.DateTimeFormat("en-EN", {
                    dateStyle: "full",
                    timeStyle: "medium",
                  }).format(new Date(version.created_at))}
                </span>
                <div
                  className={`   text-sm font-semibold ${
                    version.type === "created"
                      ? "text-customGreen"
                      : "text-amber-500"
                  }`}
                >
                  {version.type}
                </div>
              </div>
              <div className="flex justify-end space-x-1 px-8">
                <button
                  className="p-2 hover:opacity-70"
                  onClick={() => handleCompareTexts(Number(index))}
                >
                  <svg
                    className="w-7 h-7 text-sky-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeWidth="2"
                      d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z"
                    />
                    <path
                      stroke="currentColor"
                      strokeWidth="2"
                      d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                  </svg>
                </button>
                <button
                  className="p-2 hover:opacity-70"
                  onClick={() => restoreVersion(version)}
                >
                  <svg
                    className="w-7 h-7 text-customGreen dark:text-customPurple"
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
                      d="M3 9h13a5 5 0 0 1 0 10H7M3 9l4-4M3 9l4 4"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HistoryCard;
