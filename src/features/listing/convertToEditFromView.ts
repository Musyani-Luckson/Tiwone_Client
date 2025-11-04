import type { SpaceFormState } from "./spaceState";

export function mapSpaceToFormState(space: any): SpaceFormState {
  return {
    name: space.name || "",
    space_type: space.space_type || "",
    deal_type: space.deal_type || "",
    status: space.status || "AVAILABLE",

    price: {
      price_amount: parseFloat(space.price_amount) || 0.0,
      price_currency: space.price_currency || "ZMW",
      price_duration: space.price_duration || "MONTH",
      price_duration_count: space.price_duration_count || 1,
    },

    address: {
      street: space.Address?.street || "",
      city: space.Address?.city || "",
      province: space.Address?.province || "Copperbelt",
      postalCode: space.Address?.postal_code || "",
      country: space.Address?.country || "Zambia",
    },

    location: {
      name: space.Location?.name || "",
      coordinates: {
        lat: space.Location?.point?.coordinates?.[1]?.toString() || "",
        lng: space.Location?.point?.coordinates?.[0]?.toString() || "",
      },
    },

    space_profile: {
      description: space.SpaceProfile?.description || "",
      photos: space.SpaceProfile?.photos || [],
      features: space.SpaceProfile?.features || [],
      nearby_features: space.SpaceProfile?.nearby_features || [],
    },
    contact: {
      first_name: space.ContactInfo?.first_name || "",
      last_name: space.ContactInfo?.last_name || "",
      phone: space.ContactInfo?.phone || "",
      email: space.ContactInfo?.email || "",
    },
  };
}

//

export function convertFormStateToApiPayload(form: SpaceFormState) {
  return {
    name: form.name,
    space_type: form.space_type,
    deal_type: form.deal_type,
    status: form.status,
    price_amount: form.price.price_amount.toString(),
    price_currency: form.price.price_currency,
    price_duration: form.price.price_duration,
    price_duration_count: form.price.price_duration_count,
    address: {
      street: form.address.street,
      city: form.address.city,
      province: form.address.province,
      postal_code: form.address.postalCode, // map to backend key
      country: form.address.country,
    },
    location: {
      name: form.location.name,
      point: {
        type: "Point",
        coordinates: [
          Number(form.location.coordinates?.lat) || 0,
          Number(form.location.coordinates?.lng) || 0,
        ],
      },
    },
    space_profile: {
      description: form.space_profile.description,
      photos: form.space_profile.photos,
      features: form.space_profile.features,
      nearby_features: form.space_profile.nearby_features,
    },
    contact: {
      first_name: form.contact.first_name,
      last_name: form.contact.last_name,
      phone: form.contact.phone,
      email: form.contact.email,
    },
  };
}
