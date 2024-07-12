"use client";

import ToastContextProvider from "@/contexts/ToastContext";
import { ReactNode } from "react";

function AppContextProvider({ children }: { children: ReactNode }) {
  return <ToastContextProvider>{children}</ToastContextProvider>;
}

export default AppContextProvider;
