type Coordinate = {
  lat: number;
  lng: number;
  height: number | null;
};

type Building = {
  name: string;
  coordinates: Coordinate[];
};
