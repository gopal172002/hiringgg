"use client";
import { useTheme } from "next-themes";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@radix-ui/themes";

const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    theme == "dark" ? setTheme("light") : setTheme("dark");
  };

  return (
    <div className="flex items-center gap-2">
      <Button onClick={toggleTheme}>
        {theme == "dark" ? (
          <FontAwesomeIcon
            icon={faMoon}
            className="bg-blue-600 rounded py-1 px-2 sm:py-2 sm:px-4 text-white"
          />
        ) : (
          <FontAwesomeIcon
            icon={faSun}
            className="bg-blue-600 rounded py-1 px-2 sm:py-2 sm:px-4 text-white"
          />
        )}
      </Button>
    </div>
  );
};

export default ThemeToggle;
