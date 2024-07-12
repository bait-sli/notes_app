import Image from "next/image";
import logo from "@/assets/images/logo.svg";
import { useState, useEffect, use } from "react";

interface HeaderProps {
  darkMode: boolean;
  setDarkMode: (darkMode: boolean) => void;
}

function Header({
  darkMode,
  setDarkMode,
}: HeaderProps): React.FunctionComponentElement<React.ReactNode> {
  const handleSetDarkMode = (darkMode: boolean) => {
    if (darkMode) {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      setDarkMode(false);
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  };

  return (
    <header className="fixed z-10 w-full bg-gray-600 dark:bg-gray-800 text-white py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Image
          src={logo}
          alt="Logo"
          width={130}
          height={24}
          priority
          className="dark:invert"
        />
        <div className="flex items-center">
          <span className="mr-2 text-base font-bold">Dark Mode</span>
          <div
            className={`toggle-switch ${darkMode ? "toggle-switch-on" : ""}`}
            onClick={() => handleSetDarkMode(!darkMode)}
          >
            <div className="toggle-knob"></div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
