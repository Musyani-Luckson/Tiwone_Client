import React from "react";
import InputField from "../../components/InputField";
import { Binoculars, TableProperties, FileText, Sparkles } from "lucide-react";
import type { SpaceFormState } from "./spaceState";

interface SpaceProfileProps {
  formData: SpaceFormState;
  setFormData: React.Dispatch<React.SetStateAction<SpaceFormState>>;
  type?: "edit" | "new";
}

// Mock suggestions (can later be dynamic/AI-driven)
const mockFeatureSuggestions = [
  "Open Layout",
  "High-Speed Internet",
  "Conference Room",
  "24/7 Access",
  "Air Conditioning",
];

const mockNearbySuggestions = [
  "Shopping Mall",
  "Train Station",
  "Cafe",
  "Park",
  "Gym",
];

// Simulate AI-generated content
const generateAIText = (field: string) => {
  switch (field) {
    case "features":
      return "Bright, Spacious, Modern";
    case "nearby":
      return "Metro Station, Cafe, Gym";
    case "description":
      return "Spacious and modern office space with natural light, high-speed internet, and a prime location.";
    default:
      return "";
  }
};

const SpaceProfile: React.FC<SpaceProfileProps> = ({
  formData,
  setFormData,
  // type = "new",
}) => {
  const { space_profile } = formData;

  return (
    <div className="space-y-8">
      {/* Features */}
      <div>
        <div className="relative">
          <InputField
            name="features"
            placeholder="Enter a feature..."
            icon={<TableProperties className="w-5 h-5" />}
            value={space_profile.features.join(", ")}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                space_profile: {
                  ...prev.space_profile,
                  features: e.target.value.split(",").map((f) => f.trim()),
                },
              }))
            }
            showError={false}
          />
          <button
            type="button"
            onClick={() =>
              setFormData((prev) => ({
                ...prev,
                space_profile: {
                  ...prev.space_profile,
                  features: generateAIText("features")
                    .split(",")
                    .map((f) => f.trim()),
                },
              }))
            }
            className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-1 px-2 py-1 bg-blue-600 text-white text-xs rounded-sm hover:bg-blue-700 transition-all"
            aria-label="AI-generated feature"
          >
            <Sparkles className="w-4 h-4" />
            AI
          </button>
        </div>

        <div className="flex flex-wrap gap-2 mt-2">
          {mockFeatureSuggestions.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() =>
                setFormData((prev) => ({
                  ...prev,
                  space_profile: { ...prev.space_profile, features: [s] },
                }))
              }
              className="px-3 py-1 text-sm rounded-full bg-gray-200 hover:bg-gray-300 transition"
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Nearby Features */}
      <div>
        <h2 className="text-lg font-semibold text-gray-800 mb-3">
          Nearby Features
        </h2>
        <p className="text-gray-600 text-sm mb-3">
          List nearby landmarks or facilities. AI can also suggest common nearby
          points.
        </p>
        <div className="relative">
          <InputField
            name="nearby_features"
            placeholder="Enter a nearby feature..."
            icon={<Binoculars className="w-5 h-5" />}
            value={space_profile.nearby_features.join(", ")}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                space_profile: {
                  ...prev.space_profile,
                  nearbyFeatures: e.target.value.split(","),
                  // .map((f) => f.trim()),
                },
              }))
            }
            showError={false}
          />
          <button
            type="button"
            onClick={() =>
              setFormData((prev) => ({
                ...prev,
                space_profile: {
                  ...prev.space_profile,
                  nearby_features: generateAIText("nearby")
                    .split(",")
                    .map((f) => f.trim()),
                },
              }))
            }
            className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-1 px-2 py-1 bg-blue-600 text-white text-xs rounded-sm hover:bg-blue-700 transition-all"
            aria-label="AI-generated nearby feature"
          >
            <Sparkles className="w-4 h-4" />
            AI
          </button>
        </div>

        <div className="flex flex-wrap gap-2 mt-2">
          {mockNearbySuggestions.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() =>
                setFormData((prev) => ({
                  ...prev,
                  space_profile: {
                    ...prev.space_profile,
                    nearby_features: [s],
                  },
                }))
              }
              className="px-3 py-1 text-sm rounded-full bg-gray-200 hover:bg-gray-300 transition"
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Description */}
      <div>
        <h2 className="text-lg font-semibold text-gray-800 mb-3">
          Description
        </h2>
        <p className="text-gray-600 text-sm mb-3">
          Write or auto-generate a detailed description to highlight unique
          selling points.
        </p>
        <div className="relative">
          <FileText className="absolute left-3 top-3 text-gray-500 w-5 h-5" />
          <textarea
            name="description"
            placeholder="Describe your space or let AI assist..."
            rows={5}
            className="w-full pl-10 pr-16 py-3 border rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
            value={space_profile.description}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                space_profile: {
                  ...prev.space_profile,
                  description: e.target.value,
                },
              }))
            }
          />
          <button
            type="button"
            onClick={() =>
              setFormData((prev) => ({
                ...prev,
                space_profile: {
                  ...prev.space_profile,
                  description: generateAIText("description"),
                },
              }))
            }
            className="absolute right-2 top-2 flex items-center gap-1 px-3 py-1 bg-blue-600 text-white text-xs rounded-sm hover:bg-blue-700 transition-all"
            aria-label="AI-generated description"
          >
            <Sparkles className="w-4 h-4" />
            AI
          </button>
        </div>
      </div>
    </div>
  );
};

export default SpaceProfile;
