import React from "react";
import Button from "../elements/Button";
import { storeBuildings } from "../lib/client";

type BuildingSaveProps = {
  buildings: Building[];
  onExit: (buildings?: Building[]) => void;
};

export default function BuildingSave(
  { buildings, onExit }: BuildingSaveProps,
) {
  return (
    <div>
      <h1 className="p-4 text-2xl font-black">건물 저장</h1>
      <p className="p-4">서버에 저장된 기존 데이터를 덮어씌웁니다.</p>
      <div className="p-4">
        <Button text="저장" onClick={async () => {
          const stored = await storeBuildings(buildings);
          onExit(stored);
        }} />
        <Button text="취소" onClick={() => { onExit(); }} />
      </div>
    </div>
  );
}
