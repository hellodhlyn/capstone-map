type Coordinate = {
  lat: number;
  lng: number;
  height: number | null;
};

type Building = {
  name: string;
  height: number | null;
  coordinates: Coordinate[];
};
