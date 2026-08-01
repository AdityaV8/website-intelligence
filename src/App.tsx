import React, { useState, useEffect } from "react";
import { LookupData, HistoryItem, AiSecurityAudit } from "./types";
import { NetworkBackground } from "./components/NetworkBackground";
import { Navbar } from "./components/Navbar";
import { SearchSection } from "./components/SearchSection";
import { Toast } from "./components/Toast";
import { WhoisModal } from "./components/WhoisModal";
import { HistoryAndFavorites } from "./components/HistoryAndFavorites";
import { AboutSection } from "./components/AboutSection";
import { Footer } from "./components/Footer";
import { ErrorCard } from "./components/ErrorCard";

// Cards
import { CardWebsiteInfo } from "./components/Cards/CardWebsiteInfo";
import { CardDnsInfo } from "./components/Cards/CardDnsInfo";
import { CardIpAddress } from "./components/Cards/CardIpAddress";
import { CardHosting } from "./components/Cards/CardHosting";
import { CardIspDetails } from "./components/Cards/CardIspDetails";
import { CardServerInfo } from "./components/Cards/CardServerInfo";
import { CardSecurityInfo } from "./components/Cards/CardSecurityInfo";
import { CardWhoisInfo } from "./components/Cards/CardWhoisInfo";
import { CardGeolocationMap } from "./components/Cards/CardGeolocationMap";
import { CardNetworkStats } from "./components/Cards/CardNetworkStats";
import { CardAiSecurityAudit } from "./components/Cards/CardAiSecurityAudit";

// Export Utilities
import { downloadJson, downloadCsv, printPdfReport, copyFormattedMarkdown } from "./utils/exportUtils";
import { FileText, Download, Share2, Copy, Sparkles, RefreshCw, Bookmark } from "lucide-react";

