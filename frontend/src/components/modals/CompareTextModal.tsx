import React from "react";
import { diffWordsWithSpace } from "diff";

interface CompareTextModalProps {
  active: boolean;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
  text1: string;
  text2: string;
}

function CompareTextModal({
  active,
  setActive,
  text1,
  text2,
}: CompareTextModalProps): React.FunctionComponentElement<React.ReactNode> {
  const diff = diffWordsWithSpace(text1, text2);

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
          <h2 className="text-xl font-bold">Content Changes</h2>
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
          <span className="text-base font-semibold font-mono whitespace-pre-wrap">
            {diff.map((part, index) => {
              const color = part.added
                ? "text-green-500"
                : part.removed
                ? "text-red-500"
                : "text-gray-500";
              const previousPart = diff[index - 1];
              const nextPart = diff[index + 1];
              const needsLeadingSpace =
                previousPart &&
                !previousPart.value.endsWith(" ") &&
                !part.value.startsWith(" ");
              const needsTrailingSpace =
                nextPart &&
                !part.value.endsWith(" ") &&
                !nextPart.value.startsWith(" ");

              return (
                <span key={index} className={color}>
                  {needsLeadingSpace ? " " : ""}
                  {part.value}
                  {needsTrailingSpace ? " " : ""}
                </span>
              );
            })}
          </span>
        </div>
        <div className="flex justify-end space-x-1 px-8">
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
        </div>
      </div>
    </div>
  );
}

export default CompareTextModal;
