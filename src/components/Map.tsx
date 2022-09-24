import { useEffect, useRef, useState } from "react";

type MapProps = {
  onClick: (coord: Coordinate) => void;
  buildings: Building[];
};

export default function Map(
  { onClick, buildings }: MapProps,
) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map>();
  const [polygons, setPolygon] = useState<google.maps.Polygon[]>([]);

  useEffect(() => {
    if (mapRef.current && !map) {
      const map = new window.google.maps.Map(mapRef.current, {
        center: { lat: 37.562900, lng: 126.937190 },
        zoom: 18,
      });

      map.addListener("click", (e: google.maps.MapMouseEvent) => {
        onClick({
          lat: e.latLng?.lat()!,
          lng: e.latLng?.lng()!,
          height: null,
        });
      });

      setMap(map);
    }
  }, [mapRef]);

  useEffect(() => {
    if (!map) {
      return;
    }

    polygons.forEach((polygon) => polygon.setMap(null));
    const newPolygons = buildings.map((building) => {
      const polygon = new google.maps.Polygon({
        paths: building.coordinates,
        strokeColor: "#B91C1C",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#B91C1C",
        fillOpacity: 0.35,
      });

      polygon.setMap(map);
      return polygon;
    });
    setPolygon(newPolygons);
  }, [buildings]);

  return <div className="map h-full w-full" ref={mapRef} />;
}
