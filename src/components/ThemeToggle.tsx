
import React from "react";
import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { cn } from "@/lib/utils";

const ThemeToggle: React.FC<{ className?: string }> = ({ className }) => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <motion.button
      onClick={toggleTheme}
      className={cn(
        "relative rounded-full p-1.5 overflow-hidden",
        theme === "dark" 
          ? "bg-talkmatch-black-light text-talkmatch-blue border border-talkmatch-blue/30" 
          : "bg-talkmatch-blue/10 text-talkmatch-blue-dark border border-talkmatch-blue/20",
        className
      )}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
      aria-label="Toggle theme"
    >
      <motion.div
        initial={false}
        animate={{ rotate: theme === "dark" ? 0 : 180 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="relative z-10"
      >
        {theme === "dark" ? <Moon size={18} /> : <Sun size={18} />}
      </motion.div>
      
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-talkmatch-blue/20 to-transparent"
        initial={false}
        animate={{ 
          opacity: theme === "dark" ? 0.3 : 0.1
        }}
        transition={{ duration: 0.5 }}
      />
    </motion.button>
  );
};

export default ThemeToggle;
