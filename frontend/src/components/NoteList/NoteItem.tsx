import { Note, NoteLabel } from "@/lib/models/Note";
import Link from "next/link";

const itemColors: Record<NoteLabel, string> = {
  [NoteLabel.BUG]: "bg-red-600",
  [NoteLabel.FEATURE]: "bg-amber-500",
  [NoteLabel.IMPROVEMENT]: "bg-teal-500",
  [NoteLabel.QUESTION]: "bg-fuchsia-600",
  [NoteLabel.TASK]: "bg-lime-500",
};

const borderColors: Record<NoteLabel, string> = {
  [NoteLabel.BUG]: "border-red-600",
  [NoteLabel.FEATURE]: "border-amber-500",
  [NoteLabel.IMPROVEMENT]: "border-teal-500",
  [NoteLabel.QUESTION]: "border-fuchsia-600",
  [NoteLabel.TASK]: "border-lime-500",
};

interface NoteItemProps {
  note: Note;
}

function NoteItem({
  note,
}: NoteItemProps): React.FunctionComponentElement<React.ReactNode> {
  return (
    <Link href={`/notes/${note.id}`}>
      <div
        className={`relative bg-white dark:bg-gray-800 dark:text-white shadow-xl rounded-lg overflow-hidden border-2  ${
          borderColors[note.label]
        } cursor-pointer hover:opacity-80`}
      >
        <div className="absolute -top-[40%] -right-[40%] w-full h-full flex justify-center items-center">
          <svg
            viewBox="0 0 24 24"
            className="w-8 h-8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19.1835 7.80516L16.2188 4.83755C14.1921 2.8089 13.1788 1.79457 12.0904 2.03468C11.0021 2.2748 10.5086 3.62155 9.5217 6.31506L8.85373 8.1381C8.59063 8.85617 8.45908 9.2152 8.22239 9.49292C8.11619 9.61754 7.99536 9.72887 7.86251 9.82451C7.56644 10.0377 7.19811 10.1392 6.46145 10.3423C4.80107 10.8 3.97088 11.0289 3.65804 11.5721C3.5228 11.8069 3.45242 12.0735 3.45413 12.3446C3.45809 12.9715 4.06698 13.581 5.28476 14.8L6.69935 16.2163L2.22345 20.6964C1.92552 20.9946 1.92552 21.4782 2.22345 21.7764C2.52138 22.0746 3.00443 22.0746 3.30236 21.7764L7.77841 17.2961L9.24441 18.7635C10.4699 19.9902 11.0827 20.6036 11.7134 20.6045C11.9792 20.6049 12.2404 20.5358 12.4713 20.4041C13.0192 20.0914 13.2493 19.2551 13.7095 17.5825C13.9119 16.8472 14.013 16.4795 14.2254 16.1835C14.3184 16.054 14.4262 15.9358 14.5468 15.8314C14.8221 15.593 15.1788 15.459 15.8922 15.191L17.7362 14.4981C20.4 13.4973 21.7319 12.9969 21.9667 11.9115C22.2014 10.826 21.1954 9.81905 19.1835 7.80516Z"
              fill="currentColor"
            />
          </svg>
        </div>
        <div
          className={`px-4 py-2 ${
            itemColors[note.label]
          } text-white text-sm font-bold uppercase`}
        >
          {note.label}
        </div>
        <div className="p-4">
          <h3 className="text-xl text-gray-800 dark:text-white font-semibold mb-2">
            {`${note.title.substring(0, 20)}...`}
          </h3>
          <p className="text-gray-700 dark:text-gray-300">
            {`${note.content.substring(0, 40)}...`}
          </p>
        </div>
        <div className="flex inline-flex space-x-2 px-4 text-gray-400">
          <svg
            className="w-5 h-5 "
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              fill-rule="evenodd"
              d="M5 5a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1h1a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1h1a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1 2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a2 2 0 0 1 2-2ZM3 19v-7a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Zm6.01-6a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm2 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm6 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm-10 4a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm6 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm2 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0Z"
              clip-rule="evenodd"
            />
          </svg>
          <span className="text-sm font-medium">
            {new Intl.DateTimeFormat("en-EN", {
              dateStyle: "full",
              timeStyle: "medium",
            }).format(new Date(note.created_at))}
          </span>
        </div>
      </div>
    </Link>
  );
}

export default NoteItem;
