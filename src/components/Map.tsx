import { useEffect, useRef, useState } from "react";

type MapProps = {
  onClick: (coord: Coordinate) => void;
  buildings: Building[];
  draftBuilding: Building | null;
  route: Coordinate[];
  markerCoord: Coordinate | null;
};

export default function Map(
  { onClick, buildings, draftBuilding, route, markerCoord }: MapProps,
) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map>();
  const [polyline, setPolyline] = useState<google.maps.Polyline>();
  const [polygons, setPolygons] = useState<google.maps.Polygon[]>([]);
  const [marker, setMarker] = useState<google.maps.Marker | null>(null);
  const [routeLine, setRouteLine] = useState<google.maps.Polyline>();

  useEffect(() => {
    if (mapRef.current && !map) {
      const newMap = new window.google.maps.Map(mapRef.current, {
        center: { lat: 37.562900, lng: 126.937190 },
        zoom: 18,
      });

      newMap.addListener("click", (e: google.maps.MapMouseEvent) => {
        onClick({
          lat: e.latLng?.lat()!,
          lng: e.latLng?.lng()!,
          alt: null,
        });
      });

      setMap(newMap);
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
        strokeWeight: 1,
        fillColor: "#B91C1C",
        fillOpacity: 0.35,
      });

      polygon.setMap(map);
      return polygon;
    });
    setPolygons(newPolygons);
  }, [map, buildings]);

  useEffect(() => {
    if (!map) {
      return;
    }

    polyline?.setMap(null);
    if (!draftBuilding) {
      return;
    }

    const newPolyline = new google.maps.Polyline({
      path: draftBuilding.coordinates,
      strokeColor: "#B91C1C",
      strokeOpacity: 0.8,
      strokeWeight: 2,
    });

    newPolyline.setMap(map);
    setPolyline(newPolyline);
  }, [map, draftBuilding]);

  useEffect(() => {
    if (!map) {
      return;
    }

    marker?.setMap(null);
    if (!markerCoord) {
      return;
    }

    const newMarker = new google.maps.Marker({ position: markerCoord });
    newMarker.setMap(map);
    setMarker(newMarker);
  }, [map, markerCoord]);

  useEffect(() => {
    if (!map) {
      return;
    }

    routeLine?.setMap(null);
    if (!route || route.length < 2) {
      return;
    }

    const newRouteLine = new google.maps.Polyline({
      path: route,
      strokeColor: "#364fC7",
      strokeOpacity: 0.8,
      strokeWeight: 2,
    });

    newRouteLine.setMap(map);
    setRouteLine(newRouteLine);
  }, [map, route]);

  return <div className="map h-full w-full" ref={mapRef} />;
}
