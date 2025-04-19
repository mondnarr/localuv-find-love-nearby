
import React, { useEffect, useRef, useState } from 'react';
import { Business } from '@/lib/businessData';
import { MapPin } from 'lucide-react';

interface MapViewProps {
  businesses: Business[];
  onBusinessSelect?: (business: Business) => void;
}

const MapView: React.FC<MapViewProps> = ({ businesses, onBusinessSelect }) => {
  const [mapApiKey, setMapApiKey] = useState<string>("");
  const [showApiKeyInput, setShowApiKeyInput] = useState<boolean>(true);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);

  const handleApiKeySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowApiKeyInput(false);
    initializeMap();
  };

  const initializeMap = async () => {
    if (!mapContainerRef.current || !mapApiKey) return;

    // This is a placeholder for the map initialization
    // In a real implementation, you would use a mapping library like Google Maps, Mapbox, etc.
    console.log("Initializing map with API key:", mapApiKey);
    
    // Create a basic placeholder map with markers for demonstration
    mapContainerRef.current.innerHTML = '';
    
    const mapPlaceholder = document.createElement('div');
    mapPlaceholder.className = 'relative w-full h-full bg-gray-200 rounded-lg overflow-hidden';
    mapPlaceholder.innerHTML = `<div class="absolute inset-0 flex items-center justify-center">
      <p class="text-gray-500">Map View (API Key: ${mapApiKey.substring(0, 5)}...)</p>
    </div>`;
    
    mapContainerRef.current.appendChild(mapPlaceholder);
    
    // Add business markers
    businesses.forEach((business, index) => {
      const marker = document.createElement('div');
      marker.className = 'absolute p-1 bg-white rounded-full shadow-md transform -translate-x-1/2 -translate-y-1/2 cursor-pointer hover:z-10';
      marker.style.left = `${Math.random() * 80 + 10}%`;
      marker.style.top = `${Math.random() * 80 + 10}%`;
      
      marker.innerHTML = `
        <div class="bg-localuv-primary text-white p-1 rounded-full">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
        </div>
      `;
      
      marker.addEventListener('click', () => {
        if (onBusinessSelect) {
          onBusinessSelect(business);
        }
      });
      
      marker.addEventListener('mouseenter', () => {
        const tooltip = document.createElement('div');
        tooltip.className = 'absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 p-2 bg-white rounded shadow-lg z-10 w-48';
        tooltip.innerHTML = `
          <p class="font-bold text-sm">${business.name}</p>
          <p class="text-xs text-gray-600">${business.category}</p>
          <p class="text-xs">${business.rating}⭐ · ${business.distance} mi</p>
        `;
        marker.appendChild(tooltip);
      });
      
      marker.addEventListener('mouseleave', () => {
        const tooltip = marker.querySelector('div.absolute');
        if (tooltip) marker.removeChild(tooltip);
      });
      
      mapPlaceholder.appendChild(marker);
      markersRef.current.push(marker);
    });
  };

  return (
    <div className="w-full h-full min-h-[400px] bg-gray-100 rounded-lg overflow-hidden">
      {showApiKeyInput ? (
        <div className="flex items-center justify-center h-full">
          <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Map API Key Required</h3>
            <p className="text-gray-600 mb-4">
              To display the interactive business map, please enter your Map API key.
            </p>
            <form onSubmit={handleApiKeySubmit}>
              <div className="space-y-4">
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  placeholder="Enter Map API Key"
                  value={mapApiKey}
                  onChange={(e) => setMapApiKey(e.target.value)}
                  required
                />
                <button
                  type="submit"
                  className="w-full bg-localuv-primary text-white py-2 rounded hover:bg-opacity-90"
                >
                  Load Map
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div ref={mapContainerRef} className="w-full h-full"></div>
      )}
    </div>
  );
};

export default MapView;
