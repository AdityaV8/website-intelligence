import React, { useState } from "react";
import { Search, Loader2, Sparkles, ArrowRight, ShieldCheck } from "lucide-react";

interface SearchSectionProps {
  onSearch: (domain: string) => void;
  isLoading: boolean;
}

const SAMPLE_DOMAINS = ["google.com", "github.com", "cloudflare.com", "wikipedia.org", "openai.com"];

export const SearchSection: React.FC<SearchSectionProps> = ({ onSearch, isLoading }) => {
  const [inputValue, setInputValue] = useState("");
  const [inputError, setInputError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = inputValue.trim();
    if (!trimmed) {
      setInputError("Please enter a domain name or URL (e.g. google.com)");
      return;
    }
    setInputError("");
    onSearch(trimmed);
  };

  const handleQuickClick = (domain: string) => {
    setInputValue(domain);
    setInputError("");
    onSearch(domain);
  };

  return (
    <section className="w-full max-w-4xl mx-auto my-6 px-4">
      <div className="relative text-center mb-5">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-300 text-xs font-semibold uppercase tracking-wider mb-2">
          <ShieldCheck className="w-3.5 h-3.5 text-sky-400" /> Network & DNS Reconnaissance
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-1">
          Analyze Any Website or Domain
        </h1>
        <p className="text-slate-400 text-xs sm:text-sm max-w-xl mx-auto">
          Retrieve real-time DNS records, IPv4/IPv6, WHOIS, SSL certificates, server headers, and IP geolocation in seconds.
        </p>
      </div>

      {/* Search Bar Container matching High Density HTML */}
      <div className="w-full max-w-2xl mx-auto relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-sky-500 to-indigo-600 rounded-xl blur opacity-25 group-hover:opacity-40 transition pointer-events-none" />
        <form onSubmit={handleSubmit} className="relative flex flex-col sm:flex-row items-stretch sm:items-center bg-slate-900/90 border border-white/20 rounded-xl p-2 sm:px-4 sm:py-2.5 backdrop-blur-xl shadow-xl gap-2 sm:gap-0">
          <div className="flex items-center flex-1 px-2 py-1">
            <Search className="w-5 h-5 text-sky-400 mr-2.5 shrink-0" />
            <input
              type="text"
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value);
                if (inputError) setInputError("");
              }}
              placeholder="Enter Website URL (e.g. google.com)"
              disabled={isLoading}
              className="bg-transparent border-none outline-none w-full text-white placeholder-slate-500 font-medium text-sm sm:text-base py-0.5"
            />
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-2 shrink-0 border-t sm:border-t-0 border-slate-800/80 pt-2 sm:pt-0">
            <span className="hidden md:inline-block text-[11px] text-slate-400 bg-slate-800/80 px-2 py-1 rounded font-mono border border-slate-700/50">
              HTTPS Detected
            </span>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full sm:w-auto bg-sky-500 hover:bg-sky-400 text-slate-950 px-5 py-2.5 sm:py-2 rounded-lg font-extrabold text-xs tracking-wider uppercase transition-all shadow-lg shadow-sky-500/20 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-1.5"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>ANALYZING...</span>
                </>
              ) : (
                <span>ANALYZE</span>
              )}
            </button>
          </div>
        </form>

        {inputError && (
          <p className="text-rose-400 text-xs font-medium text-left mt-2 pl-2">
            ⚠ {inputError}
          </p>
        )}
      </div>

      {/* Quick Sample Domain Chips */}
      <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs text-slate-400">
        <span className="font-semibold text-slate-500 uppercase tracking-wider text-[10px]">Popular:</span>
        {SAMPLE_DOMAINS.map((domain) => (
          <button
            key={domain}
            onClick={() => handleQuickClick(domain)}
            disabled={isLoading}
            className="px-2 py-0.5 rounded bg-white/5 border border-white/10 hover:border-sky-400/50 hover:text-sky-300 hover:bg-white/10 transition-all font-mono text-xs"
          >
            {domain}
          </button>
        ))}
      </div>
    </section>
  );
};
