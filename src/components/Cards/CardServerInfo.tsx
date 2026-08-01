import React from "react";
import { ServerInfo } from "../../types";
import { HardDrive, Terminal, Code, FileText, Cpu } from "lucide-react";

interface Props {
  server: ServerInfo;
}

export const CardServerInfo: React.FC<Props> = ({ server }) => {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-md flex flex-col gap-3 shadow-lg hover:border-white/20 transition-all">
      {/* High Density Header */}
      <div className="flex justify-between items-center">
        <h3 className="text-xs font-bold uppercase tracking-wider text-sky-400">Server Config</h3>
        <span className="text-[10px] font-mono text-slate-400">
          {server.webServer}
        </span>
      </div>

      {/* Grid properties matching Design HTML */}
      <div className="grid grid-cols-2 gap-2 text-xs">
        <div className="p-2 bg-slate-950/40 rounded border border-white/5">
          <div className="text-slate-500 mb-0.5 font-bold text-[10px] uppercase">WEB SERVER</div>
          <div className="text-slate-200 font-semibold truncate" title={server.serverHeader}>{server.serverHeader}</div>
        </div>

        <div className="p-2 bg-slate-950/40 rounded border border-white/5">
          <div className="text-slate-500 mb-0.5 font-bold text-[10px] uppercase">HTTP VERSION</div>
          <div className="text-sky-300 font-mono font-semibold">{server.httpVersion}</div>
        </div>

        <div className="p-2 bg-slate-950/40 rounded border border-white/5">
          <div className="text-slate-500 mb-0.5 font-bold text-[10px] uppercase">OS & STACK</div>
          <div className="text-slate-200 truncate">{server.os}</div>
        </div>

        <div className="p-2 bg-slate-950/40 rounded border border-white/5">
          <div className="text-slate-500 mb-0.5 font-bold text-[10px] uppercase">POWERED BY</div>
          <div className="text-amber-300 truncate">{server.poweredBy || "Hidden / N/A"}</div>
        </div>
      </div>
    </div>
  );
};
