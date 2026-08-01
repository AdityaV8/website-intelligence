import React, { useEffect } from "react";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";

interface ToastProps {
  message: string;
  type?: "success" | "error" | "info";
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, type = "success", onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3200);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-bounce-in flex items-center gap-3 px-4 py-3 rounded-xl backdrop-blur-xl bg-slate-900/90 border border-cyan-500/40 text-white shadow-2xl shadow-cyan-950/80">
      {type === "success" && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
      {type === "error" && <AlertCircle className="w-5 h-5 text-rose-400" />}
      {type === "info" && <Info className="w-5 h-5 text-cyan-400" />}
      
      <span className="text-sm font-medium">{message}</span>

      <button
        onClick={onClose}
        className="ml-2 text-slate-400 hover:text-white transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};
