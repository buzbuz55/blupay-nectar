import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Define proper type for location data
type Location = {
  name: string;
  coordinates: [number, number];
};

// Sample top locations data with proper typing
const topLocations: Location[] = [
  { name: "New York", coordinates: [-74.006, 40.7128] },
  { name: "London", coordinates: [-0.1276, 51.5074] },
  { name: "Tokyo", coordinates: [139.6917, 35.6895] },
  // Add more locations as needed
];

const Locations = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const navigate = useNavigate();
  const [token, setToken] = useState('');
  const [isMapInitialized, setIsMapInitialized] = useState(false);

  const initializeMap = () => {
    if (!mapContainer.current || !token || isMapInitialized) return;

    try {
      mapboxgl.accessToken = token;
      
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/light-v11',
        center: [-74.006, 40.7128] as [number, number],
        zoom: 2
      });

      // Add markers for each location
      topLocations.forEach(location => {
        new mapboxgl.Marker()
          .setLngLat(location.coordinates)
          .setPopup(new mapboxgl.Popup().setHTML(`<h3>${location.name}</h3>`))
          .addTo(map.current!);
      });

      setIsMapInitialized(true);
    } catch (error) {
      console.error('Error initializing map:', error);
    }
  };

  useEffect(() => {
    return () => {
      map.current?.remove();
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-4 bg-white shadow-sm">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate(-1)}
          className="mb-4"
        >
          <ArrowLeft className="h-6 w-6" />
        </Button>
        <h1 className="text-2xl font-semibold">BluPay Locations</h1>
        <p className="text-gray-600">Find our top 100 locations worldwide</p>
        
        {!isMapInitialized && (
          <div className="mt-4 space-y-2">
            <p className="text-sm text-gray-600">Please enter your Mapbox public token to view the map:</p>
            <div className="flex gap-2">
              <Input
                type="text"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                placeholder="Enter your Mapbox public token"
                className="max-w-md"
              />
              <Button onClick={initializeMap}>Load Map</Button>
            </div>
            <p className="text-xs text-gray-500">
              You can find your token at <a href="https://mapbox.com/" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">mapbox.com</a> in the Tokens section of your dashboard.
            </p>
          </div>
        )}
      </div>
      
      <div className="relative w-full" style={{ height: "calc(100vh - 100px)" }}>
        <div ref={mapContainer} className="absolute inset-0" />
      </div>
    </div>
  );
};

export default Locations;