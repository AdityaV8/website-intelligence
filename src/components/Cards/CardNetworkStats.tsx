import React from "react";
import { NetworkStats } from "../../types";
import { Gauge, Zap, Clock, Wifi, Download } from "lucide-react";

interface Props {
  stats: NetworkStats;
}

export const CardNetworkStats: React.FC<Props> = ({ stats }) => {
  // Compute circular progress values (normalized 0-100)
  const dnsProgress = Math.min(100, Math.max(10, Math.round((stats.dnsLookupTimeMs / 250) * 100)));
  const ttfbProgress = Math.min(100, Math.max(10, Math.round((stats.ttfbMs / 600) * 100)));
  const pingProgress = Math.min(100, Math.max(10, Math.round((stats.pingMs / 150) * 100)));

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-md flex flex-col gap-3 shadow-lg hover:border-white/20 transition-all">
      {/* High Density Header */}
      <div className="flex justify-between items-center">
        <h3 className="text-xs font-bold uppercase tracking-wider text-sky-400">Network Latency</h3>
        <span className="text-[10px] font-mono text-sky-300 font-bold bg-sky-500/10 px-2 py-0.5 rounded border border-sky-500/20">
          TOTAL: {stats.totalLookupTimeMs} ms
        </span>
      </div>

      {/* Progress Circles matching Design HTML */}
      <div className="grid grid-cols-3 gap-2 py-1 text-center">
        {/* Ping Ring */}
        <div className="flex flex-col items-center">
          <div className="relative w-12 h-12 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90">
              <circle cx="24" cy="24" r="18" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="3" />
              <circle cx="24" cy="24" r="18" fill="none" stroke="#38bdf8" strokeWidth="3" strokeDasharray="113" strokeDashoffset={113 - (113 * pingProgress) / 100} strokeLinecap="round" />
            </svg>
            <span className="absolute font-mono font-bold text-[10px] text-white">{stats.pingMs}m</span>
          </div>
          <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400 mt-1">PING</span>
        </div>

        {/* DNS Ring */}
        <div className="flex flex-col items-center">
          <div className="relative w-12 h-12 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90">
              <circle cx="24" cy="24" r="18" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="3" />
              <circle cx="24" cy="24" r="18" fill="none" stroke="#818cf8" strokeWidth="3" strokeDasharray="113" strokeDashoffset={113 - (113 * dnsProgress) / 100} strokeLinecap="round" />
            </svg>
            <span className="absolute font-mono font-bold text-[10px] text-white">{stats.dnsLookupTimeMs}m</span>
          </div>
          <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400 mt-1">DNS</span>
        </div>

        {/* TTFB Ring */}
        <div className="flex flex-col items-center">
          <div className="relative w-12 h-12 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90">
              <circle cx="24" cy="24" r="18" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="3" />
              <circle cx="24" cy="24" r="18" fill="none" stroke="#34d399" strokeWidth="3" strokeDasharray="113" strokeDashoffset={113 - (113 * ttfbProgress) / 100} strokeLinecap="round" />
            </svg>
            <span className="absolute font-mono font-bold text-[10px] text-white">{stats.ttfbMs}m</span>
          </div>
          <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400 mt-1">TTFB</span>
        </div>
      </div>

      {/* Additional Stats Bar */}
      <div className="flex justify-between items-center p-2 bg-slate-950/40 rounded border border-white/5 text-[11px]">
        <span className="text-slate-400">Throughput Est.</span>
        <span className="font-mono text-sky-300 font-bold">{stats.downloadSpeedEstimate}</span>
      </div>
    </div>
  );
};
