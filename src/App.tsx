import React, { useEffect, useState } from "react";
import { Wrapper } from "@googlemaps/react-wrapper";
import Map from "./components/Map";
import BuildingList from "./components/BuildingList";
import BuildingAdd from "./components/BuildingAdd";
import BuildingLoad from "./components/BuildingLoad";
import BuildingSave from "./components/BuildingSave";
import { getBuildings, getRoute } from "./lib/client";
import BuildingEdit from "./components/BuildingEdit";

type SidebarMode = "list" | "add" | "edit" | "load" | "save";

const localStorageKey = 'capstone.buildings';

function saveBuildings(buildings: Building[]) {
  window.localStorage.setItem(localStorageKey, JSON.stringify(buildings));
}

function App() {
  const [loaded, setLoaded] = useState<boolean>(false);
  const [sidebarMode, setSidebarMode] = useState<SidebarMode>("list");

  const [marker, setMarker] = useState<Coordinate | null>(null);
  const [clickedCoord, setClickedCoord] = useState<Coordinate | null>(null);
  const [buildings, setBuildings] = useState<Building[]>([]);
  const [buildingToEdit, setBuildingToEdit] = useState<Building | null>(null);
  const [draftBuilding, setDraftBuilding] = useState<Building | null>(null);

  const [route, setRoute] = useState<Coordinate[]>([]);

  useEffect(() => {
    if (!loaded) {
      Promise.all([
        getBuildings().then((buildings) => setBuildings(buildings)),
        getRoute().then((route) => setRoute(route)),
      ]).then(() => {
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
          setClickedCoord(null);
          setSidebarMode("add");
        }}
        onLoadMode={() => {
          setSidebarMode("load");
        }}
        onSaveMode={() => {
          setSidebarMode("save");
        }}
        onEditBuilding={(toEdit) => {
          setClickedCoord(null);
          setBuildingToEdit(toEdit);
          setSidebarMode("edit");
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
          setDraftBuilding(null);
        }}
        onCancel={() => {
          setDraftBuilding(null);
          setSidebarMode("list");
        }}
      />
      break;

    case "edit":
      sidebar = <BuildingEdit
        clickedCoord={clickedCoord}
        building={buildingToEdit!}
        setBuildingToEdit={setBuildingToEdit}
        onHover={(hovered) => {
          setMarker(hovered);
        }}
        onCancel={() => {
          setMarker(null);
          setBuildingToEdit(null);
          setSidebarMode("list");
        }}
        onComplete={() => {
          setBuildings((old) => old.map((b) => (b.name === buildingToEdit?.name) ? buildingToEdit : b))
          setBuildingToEdit(null);
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
      <div className="flex-none p-4 md:p-8 text-3xl md:text-4xl font-black">Capstone Map Editor</div>
      <div className="grow h-full min-h-0 flex flex-col-reverse md:flex-row border-t">
        <div className="flex-grow border-r">
          <Wrapper apiKey={process.env.REACT_APP_GOOGLE_MAP_API_KEY || ""}>
            <Map
              onClick={(coord) => { setClickedCoord(coord); }}
              buildings={buildings.map((b) => (buildingToEdit?.name === b.name) ? buildingToEdit : b)}
              draftBuilding={draftBuilding}
              route={route}
              markerCoord={marker}
            />
          </Wrapper>
        </div>

        <div className="h-1/3 w-full md:h-full md:w-1/4 overflow-y-scroll">
          {sidebar}
        </div>
      </div>
    </div>
  );
}

export default App;
