import React, { useEffect, useState } from "react";
import { Wrapper } from "@googlemaps/react-wrapper";
import Map from "./components/Map";
import BuildingList from "./components/BuildingList";
import BuildingAdd from "./components/BuildingAdd";
import BuildingLoad from "./components/BuildingLoad";
import BuildingSave from "./components/BuildingSave";
import { getBuildings } from "./lib/client";

type SidebarMode = "list" | "add" | "load" | "save";

const localStorageKey = 'capstone.buildings';

function saveBuildings(buildings: Building[]) {
  window.localStorage.setItem(localStorageKey, JSON.stringify(buildings));
}

function App() {
  const [loaded, setLoaded] = useState<boolean>(false);
  const [sidebarMode, setSidebarMode] = useState<SidebarMode>("list");

  const [clickedCoord, setClickedCoord] = useState<Coordinate | null>(null);
  const [buildings, setBuildings] = useState<Building[]>([]);
  const [draftBuilding, setDraftBuilding] = useState<Building | null>(null);

  useEffect(() => {
    if (!loaded) {
      getBuildings().then((buildings) => {
        setBuildings(buildings);
        setLoaded(true);
      });
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
          setSidebarMode("add");
        }}
        onLoadMode={() => {
          setSidebarMode("load");
        }}
        onSaveMode={() => {
          setSidebarMode("save");
        }}
        onRemoveBuilding={(toRemove) => {
          setBuildings((old) => old.filter((b) => b.name !== toRemove.name));
        }}
      />;
      break;

    case "add":
      sidebar = <BuildingAdd
        clickedCoord={clickedCoord}
        setDraft={setDraftBuilding}
        onComplete={(building) => {
          if (building) {
            setBuildings((old) => [...(old || []), building]);
          }
          setDraftBuilding(null);
          setSidebarMode("list");
        }}
        onReset={() => {
        }}
        onCancel={() => {
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
      break;

    case "save":
      sidebar = <BuildingSave
        buildings={buildings}
        onExit={(buildings) => {
          if (buildings) {
            setBuildings(buildings);
          }
          setSidebarMode("list");
        }}
      />
      break;
  }

  return (
    <div className="App flex flex-col h-screen w-full">
      <div className="p-4 md:p-8 text-3xl md:text-4xl font-black">Capstone Map</div>
      <div className="flex flex-grow flex-col-reverse md:flex-row border-t">
        <div className="flex-grow border-r">
          <Wrapper apiKey={process.env.REACT_APP_GOOGLE_MAP_API_KEY || ""}>
            <Map
              onClick={(coord) => { setClickedCoord(coord); }}
              buildings={buildings}
              draftBuilding={draftBuilding}
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
