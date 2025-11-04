import React from "react";
import { DollarSign, Building2, Tag } from "lucide-react";
import InputField from "../../components/InputField";
import SelectField from "../../components/SelectField";
import { dealTypeOptions, spaceCategoryOptions } from "../../types/space";
import type { SpaceFormState } from "./spaceState";
import type { DealType, SpaceCategory } from "../../types/search";

interface BasicInfoProps {
  formData: SpaceFormState;
  setFormData: React.Dispatch<React.SetStateAction<SpaceFormState>>;
  type?: "edit" | "new";
}

const BasicInfo: React.FC<BasicInfoProps> = ({
  formData,
  setFormData,
  // type = "new",
}) => {
  return (
    <div className="space-y-6">
      {/* Space Title */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Property Name <span className="text-red-500">*</span>
        </label>
        <InputField
          name="title"
          value={formData.name}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, name: e.target.value }))
          }
          placeholder="e.g., Modern Downtown Office Space"
          icon={<Tag className="w-5 h-5 text-gray-500" />}
          showError={false}
        />
      </div>

      {/* Space Category */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Property Type <span className="text-red-500">*</span>
        </label>
        <SelectField
          name="category"
          value={formData.space_type}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              space_type: e.target.value as SpaceCategory,
            }))
          }
          options={spaceCategoryOptions.slice(0)}
          placeholder="Select property type"
          icon={<Building2 className="w-5 h-5 text-gray-500" />}
        />
      </div>

      {/* Deal Type */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Deal Type <span className="text-red-500">*</span>
        </label>
        <SelectField
          name="dealType"
          value={formData.deal_type}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              deal_type: e.target.value as DealType,
            }))
          }
          options={dealTypeOptions.slice(0)}
          placeholder="Select deal type"
          icon={<DollarSign className="w-5 h-5 text-gray-500" />}
        />
      </div>
    </div>
  );
};

export default BasicInfo;
