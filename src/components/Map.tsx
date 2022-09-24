import { useEffect, useRef } from "react";

type MapProps = {
  onClick: (coord: Coordinate) => void;
};

export default function Map({ onClick }: MapProps) {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mapRef.current) {
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
    }
  }, [mapRef]);

  return <div className="map h-full w-full" ref={mapRef} />;
}
