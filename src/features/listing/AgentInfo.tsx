import React from "react";
import InputField from "../../components/InputField";
import { User, Mail, Phone } from "lucide-react";
import type { SpaceFormState } from "./spaceState";

interface AgentInfoProps {
  formData: SpaceFormState;
  setFormData: React.Dispatch<React.SetStateAction<SpaceFormState>>;
  type?: "edit" | "new";
}

const AgentInfo: React.FC<AgentInfoProps> = ({
  formData,
  setFormData,
  // type = "new",
}) => {
  return (
    <div className="">
      {/* <div>
        <h2 className="text-lg font-semibold text-gray-800 mb-2">
          Agent / Lister Information
        </h2>
        <p className="text-gray-600 text-sm">
          These details are auto-filled from your account profile and can be
          edited if needed.
        </p>
      </div> */}

      <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-4">
        <div className="">
          First name
          <InputField
            name="firstName"
            placeholder="First Name"
            icon={<User />}
            value={formData.contact.first_name}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                contact: { ...prev.contact, first_name: e.target.value },
              }))
            }
          />
        </div>
        <div className="">
          Last name
          <InputField
            name="lastName"
            placeholder="Last Name"
            icon={<User />}
            value={formData.contact.last_name}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                contact: { ...prev.contact, last_name: e.target.value },
              }))
            }
          />
        </div>
        <div className="">
          Email
          <InputField
            name="email"
            placeholder="Email"
            icon={<Mail />}
            value={formData.contact.email}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                contact: { ...prev.contact, email: e.target.value },
              }))
            }
          />
        </div>
        <div className="">
          Phone
          <InputField
            name="phone"
            placeholder="Phone Number"
            icon={<Phone />}
            value={formData.contact.phone}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                contact: { ...prev.contact, phone: e.target.value },
              }))
            }
          />
        </div>
      </div>

      <p className="text-xs text-gray-500 mt-2">
        Ensure your contact details are accurate — clients will use this
        information to reach you.
      </p>
    </div>
  );
};

export default AgentInfo;
