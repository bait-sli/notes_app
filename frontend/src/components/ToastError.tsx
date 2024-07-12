import { useToastContext } from "@/contexts/ToastContext";
import { useEffect, useState } from "react";

function ToastError({ index, message }: { index: number; message: string }) {
  const [show, setShow] = useState<boolean>(true);
  const { toasts, setToasts } = useToastContext();

  useEffect(() => {
    setTimeout(() => {
      setShow(false);
      setTimeout(() => {
        toasts[index].hasBeenFired = true;
        setToasts([...toasts]);
      }, 3000);
    }, 6000);
  }, [index, setToasts, toasts]);

  const handleCloseToast = () => {
    setShow(false);
    setTimeout(() => {
      toasts[index].hasBeenFired = true;
      setToasts([...toasts]);
    }, 3000);
  };

  return (
    <div
      style={
        show
          ? {}
          : {
              visibility: "hidden",
              opacity: 0,
              transition: "visibility 1.5s, opacity 1.5s linear",
            }
      }
    >
      <div className="mb-4 flex w-full max-w-xs items-center rounded-lg bg-red-500 p-4 z-50 text-gray-500 shadow">
        <div className="inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-500">
          <svg
            className="w-5 h-5"
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
              d="m15 9-6 6m0-6 6 6m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
        </div>
        <div className="ml-3 mr-2 text-sm font-bold text-white">{message}</div>
        <button
          onClick={handleCloseToast}
          type="button"
          className="p-1.5 hover:opacity-80"
        >
          <span className="sr-only">Close</span>
          <svg
            className="h-3 w-3 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 14 14"
          >
            <path stroke="currentColor" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default ToastError;
