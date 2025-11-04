import type {
  PriceDuration,
  DealType,
  SpaceCategory,
} from "../../types/search";

// Price details
export interface SpacePrice {
  price_amount: number;
  price_currency: string;
  price_duration: PriceDuration | "";
  price_duration_count: number;
}

// Address details
export interface SpaceAddress {
  street: string;
  city: string;
  province: string;
  postalCode: string;
  country: string;
}

// Geolocation details
export interface SpaceLocation {
  name: string;
  coordinates?: {
    lat: number | string;
    lng: number | string;
  };
  point?: {
    type: string;
    coordinates: [number, number];
  };
}

// Profile / descriptive info
export interface SpaceProfile {
  features: string[];
  nearby_features: string[];
  description: string;
  photos: (string | { file: File; preview: string })[];
}

export interface Contact {
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
}

// Overall form state
export interface SpaceFormState {
  name: string;
  space_type: SpaceCategory;
  deal_type: DealType;
  status: "OCCUPIED" | "AVAILABLE" | "SOLD" | "";
  price: SpacePrice;
  address: SpaceAddress;
  location: SpaceLocation;
  space_profile: SpaceProfile;
  contact: Contact;
}

// Default state template for new or editing
export const defaultSpaceFormState: SpaceFormState = {
  name: "Test Subject",
  space_type: "APARTMENT",
  deal_type: "LEASE",
  status: "AVAILABLE",
  price: {
    price_amount: 0.0,
    price_currency: "ZMW",
    price_duration: "MONTH",
    price_duration_count: 1,
  },
  address: {
    street: "",
    city: "",
    province: "",
    postalCode: "",
    country: "Zambia",
  },
  location: {
    name: "",
    coordinates: {
      lat: "",
      lng: "",
    },
  },
  space_profile: {
    description: "",
    photos: [],
    features: [],
    nearby_features: [],
  },
  contact: {
    first_name: "",
    last_name: "",
    phone: "",
    email: "",
  },
};
