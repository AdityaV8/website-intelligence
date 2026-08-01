import React from "react";
import { AlertTriangle, RefreshCw, HelpCircle, ArrowRight } from "lucide-react";

interface Props {
  domain: string;
  errorMessage: string;
  onRetry: () => void;
}

export const ErrorCard: React.FC<Props> = ({ domain, errorMessage, onRetry }) => {
  return (
    <div className="w-full max-w-2xl mx-auto my-8 px-4">
      <div className="p-6 sm:p-8 rounded-3xl bg-rose-950/20 backdrop-blur-2xl border border-rose-500/40 shadow-2xl shadow-rose-950/30 text-center relative overflow-hidden">
        {/* Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="inline-flex p-3 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-400 mb-4">
          <AlertTriangle className="w-8 h-8" />
        </div>

        <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
          Unable to Resolve Website Intelligence
        </h3>

        <p className="font-mono text-cyan-300 text-sm mb-4">Target: {domain}</p>

        <div className="p-4 rounded-xl bg-slate-950/80 border border-rose-500/30 text-xs text-rose-200 font-mono text-left mb-6 max-w-md mx-auto">
          {errorMessage || "DNS resolution timed out or server is unreachable."}
        </div>

        {/* Troubleshooting Hints */}
        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-left text-xs text-slate-300 mb-6 max-w-md mx-auto space-y-2">
          <span className="font-semibold text-slate-200 flex items-center gap-1.5">
            <HelpCircle className="w-4 h-4 text-cyan-400" /> Troubleshooting Tips:
          </span>
          <ul className="list-disc list-inside space-y-1 text-slate-400">
            <li>Verify domain spelling (e.g. use <code className="text-cyan-300">google.com</code> instead of <code className="text-cyan-300">google</code>).</li>
            <li>Ensure the target domain has active public A/AAAA DNS records.</li>
            <li>Check if the web server allows HTTP/HTTPS connections.</li>
          </ul>
        </div>

        <button
          onClick={onRetry}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-rose-600 to-indigo-600 hover:from-rose-500 hover:to-indigo-500 text-white font-semibold text-sm shadow-lg shadow-rose-500/20 transition-all inline-flex items-center gap-2"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Retry Search</span>
        </button>
      </div>
    </div>
  );
};
