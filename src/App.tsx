import React, { useState } from "react";
import { Wrapper } from "@googlemaps/react-wrapper";
import Map from "./Map";

function App() {
  const [coords, setCoords] = useState<Coordinate[]>([]);

  return (
    <div className="App flex flex-col h-screen w-full">
      <div className="p-4 md:p-8 text-3xl md:text-4xl font-black">Capstone Map</div>
      <div className="flex flex-grow flex-col-reverse md:flex-row border-t">
        <div className="flex-grow border-r">
          <Wrapper apiKey={process.env.REACT_APP_GOOGLE_MAP_API_KEY || ""}>
            <Map onClick={(coord) => { setCoords((old) => [...old, coord]); }} />
          </Wrapper>
        </div>

        <div className="h-1/3 w-full md:h-full md:w-1/4 overflow-auto">
          <p className="p-4 text-2xl font-black">좌표 마킹</p>
          <div className="px-4 py-2">
            <button
              type="button"
              className="px-2 py-1 bg-black text-white rounded hover:opacity-75 transition"
              onClick={() => { setCoords([]); }}
            >
              초기화
            </button>
          </div>
          {coords.map(({ lat, lng }) => {
            return (
              <p className="px-4 py-2 border-t" key={`coord-${lat}-${lng}`}>
                lat: {lat}<br />
                lng: {lng}
              </p>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
