import { useContext } from "react"
import { ThemeContext } from '@/components/contexts/ThemeContext';
import { Moon, Sun } from 'lucide-react';

export default function Toggle() {
    const { theme, setTheme } = useContext(ThemeContext)
  
    function isDark() {
      return theme === "dark"
    }
  
    return (
        <div
        className="cursor-pointer text-gray-600 dark:text-white"
        onClick={() => setTheme(isDark() ? "light" : "dark")}
        >
            {isDark() ? (
                <Moon size={24} />
            ) : (
                <Sun size={24} />
            )}
        </div>
    )
  }