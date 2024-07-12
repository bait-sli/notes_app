import Link from "next/link";

function BackButton(): React.FunctionComponentElement<React.ReactNode> {
  return (
    <Link href="/">
      <button className="mb-4 py-2 flex inline-flex space-x-2 items-center text-gray-800 dark:text-white hover:underline hover:text-customGreen dark:hover:text-customPurple">
        <svg
          className="w-6 h-6 "
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 12h14M5 12l4-4m-4 4 4 4"
          />
        </svg>

        <span className="font-semibold">Back to Notes</span>
      </button>
    </Link>
  );
}

export default BackButton;
