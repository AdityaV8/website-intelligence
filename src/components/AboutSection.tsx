import React from "react";
import { Globe, ShieldCheck, Cpu, Database, Server, Terminal, Zap, Lock } from "lucide-react";

export const AboutSection: React.FC = () => {
  return (
    <div className="w-full max-w-4xl mx-auto my-8 px-4">
      <div className="p-6 sm:p-10 rounded-3xl bg-slate-900/50 backdrop-blur-2xl border border-cyan-500/30 shadow-2xl shadow-cyan-950/40 text-slate-200">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-4">
            <Globe className="w-4 h-4" /> Next-Gen Network Intelligence
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
            About Website Intelligence
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
            A commercial-grade cybersecurity and domain analysis platform designed for IT administrators, DevOps engineers, and security researchers.
          </p>
        </div>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs mb-10">
          <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800/80">
            <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 w-fit mb-3">
              <Server className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-white mb-1">Google & Cloudflare DoH</h3>
            <p className="text-slate-400 leading-relaxed">
              Fetches A, AAAA, MX, NS, TXT, and CNAME records directly via Google DNS over HTTPS and Cloudflare DoH endpoints.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800/80">
            <div className="p-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 w-fit mb-3">
              <Lock className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-white mb-1">TLS / SSL Deep Inspection</h3>
            <p className="text-slate-400 leading-relaxed">
              Connects directly to port 443 with SNI to parse certificate issuer, validity days remaining, SANs, and cipher suite bits.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800/80">
            <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-400 w-fit mb-3">
              <Globe className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-white mb-1">IP Geolocation & Leaflet Maps</h3>
            <p className="text-slate-400 leading-relaxed">
              Pinpoints physical hosting location, country flag, city, region, ISP, and ASN with an interactive Leaflet map canvas.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800/80">
            <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 w-fit mb-3">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-white mb-1">Gemini AI Threat Analysis</h3>
            <p className="text-slate-400 leading-relaxed">
              Evaluates domain security health, missing HTTP security headers (HSTS, CSP), and provides actionable hardening advice.
            </p>
          </div>
        </div>

        {/* Export & Utility Badges */}
        <div className="p-6 rounded-2xl bg-slate-950/80 border border-slate-800/80 text-center">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest block mb-3">
            Supported Export Formats & Integrations
          </span>
          <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono font-semibold">
            <span className="px-3 py-1 rounded-lg bg-cyan-950 text-cyan-300 border border-cyan-500/30">
              PDF Intelligence Report
            </span>
            <span className="px-3 py-1 rounded-lg bg-indigo-950 text-indigo-300 border border-indigo-500/30">
              Raw JSON Export
            </span>
            <span className="px-3 py-1 rounded-lg bg-purple-950 text-purple-300 border border-purple-500/30">
              CSV Spreadsheet
            </span>
            <span className="px-3 py-1 rounded-lg bg-emerald-950 text-emerald-300 border border-emerald-500/30">
              Markdown Copy
            </span>
            <span className="px-3 py-1 rounded-lg bg-amber-950 text-amber-300 border border-amber-500/30">
              RDAP WHOIS Modal
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
