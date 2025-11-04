import React, { useEffect } from "react";
import { ImagePlus, X } from "lucide-react";
import type { SpaceFormState } from "./spaceState";

interface MediaProps {
  formData: SpaceFormState;
  setFormData: React.Dispatch<React.SetStateAction<SpaceFormState>>;
  type?: "edit" | "new";
}

const Media: React.FC<MediaProps> = ({
  formData,
  setFormData,
  type = "new",
}) => {
  console.log(formData);
  // Normalize backend URLs for edit mode
  useEffect(() => {
    if (type === "edit") {
      const photos = formData.space_profile.photos;
      const normalized =
        photos.length > 0 && typeof photos[0] === "string"
          ? (photos as string[]).map((url) => ({ file: null, preview: url }))
          : photos;

      setFormData((prev) => ({
        ...prev,
        space_profile: {
          ...prev.space_profile,
          photos: normalized as any,
        },
      }));
    }
  }, [type]);

  const handleFiles = (files: FileList | null) => {
    if (!files) return;

    const newPhotos: { file: File; preview: string }[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (!["image/jpeg", "image/png"].includes(file.type)) {
        alert(`File ${file.name} is not a supported image type.`);
        continue;
      }
      if (file.size > 5 * 1024 * 1024) {
        alert(`File ${file.name} exceeds 5MB limit.`);
        continue;
      }
      const previewUrl = URL.createObjectURL(file);
      newPhotos.push({ file, preview: previewUrl });
    }

    setFormData((prev) => ({
      ...prev,
      space_profile: {
        ...prev.space_profile,
        photos: [...prev.space_profile.photos, ...newPhotos],
      },
    }));
  };

  const handleDelete = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      space_profile: {
        ...prev.space_profile,
        photos: prev.space_profile.photos.filter((_, i) => i !== index),
      },
    }));
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-lg font-semibold text-gray-800 mb-2">Images</h2>
        <p className="text-gray-600 text-sm">
          Upload images of the space (JPG, PNG, max 5MB each).
        </p>
      </div>

      <label className="block border-2 border-dashed rounded-md p-6 text-center cursor-pointer hover:border-blue-400 transition-colors duration-200">
        <div className="flex flex-col items-center gap-3 text-gray-500">
          <ImagePlus className="w-10 h-10 text-gray-400" />
          <p className="text-sm">Click or drag files to upload</p>
          <p className="text-xs text-gray-400">
            Supported: JPG, PNG | Max: 5MB
          </p>
        </div>
        <input
          type="file"
          multiple
          accept="image/jpeg,image/png"
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
      </label>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {formData.space_profile.photos.length > 0 ? (
          formData.space_profile.photos.map((p: any, idx) => {
            const src = typeof p === "string" ? p : p.preview; // handle string or {file, preview}
            return (
              <div
                key={idx}
                className="relative border rounded-md overflow-hidden bg-gray-100 h-32 flex items-center justify-center"
              >
                <img
                  src={src}
                  alt={`preview-${idx}`}
                  className="object-cover w-full h-full"
                />
                <button
                  type="button"
                  onClick={() => handleDelete(idx)}
                  className="absolute top-1 right-1 bg-black bg-opacity-50 rounded-full p-1 hover:bg-opacity-70"
                >
                  <X className="w-4 h-4 text-white" />
                </button>
              </div>
            );
          })
        ) : (
          <div className="relative border rounded-md overflow-hidden bg-gray-100 h-32 flex items-center justify-center text-gray-400">
            <ImagePlus className="w-6 h-6" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Media;
