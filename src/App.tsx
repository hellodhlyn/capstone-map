import React, { useEffect, useState } from "react";
import { Wrapper } from "@googlemaps/react-wrapper";
import Map from "./components/Map";
import BuildingList from "./components/BuildingList";
import BuildingAdd from "./components/BuildingAdd";
import BuildingLoad from "./components/BuildingLoad";

type SidebarMode = "list" | "add" | "load";

const localStorageKey = 'capstone.buildings';
const defaultBuilding = {
  name: "학술정보관",
  coordinates: [
    { lat: 37.56432594251897, lng: 126.93589187707363 },
    { lat: 37.56407399865417, lng: 126.93580872859417 },
    { lat: 37.564081440046365, lng: 126.93576581324993 },
    { lat: 37.563861387134935, lng: 126.93569607581554 },
    { lat: 37.56385181960229, lng: 126.93573765005527 },
    { lat: 37.56359668494542, lng: 126.93565584268032 },
    { lat: 37.56348187406477, lng: 126.93618826116978 },
    { lat: 37.56421219581634, lng: 126.9364269777721 },
  ],
};

function saveBuildings(buildings: Building[]) {
  window.localStorage.setItem(localStorageKey, JSON.stringify(buildings));
}

function loadBuildings(): Building[] {
  const jsonValue = window.localStorage.getItem(localStorageKey);
  return jsonValue ? JSON.parse(jsonValue) : [defaultBuilding];
}

function App() {
  const [loaded, setLoaded] = useState<boolean>(false);
  const [sidebarMode, setSidebarMode] = useState<SidebarMode>("list");

  const [coords, setCoords] = useState<Coordinate[]>([]);
  const [buildings, setBuildings] = useState<Building[]>([]);

  useEffect(() => {
    if (!loaded) {
      setBuildings(loadBuildings);
      setLoaded(true);
    }
  }, [loaded]);

  useEffect(() => {
    if (loaded) {
      saveBuildings(buildings);
    }
  }, [loaded, buildings]);

  let sidebar;
  switch (sidebarMode) {
    case "list":
      sidebar = <BuildingList
        buildings={buildings || []}
        onAddMode={() => {
          setCoords([]);
          setSidebarMode("add");
        }}
        onLoadMode={() => {
          setSidebarMode("load");
        }}
        onRemoveBuilding={(toRemove) => {
          setBuildings((old) => old.filter((b) => b.name !== toRemove.name));
        }}
      />;
      break;

    case "add":
      sidebar = <BuildingAdd
        coords={coords}
        onComplete={(building) => {
          if (building) {
            setBuildings((old) => [...(old || []), building]);
          }
          setCoords([]);
          setSidebarMode("list");
        }}
        onReset={() => {
          setCoords([]);
        }}
        onCancel={() => {
          setCoords([]);
          setSidebarMode("list");
        }}
      />
      break;

    case "load":
      sidebar = <BuildingLoad
        onLoad={(buildings) => {
          setBuildings(buildings);
          setSidebarMode("list");
        }}
        onCancel={() => {
          setSidebarMode("list");
        }}
      />
  }

  return (
    <div className="App flex flex-col h-screen w-full">
      <div className="p-4 md:p-8 text-3xl md:text-4xl font-black">Capstone Map</div>
      <div className="flex flex-grow flex-col-reverse md:flex-row border-t">
        <div className="flex-grow border-r">
          <Wrapper apiKey={process.env.REACT_APP_GOOGLE_MAP_API_KEY || ""}>
            <Map
              onClick={(coord) => {
                setCoords((old) => [...old, coord]);
              }}
              buildings={buildings}
              coords={coords}
            />
          </Wrapper>
        </div>

        <div className="h-1/3 w-full md:h-full md:w-1/4 overflow-auto">
          {sidebar}
        </div>
      </div>
    </div>
  );
}

export default App;
