import React from "react";
import { Clock, Coins, CalendarClock, Scale, Landmark } from "lucide-react";
import InputField from "../../components/InputField";
import SelectField from "../../components/SelectField";
import {
  priceDurationCountOptions,
  priceDurationOptions,
  statusOptions,
} from "../../types/space";
import type { SpaceFormState } from "./spaceState";

interface PricingAndAvailabilityProps {
  formData: SpaceFormState;
  setFormData: React.Dispatch<React.SetStateAction<SpaceFormState>>;
  type?: "edit" | "new";
}

const PricingAndAvailability: React.FC<PricingAndAvailabilityProps> = ({
  formData,
  setFormData,
  // type = "new",
}) => {
  const { price, status } = formData;

  return (
    <div className="space-y-6">
      {/* Price Section */}
      <div className="grid gap-4 grid-cols-5">
        {/* Currency (fixed) */}
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Currency
          </label>
          <InputField
            name="currency"
            placeholder="Currency"
            icon={<Landmark className="w-5 h-5 text-gray-500" />}
            value={price.price_currency}
            disabled
            showError={false}
          />
        </div>
        {/* Price */}
        <div className="col-span-3">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Price Amount <span className="text-red-500">*</span>
          </label>
          <InputField
            name="amount"
            placeholder="Enter price"
            icon={<Coins className="w-5 h-5 text-gray-500" />}
            value={price.price_amount.toString() || ""}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                price: {
                  ...prev.price,
                  price_amount: Number(e.target.value) || 0,
                },
              }))
            }
            type="number"
            showError={false}
          />
        </div>
      </div>

      {/* Duration */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Payment Duration <span className="text-red-500">*</span>
        </label>
        <SelectField
          name="duration"
          value={price.price_duration}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              price: {
                ...prev.price,
                price_duration: e.target
                  .value as SpaceFormState["price"]["price_duration"],
              },
            }))
          }
          options={priceDurationOptions.slice(1)}
          placeholder="Select duration"
          icon={<CalendarClock className="w-5 h-5 text-gray-500" />}
        />
      </div>

      {/* Multiplier */}
      {(price.price_duration === "MONTH" ||
        price.price_duration === "YEAR") && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Duration Count
          </label>
          <SelectField
            name="durationCount"
            value={Number(price.price_duration_count) || 1}
            onChange={(e) => {
              const count = Number(e.target.value) || 1;
              setFormData((prev) => ({
                ...prev,
                price: {
                  ...prev.price,
                  price_duration_count: count,
                },
              }));
            }}
            options={priceDurationCountOptions.slice(0)}
            placeholder="Select multiplier"
            icon={<Scale className="w-5 h-5 text-gray-500" />}
          />
        </div>
      )}

      {/* Status */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Status
        </label>
        <SelectField
          name="status"
          value={String(status) || "AVAILABLE"}
          onChange={(e) => {
            const newStatus =
              (e.target.value as SpaceFormState["status"]) || "AVAILABLE";
            setFormData((prev) => ({
              ...prev,
              status: newStatus,
            }));
          }}
          options={statusOptions.slice(0)}
          placeholder="Select status"
          icon={<Clock className="w-5 h-5 text-gray-500" />}
        />
      </div>
    </div>
  );
};

export default PricingAndAvailability;
