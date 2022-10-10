type Coordinate = {
  lat: number;
  lng: number;
  alt: number | null;
};

type Building = {
  name: string;
  height: number | null;
  coordinates: Coordinate[];
};
