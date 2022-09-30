import Button from "../elements/Button";

async function copyToClipboard(buildings: Building[]) {
  await navigator.clipboard.writeText(JSON.stringify(buildings));
}

type BuildingItemProps = {
  building: Building;
  onRemoveBuilding: (building: Building) => void;
  onEditBuilding: (building: Building) => void;
};

function BuildingItem(
  { building, onRemoveBuilding, onEditBuilding }: BuildingItemProps,
) {
  return (
    <div className="flex px-4 py-2 hover:bg-gray-100 transition">
      <div className="flex-grow">
        <p className="font-bold">{building.name}</p>
      </div>
      <div>
        <Button text="편집" onClick={() => { onEditBuilding(building); }} />
        <Button text="삭제" onClick={() => { onRemoveBuilding(building); }} />
      </div>
    </div>
  );
}

type BuildingListProps = {
  buildings: Building[];
  onAddMode: () => void;
  onSaveMode: () => void;
  onLoadMode: () => void;
  onEditBuilding: (building: Building) => void;
  onRemoveBuilding: (building: Building) => void;
};

export default function BuildingList(
  {
    buildings, onAddMode, onSaveMode, onLoadMode,
    onRemoveBuilding, onEditBuilding,
  }: BuildingListProps,
) {
  return (
    <div>
      <h1 className="p-4 text-2xl font-black">건물 목록</h1>
      <div className="px-4 pt-2">
        <Button text="추가" onClick={() => { onAddMode(); }} />
        <Button text="저장" onClick={() => { onSaveMode(); }} />
      </div>
      <div className="px-4 pt-2">
        <Button text="서버 주소 복사" useClicked={true} onClick={async () => {
          await navigator.clipboard.writeText("https://capstone-api.lyn.workers.dev/buildings.json");
        }} />
        <Button
          text="JSON 복사"
          onClick={async () => { await copyToClipboard(buildings); }}
          useClicked={true}
        />
        <Button
          text="JSON 불러오기"
          onClick={() => { onLoadMode(); }}
        />
      </div>
      <div className="py-2">
        {buildings.map((building) => (
          <BuildingItem
            key={`building-${building.name}`}
            building={building}
            onEditBuilding={onEditBuilding}
            onRemoveBuilding={onRemoveBuilding}
          />
        ))}
      </div>
    </div>
  );
};
