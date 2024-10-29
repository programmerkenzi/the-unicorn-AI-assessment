import AaIcon from "../assets/icon/aa.svg";

interface SendBoxProps {
  message: string;
  setMessage: (message: string) => void;
  onSend: (message: string) => void;
}

const SendBox = ({ message, setMessage, onSend }: SendBoxProps) => {
  return (
    <div className="w-full">
      <div className="relative">
        <div className="flex absolute inset-y-0 items-center pl-2 start-2">
          <img width={20} src={AaIcon} alt="Aa Icon" />
        </div>
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          type="search"
          id="default-search"
          className="block py-4 pr-12 pl-12 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Type a message..."
          required
        />
        <button
          type="button"
          className="flex absolute inset-y-0 items-center pr-2 cursor-pointer hover:opacity-75 end-4 focus:outline-none"
          onClick={onSend}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 42 43"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M41 1.5L19 23.5M41 1.5L27 41.5L19 23.5M41 1.5L1 15.5L19 23.5"
              stroke="#1E1E1E"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default SendBox;
