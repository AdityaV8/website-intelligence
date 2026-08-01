import React from "react";
import { WhoisInfo } from "../../types";
import { FileText, Calendar, Shield, ExternalLink, ArrowRight } from "lucide-react";

interface Props {
  whois: WhoisInfo;
  onOpenModal: () => void;
}

export const CardWhoisInfo: React.FC<Props> = ({ whois, onOpenModal }) => {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-md flex flex-col justify-between gap-3 shadow-lg hover:border-white/20 transition-all">
      {/* High Density Header */}
      <div className="flex justify-between items-center">
        <h3 className="text-xs font-bold uppercase tracking-wider text-sky-400">WHOIS Registration</h3>
        <span className="text-[10px] font-mono text-slate-400 truncate max-w-[120px]">
          {whois.registrar}
        </span>
      </div>

      {/* Grid summary matching Design HTML */}
      <div className="grid grid-cols-2 gap-2 text-xs">
        <div className="p-2 bg-slate-950/40 rounded border border-white/5">
          <div className="text-slate-500 mb-0.5 font-bold text-[10px] uppercase">CREATION DATE</div>
          <div className="text-slate-200 font-mono text-[11px]">{whois.creationDate}</div>
        </div>

        <div className="p-2 bg-slate-950/40 rounded border border-white/5">
          <div className="text-slate-500 mb-0.5 font-bold text-[10px] uppercase">EXPIRATION</div>
          <div className="text-sky-300 font-mono text-[11px]">{whois.expiryDate}</div>
        </div>

        <div className="p-2 bg-slate-950/40 rounded border border-white/5">
          <div className="text-slate-500 mb-0.5 font-bold text-[10px] uppercase">REGISTRAR</div>
          <div className="text-slate-200 truncate text-[11px]" title={whois.registrar}>{whois.registrar}</div>
        </div>

        <div className="p-2 bg-slate-950/40 rounded border border-white/5">
          <div className="text-slate-500 mb-0.5 font-bold text-[10px] uppercase">DNSSEC</div>
          <div className="text-emerald-400 font-semibold text-[11px]">{whois.dnssec}</div>
        </div>
      </div>

      {/* Button matching Design HTML */}
      <button
        onClick={onOpenModal}
        className="w-full py-2 px-3 rounded bg-sky-500/10 hover:bg-sky-500/20 text-sky-300 border border-sky-500/30 text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 group"
      >
        <span>Full WHOIS Directory Record</span>
        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
      </button>
    </div>
  );
};
