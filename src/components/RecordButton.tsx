const RecordButton = () => {
  return (
    <button
      type="button"
      className="w-12 h-12 bg-[#D8BB83] hover:bg-[#E2C99A] focus:ring-4 focus:outline-none focus:ring-[#C4A373] font-medium rounded-full p-3 inline-flex items-center justify-center group"
    >
      <svg
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="none"
        viewBox="0 0 24 24"
        className="text-black group-hover:text-gray-700"
      >
        <path
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M19 9v3a5.006 5.006 0 0 1-5 5h-4a5.006 5.006 0 0 1-5-5V9m7 9v3m-3 0h6M11 3h2a3 3 0 0 1 3 3v5a3 3 0 0 1-3 3h-2a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3Z"
        />
      </svg>
    </button>
  );
};

export default RecordButton;
