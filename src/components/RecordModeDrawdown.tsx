import { RecordMode } from "../types";
import { recordModeOptions } from "../constants";
import { useState } from "react";

interface RecordModeDrawdownProps {
  selected: RecordMode;
  onSelect: (mode: RecordMode) => void;
}

const RecordModeDrawdown = ({
  selected,
  onSelect,
}: RecordModeDrawdownProps) => {
  const [toggleMenu, setToggleMenu] = useState(false);

  const handleOnSelect = (mode: RecordMode) => {
    onSelect(mode);
    setToggleMenu(false);
  };

  return (
    <div className="relative">
      <button
        id="dropdownUserAvatarButton"
        data-dropdown-toggle="dropdownAvatar"
        className="flex absolute top-0 right-0 p-2 text-sm text-gray-600 dark:text-gray-300"
        type="button"
        onClick={() => setToggleMenu(!toggleMenu)}
      >
        <svg
          className="w-8 h-8"
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
            d="M6 6h8m-8 4h12M6 14h8m-8 4h12"
          />
        </svg>
      </button>

      {toggleMenu && (
        <div
          id="dropdownAvatar"
          className="absolute right-0 top-12 z-20 w-44 bg-white rounded-lg divide-y divide-gray-100 shadow dark:bg-gray-800 dark:divide-gray-700"
        >
          <ul
            className="py-2 text-sm text-gray-700 dark:text-gray-300"
            aria-labelledby="dropdownUserAvatarButton"
          >
            {recordModeOptions.map((option) => (
              <li
                key={`option-${option.value}`}
                onClick={() => handleOnSelect(option.value)}
                className={`${
                  selected === option.value
                    ? "bg-[#E2C99A] dark:bg-[#A07C50]"
                    : ""
                }`}
              >
                <div className="flex items-center p-2 rounded">
                  <input
                    checked={selected === option.value}
                    type="radio"
                    value={option.value}
                    name="recordMode"
                    className="w-4 h-4 peer-checked:bg-[#E2C99A] dark:peer-checked:bg-[#A07C50]"
                  />
                  <label
                    htmlFor="default-radio-4"
                    className="w-full text-sm font-medium text-[#4A3B2E] dark:text-gray-200 rounded ms-2"
                  >
                    {option.label}
                  </label>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default RecordModeDrawdown;
