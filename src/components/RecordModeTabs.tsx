import { RecordMode } from "../types";
import { recordModeOptions } from "../constants";

interface RecordModeTabsProps {
  selected: RecordMode;
  onSelect: (mode: RecordMode) => void;
}

const RecordModeTabs = ({ selected, onSelect }: RecordModeTabsProps) => {
  // Base classes without focus styles
  const baseClasses = "inline-block p-2 w-full";
  const activeClasses =
    "bg-[#D8BB83] text-[#4A3B2E] dark:bg-[#A07C50] dark:text-white";
  const inactiveClasses =
    "bg-[#E2C99A] hover:bg-[#D8BB83] hover:text-[#4A3B2E] dark:bg-[#8F6C45] dark:hover:bg-[#A07C50] dark:text-gray-200";
  const borderColor = "border-[#C4A373] dark:border-[#7E5C3A]";

  return (
    <ul className="text-xs w-full font-medium text-center text-[#4A3B2E] dark:text-gray-200 rounded-full overflow-hidden shadow flex">
      {recordModeOptions.map((option, index) => {
        const isFirst = index === 0;
        const isLast = index === recordModeOptions.length - 1;

        const isSelected = option.value === selected;

        const borderClasses = isLast ? "border-s-0" : "border-r";

        return (
          <li key={option.value} className="w-full">
            <button
              onClick={() => onSelect(option.value)}
              className={`${baseClasses} ${
                isSelected ? activeClasses : inactiveClasses
              } ${borderClasses} ${borderColor} ${
                isFirst ? "rounded-s-lg" : ""
              }`}
              aria-current={isSelected ? "page" : undefined}
            >
              {option.label}
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export default RecordModeTabs;
