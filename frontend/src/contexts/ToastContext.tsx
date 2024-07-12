import { Toast } from "@/lib/models/Toast";
import { FC, ReactNode, createContext, useContext, useState } from "react";

type ToastContextType = {
  toasts: Toast[];
  setToasts: (toasts: Toast[]) => void;
};

type ToastContextProviderProps = {
  children: ReactNode;
};

export const ToastContext = createContext<ToastContextType | undefined>(
  undefined
);
export const useToastContext = () => {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error(
      "useToastContext must be used within a ToastContextProvider"
    );
  }
  return context;
};

const ToastContextProvider: FC<ToastContextProviderProps> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  return (
    <ToastContext.Provider value={{ toasts, setToasts }}>
      {children}
    </ToastContext.Provider>
  );
};

export default ToastContextProvider;
