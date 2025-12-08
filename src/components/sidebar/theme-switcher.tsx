import { Moon, Sun, Monitor } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useTheme } from "../theme-provider";

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()

  const cycleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else if (theme === "dark") {
      setTheme("system");
    } else {
      setTheme("light");
    }
  };

  const getIcon = () => {
    if (theme === "dark") return <Sun />;
    if (theme === "light") return <Moon />;
    return <Monitor />;
  };

  return (
    <Button size="icon" variant="outline" onClick={cycleTheme}>
      {getIcon()}
    </Button>
  );
}