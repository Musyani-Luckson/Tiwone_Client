import type { PropertyItem } from "../types/space";
import { MapPin, Trash2, DollarSign, Building2, Clock } from "lucide-react";
import ImageSlider from "./ImageSlider";
import CreateProperty from "../features/listing/CreateProperty";
// import ViewFinder from "../features/listing/ViewFinder";

interface SpaceInterface {
  space: PropertyItem;
  useCase?: "finder" | "owner" | "onMap" | "other";
  onDelete?: (id: number) => void;
  onEdit?: (space: PropertyItem) => void;
}

function SpaceCard({ space, useCase = "finder", onDelete }: SpaceInterface) {
  const {
    id,
    name,
    space_type,
    deal_type,
    price_amount,
    price_currency,
    price_duration,
    price_duration_count,
    status,
    Address,
    created_at,
  } = space;

  // --- Pricing logic ---
  const durationLabel =
    price_duration_count > 1
      ? `${price_duration_count} ${price_duration.toLowerCase()}s`
      : price_duration.toLowerCase();

  const totalPrice = Number(price_amount) * price_duration_count;
  const formattedPrice = `${price_currency} ${Number(
    price_amount
  ).toLocaleString()} / ${price_duration.toLowerCase()}`;
  const totalPriceText =
    price_duration_count > 1
      ? `Total ${price_currency} ${totalPrice.toLocaleString()} (${durationLabel})`
      : null;

  const showStatusBadge = status && status !== "AVAILABLE";

  const StatusBadge = showStatusBadge && (
    <span
      className={`px-2 py-0.5 text-xs font-medium rounded-full ${
        status === "LEASED"
          ? "bg-red-100 text-red-700"
          : "bg-yellow-100 text-yellow-700"
      }`}
    >
      {status}
    </span>
  );

  const imageUrls = space.SpaceProfile?.photos ?? [];
  const ImageSection = <ImageSlider images={imageUrls} className="" />;

  const MetaInfo = (
    <div className="p-3">
      <div className="flex justify-between items-start">
        <h3 className="font-semibold text-md text-gray-800 truncate">{name}</h3>
        {StatusBadge}
      </div>

      <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
        <Building2 size={14} />
        {space_type} • {deal_type}
      </div>

      <div className="flex items-center text-gray-800 font-semibold mt-1">
        <DollarSign size={14} className="text-green-600 mr-1" />
        {formattedPrice}
      </div>

      {totalPriceText && (
        <p className="text-xs text-gray-500 mt-0.5">{totalPriceText}</p>
      )}

      <div className="flex items-center text-gray-500 text-sm mt-2">
        <MapPin size={14} className="mr-1 text-gray-400" />
        {Address?.street ? `${Address.street}, ` : ""}
        {Address?.city}, {Address?.province}
      </div>
    </div>
  );

  switch (useCase) {
    case "finder":
      return (
        <div className="rounded-lg border border-gray-200 hover:shadow-md transition bg-white overflow-hidden flex flex-col">
          {ImageSection}
          {MetaInfo}
          <div className="flex justify-between items-center px-3 py-2 border-t border-gray-100">
            {/* <ViewFinder space={space} /> */}
            <span className="text-xs text-gray-400 flex items-center">
              <Clock size={12} className="mr-1" />
              {new Date(created_at || "").toLocaleDateString()}
            </span>
          </div>
        </div>
      );

    case "owner":
      return (
        <div className="rounded-lg border border-gray-200 shadow-sm bg-white">
          {ImageSection}
          {MetaInfo}
          <div className="flex justify-between p-3 border-t border-gray-100">
            {/* <button
              onClick={() => onEdit?.(space)}
              className="flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              <Edit2 size={14} /> Edit
            </button> */}
            <CreateProperty type="edit" space={space} />
            <button
              onClick={() => onDelete?.(id || 0)}
              className="flex items-center gap-1 text-red-500 hover:text-red-700 text-sm font-medium"
            >
              <Trash2 size={14} /> Delete
            </button>
          </div>
        </div>
      );

    case "onMap":
      return (
        <div className="p-2 text-sm bg-white rounded-md shadow-sm border border-gray-100">
          <div className="font-semibold">{name}</div>
          <div className="text-gray-600">{formattedPrice}</div>
          {totalPriceText && (
            <div className="text-xs text-gray-500">{totalPriceText}</div>
          )}
          <div className="flex items-center text-gray-500 text-xs mt-1">
            <MapPin size={12} className="mr-1 text-gray-400" />
            {Address?.city}, {Address?.province}
          </div>
        </div>
      );

    default:
      return (
        <div className="rounded border border-gray-300 bg-gray-50 p-4 text-sm text-gray-700">
          {name}
        </div>
      );
  }
}

export default SpaceCard;
