import { useEffect, useState } from "react";

const ThemeToggleButton = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Load the initial theme from localStorage or set default to light
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");

    if (storedTheme === "dark") {
      document.documentElement.classList.add("dark");
      setIsDarkMode(true);
    } else {
      document.documentElement.classList.remove("dark");
      setIsDarkMode(false);
      localStorage.setItem("theme", "light"); // Set default to light
    }
  }, []);

  // Toggle theme function
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
            {/* Sun Icon (Visible in Light Mode) */}

            <svg
              className={`absolute right-1 top-[calc(50%-8px)] w-4 h-4 text-white transition-opacity ${
                isDarkMode ? "opacity-0" : "opacity-100"
              }`}
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                fill-rule="evenodd"
                d="M13 3a1 1 0 1 0-2 0v2a1 1 0 1 0 2 0V3ZM6.343 4.929A1 1 0 0 0 4.93 6.343l1.414 1.414a1 1 0 0 0 1.414-1.414L6.343 4.929Zm12.728 1.414a1 1 0 0 0-1.414-1.414l-1.414 1.414a1 1 0 0 0 1.414 1.414l1.414-1.414ZM12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm-9 4a1 1 0 1 0 0 2h2a1 1 0 1 0 0-2H3Zm16 0a1 1 0 1 0 0 2h2a1 1 0 1 0 0-2h-2ZM7.757 17.657a1 1 0 1 0-1.414-1.414l-1.414 1.414a1 1 0 1 0 1.414 1.414l1.414-1.414Zm9.9-1.414a1 1 0 0 0-1.414 1.414l1.414 1.414a1 1 0 0 0 1.414-1.414l-1.414-1.414ZM13 19a1 1 0 1 0-2 0v2a1 1 0 1 0 2 0v-2Z"
                clip-rule="evenodd"
              />
            </svg>

            {/* Moon Icon (Visible in Dark Mode) */}
            <svg
              className={`absolute left-1 top-[calc(50%-8px)]  w-4 h-4 text-white transition-opacity ${
                isDarkMode ? "opacity-100" : "opacity-0"
              }`}
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
            </svg>
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
        <svg
          className={`w-5 h-5 ${!isDarkMode ? "block" : "hidden"}`}
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            fill-rule="evenodd"
            d="M13 3a1 1 0 1 0-2 0v2a1 1 0 1 0 2 0V3ZM6.343 4.929A1 1 0 0 0 4.93 6.343l1.414 1.414a1 1 0 0 0 1.414-1.414L6.343 4.929Zm12.728 1.414a1 1 0 0 0-1.414-1.414l-1.414 1.414a1 1 0 0 0 1.414 1.414l1.414-1.414ZM12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm-9 4a1 1 0 1 0 0 2h2a1 1 0 1 0 0-2H3Zm16 0a1 1 0 1 0 0 2h2a1 1 0 1 0 0-2h-2ZM7.757 17.657a1 1 0 1 0-1.414-1.414l-1.414 1.414a1 1 0 1 0 1.414 1.414l1.414-1.414Zm9.9-1.414a1 1 0 0 0-1.414 1.414l1.414 1.414a1 1 0 0 0 1.414-1.414l-1.414-1.414ZM13 19a1 1 0 1 0-2 0v2a1 1 0 1 0 2 0v-2Z"
            clip-rule="evenodd"
          />
        </svg>

        {/* Show light icon when dark mode is active */}
        <svg
          className={`w-5 h-5 ${isDarkMode ? "block" : "hidden"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
        </svg>
      </button>
    </div>
  );
};

export default ThemeToggleButton;
