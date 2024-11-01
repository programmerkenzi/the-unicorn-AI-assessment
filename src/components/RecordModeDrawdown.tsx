import { RecordMode } from "../types";
import { recordModeOptions } from "../constants";
import { useState } from "react";
import SettingIcon from "./icons/SettingIcon";

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
        className="flex absolute top-0 right-0 p-2 text-sm text-gray-600"
        type="button"
        onClick={() => setToggleMenu(!toggleMenu)}
      >
        <SettingIcon />
      </button>

      {toggleMenu && (
        <div
          id="dropdownAvatar"
          className="absolute right-0 top-12 z-20 w-44 bg-white rounded-lg divide-y divide-gray-100 shadow"
        >
          <ul
            className="py-2 text-sm text-gray-700"
            aria-labelledby="dropdownUserAvatarButton"
          >
            {recordModeOptions.map((option) => (
              <li
                key={`option-${option.value}`}
                onClick={() => handleOnSelect(option.value)}
                className={` ${selected === option.value ? "bg-[#E2C99A]" : ""}`}
              >
                <div className="flex items-center p-2 rounded">
                  <input
                    checked={selected === option.value}
                    type="radio"
                    value={option.value}
                    name="recordMode"
                    className="w-4 h-4  peer-checked:bg-[#E2C99A] "
                  />
                  <label
                    htmlFor="default-radio-4"
                    className="w-full text-sm font-medium text-[#4A3B2E] rounded ms-2"
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
