import React, { useState } from "react";
import { IpInfo } from "../../types";
import { Cpu, Copy, Check, Shield } from "lucide-react";

interface Props {
  ip: IpInfo;
  onShowToast: (msg: string) => void;
}

export const CardIpAddress: React.FC<Props> = ({ ip, onShowToast }) => {
  const [copiedType, setCopiedType] = useState<string | null>(null);

  const handleCopy = (ipAddress: string, type: string) => {
    if (!ipAddress || ipAddress === "N/A") return;
    navigator.clipboard.writeText(ipAddress);
    setCopiedType(type);
    onShowToast(`✔ IP Copied Successfully: ${ipAddress}`);
    setTimeout(() => setCopiedType(null), 2000);
  };

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-md flex flex-col gap-3 shadow-lg hover:border-white/20 transition-all">
      {/* High Density Header */}
      <div className="flex justify-between items-center">
        <h3 className="text-xs font-bold uppercase tracking-wider text-sky-400">IP Addresses</h3>
        <span className="text-[10px] font-mono text-slate-400">RESOLVED</span>
      </div>

      {/* IPv4 and IPv6 rows */}
      <div className="space-y-2 text-xs">
        {/* IPv4 */}
        <div className="p-2.5 rounded bg-slate-950/40 border border-white/5 flex items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-1.5 mb-0.5">
              <span className="px-1.5 py-0.2 rounded text-[10px] font-bold font-mono bg-sky-500/20 text-sky-300 border border-sky-500/30">
                IPv4
              </span>
              <span className="text-[10px] text-slate-400">Primary</span>
            </div>
            <span className="font-mono text-sm font-semibold text-sky-300 tracking-wide">
              {ip.ipv4 || "N/A"}
            </span>
          </div>

          <button
            onClick={() => handleCopy(ip.ipv4, "v4")}
            disabled={!ip.ipv4 || ip.ipv4 === "N/A"}
            className="flex items-center gap-1 px-2 py-1 rounded bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 text-[10px] font-semibold transition-all disabled:opacity-40"
          >
            {copiedType === "v4" ? (
              <>
                <Check className="w-3 h-3 text-emerald-400" />
                <span>COPIED</span>
              </>
            ) : (
              <>
                <Copy className="w-3 h-3" />
                <span>COPY</span>
              </>
            )}
          </button>
        </div>

        {/* IPv6 */}
        <div className="p-2.5 rounded bg-slate-950/40 border border-white/5 flex items-center justify-between gap-2">
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 mb-0.5">
              <span className="px-1.5 py-0.2 rounded text-[10px] font-bold font-mono bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                IPv6
              </span>
              <span className="text-[10px] text-slate-400">Next-Gen</span>
            </div>
            <span className="font-mono text-xs font-semibold text-indigo-300 tracking-wide truncate block max-w-[180px]">
              {ip.ipv6 || "Not Broadcasted"}
            </span>
          </div>

          <button
            onClick={() => handleCopy(ip.ipv6, "v6")}
            disabled={!ip.ipv6 || ip.ipv6 === "Not Broadcasted" || ip.ipv6 === "N/A"}
            className="flex items-center gap-1 px-2 py-1 rounded bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 text-[10px] font-semibold transition-all disabled:opacity-40 shrink-0"
          >
            {copiedType === "v6" ? (
              <>
                <Check className="w-3 h-3 text-emerald-400" />
                <span>COPIED</span>
              </>
            ) : (
              <>
                <Copy className="w-3 h-3" />
                <span>COPY</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
