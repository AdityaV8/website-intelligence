import React from "react";
import { IspInfo } from "../../types";
import { Network, Activity, Layers, Wifi } from "lucide-react";

interface Props {
  isp: IspInfo;
}

export const CardIspDetails: React.FC<Props> = ({ isp }) => {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-md flex flex-col gap-3 shadow-lg hover:border-white/20 transition-all">
      {/* High Density Header */}
      <div className="flex justify-between items-center">
        <h3 className="text-xs font-bold uppercase tracking-wider text-sky-400">ISP & Provider</h3>
        <span className="text-[10px] font-mono font-bold text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded border border-sky-500/20">
          ASN: {isp.asn}
        </span>
      </div>

      {/* Details list */}
      <div className="space-y-2 text-xs">
        <div className="p-2.5 bg-slate-950/40 rounded border border-white/5">
          <div className="text-[10px] uppercase text-slate-500 font-bold mb-0.5">ISP NAME</div>
          <div className="text-sm font-semibold text-white truncate" title={isp.ispName}>{isp.ispName}</div>
          <div className="text-xs text-slate-400 truncate" title={isp.organisation}>{isp.organisation}</div>
        </div>

        <div className="flex justify-between items-center p-2 bg-slate-950/40 rounded border border-white/5 text-[11px]">
          <span className="text-slate-400">Connection</span>
          <span className="text-emerald-400 font-medium">{isp.connectionType || "Datacenter / Fiber"}</span>
        </div>
      </div>
    </div>
  );
};
