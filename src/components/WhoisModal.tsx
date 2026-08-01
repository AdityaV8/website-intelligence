import React, { useState } from "react";
import { WhoisInfo } from "../types";
import { X, Shield, Calendar, Globe, Copy, Check, Search, ExternalLink } from "lucide-react";

interface Props {
  whois: WhoisInfo;
  domain: string;
  isOpen: boolean;
  onClose: () => void;
  onShowToast: (msg: string) => void;
}

export const WhoisModal: React.FC<Props> = ({ whois, domain, isOpen, onClose, onShowToast }) => {
  const [copied, setCopied] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  if (!isOpen) return null;

  const handleCopy = () => {
    const text = `WHOIS Report for ${domain}
Registrar: ${whois.registrar}
Registrar URL: ${whois.registrarUrl}
Created Date: ${whois.creationDate}
Updated Date: ${whois.updatedDate}
Expiry Date: ${whois.expiryDate}
Registrant Country: ${whois.registrantCountry}
Domain Status: ${whois.domainStatus}
DNSSEC: ${whois.dnssec}
Nameservers: ${whois.nameservers.join(", ") || "N/A"}
`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    onShowToast("✔ WHOIS details copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };

  const fields = [
    { label: "Domain Name", value: domain },
    { label: "Registrar Name", value: whois.registrar },
    { label: "Registrar URL", value: whois.registrarUrl, isLink: true },
    { label: "Creation Date", value: whois.creationDate },
    { label: "Updated Date", value: whois.updatedDate },
    { label: "Expiration Date", value: whois.expiryDate },
    { label: "Registrant Country", value: whois.registrantCountry },
    { label: "Domain Status", value: whois.domainStatus },
    { label: "DNSSEC Status", value: whois.dnssec },
    { label: "Registry RDAP Handle", value: whois.handle },
  ];

  const filteredFields = fields.filter(
    (f) =>
      f.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
      String(f.value).toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-2xl max-h-[90vh] sm:max-h-[85vh] rounded-2xl sm:rounded-3xl bg-[#081225]/95 border border-cyan-500/40 shadow-2xl shadow-cyan-950/80 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="p-2 sm:p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
              <Shield className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <h2 className="text-base sm:text-xl font-bold text-white tracking-tight">
                WHOIS & RDAP Inspection
              </h2>
              <p className="text-[11px] sm:text-xs text-slate-400 font-mono truncate max-w-[200px] sm:max-w-none">{domain}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 sm:p-2 rounded-xl bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Filter & Copy Bar */}
        <div className="p-4 bg-slate-900/60 border-b border-slate-800/80 flex items-center justify-between gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search WHOIS fields..."
              className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-slate-950/80 border border-slate-700/60 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
            />
          </div>

          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/40 text-cyan-300 text-xs font-semibold transition-all shrink-0"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copy Report</span>
              </>
            )}
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {filteredFields.map((field, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80"
              >
                <span className="text-slate-400 font-medium block mb-1">
                  {field.label}
                </span>
                {field.isLink && field.value !== "N/A" ? (
                  <a
                    href={String(field.value).startsWith("http") ? String(field.value) : `https://${field.value}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-cyan-400 hover:underline flex items-center gap-1 truncate"
                  >
                    <span>{String(field.value)}</span>
                    <ExternalLink className="w-3 h-3 shrink-0" />
                  </a>
                ) : (
                  <span className="font-mono text-white font-semibold block truncate">
                    {String(field.value) || "N/A"}
                  </span>
                )}
              </div>
            ))}
          </div>

          {/* Name Servers */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/80">
            <span className="text-slate-400 font-semibold mb-2 block flex items-center gap-1.5">
              <Globe className="w-4 h-4 text-cyan-400" /> Delegated Name Servers
            </span>
            {whois.nameservers && whois.nameservers.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {whois.nameservers.map((ns, i) => (
                  <div
                    key={i}
                    className="p-2 rounded bg-slate-900 font-mono text-cyan-300 text-[11px]"
                  >
                    {ns}
                  </div>
                ))}
              </div>
            ) : (
              <span className="text-slate-500 italic">No custom name servers listed.</span>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/80 text-center text-[11px] text-slate-500">
          RDAP / WHOIS Data synchronized from accredited registrars.
        </div>
      </div>
    </div>
  );
};
