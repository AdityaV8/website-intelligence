import React, { useState } from "react";
import { Globe, Github, Shield, FileText, Heart, X } from "lucide-react";

export const Footer: React.FC = () => {
  const [activeModal, setActiveModal] = useState<"privacy" | "terms" | null>(null);

  return (
    <footer className="mt-16 border-t border-cyan-500/20 bg-[#040810]/90 backdrop-blur-xl py-10 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left Side Brand */}
        <div className="flex flex-col items-center md:items-start gap-1">
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-cyan-400" />
            <span className="font-bold text-white text-sm">Website Intelligence</span>
            <span className="text-[10px] text-cyan-400 font-mono bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-500/30">
              v2.5 PRO
            </span>
          </div>
          <p className="text-slate-500">
            Real-time DNS, WHOIS, IP Geolocation & Security Posture Analysis Engine.
          </p>
        </div>

        {/* Center Links */}
        <div className="flex items-center gap-6">
          <button
            onClick={() => setActiveModal("privacy")}
            className="hover:text-cyan-300 transition-colors"
          >
            Privacy Policy
          </button>
          <button
            onClick={() => setActiveModal("terms")}
            className="hover:text-cyan-300 transition-colors"
          >
            Terms of Service
          </button>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors flex items-center gap-1"
          >
            <Github className="w-4 h-4" />
            <span>GitHub Repository</span>
          </a>
        </div>

        {/* Right Side Developer Credit */}
        <div className="text-slate-500 text-center md:text-right space-y-1">
          <p>
            Developed by <span className="text-cyan-400 font-semibold">Aditya Narayana Panda</span>
          </p>
          <p>
            © {new Date().getFullYear()} Website Intelligence. Built for Cybersecurity & Network Operations.
          </p>
        </div>
      </div>

      {/* Privacy Policy & Terms Modal */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-lg rounded-2xl bg-[#081225] border border-cyan-500/40 p-6 shadow-2xl text-slate-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <h3 className="text-base font-bold text-white">
                {activeModal === "privacy" ? "Privacy Policy" : "Terms of Service"}
              </h3>
              <button
                onClick={() => setActiveModal(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="py-4 space-y-3 text-xs leading-relaxed text-slate-300">
              {activeModal === "privacy" ? (
                <>
                  <p>
                    Website Intelligence respects user privacy. All DNS and website lookups are performed on publicly accessible domain records.
                  </p>
                  <p>
                    We do not store private credentials, personal identifiers, or track browsing activity. Search histories and bookmarks are preserved strictly inside your browser local storage.
                  </p>
                </>
              ) : (
                <>
                  <p>
                    Website Intelligence provides DNS, WHOIS, IP Geolocation, and SSL inspection tools for legitimate network administration, cybersecurity research, and web diagnostics.
                  </p>
                  <p>
                    Users must comply with applicable network usage policies and public API rate limits.
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};
