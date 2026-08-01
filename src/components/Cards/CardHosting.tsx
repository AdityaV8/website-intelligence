import React from "react";
import { HostingInfo } from "../../types";
import { MapPin, Compass, Clock, Navigation } from "lucide-react";

interface Props {
  hosting: HostingInfo;
}

export const CardHosting: React.FC<Props> = ({ hosting }) => {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-md flex flex-col gap-3 shadow-lg hover:border-white/20 transition-all">
      {/* High Density Header */}
      <div className="flex justify-between items-center">
        <h3 className="text-xs font-bold uppercase tracking-wider text-sky-400">Hosting Location</h3>
        <span className="px-2 py-0.5 rounded text-[10px] bg-sky-500/10 text-sky-300 border border-sky-500/30 font-semibold font-mono flex items-center gap-1">
          <span>{hosting.flag || "🌐"}</span>
          <span>{hosting.countryCode || "INT"}</span>
        </span>
      </div>

      {/* Infrastructure Details matching Design HTML */}
      <div className="space-y-2 text-xs">
        <div className="p-2.5 bg-slate-950/40 rounded border border-white/5">
          <div className="text-[10px] uppercase text-slate-500 font-bold mb-0.5">LOCATION</div>
          <div className="text-sm text-white font-semibold flex items-center gap-1.5">
            <span>{hosting.flag || "🌐"}</span> {hosting.country}
          </div>
          <div className="text-xs text-slate-400">{hosting.city}, {hosting.region}</div>
        </div>

        <div className="flex justify-between items-center p-2 bg-slate-950/40 rounded border border-white/5 font-mono text-[11px]">
          <span className="text-slate-400">Coordinates</span>
          <span className="text-sky-300">{hosting.latitude.toFixed(4)}° N, {hosting.longitude.toFixed(4)}° W</span>
        </div>

        <div className="flex justify-between items-center p-2 bg-slate-950/40 rounded border border-white/5 text-[11px]">
          <span className="text-slate-400">Timezone / Postal</span>
          <span className="text-slate-200">{hosting.timezone} ({hosting.postalCode})</span>
        </div>
      </div>
    </div>
  );
};
