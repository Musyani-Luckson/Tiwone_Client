import React, { useState, useEffect } from "react";
import steps from "./steps";
// Form steps components
import BasicInfo from "./BasicInfo";
import PricingAndAvailability from "./PricingAndAvailability";
import AddressAndLocation from "./AddressAndLocation";
import SpaceProfile from "./SpaceProfile";
import AgentInfo from "./AgentInfo";
import Location from "./Location";
import Media from "./Media";
// State and hooks
import { defaultSpaceFormState, type SpaceFormState } from "./spaceState";
import { useSpace } from "../../hooks/useSpaceHook";
import type { PropertyItem } from "../../types/space";
import { mapSpaceToFormState } from "./convertToEditFromView";
import { Loader } from "../../components/Loader";
import Error from "../../components/Error";
// import { convertToBackendStructure } from "./toBackendStructure";
import { createClient } from "@supabase/supabase-js";
// Supabase client setup
const supabase = createClient(
  import.meta.env.VITE_STORAGE_URL,
  import.meta.env.VITE_STORAGE_ANON_KEY
);

interface MultiStepFormProps {
  getStep?: (currentStep: number) => void;
  space?: PropertyItem | null;
  type?: "edit" | "new";
}

const MultiStepForm: React.FC<MultiStepFormProps> = ({
  getStep,
  space = null,
  type = "new",
}) => {
  const { loading, error, createSpace, updateSpace } = useSpace();
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<SpaceFormState>(
    defaultSpaceFormState
  );

  useEffect(() => {
    if (space) {
      console.log(mapSpaceToFormState(space));
      setFormData(mapSpaceToFormState(space));
    }
  }, [space]);

  useEffect(() => {
    if (getStep) getStep(step);
  }, [step, getStep]);

  const handleNext = () => {
    if (step < steps.length - 1) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
  };

  // useEffect(() => {
  //   // const files = formData.space_profile.photos.map((p) => p.file);
  // }, [formData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const uploadedUrls: string[] = [];
    const photos = formData.space_profile.photos;
    const files = formData.space_profile.photos
      .filter(
        (p): p is { file: File; preview: string } => typeof p !== "string"
      )
      .map((p) => p.file);

    if (!photos || photos.length === 0) {
      alert("No photos to submit.");
      return;
    }

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const fileName = `${Date.now()}_${file.name}`;

        const { data, error } = await supabase.storage
          .from("properties")
          .upload(fileName, file, {
            contentType: file.type,
            upsert: true,
          });

        if (error) {
          console.error("Upload error:", error.message);
          alert(`Error uploading photo ${i + 1}: ${error.message}`);
          continue;
        }

        if (data?.path) {
          const { data: publicData } = supabase.storage
            .from("properties")
            .getPublicUrl(data.path);

          if (publicData?.publicUrl) {
            uploadedUrls.push(publicData.publicUrl);
          }
        }
      }

      // Attach uploaded URLs to the form data before sending
      let updatedFormData = {
        ...formData,
        space_profile: {
          ...formData.space_profile,
          photos: uploadedUrls,
        },
      };

      if (!space) {
        await createSpace(updatedFormData);
      } else {
        const photos = formData.space_profile.photos;

        // Separate existing URLs (already uploaded)
        const existingPhotoUrls = photos
          .filter((p) => typeof p === "string")
          .map((p) => (typeof p === "string" ? p : ""));

        // Extract only new files to upload
        const newPhotoFiles = photos
          .filter(
            (p): p is { file: File; preview: string } =>
              typeof p !== "string" && p.preview?.startsWith("blob")
          )
          .map((p) => p.file);

        const uploadedUrlsX2: string[] = [];

        for (let i = 0; i < newPhotoFiles.length; i++) {
          const file = newPhotoFiles[i];
          const fileName = `${Date.now()}_${file.name}`;

          const { data, error } = await supabase.storage
            .from("properties")
            .upload(fileName, file, {
              contentType: file.type,
              upsert: true,
            });

          if (error) {
            console.error("Upload error:", error.message);
            continue;
          }

          if (data?.path) {
            const { data: publicData } = supabase.storage
              .from("properties")
              .getPublicUrl(data.path);

            if (publicData?.publicUrl) {
              uploadedUrlsX2.push(publicData.publicUrl);
            }
          }
        }
        const finalPhotoUrls = [...existingPhotoUrls, ...uploadedUrlsX2];

        // console.log("Updating space with data:", finalPhotoUrls);
        // console.log("Updating space with data:", formData);

        updatedFormData = {
          ...formData,
          location: {
            name: formData.location.name,
            point: {
              type: "Point",
              coordinates: [
                Number(formData.location.coordinates?.lat ?? 0),
                Number(formData.location.coordinates?.lng ?? 0),
              ],
            },
          },
          space_profile: {
            ...formData.space_profile,
            photos: finalPhotoUrls,
          },
        };
        // console.log("Updating space with data:", updatedFormData);
        await updateSpace(space.id || "", updatedFormData);
      }
    } catch (err) {
      console.error("Unexpected error during submission:", err);
      alert("An unexpected error occurred. Check console for details.");
    }
  };

  if (loading && !error) {
    return (
      <div className="w-full h-full">
        <Loader />
      </div>
    );
  }
  if (!loading && error) {
    return (
      <div className="w-full h-full">
        <Error />
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col overflow-auto">
      <form className="w-full h-full flex flex-col">
        {/* Progress Indicator */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-gray-900">
              {steps[step].name}
            </h3>
            <span className="text-sm text-gray-500">
              Step {step + 1} of {steps.length}
            </span>
          </div>
          <p className="text-sm text-gray-600 mb-4">{steps[step].purpose}</p>

          {/* Progress bar */}
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((step + 1) / steps.length) * 100}%` }}
            />
          </div>

          {/* Step indicators */}
          <div className="flex justify-between mt-2">
            {steps.map((_, idx) => (
              <div
                key={idx}
                className={`text-xs text-center ${
                  idx <= step ? "text-blue-600 font-medium" : "text-gray-400"
                }`}
                style={{ width: `${100 / steps.length}%` }}
              >
                {idx + 1}
              </div>
            ))}
          </div>
        </div>
        {/* Form Content */}
        <div className="flex-1 overflow-y-auto mb-6">
          {step === 0 && (
            <BasicInfo
              type={type}
              formData={formData}
              setFormData={setFormData}
            />
          )}
          {step === 1 && (
            <PricingAndAvailability
              type={type}
              formData={formData}
              setFormData={setFormData}
            />
          )}
          {step === 2 && (
            <AddressAndLocation
              type={type}
              formData={formData}
              setFormData={setFormData}
            />
          )}
          {step === 3 && (
            <Location
              type={type}
              formData={formData}
              setFormData={setFormData}
            />
          )}
          {step === 4 && (
            <SpaceProfile
              type={type}
              formData={formData}
              setFormData={setFormData}
            />
          )}
          {step === 5 && (
            <Media type={type} formData={formData} setFormData={setFormData} />
          )}
          {step === 6 && (
            <AgentInfo
              type={type}
              formData={formData}
              setFormData={setFormData}
            />
          )}
        </div>
        {/* Navigation Buttons */}
        <div className="flex justify-between items-center pt-4 border-t">
          <button
            type="button"
            onClick={handleBack}
            disabled={step === 0}
            className="px-6 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            Back
          </button>

          {step < steps.length - 1 ? (
            <button
              type="button"
              onClick={handleNext}
              className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
            >
              Continue
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              className="px-6 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium"
            >
              {type === "new" ? "Create Listing" : "Update Listing"}
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default MultiStepForm;
