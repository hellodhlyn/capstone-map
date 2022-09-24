import React, { useState } from "react";
import { Wrapper } from "@googlemaps/react-wrapper";
import Map from "./components/Map";
import BuildingList from "./components/BuildingList";
import BuildingAdd from "./components/BuildingAdd";
import BuildingLoad from "./components/BuildingLoad";

type SidebarMode = "list" | "add" | "load";

function App() {
  const [coords, setCoords] = useState<Coordinate[]>([]);
  const [buildings, setBuildings] = useState<Building[]>([]);
  const [sidebarMode, setSidebarMode] = useState<SidebarMode>("list");

  let sidebar;
  switch (sidebarMode) {
    case "list":
      sidebar = <BuildingList
        buildings={buildings}
        onAddMode={() => {
          setCoords([]);
          setSidebarMode("add");
        }}
        onLoadMode={() => { setSidebarMode("load"); }}
      />;
      break;

    case "add":
      sidebar = <BuildingAdd
        coords={coords}
        onComplete={(building) => {
          if (building) {
            setBuildings((old) => [...old, building]);
          }
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
              onClick={(coord) => { setCoords((old) => [...old, coord]);}}
              buildings={buildings}
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
