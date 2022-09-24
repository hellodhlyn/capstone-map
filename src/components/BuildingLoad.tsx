import { useState } from "react";
import Button from "../elements/Button";

type BuildingLoadProps = {
  onLoad: (buildings: Building[]) => void;
  onCancel: () => void;
};

export default function BuildingLoad(
  { onLoad, onCancel }: BuildingLoadProps,
) {
  const [input, setInput] = useState<string>("");

  return (
    <div>
      <h1 className="p-4 text-2xl font-black">건물 목록 불러오기</h1>
      <div className="px-4">
        <p className="py-2">JSON 값을 입력 후 완료 버튼을 클릭</p>
        <textarea
          className="h-32 w-full p-2 border rounded"
          onChange={(e) => setInput(e.target.value)}
        />
      </div>
      <div className="px-4 py-2">
        <Button
          text="완료"
          onClick={() => { onLoad(JSON.parse(input)); }}
        />
        <Button
          text="취소"
          onClick={() => { onCancel(); }}
        />
      </div>
    </div>
  )
}
