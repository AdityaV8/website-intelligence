import React, { useState } from "react";
import { HistoryItem, LookupData } from "../types";
import { History, Bookmark, Trash2, ArrowRight, Globe, Search, Star, ExternalLink } from "lucide-react";

interface Props {
  history: HistoryItem[];
  favorites: HistoryItem[];
  onSelectDomain: (domain: string) => void;
  onClearHistory: () => void;
  onToggleFavorite: (id: string) => void;
  activeView: "history" | "favorites";
}

export const HistoryAndFavorites: React.FC<Props> = ({
  history,
  favorites,
  onSelectDomain,
  onClearHistory,
  onToggleFavorite,
  activeView,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const items = activeView === "history" ? history : favorites;
  const filtered = items.filter((item) =>
    item.domain.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full max-w-4xl mx-auto my-8 px-4">
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/50 backdrop-blur-2xl border border-cyan-500/30 shadow-2xl shadow-cyan-950/40">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
              {activeView === "history" ? <History className="w-6 h-6" /> : <Bookmark className="w-6 h-6 text-amber-400" />}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white tracking-tight">
                {activeView === "history" ? "Search History" : "Saved Favorite Domains"}
              </h2>
              <p className="text-xs text-slate-400">
                {activeView === "history"
                  ? `${history.length} previously analyzed websites recorded`
                  : `${favorites.length} bookmarked domains stored locally`}
              </p>
            </div>
          </div>

          {activeView === "history" && history.length > 0 && (
            <button
              onClick={onClearHistory}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-300 text-xs font-semibold transition-all shrink-0"
            >
              <Trash2 className="w-4 h-4" />
              <span>Clear History</span>
            </button>
          )}
        </div>

        {/* Search Bar Filter */}
        {items.length > 0 && (
          <div className="relative my-6">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={`Search ${activeView}...`}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950/80 border border-slate-700/60 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
            />
          </div>
        )}

        {/* List of Items */}
        {filtered.length === 0 ? (
          <div className="py-16 text-center text-slate-500 text-sm">
            {items.length === 0
              ? activeView === "history"
                ? "No search history recorded yet. Search for any website domain to get started!"
                : "No saved favorites yet. Click the bookmark icon on any search result to save it."
              : "No matching domains found for your search filter."}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {filtered.map((item) => (
              <div
                key={item.id}
                className="p-3.5 sm:p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 hover:border-cyan-500/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-all duration-200 group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-700/60 flex items-center justify-center shrink-0">
                    {item.favicon ? (
                      <img
                        src={item.favicon}
                        alt="Favicon"
                        className="w-5 h-5 object-contain"
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = "none";
                        }}
                      />
                    ) : (
                      <Globe className="w-4 h-4 text-cyan-400" />
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <span className="font-bold text-white text-sm block truncate group-hover:text-cyan-300 transition-colors">
                      {item.domain}
                    </span>
                    <div className="flex items-center gap-2 text-[10px] text-slate-400 flex-wrap">
                      <span>IP: {item.ip || "N/A"}</span>
                      <span>•</span>
                      <span>{new Date(item.timestamp).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-1.5 shrink-0 border-t sm:border-t-0 border-slate-800/60 pt-2 sm:pt-0">
                  <button
                    onClick={() => onToggleFavorite(item.id)}
                    title={item.isFavorite ? "Remove from Favorites" : "Add to Favorites"}
                    className={`p-2 rounded-lg border transition-all ${
                      item.isFavorite
                        ? "bg-amber-500/20 border-amber-500/40 text-amber-300"
                        : "bg-slate-900 border-slate-800 text-slate-400 hover:text-white"
                    }`}
                  >
                    <Star className={`w-3.5 h-3.5 ${item.isFavorite ? "fill-amber-400" : ""}`} />
                  </button>

                  <button
                    onClick={() => onSelectDomain(item.domain)}
                    className="p-2 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/40 text-cyan-300 text-xs font-semibold transition-all flex items-center gap-1"
                  >
                    <span>Analyze</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
