import React, { useEffect, useState } from "react";
import { MapPin, MapPinHouse, Navigation } from "lucide-react";
import InputField from "../../components/InputField";
import { getAccurateUserLocationCached } from "../../utils/userLocation";
import ListingMap from "./ListingMap";
import type { SpaceFormState } from "./spaceState";

interface LocationProps {
  formData: SpaceFormState;
  setFormData: React.Dispatch<React.SetStateAction<SpaceFormState>>;
  type?: "edit" | "new";
}

// 🔹 Async function to reverse geocode coordinates using OpenStreetMap
async function reverseGeocode(lat: number, lon: number): Promise<string> {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`
    );
    if (!res.ok) throw new Error("Reverse geocoding failed");
    const data = await res.json();
    return data.display_name || "Unknown location";
  } catch (error) {
    console.error("Reverse geocode error:", error);
    return "Unable to fetch address";
  }
}

const Location: React.FC<LocationProps> = ({
  formData,
  setFormData,
  // type = "new",
}) => {
  const {
    location: { coordinates },
  } = formData;

  const [address, setAddress] = useState<string>("No location selected");
  const [errors, setErrors] = useState<{ lat?: string; lon?: string }>({});
  const [loading, setLoading] = useState(false);
  const [fetchingAddress, setFetchingAddress] = useState(false);

  const validateLatitude = (value: number | "") => {
    if (value === "") return "Latitude is required";
    if (value < -90 || value > 90) return "Latitude must be between -90 and 90";
    return "";
  };

  const validateLongitude = (value: number | "") => {
    if (value === "") return "Longitude is required";
    if (value < -180 || value > 180)
      return "Longitude must be between -180 and 180";
    return "";
  };

  const handleLatitudeChange = (value: string) => {
    const num = value === "" ? "" : parseFloat(value);
    setFormData((prev) => ({
      ...prev,
      location: {
        ...prev.location,
        coordinates: {
          lat: num,
          lng: prev.location.coordinates?.lng ?? 0,
        },
      },
    }));
    setErrors((prev) => ({ ...prev, lat: validateLatitude(num) }));
  };
  const handleLongitudeChange = (value: string) => {
    const num = value === "" ? "" : parseFloat(value);
    setFormData((prev) => ({
      ...prev,
      location: {
        ...prev.location,
        coordinates: {
          lat: prev.location.coordinates?.lat ?? 0,
          lng: num,
        },
      },
    }));
    setErrors((prev) => ({ ...prev, lon: validateLongitude(num) }));
  };

  const handleMyLocation = async () => {
    setLoading(true);
    try {
      const location = await getAccurateUserLocationCached();
      if (location?.coordinates) {
        const { lat, lon } = location.coordinates;
        handleLatitudeChange(lat.toString());
        handleLongitudeChange(lon.toString());
        setErrors({});
      } else {
        alert("Unable to retrieve your current location.");
      }
    } catch (err) {
      console.error("Location fetch failed:", err);
      alert("Failed to get your location. Please enable location access.");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Fetch reverse geocode whenever coordinates are valid
  useEffect(() => {
    const { lat, lng } = formData.location.coordinates ?? { lat: "", lng: "" };
    if (
      typeof lat === "number" &&
      typeof lng === "number" &&
      lat >= -90 &&
      lat <= 90 &&
      lng >= -180 &&
      lng <= 180
    ) {
      setFetchingAddress(true);
      reverseGeocode(lat, lng)
        .then((addr) => setAddress(addr))
        .finally(() => setFetchingAddress(false));
    }
  }, [formData.location.coordinates]);

  return (
    <div className="">
      {/* <div>
        <h2 className="text-lg font-semibold text-gray-800 mb-2">Location</h2>
        <p className="text-gray-600 text-sm">
          Pinpoint the space by clicking or dragging the marker on the map. You
          can also manually enter valid latitude and longitude coordinates
          (latitude −90 to +90, longitude −180 to +180).
        </p>
      </div> */}

      <div className="flex justify-start my-4">
        <button
          type="button"
          onClick={handleMyLocation}
          className={`flex items-center gap-2 px-4 py-3 rounded-sm text-white transition-all duration-200 ${
            loading
              ? "bg-blue-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
          disabled={loading}
          aria-label="Detect and Autofill Current Location"
        >
          <MapPin className="w-5 h-5" />
          {loading ? "Detecting..." : "Use My Location"}
        </button>
      </div>

      <div className="grid gap-2 grid-cols-2 sm:gap-4">
        <InputField
          name="latitude"
          placeholder="Latitude (-90 to +90)"
          icon={<Navigation className="w-5 h-5 text-gray-500" />}
          type="number"
          value={(coordinates?.lat ?? 0).toString()}
          onChange={(e) => handleLatitudeChange(e.target.value)}
          error={errors.lat}
        />
        <InputField
          name="longitude"
          placeholder="Longitude (-180 to +180)"
          icon={<Navigation className="w-5 h-5 text-gray-500 rotate-90" />}
          type="number"
          value={(coordinates?.lng ?? 0).toString()}
          onChange={(e) => handleLongitudeChange(e.target.value)}
          error={errors.lon}
        />
      </div>

      <div className="mt-2 text-sm text-gray-700 rounded-lg px-3 py-1">
        {fetchingAddress ? (
          <span className="text-blue-600">Fetching location details…</span>
        ) : (
          <>
            <strong>
              <MapPinHouse /> Address:{" "}
            </strong>
            <span>{address}</span>
          </>
        )}
      </div>

      <div className="mt-1 h-60 rounded-lg overflow-hidden shadow-sm">
        <ListingMap
          latitude={coordinates?.lat ?? 0}
          longitude={coordinates?.lng ?? 0}
          onCoordinateChange={(lat, lon) => {
            handleLatitudeChange(lat.toString());
            handleLongitudeChange(lon.toString());
          }}
        />
        <button
          type="button"
          onClick={handleMyLocation}
          className={`flex items-center gap-2 px-4 py-3 rounded-sm text-white transition-all duration-200 ${
            loading
              ? "bg-blue-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
          disabled={loading}
          aria-label="Detect and Autofill Current Location"
        >
          <MapPin className="w-5 h-5" />
          {loading ? "Detecting..." : "Use My Location"}
        </button>
      </div>
    </div>
  );
};

export default Location;