export default function App() {
  const [activeTab, setActiveTab] = useState<"lookup" | "history" | "favorites" | "about">("lookup");
  const [lookupData, setLookupData] = useState<LookupData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [searchedDomain, setSearchedDomain] = useState<string>("");
  const [isWhoisModalOpen, setIsWhoisModalOpen] = useState<boolean>(false);

  // Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastType, setToastType] = useState<"success" | "error" | "info">("success");

  // Theme
  const [isLightMode, setIsLightMode] = useState<boolean>(() => {
    try {
      return localStorage.getItem("wi_theme") === "light";
    } catch {
      return false;
    }
  });

  useEffect(() => {
    if (isLightMode) {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
      localStorage.setItem("wi_theme", "light");
    } else {
      document.documentElement.classList.remove("light");
      document.documentElement.classList.add("dark");
      localStorage.setItem("wi_theme", "dark");
    }
  }, [isLightMode]);

  // History and Favorites from LocalStorage
  const [history, setHistory] = useState<HistoryItem[]>(() => {
    try {
      const saved = localStorage.getItem("wi_history");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [favorites, setFavorites] = useState<HistoryItem[]>(() => {
    try {
      const saved = localStorage.getItem("wi_favorites");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Save to LocalStorage
  useEffect(() => {
    localStorage.setItem("wi_history", JSON.stringify(history));
  }, [history]);

  useEffect(() => {
    localStorage.setItem("wi_favorites", JSON.stringify(favorites));
  }, [favorites]);

  const showToast = (msg: string, type: "success" | "error" | "info" = "success") => {
    setToastMessage(msg);
    setToastType(type);
  };

  // Perform Domain Lookup
  const handleSearch = async (domain: string) => {
    if (!domain.trim()) return;
    setIsLoading(true);
    setError(null);
    setSearchedDomain(domain);
    setActiveTab("lookup");

    try {
      const res = await fetch(`/api/lookup?domain=${encodeURIComponent(domain)}`);
      const json = await res.json();

      if (!res.ok || json.error) {
        throw new Error(json.error || "Failed to fetch domain intelligence.");
      }

      setLookupData(json);

      // Add to history
      const isFav = favorites.some((f) => f.domain.toLowerCase() === json.domain.toLowerCase());
      const newHistoryItem: HistoryItem = {
        id: `${json.domain}-${Date.now()}`,
        domain: json.domain,
        timestamp: json.searchTimestamp,
        status: json.website.status,
        ip: json.ip.ipv4 !== "N/A" ? json.ip.ipv4 : json.ip.ipv6,
        favicon: json.website.favicon,
        isFavorite: isFav,
        data: json,
      };

      setHistory((prev) => [
        newHistoryItem,
        ...prev.filter((h) => h.domain.toLowerCase() !== json.domain.toLowerCase()),
      ].slice(0, 30));

      showToast(`✔ Successfully fetched intelligence for ${json.domain}`);
    } catch (err: any) {
      console.error("Search Error:", err);
      setError(err.message || "Target domain unreachable or invalid.");
      setLookupData(null);
      showToast(`⚠ Lookup Failed: ${err.message}`, "error");
    } finally {
      setIsLoading(false);
    }
  };

  // Initial lookup on load for demo domain if empty
  useEffect(() => {
    if (!lookupData && !error && !isLoading) {
      handleSearch("google.com");
    }
  }, []);

  // Favorite toggle handler
  const handleToggleFavorite = () => {
    if (!lookupData) return;
    const existing = favorites.find((f) => f.domain.toLowerCase() === lookupData.domain.toLowerCase());

    if (existing) {
      setFavorites((prev) => prev.filter((f) => f.domain.toLowerCase() !== lookupData.domain.toLowerCase()));
      showToast(`Removed ${lookupData.domain} from favorites`, "info");
    } else {
      const favItem: HistoryItem = {
        id: `fav-${lookupData.domain}-${Date.now()}`,
        domain: lookupData.domain,
        timestamp: new Date().toISOString(),
        status: lookupData.website.status,
        ip: lookupData.ip.ipv4,
        favicon: lookupData.website.favicon,
        isFavorite: true,
        data: lookupData,
      };
      setFavorites((prev) => [favItem, ...prev]);
      showToast(`✔ Added ${lookupData.domain} to favorites`);
    }
  };

  // Toggle favorite by ID in history list
  const handleToggleFavoriteById = (id: string) => {
    const item = history.find((h) => h.id === id) || favorites.find((f) => f.id === id);
    if (!item) return;

    const isFav = favorites.some((f) => f.domain.toLowerCase() === item.domain.toLowerCase());
    if (isFav) {
      setFavorites((prev) => prev.filter((f) => f.domain.toLowerCase() !== item.domain.toLowerCase()));
      showToast(`Removed ${item.domain} from favorites`, "info");
    } else {
      setFavorites((prev) => [{ ...item, isFavorite: true }, ...prev]);
      showToast(`✔ Saved ${item.domain} to favorites`);
    }
  };

  const isCurrentFavorite = lookupData
    ? favorites.some((f) => f.domain.toLowerCase() === lookupData.domain.toLowerCase())
    : false;

  return (
    <div className={`min-h-screen relative flex flex-col transition-colors duration-300 ${isLightMode ? "bg-slate-50 text-slate-900 light" : "bg-[#020617] text-slate-100 dark"}`}>
      {/* Animated Background Mesh */}
      <NetworkBackground isLightMode={isLightMode} />

      {/* Top Glass Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        historyCount={history.length}
        favoritesCount={favorites.length}
        isLightMode={isLightMode}
        setIsLightMode={setIsLightMode}
      />

      {/* Main Content Area */}
      <main className="flex-1 relative z-10">
        {/* Search Input Hero Section */}
        <SearchSection onSearch={handleSearch} isLoading={isLoading} />

        {/* Tab Switcher Content */}
        {activeTab === "lookup" && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
            {/* Loading Skeleton state */}
            {isLoading && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse mt-8">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="h-64 rounded-2xl bg-white/5 border border-white/10" />
                ))}
              </div>
            )}

            {/* Error State */}
            {!isLoading && error && (
              <ErrorCard
                domain={searchedDomain}
                errorMessage={error}
                onRetry={() => handleSearch(searchedDomain)}
              />
            )}

            {/* Success Results Dashboard */}
            {!isLoading && lookupData && (
              <div className="space-y-6 animate-fade-in">
                {/* Control Action Bar */}
                <div className="p-3 sm:p-3.5 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <span className="font-mono text-sky-400 font-bold text-sm sm:text-base">
                      {lookupData.domain}
                    </span>
                    <span className="text-xs text-slate-400 border-l border-white/10 pl-2.5">
                      Resolved in <span className="text-slate-200 font-mono">{lookupData.networkStats.totalLookupTimeMs} ms</span>
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-xs font-semibold w-full sm:w-auto">
                    <button
                      onClick={() => printPdfReport(lookupData)}
                      className="px-2.5 py-1.5 rounded-lg bg-sky-500/20 hover:bg-sky-500/30 border border-sky-500/30 text-sky-300 transition-all flex items-center gap-1.5"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>PDF</span>
                    </button>

                    <button
                      onClick={() => downloadJson(lookupData)}
                      className="px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 transition-all flex items-center gap-1.5"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>JSON</span>
                    </button>

                    <button
                      onClick={() => downloadCsv(lookupData)}
                      className="px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 transition-all flex items-center gap-1.5"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>CSV</span>
                    </button>

                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(copyFormattedMarkdown(lookupData));
                        showToast("✔ Formatted Markdown summary copied!");
                      }}
                      className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 transition-all flex items-center gap-1.5"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Copy All</span>
                      <span className="sm:hidden">Copy</span>
                    </button>

                    <button
                      onClick={handleToggleFavorite}
                      className={`px-2.5 py-1.5 rounded-lg border transition-all flex items-center gap-1.5 ${
                        isCurrentFavorite
                          ? "bg-amber-500/20 border-amber-500/40 text-amber-300"
                          : "bg-slate-800 border-slate-700 text-slate-300 hover:text-white"
                      }`}
                    >
                      <Bookmark className={`w-3.5 h-3.5 ${isCurrentFavorite ? "fill-amber-400" : ""}`} />
                      <span>{isCurrentFavorite ? "Saved" : "Save"}</span>
                    </button>
                  </div>
                </div>

                {/* Grid Dashboard - 10 Glassmorphism Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Card 1: Website Info */}
                  <CardWebsiteInfo
                    website={lookupData.website}
                    isFavorite={isCurrentFavorite}
                    onToggleFavorite={handleToggleFavorite}
                    onShowToast={showToast}
                  />

                  {/* Card 2: DNS Info */}
                  <CardDnsInfo dns={lookupData.dns} onShowToast={showToast} />

                  {/* Card 3: IP Address */}
                  <CardIpAddress ip={lookupData.ip} onShowToast={showToast} />

                  {/* Card 4: Hosting Info */}
                  <CardHosting hosting={lookupData.hosting} />

                  {/* Card 5: ISP Details */}
                  <CardIspDetails isp={lookupData.isp} />

                  {/* Card 6: Server Info */}
                  <CardServerInfo server={lookupData.server} />

                  {/* Card 7: Security & SSL */}
                  <CardSecurityInfo security={lookupData.security} />

                  {/* Card 8: WHOIS */}
                  <CardWhoisInfo
                    whois={lookupData.whois}
                    onOpenModal={() => setIsWhoisModalOpen(true)}
                  />

                  {/* Card 9: Geolocation Map */}
                  <CardGeolocationMap hosting={lookupData.hosting} domain={lookupData.domain} />

                  {/* Card 10: Network Stats */}
                  <CardNetworkStats stats={lookupData.networkStats} />

                  {/* Card 11: AI Gemini Security Posture */}
                  <div className="md:col-span-2 lg:col-span-2">
                    <CardAiSecurityAudit data={lookupData} />
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Search History & Favorites Tab Views */}
        {(activeTab === "history" || activeTab === "favorites") && (
          <HistoryAndFavorites
            history={history}
            favorites={favorites}
            activeView={activeTab}
            onSelectDomain={handleSearch}
            onClearHistory={() => {
              setHistory([]);
              showToast("Search history cleared", "info");
            }}
            onToggleFavorite={handleToggleFavoriteById}
          />
        )}

        {/* About View */}
        {activeTab === "about" && <AboutSection />}
      </main>

      {/* WHOIS Modal */}
      {lookupData && (
        <WhoisModal
          whois={lookupData.whois}
          domain={lookupData.domain}
          isOpen={isWhoisModalOpen}
          onClose={() => setIsWhoisModalOpen(false)}
          onShowToast={showToast}
        />
      )}

      {/* Toast Notification */}
      {toastMessage && (
        <Toast
          message={toastMessage}
          type={toastType}
          onClose={() => setToastMessage(null)}
        />
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
}
