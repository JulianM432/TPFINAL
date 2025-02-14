import { useTheme } from "./context/ThemeContext";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-md bg-gray-200 dark:bg-gray-800 text-black dark:text-white"
    >
      {theme === "light" ? "Modo Oscuro" : "Modo Claro"}
    </button>
  );
};

export default ThemeToggle;
