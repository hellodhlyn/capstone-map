import Button from "../elements/Button";
import { useEffect, useState } from "react";

type BuildingAddProps = {
  clickedCoord: Coordinate | null;
  setDraft: (building: Building) => void;
  onComplete: (building?: Building) => void;
  onReset: () => void;
  onCancel: () => void;
};

export default function BuildingAdd(
  { clickedCoord, setDraft, onComplete, onReset, onCancel }: BuildingAddProps,
) {
  const [name, setName] = useState<string>("");
  const [height, setHeight] = useState<number | null>(null);
  const [coords, setCoords] = useState<Coordinate[]>([]);

  useEffect(() => {
    if (clickedCoord) {
      setCoords((old) => {
        const newCoords = [...old, clickedCoord];
        setDraft({ name, height, coordinates: newCoords });
        return newCoords;
      });
    }
  }, [clickedCoord]);

  return (
    <div>
      <h1 className="p-4 text-2xl font-black">건물 추가</h1>

      <div className="px-4 py-2">
        <Button text="완료" onClick={() => {
          if (name.length > 0 && coords.length > 0) {
            onComplete({ name, height, coordinates: coords })
          }
          setCoords([]);
        }} />
        <Button text="초기화" onClick={() => {
          setCoords([]);
          onReset();
        }} />
        <Button text="취소" onClick={() => {
          setCoords([]);
          onCancel();
        }} />
      </div>

      <div className="px-4">
        <p className="py-2 text-sm font-bold">건물 이름</p>
        <input
          className="w-full my-2 p-2 border rounded"
          type="text"
          placeholder="제1공학관"
          onChange={(e) => { setName(e.target.value); }}
        />

        <p className="py-2 text-sm font-bold">건물 높이 (m)</p>
        <input
          className="w-full my-2 p-2 border rounded"
          type="number"
          placeholder="39.0"
          onChange={(e) => {
            const parsed = parseFloat(e.target.value);
            if (!isNaN(parsed)) {
              setHeight(parsed);
            }
          }}
        />

        <p className="py-2 text-sm font-bold">좌표 목록</p>
        {coords.length === 0 ? <p className="my-4 text-center">지도를 클릭해서 좌표 추가</p> : null}
        {coords.map(({ lat, lng }, index) => {
          return (
            <p className={`py-2 ${index > 0 ? 'border-t' : ''}`} key={`coord-${lat}-${lng}`}>
              lat: {lat}<br />
              lng: {lng}
            </p>
          );
        })}
      </div>
    </div>
  );
}
