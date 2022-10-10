import Button from "../elements/Button";
import { useEffect, useState } from "react";

type BuildingEditProps = {
  clickedCoord: Coordinate | null;
  building: Building;
  setBuildingToEdit: (building: Building) => void;
  onHover: (coord: Coordinate) => void;
  onCancel: () => void;
  onComplete: () => void;
};

function isEqualCoords(a: Coordinate, b: Coordinate): boolean {
  return Math.round(a.lng * (10 ** 6)) === Math.round(b.lng * (10 ** 6))
    && Math.round(a.lat * (10 ** 6)) === Math.round(b.lat * (10 ** 6));
}

export default function BuildingEdit(
  {
    clickedCoord, building, setBuildingToEdit,
    onHover, onCancel, onComplete,
  }: BuildingEditProps,
) {
  const [editingCoord, setEditingCoord] = useState<Coordinate | null>(null);

  useEffect(() => {
    if (!clickedCoord || !editingCoord) {
      return;
    }

    setBuildingToEdit({
      ...building,
      coordinates: building.coordinates.map((c) => isEqualCoords(c, editingCoord) ? clickedCoord : c),
    });
    setEditingCoord(null);
  }, [clickedCoord]);

  if (editingCoord) {
    return (
      <div>
        <h1 className="p-4 text-2xl font-black">좌표 편집</h1>
        <p className="p-4">옮길 좌표를 클릭하세요.</p>
      </div>
    )
  }

  return (
    <div>
      <h1 className="p-4 text-2xl font-black">좌표 편집</h1>
      <div className="px-4 py-2">
        <Button text="돌아가기" onClick={() => {
          setEditingCoord(null);
          onCancel();
        }} />
        <Button text="완료" onClick={() => {
          setBuildingToEdit({ ...building });
          onComplete();
        }} />
      </div>
      <div className="px-4 py-2">
        <p className="py-2 text-sm font-bold">건물 높이 (m)</p>
        <input
          className="w-full p-2 border rounded"
          type="number"
          placeholder="39.0"
          defaultValue={building.height || undefined}
          onChange={(e) => {
            const parsed = parseFloat(e.target.value);
            if (!isNaN(parsed)) {
              setBuildingToEdit({ ...building, height: parsed });
            }
          }}
        />
      </div>
      <div className="px-4 py-2">
        <p className="py-2 text-sm font-bold">좌표 목록</p>
        {building.coordinates.map((coord) => (
          <div
            key={`coord-${coord.lat},${coord.lng}`}
            className="flex py-2 hover:bg-gray-100 transition"
            onMouseEnter={() => { onHover(coord); }}
          >
            <div className="flex-grow">
              <p>{coord.lat.toFixed(6)}, {coord.lng.toFixed(6)}</p>
            </div>
            <div>
              <Button text="편집" onClick={() => { setEditingCoord(coord); }} />
              <Button text="삭제" onClick={() => {
                setBuildingToEdit({
                  ...building,
                  coordinates: building.coordinates.filter((c) => !isEqualCoords(c, coord)),
                })
              }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
