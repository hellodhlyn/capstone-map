import Button from "../elements/Button";

type BuildingListProps = {
  buildings: Building[];
  onAddMode: () => void;
  onLoadMode: () => void;
};

async function copyToClipboard(buildings: Building[]) {
  await navigator.clipboard.writeText(JSON.stringify(buildings));
}

export default function BuildingList(
  { buildings, onAddMode, onLoadMode }: BuildingListProps,
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
      <div className="px-4 py-2">
        {buildings.map((building) => (
          <div className="py-2">
            <p className="font-bold">{building.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
