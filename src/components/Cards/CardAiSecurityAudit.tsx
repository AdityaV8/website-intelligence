import React, { useState } from "react";
import { AiSecurityAudit, LookupData } from "../../types";
import { Sparkles, ShieldCheck, ShieldAlert, CheckCircle2, RefreshCw, Loader2 } from "lucide-react";

interface Props {
  data: LookupData;
  onAuditUpdate?: (audit: AiSecurityAudit) => void;
}

export const CardAiSecurityAudit: React.FC<Props> = ({ data, onAuditUpdate }) => {
  const [audit, setAudit] = useState<AiSecurityAudit | undefined>(data.aiAudit);
  const [isLoading, setIsLoading] = useState(!data.aiAudit);

  // Trigger server-side Gemini AI Security Audit
  const triggerAiAudit = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/ai-security-audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lookupData: data }),
      });
      if (res.ok) {
        const json = await res.json();
        if (json.audit) {
          setAudit(json.audit);
          if (onAuditUpdate) onAuditUpdate(json.audit);
        }
      }
    } catch {
      //
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    if (!data.aiAudit) {
      triggerAiAudit();
    } else {
      setAudit(data.aiAudit);
      setIsLoading(false);
    }
  }, [data.domain]);

  const gradeColors: Record<string, string> = {
    "A+": "bg-emerald-500/20 text-emerald-300 border-emerald-500/50 shadow-emerald-500/20",
    A: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40 shadow-emerald-500/20",
    B: "bg-cyan-500/20 text-cyan-300 border-cyan-500/40 shadow-cyan-500/20",
    C: "bg-amber-500/20 text-amber-300 border-amber-500/40 shadow-amber-500/20",
    F: "bg-rose-500/20 text-rose-300 border-rose-500/40 shadow-rose-500/20",
  };

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-md flex flex-col gap-3 shadow-lg hover:border-white/20 transition-all">
      {/* High Density Header */}
      <div className="flex justify-between items-center">
        <h3 className="text-xs font-bold uppercase tracking-wider text-sky-400 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-sky-400" />
          <span>AI Security Posture</span>
        </h3>
        <button
          onClick={triggerAiAudit}
          disabled={isLoading}
          className="p-1 rounded bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 transition-all disabled:opacity-50"
          title="Re-run AI Security Audit"
        >
          {isLoading ? (
            <Loader2 className="w-3 h-3 animate-spin text-sky-400" />
          ) : (
            <RefreshCw className="w-3 h-3" />
          )}
        </button>
      </div>

      {isLoading ? (
        <div className="py-8 flex flex-col items-center justify-center gap-2 text-sky-300">
          <Loader2 className="w-6 h-6 animate-spin" />
          <span className="text-[10px] font-mono font-semibold tracking-wide">Analyzing Network Posture with AI...</span>
        </div>
      ) : audit ? (
        <div className="space-y-2 text-xs">
          {/* Grade & Score Banner */}
          <div className="flex items-center justify-between p-2.5 rounded bg-slate-950/40 border border-white/5">
            <div>
              <span className="text-[10px] text-slate-400 font-bold uppercase block mb-0.5">Overall Security Grade</span>
              <div className="flex items-center gap-2">
                <span className={`px-2.5 py-0.5 rounded font-mono text-lg font-black border ${gradeColors[audit.grade] || gradeColors["A"]}`}>
                  {audit.grade}
                </span>
                <span className="text-xs text-slate-300 font-mono">
                  <span className="text-white font-bold">{audit.riskScore}</span>/100
                </span>
              </div>
            </div>

            <div className="text-right">
              <span className="text-[9px] text-slate-500 uppercase font-mono block">Engine</span>
              <span className="text-[10px] font-semibold text-sky-400 font-mono">Gemini AI</span>
            </div>
          </div>

          {/* Executive Summary */}
          <div className="p-2.5 rounded bg-slate-950/40 border border-white/5 text-[11px] text-slate-300 leading-relaxed">
            <span className="text-sky-400 font-bold uppercase text-[10px] block mb-0.5">Executive Summary</span>
            {audit.summary}
          </div>

          {/* Recommendations Checklist */}
          {audit.recommendations && audit.recommendations.length > 0 && (
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase mb-1 block">Security Hardening</span>
              <div className="space-y-1">
                {audit.recommendations.map((rec, i) => (
                  <div key={i} className="flex items-start gap-2 p-2 rounded bg-slate-950/40 border border-white/5 text-[11px] text-slate-200">
                    <CheckCircle2 className="w-3.5 h-3.5 text-sky-400 shrink-0 mt-0.5" />
                    <span>{rec}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
};
