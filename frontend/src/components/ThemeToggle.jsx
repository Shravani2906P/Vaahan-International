/*
================================================================================
File Name : ThemeToggle.jsx
Author : Tahseen Raza
Created Date : 2025-06-17
Description : Premium Animated Theme Toggle
Company : Vaahan International
Copyright : (c) 2026 Vaahan International. All rights reserved.
================================================================================
*/

import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
      className="
        relative
        flex
        items-center
        justify-center
        w-11
        h-11
        rounded-full
        border
        transition-all
        duration-300
        hover:scale-110
        active:scale-95
        focus:outline-none
        focus:ring-2
        focus:ring-yellow-500
        backdrop-blur-md
      "
      style={{
        background: isDark
          ? "rgba(15,23,42,0.75)"
          : "rgb(7, 14, 41)",
        borderColor: isDark
          ? "rgba(255,255,255,0.12)"
          : "rgba(0,0,0,0.08)",
        boxShadow: isDark
          ? "0 8px 30px rgba(0,0,0,.35)"
          : "0 8px 25px rgba(0,0,0,.08)"
      }}
    >
      <AnimatePresence mode="wait">
        {isDark ? (
          <motion.div
            key="moon"
            initial={{ rotate: -90, scale: 0 }}
            animate={{ rotate: 0, scale: 1 }}
            exit={{ rotate: 90, scale: 0 }}
            transition={{
              duration: 0.3,
              type: "spring",
              stiffness: 300
            }}
          >
            <Moon
              size={20}
              className="text-yellow-400"
              strokeWidth={2}
            />
          </motion.div>
        ) : (
          <motion.div
            key="sun"
            initial={{ rotate: 90, scale: 0 }}
            animate={{ rotate: 0, scale: 1 }}
            exit={{ rotate: -90, scale: 0 }}
            transition={{
              duration: 0.3,
              type: "spring",
              stiffness: 300
            }}
          >
            <Sun
              size={20}
              className="text-yellow-500"
              strokeWidth={2}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
};

export default ThemeToggle;