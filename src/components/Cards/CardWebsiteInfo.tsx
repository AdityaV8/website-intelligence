import React from "react";
import { WebsiteInfo } from "../../types";
import { Globe, ExternalLink, ShieldCheck, Clock, Bookmark, Share2, Check } from "lucide-react";

interface Props {
  website: WebsiteInfo;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onShowToast: (msg: string) => void;
}

export const CardWebsiteInfo: React.FC<Props> = ({
  website,
  isFavorite,
  onToggleFavorite,
  onShowToast,
}) => {
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: website.title || website.domainName,
        url: website.url,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(website.url);
      onShowToast("✔ Website URL copied to clipboard");
    }
  };

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-md flex flex-col gap-3 shadow-lg hover:border-white/20 transition-all">
      {/* High Density Header */}
      <div className="flex justify-between items-center">
        <h3 className="text-xs font-bold uppercase tracking-wider text-sky-400">Website Identity</h3>
        <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-bold uppercase">
          ONLINE ({website.status})
        </span>
      </div>

      {/* Website Hero Row */}
      <div className="flex items-center gap-3 py-2 border-b border-white/5">
        <div className="w-10 h-10 rounded bg-white/10 border border-white/10 flex items-center justify-center overflow-hidden shrink-0">
          {website.favicon ? (
            <img
              src={website.favicon}
              alt="Favicon"
              className="w-6 h-6 object-contain"
              onError={(e) => {
                (e.target as HTMLElement).style.display = "none";
              }}
            />
          ) : (
            <Globe className="w-5 h-5 text-sky-400" />
          )}
        </div>
        <div className="overflow-hidden flex-1">
          <div className="text-sm font-bold text-white truncate">{website.domainName}</div>
          <div className="text-[10px] text-slate-400 uppercase tracking-tight truncate">{website.url}</div>
        </div>

        <div className="flex items-center gap-1 shrink-0">
          <button
            onClick={onToggleFavorite}
            title={isFavorite ? "Remove from Favorites" : "Save to Favorites"}
            className={`p-1.5 rounded border transition-all text-xs ${
              isFavorite
                ? "bg-amber-500/20 border-amber-500/30 text-amber-300"
                : "bg-white/5 border-white/10 text-slate-400 hover:text-white"
            }`}
          >
            <Bookmark className={`w-3.5 h-3.5 ${isFavorite ? "fill-amber-400" : ""}`} />
          </button>
          <button
            onClick={handleShare}
            title="Share Website"
            className="p-1.5 rounded bg-white/5 border border-white/10 text-slate-400 hover:text-white transition-all text-xs"
          >
            <Share2 className="w-3.5 h-3.5" />
          </button>
          <a
            href={website.url}
            target="_blank"
            rel="noopener noreferrer"
            title="Open Website"
            className="p-1.5 rounded bg-sky-500/20 border border-sky-500/30 text-sky-300 hover:bg-sky-500/30 transition-all text-xs"
          >
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Grid Properties */}
      <div className="space-y-2 text-xs">
        <div className="flex justify-between items-center p-2 bg-slate-950/40 rounded border border-white/5">
          <span className="text-slate-400">Title</span>
          <span className="text-slate-200 truncate ml-4 max-w-[180px]">{website.title || "N/A"}</span>
        </div>
        <div className="flex justify-between items-center p-2 bg-slate-950/40 rounded border border-white/5">
          <span className="text-slate-400">Response</span>
          <span className="font-mono text-sky-300 font-semibold">{website.responseTimeMs} ms</span>
        </div>
        <div className="flex justify-between items-center p-2 bg-slate-950/40 rounded border border-white/5">
          <span className="text-slate-400">HTTPS Protocol</span>
          <span className="font-semibold text-emerald-400 flex items-center gap-1 text-[11px]">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            {website.httpsEnabled ? "TLS Encrypted" : "Plain HTTP"}
          </span>
        </div>
      </div>
    </div>
  );
};
