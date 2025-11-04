import React from "react";
import InputField from "../../components/InputField";
import { Building2, MapPin, MapPinned, Earth } from "lucide-react";
import type { SpaceFormState } from "./spaceState";

interface AddressAndLocationProps {
  formData: SpaceFormState;
  setFormData: React.Dispatch<React.SetStateAction<SpaceFormState>>;
  type?: "edit" | "new";
}

const AddressAndLocation: React.FC<AddressAndLocationProps> = ({
  formData,
  setFormData,
  // type = "new",
}) => {
  const { address } = formData;

  return (
    <div className="flex flex-col">
      <div className="">
        <InputField
          name="street"
          placeholder="Street address"
          icon={<MapPinned className="w-5 h-5 text-gray-500" />}
          value={address.street}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              address: { ...prev.address, street: e.target.value },
            }))
          }
        />

        <InputField
          name="city"
          placeholder="City"
          icon={<Building2 className="w-5 h-5 text-gray-500" />}
          value={address.city}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              address: { ...prev.address, city: e.target.value },
            }))
          }
        />

        <InputField
          name="province"
          placeholder="Province"
          icon={<MapPin className="w-5 h-5 text-gray-500" />}
          value={address.province}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              address: { ...prev.address, province: e.target.value },
            }))
          }
        />

        {/* Optional Postal Code (uncomment if needed) */}
        {/* <InputField
          name="postalCode"
          placeholder="Postal code"
          icon={<Mailbox className="w-5 h-5 text-gray-500" />}
          value={address.postalCode}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              address: { ...prev.address, postalCode: e.target.value },
            }))
          }
        /> */}

        <InputField
          name="country"
          placeholder="Country"
          icon={<Earth className="w-5 h-5 text-gray-500" />}
          value={address.country}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              address: { ...prev.address, country: e.target.value },
            }))
          }
          disabled
        />
      </div>
    </div>
  );
};

export default AddressAndLocation;
