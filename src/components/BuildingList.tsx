import Button from "../elements/Button";

async function copyToClipboard(buildings: Building[]) {
  await navigator.clipboard.writeText(JSON.stringify(buildings));
}

type BuildingItemProps = {
  building: Building;
  onRemoveBuilding: (building: Building) => void;
};

function BuildingItem(
  { building, onRemoveBuilding }: BuildingItemProps,
) {
  return (
    <div className="flex px-4 py-2 hover:bg-gray-100 transition">
      <div className="flex-grow">
        <p className="font-bold">{building.name}</p>
      </div>
      <div>
        <Button text="삭제" onClick={() => { onRemoveBuilding(building); }} />
      </div>
    </div>
  );
}

type BuildingListProps = {
  buildings: Building[];
  onAddMode: () => void;
  onLoadMode: () => void;
  onRemoveBuilding: (building: Building) => void;
};

export default function BuildingList(
  { buildings, onAddMode, onLoadMode, onRemoveBuilding }: BuildingListProps,
) {
  return (
    <div>
      <h1 className="p-4 text-2xl font-black">건물 목록</h1>
      <div className="px-4 py-2">
        <Button text="추가" onClick={() => { onAddMode(); }} />
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
            onRemoveBuilding={onRemoveBuilding}
          />
        ))}
      </div>
    </div>
  );
};
