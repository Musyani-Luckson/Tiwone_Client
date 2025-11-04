export type SpaceProfile = {
  description: string;
  photos: string[];
  features: string[];
  nearby_features: string[];
};

export type Address = {
  street: string;
  city: string;
  province: string;
  postal_code?: string;
  country: string;
};

export type LocationPoint = {
  type: "Point";
  coordinates: [number, number]; // [longitude, latitude]
};

export type Location = {
  name: string;
  point: LocationPoint;
};

export interface PropertyUpdateInterface {
  name: string;
  space_type: string;
  deal_type: string;
  status: string;
  price_amount: number;
  price_currency: string;
  price_duration: string;
  price_duration_count: number;
  address?: Address;
  location: Location;
  space_profile?: SpaceProfile;
  contact: any;
}
