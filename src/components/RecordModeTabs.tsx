import { RecordMode } from "../types";

import { recordModeOptions } from "../constants";

interface RecordModeTabsProps {
  selected: RecordMode;
  onSelect: (mode: RecordMode) => void;
}

const RecordModeTabs = ({ selected, onSelect }: RecordModeTabsProps) => {
  // Base classes without focus styles
  const baseClasses = "inline-block p-2 w-full";
  const activeClasses = "bg-[#D8BB83] text-[#4A3B2E]";
  const inactiveClasses =
    "bg-[#E2C99A] hover:bg-[#D8BB83] hover:text-[#4A3B2E]";
  const borderColor = "border-[#C4A373]";

  return (
    <ul className="text-xs w-full font-medium text-center text-[#4A3B2E] rounded-full overflow-hidden shadow flex">
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
                isFirst ? "rounded-s-lg" : ""}`}
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
