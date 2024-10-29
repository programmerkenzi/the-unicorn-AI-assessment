interface RemoveButtonProps {
  onClick: () => void;
}

const RemoveButton = ({ onClick }: RemoveButtonProps) => {
  return (
    <button onClick={onClick} className="text-red-500 action-button">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="2"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M9 3H15M4 6H20M6 6V18C6 19.1 6.9 20 8 20H16C17.1 20 18 19.1 18 18V6M9 6V18M15 6V18"
        />
      </svg>
    </button>
  );
};

export default RemoveButton;
