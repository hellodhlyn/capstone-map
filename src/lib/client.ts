const endpoint = "https://capstone-api.lyn.workers.dev";

export async function getBuildings(): Promise<Building[]> {
  const result = await fetch(`${endpoint}/buildings.json`);
  return await result.json();
}

export async function storeBuildings(buildings: Building[]): Promise<Building[]> {
  const result = await fetch(`${endpoint}/buildings`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(buildings),
  });
  return await result.json();
}
