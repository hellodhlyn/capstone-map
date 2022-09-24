import Button from "../elements/Button";
import { useState } from "react";

type BuildingAddProps = {
  coords: Coordinate[];
  onComplete: (building?: Building) => void;
};

export default function BuildingAdd(
  { coords, onComplete }: BuildingAddProps,
) {
  const [name, setName] = useState<string>("");
  return (
    <div>
      <h1 className="p-4 text-2xl font-black">건물 추가</h1>
      <div className="px-4">
        <input
          className="w-full p-2 border rounded"
          type="text"
          placeholder="건물 이름"
          onChange={(e) => { setName(e.target.value); }}
        />
        {coords.map(({ lat, lng }, index) => {
          return (
            <p className={`py-2 ${index > 0 ? 'border-t' : ''}`} key={`coord-${lat}-${lng}`}>
              lat: {lat}<br />
              lng: {lng}
            </p>
          );
        })}
      </div>
      <div className="px-4 py-2">
        <Button text="완료" onClick={() => {
          if (coords.length === 0) {
            onComplete();
          } else {
            onComplete({ name, coordinates: coords })
          }
        }} />
      </div>
    </div>
  );
}
