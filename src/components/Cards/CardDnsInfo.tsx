import React, { useState } from "react";
import { DnsInfo, DnsRecord } from "../../types";
import { Server, Copy, Check, Filter } from "lucide-react";

interface Props {
  dns: DnsInfo;
  onShowToast: (msg: string) => void;
}

type RecordType = "ALL" | "A" | "AAAA" | "MX" | "NS" | "TXT" | "CNAME";

export const CardDnsInfo: React.FC<Props> = ({ dns, onShowToast }) => {
  const [activeFilter, setActiveFilter] = useState<RecordType>("ALL");
  const [copiedIndex, setCopiedIndex] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(id);
    onShowToast(`✔ Copied DNS record: ${text}`);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const allRecords: DnsRecord[] = [
    ...dns.a,
    ...dns.aaaa,
    ...dns.mx,
    ...dns.ns,
    ...dns.txt,
    ...dns.cname,
  ];

  const filteredRecords = activeFilter === "ALL"
    ? allRecords
    : allRecords.filter((r) => r.type === activeFilter);

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-md flex flex-col gap-3 shadow-lg hover:border-white/20 transition-all">
      {/* High Density Header */}
      <div className="flex justify-between items-center">
        <h3 className="text-xs font-bold uppercase tracking-wider text-sky-400">DNS Records</h3>
        <span className="text-[10px] font-mono text-slate-400">
          {allRecords.length} records
        </span>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-1 border-b border-white/5 pb-2">
        {(["ALL", "A", "AAAA", "MX", "NS", "TXT", "CNAME"] as RecordType[]).map((type) => (
          <button
            key={type}
            onClick={() => setActiveFilter(type)}
            className={`px-2 py-0.5 rounded text-[10px] font-semibold font-mono transition-all ${
              activeFilter === type
                ? "bg-sky-500/20 text-sky-300 border border-sky-500/40"
                : "bg-white/5 text-slate-400 hover:text-white border border-white/5"
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Records List matching Design HTML */}
      <div className="space-y-1.5 overflow-y-auto max-h-60 pr-1">
        {filteredRecords.length === 0 ? (
          <div className="text-center py-6 text-slate-500 text-xs">
            No public {activeFilter} records detected.
          </div>
        ) : (
          filteredRecords.map((record, idx) => {
            const id = `${record.type}-${idx}`;
            const badgeColor =
              record.type === "A"
                ? "text-sky-500"
                : record.type === "AAAA"
                ? "text-sky-400"
                : record.type === "MX"
                ? "text-indigo-400"
                : record.type === "NS"
                ? "text-cyan-400"
                : "text-slate-400";

            return (
              <div
                key={id}
                className="flex items-center justify-between gap-2 p-2 bg-slate-950/40 rounded border border-white/5 hover:border-white/10 text-xs transition-colors"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span className={`w-8 text-[10px] font-bold font-mono shrink-0 ${badgeColor}`}>
                    {record.type}
                  </span>
                  <span className="text-xs font-mono text-slate-200 truncate" title={record.data}>
                    {record.data}
                  </span>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-[9px] font-mono text-slate-500 hidden sm:inline">TTL: {record.TTL}s</span>
                  <button
                    onClick={() => handleCopy(record.data, id)}
                    title="Copy record value"
                    className="p-1 rounded bg-white/5 text-slate-400 hover:text-sky-300 hover:bg-white/10 transition-colors"
                  >
                    {copiedIndex === id ? (
                      <Check className="w-3 h-3 text-emerald-400" />
                    ) : (
                      <Copy className="w-3 h-3" />
                    )}
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
