"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import ToastError from "@/components/ToastError";
import ToastSuccess from "@/components/ToastSuccess";
import { ToastType } from "@/lib/models/Toast";
import { useToastContext } from "@/contexts/ToastContext";

interface AppLayoutProps {
  children: React.ReactNode;
}

function AppLayout({
  children,
}: AppLayoutProps): React.FunctionComponentElement<React.ReactNode> {
  const [darkMode, setDarkMode] = useState(false);
  const { toasts } = useToastContext();

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme === "dark") {
      setDarkMode(true);
    } else {
      setDarkMode(false);
    }
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <div className="bg-gray-100 dark:bg-gray-900 dark:text-white flex flex-col min-h-screen">
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />
      <main className="flex-grow pt-[6.5rem]">
        <div className="absolute bottom-20 right-10 z-50 flex flex-col">
          {toasts.map((toast, index) => {
            if (!toast.hasBeenFired) {
              return (
                <div key={index}>
                  {toast.type === ToastType.ERROR ? (
                    <ToastError index={index} message={toast.message} />
                  ) : toast.type === ToastType.SUCCESS ? (
                    <ToastSuccess index={index} message={toast.message} />
                  ) : null}
                </div>
              );
            }
          })}
        </div>
        {children}
      </main>
      <Footer />
    </div>
  );
}

export default AppLayout;
