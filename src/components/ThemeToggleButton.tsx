import { useEffect, useState } from "react";
import SunIcon from "./icons/SunIcon";
import MoonIcon from "./icons/MoonIcon";

const ThemeToggleButton = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");

    if (storedTheme === "dark") {
      document.documentElement.classList.add("dark");
      setIsDarkMode(true);
    } else {
      document.documentElement.classList.remove("dark");
      setIsDarkMode(false);
      localStorage.setItem("theme", "light");
    }
  }, []);

  const toggleTheme = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className="fixed top-[12px] right-[60px] xl:top-2 xl:left-2 z-50 p-2 my-auto">
      {/* Toggle switch for mobile view */}
      <div className="block xl:hidden">
        <label className="inline-flex relative items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={isDarkMode}
            onChange={toggleTheme}
          />
          <div
            className={`w-11 h-6 rounded-full transition-all relative ${
              !isDarkMode
                ? "bg-[#D8BB83] peer-focus:ring-4 peer-focus:ring-[#E2C99A]"
                : "bg-gray-700 peer-focus:ring-4 peer-focus:ring-gray-500"
            }`}
          >
            <SunIcon
              className={`absolute right-1 top-[calc(50%-8px)] w-4 h-4 text-white transition-opacity ${
                isDarkMode ? "opacity-0" : "opacity-100"
              }`}
            />
            <MoonIcon
              className={`absolute left-1 top-[calc(50%-8px)] w-4 h-4 text-white transition-opacity ${
                isDarkMode ? "opacity-100" : "opacity-0"
              }`}
            />
          </div>
          <div
            className={`absolute w-5 h-5 bg-white border rounded-full transition-all ${
              isDarkMode ? "translate-x-5" : "translate-x-0"
            }`}
          ></div>
        </label>
      </div>

      {/* Button for desktop view */}
      <button
        id="theme-toggle"
        type="button"
        onClick={toggleTheme}
        className={`hidden justify-center items-center p-2 w-12 h-12 text-white rounded-full shadow-md xl:flex transition-all ${
          !isDarkMode ? "bg-[#D8BB83]" : "bg-gray-800"
        }`}
        aria-label="Toggle Theme"
      >
        {!isDarkMode ? (
          <SunIcon className="w-5 h-5" />
        ) : (
          <MoonIcon className="w-5 h-5" />
        )}
      </button>
    </div>
  );
};

export default ThemeToggleButton;
