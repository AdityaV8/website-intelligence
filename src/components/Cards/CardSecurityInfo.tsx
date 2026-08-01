import React from "react";
import { SecurityInfo } from "../../types";
import { Lock, ShieldCheck, ShieldAlert, Calendar, KeyRound, FileCheck } from "lucide-react";

interface Props {
  security: SecurityInfo;
}

export const CardSecurityInfo: React.FC<Props> = ({ security }) => {
  const isExpiringSoon = security.daysRemaining > 0 && security.daysRemaining < 30;

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-md flex flex-col gap-3 shadow-lg hover:border-white/20 transition-all">
      {/* High Density Header */}
      <div className="flex justify-between items-center">
        <h3 className="text-xs font-bold uppercase tracking-wider text-sky-400">Security Intelligence</h3>
        <span className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono uppercase border ${
          security.sslEnabled
            ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
            : "bg-rose-500/20 text-rose-400 border-rose-500/30"
        }`}>
          {security.sslEnabled ? "SSL ACTIVE" : "NO SSL"}
        </span>
      </div>

      {/* SSL Circle + Info Row matching Design HTML */}
      <div className="flex items-center gap-3 py-1">
        <div className="relative shrink-0">
          <svg className="w-12 h-12">
            <circle cx="24" cy="24" r="20" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="3" />
            <circle cx="24" cy="24" r="20" fill="none" stroke="#38bdf8" strokeWidth="3" strokeDasharray="125" strokeDashoffset="15" />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center text-[10px] font-bold font-mono text-sky-300">
            A+
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-xs font-bold text-white truncate">
            {security.sslEnabled ? "SSL / TLS Certified" : "Unencrypted Connection"}
          </div>
          <div className="text-[10px] text-slate-400 font-mono">
            {security.daysRemaining > 0 ? `${security.daysRemaining} Days Left` : "Expired / Check Dates"}
          </div>
        </div>
      </div>

      {/* SSL Details Key-Values */}
      <div className="space-y-1 text-[11px] border-t border-white/5 pt-2">
        <div className="flex justify-between">
          <span className="text-slate-500 font-semibold uppercase text-[10px]">ISSUER</span>
          <span className="text-slate-200 truncate max-w-[160px]">{security.issuer}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-500 font-semibold uppercase text-[10px]">TLS PROTOCOL</span>
          <span className="text-slate-200 font-mono">{security.tlsVersion} ({security.bits} bit)</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-500 font-semibold uppercase text-[10px]">HSTS ENFORCED</span>
          <span className={security.securityHeaders.hsts === "Enabled" ? "text-emerald-400 font-bold" : "text-amber-400 font-bold"}>
            {security.securityHeaders.hsts}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-500 font-semibold uppercase text-[10px]">CSP POLICY</span>
          <span className="text-slate-200 font-mono">{security.securityHeaders.csp}</span>
        </div>
      </div>
    </div>
  );
};
