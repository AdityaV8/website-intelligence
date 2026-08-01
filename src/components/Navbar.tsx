import React from "react";
import { Globe, ShieldAlert, History, Bookmark, Info, Sparkles, Sun, Moon } from "lucide-react";

interface NavbarProps {
  activeTab: "lookup" | "history" | "favorites" | "about";
  setActiveTab: (tab: "lookup" | "history" | "favorites" | "about") => void;
  historyCount: number;
  favoritesCount: number;
  isLightMode: boolean;
  setIsLightMode: (val: boolean) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  historyCount,
  favoritesCount,
  isLightMode,
  setIsLightMode,
}) => {
  return (
    <header className={`sticky top-0 z-40 h-14 backdrop-blur-md border-b relative z-10 transition-all duration-300 ${
      isLightMode
        ? "bg-white/80 border-slate-200 text-slate-900 shadow-sm"
        : "bg-[#020617]/80 border-white/10 text-slate-100"
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
        {/* Brand Logo */}
        <div
          onClick={() => setActiveTab("lookup")}
          className="flex items-center gap-2 cursor-pointer group"
        >
          <div className="w-8 h-8 bg-sky-500 rounded flex items-center justify-center font-bold text-slate-950 shadow-md shadow-sky-500/20 group-hover:bg-sky-400 transition-colors">
            WI
          </div>
          <span className={`text-lg font-semibold tracking-tight ${isLightMode ? "text-slate-900" : "text-white"}`}>
            Website <span className="text-sky-500">Intelligence</span>
          </span>
          <span className="hidden sm:inline-block ml-2 text-[10px] uppercase font-bold tracking-widest text-sky-500 bg-sky-500/10 px-2 py-0.5 rounded border border-sky-500/30">
            PRO
          </span>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center gap-2 sm:gap-4 md:gap-6 text-xs sm:text-sm font-medium">
          <button
            onClick={() => setActiveTab("lookup")}
            className={`flex items-center gap-1 sm:gap-1.5 px-2 py-1 rounded-lg transition-colors ${
              activeTab === "lookup"
                ? "text-sky-500 font-semibold bg-sky-500/10"
                : isLightMode
                ? "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                : "text-slate-400 hover:text-white hover:bg-white/5"
            }`}
            title="Lookup"
          >
            <Globe className="w-4 h-4 shrink-0" />
            <span className="hidden xs:inline sm:inline">Lookup</span>
          </button>

          <button
            onClick={() => setActiveTab("history")}
            className={`flex items-center gap-1 sm:gap-1.5 px-2 py-1 rounded-lg transition-colors relative ${
              activeTab === "history"
                ? "text-sky-500 font-semibold bg-sky-500/10"
                : isLightMode
                ? "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                : "text-slate-400 hover:text-white hover:bg-white/5"
            }`}
            title="History"
          >
            <History className="w-4 h-4 shrink-0" />
            <span className="hidden xs:inline sm:inline">History</span>
            {historyCount > 0 && (
              <span className="bg-sky-500/20 text-sky-600 dark:text-sky-300 text-[10px] font-bold px-1.5 py-0.2 rounded border border-sky-500/30">
                {historyCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab("favorites")}
            className={`flex items-center gap-1 sm:gap-1.5 px-2 py-1 rounded-lg transition-colors relative ${
              activeTab === "favorites"
                ? "text-sky-500 font-semibold bg-sky-500/10"
                : isLightMode
                ? "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                : "text-slate-400 hover:text-white hover:bg-white/5"
            }`}
            title="Favorites"
          >
            <Bookmark className="w-4 h-4 shrink-0" />
            <span className="hidden xs:inline sm:inline">Favorites</span>
            {favoritesCount > 0 && (
              <span className="bg-amber-500/20 text-amber-600 dark:text-amber-300 text-[10px] font-bold px-1.5 py-0.2 rounded border border-amber-500/30">
                {favoritesCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab("about")}
            className={`flex items-center gap-1 sm:gap-1.5 px-2 py-1 rounded-lg transition-colors ${
              activeTab === "about"
                ? "text-sky-500 font-semibold bg-sky-500/10"
                : isLightMode
                ? "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                : "text-slate-400 hover:text-white hover:bg-white/5"
            }`}
            title="About"
          >
            <Info className="w-4 h-4 shrink-0" />
            <span className="hidden xs:inline sm:inline">About</span>
          </button>

          <div className={`w-px h-4 hidden sm:block ${isLightMode ? "bg-slate-200" : "bg-white/10"}`} />

          {/* Theme Toggle */}
          <button
            onClick={() => setIsLightMode(!isLightMode)}
            title={isLightMode ? "Switch to Dark Mode" : "Switch to Light Mode"}
            className={`p-1.5 rounded-lg border transition-all flex items-center justify-center shrink-0 ${
              isLightMode
                ? "bg-slate-100 border-slate-300 text-slate-700 hover:bg-slate-200 hover:text-slate-900"
                : "bg-white/5 border-white/10 text-slate-300 hover:text-white hover:bg-white/10"
            }`}
          >
            {isLightMode ? <Sun className="w-4 h-4 text-amber-500" /> : <Moon className="w-4 h-4 text-sky-400" />}
          </button>
        </nav>
      </div>
    </header>
  );
};
