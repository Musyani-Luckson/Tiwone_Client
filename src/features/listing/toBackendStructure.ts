export function convertToBackendStructure(frontendData: any) {
  return {
    name: frontendData.name,
    space_type: frontendData.space_type,
    deal_type: frontendData.deal_type,
    status: frontendData.status,

    price_amount: frontendData.price_amount?.toFixed
      ? frontendData.price_amount.toFixed(2)
      : String(frontendData.price_amount ?? "0.00"),
    price_currency: frontendData.price_currency,
    price_duration: frontendData.price_duration,
    price_duration_count: frontendData.price_duration_count,

    contact: frontendData.contact,

    address: {
      street: frontendData.address?.street ?? "",
      city: frontendData.address?.city ?? "",
      province: frontendData.address?.province ?? "",
      postal_code: frontendData.address?.postalCode ?? "",
      country: frontendData.address?.country ?? "",
    },

    location: {
      name: frontendData.location?.name ?? "",
      point: {
        type: "Point",
        coordinates: [
          Number(frontendData.location?.coordinates?.lng ?? 0),
          Number(frontendData.location?.coordinates?.lat ?? 0),
        ] as [number, number],
      } as const,
    },

    space_profile: {
      description: frontendData.space_profile?.description ?? "",
      photos: frontendData.space_profile?.photos ?? [],
      features: frontendData.space_profile?.features ?? [],
      nearby_features: frontendData.space_profile?.nearby_features ?? [],
    },
  };
}
