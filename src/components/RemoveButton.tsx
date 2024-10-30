import GarbageCanIcon from "./icons/GarbageCanIcon";

interface RemoveButtonProps {
  onClick: () => void;
}

const RemoveButton = ({ onClick }: RemoveButtonProps) => {
  return (
    <button onClick={onClick} className="text-red-500 action-button">
      <GarbageCanIcon />
    </button>
  );
};

export default RemoveButton;
