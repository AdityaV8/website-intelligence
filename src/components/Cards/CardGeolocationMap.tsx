import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import { HostingInfo } from "../../types";
import { MapPin, Layers, ExternalLink, Maximize2 } from "lucide-react";

interface Props {
  hosting: HostingInfo;
  domain: string;
}

export const CardGeolocationMap: React.FC<Props> = ({ hosting, domain }) => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);
  const [tileLayerType, setTileLayerType] = useState<"street" | "satellite">("street");

  const lat = hosting.latitude || 37.7749;
  const lng = hosting.longitude || -122.4194;

  // Initialize or update Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      // Create map
      const map = L.map(mapContainerRef.current, {
        center: [lat, lng],
        zoom: 10,
        zoomControl: true,
      });

      // Default OpenStreetMap Dark / Cyber styled tile
      const streetTile = L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
        {
          attribution: '&copy; <a href="https://carto.com/">CARTO</a>',
          maxZoom: 19,
        }
      );

      streetTile.addTo(map);
      mapInstanceRef.current = map;

      // Custom pulsing cyber marker icon
      const customIcon = L.divIcon({
        className: "custom-map-marker",
        html: `
          <div style="position: relative; width: 32px; height: 32px;">
            <div style="position: absolute; inset: 0; background: rgba(0, 191, 255, 0.4); border-radius: 50%; animation: ping 1.8s cubic-bezier(0, 0, 0.2, 1) infinite;"></div>
            <div style="position: absolute; inset: 4px; background: #00BFFF; border: 2px solid #ffffff; border-radius: 50%; box-shadow: 0 0 12px #00BFFF;"></div>
          </div>
        `,
        iconSize: [32, 32],
        iconAnchor: [16, 16],
      });

      const marker = L.marker([lat, lng], { icon: customIcon }).addTo(map);
      marker.bindPopup(`
        <div style="font-family: 'Poppins', sans-serif; font-size: 12px; color: #0f172a;">
          <strong>${domain}</strong><br/>
          IP Location: ${hosting.city}, ${hosting.country}<br/>
          Lat/Lon: ${lat.toFixed(4)}, ${lng.toFixed(4)}
        </div>
      `);
      markerRef.current = marker;
    } else {
      // Update position
      const map = mapInstanceRef.current;
      map.setView([lat, lng], 10);
      if (markerRef.current) {
        markerRef.current.setLatLng([lat, lng]);
        markerRef.current.setPopupContent(`
          <div style="font-family: 'Poppins', sans-serif; font-size: 12px; color: #0f172a;">
            <strong>${domain}</strong><br/>
            IP Location: ${hosting.city}, ${hosting.country}<br/>
            Lat/Lon: ${lat.toFixed(4)}, ${lng.toFixed(4)}
          </div>
        `);
      }
    }

    // Force map container resize recalculation
    setTimeout(() => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.invalidateSize();
      }
    }, 200);
  }, [lat, lng, domain, hosting.city, hosting.country]);

  // Handle tile layer toggle
  const toggleTileLayer = () => {
    if (!mapInstanceRef.current) return;
    const map = mapInstanceRef.current;

    map.eachLayer((layer) => {
      if (layer instanceof L.TileLayer) {
        map.removeLayer(layer);
      }
    });

    if (tileLayerType === "street") {
      L.tileLayer(
        "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
        {
          attribution: "Tiles &copy; Esri",
          maxZoom: 18,
        }
      ).addTo(map);
      setTileLayerType("satellite");
    } else {
      L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
        {
          attribution: '&copy; <a href="https://carto.com/">CARTO</a>',
          maxZoom: 19,
        }
      ).addTo(map);
      setTileLayerType("street");
    }
  };

  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-md flex flex-col gap-3 shadow-lg hover:border-white/20 transition-all">
      {/* High Density Header */}
      <div className="flex justify-between items-center">
        <h3 className="text-xs font-bold uppercase tracking-wider text-sky-400">Geolocation Map</h3>
        <div className="flex items-center gap-1.5">
          <button
            onClick={toggleTileLayer}
            className="px-2 py-0.5 rounded bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 text-[10px] font-semibold transition-all flex items-center gap-1"
          >
            <Layers className="w-3 h-3 text-sky-400" />
            <span>{tileLayerType === "street" ? "Satellite" : "Street"}</span>
          </button>

          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-2 py-0.5 rounded bg-sky-500/10 hover:bg-sky-500/20 border border-sky-500/30 text-sky-300 text-[10px] font-semibold transition-all flex items-center gap-1"
          >
            <span>Maps</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* Map Canvas Container */}
      <div className="relative rounded-xl overflow-hidden border border-white/10 h-56 z-10">
        <div ref={mapContainerRef} className="w-full h-full bg-slate-950" />
      </div>

      {/* Footer Coordinates */}
      <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono">
        <span>LAT: {lat.toFixed(5)}</span>
        <span>LON: {lng.toFixed(5)}</span>
      </div>
    </div>
  );
};
