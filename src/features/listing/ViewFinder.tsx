import { useState } from "react";
import Modal from "../../components/Modal";
import {
  Expand,
  MapPin,
  DollarSign,
  Building2,
  CheckCircle,
  Phone,
  Mail,
  ChevronLeft,
  ChevronRight,
  Star,
} from "lucide-react";
import type { PropertyItem } from "../../types/space";

function ViewFinder({ space }: { space: PropertyItem }) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const photos = space.SpaceProfile?.photos || [];
  const features = space.SpaceProfile?.features || [];
  const nearbyFeatures = space.SpaceProfile?.nearby_features || [];

  const formatPrice = () => {
    const amount = parseFloat(space.price_amount);
    const duration = space.price_duration?.toLowerCase();
    const count = space.price_duration_count || 1;
    return `${space.price_currency} ${amount.toLocaleString()}/${
      count > 1 ? count : ""
    } ${duration}${count > 1 ? "s" : ""}`;
  };

  const formatDistance = () => {
    const meters = space.Location?.distance_meters;
    if (!meters) return null;
    const km = (meters / 1000).toFixed(1);
    return `${km} km away`;
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % photos.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 rounded-lg border border-gray-300 text-gray-600 hover:text-blue-600 hover:border-blue-500 hover:bg-blue-50 transition-all duration-200"
      >
        <Expand className="w-5 h-5" />
      </button>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="">
        <div className="w-full h-full overflow-hidden overflow-y-auto">
          {/* Image Gallery */}
          <div className="-mx-6 -mt-6 mb-6">
            {photos.length > 0 ? (
              <>
                {/* Main Image */}
                <div className="relative w-full h-64 sm:h-80 md:h-96 bg-gray-900 overflow-hidden group">
                  <img
                    src={photos[currentImageIndex]}
                    alt={`${space.name}`}
                    className="w-full h-full object-cover"
                  />

                  {/* Navigation Arrows */}
                  {photos.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-900 p-2 sm:p-3 rounded-full shadow-lg transition opacity-0 group-hover:opacity-100"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-900 p-2 sm:p-3 rounded-full shadow-lg transition opacity-0 group-hover:opacity-100"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </>
                  )}

                  {/* Image Counter */}
                  <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium">
                    {currentImageIndex + 1} / {photos.length}
                  </div>
                </div>

                {/* Thumbnail Strip */}
                {photos.length > 1 && (
                  <div className="bg-gray-100 px-4 py-3 overflow-x-auto">
                    <div className="flex gap-2">
                      {photos.map((photo, idx) => (
                        <button
                          key={photo}
                          onClick={() => setCurrentImageIndex(idx)}
                          className={`relative flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden border-2 transition ${
                            idx === currentImageIndex
                              ? "border-blue-600 ring-2 ring-blue-200"
                              : "border-gray-300 hover:border-gray-400"
                          }`}
                        >
                          <img
                            src={photo}
                            alt={`Thumbnail ${idx + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="w-full h-64 sm:h-80 md:h-96 bg-gray-100 flex flex-col items-center justify-center text-gray-400">
                <Building2 className="w-16 h-16 sm:w-20 sm:h-20 mb-3" />
                <p className="text-sm sm:text-base">No images available</p>
              </div>
            )}
          </div>

          {/* Property Info */}
          <div className="space-y-6 p-4">
            {/* Title Section */}
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                {space.name}
              </h1>
              <div className="flex flex-wrap items-center gap-2 text-gray-600 mb-3">
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4 flex-shrink-0" />
                  <span className="text-sm">
                    {space.Address?.street}, {space.Address?.city}
                  </span>
                </div>
                {formatDistance() && (
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-medium">
                    {formatDistance()}
                  </span>
                )}
              </div>
            </div>

            {/* Price and Status Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-blue-50 p-4 rounded-lg border border-blue-100">
              <div>
                <p className="text-sm text-gray-600 mb-1">Price</p>
                <p className="text-2xl sm:text-3xl font-bold text-blue-600">
                  {formatPrice()}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 text-gray-700 rounded-lg text-sm font-medium">
                  <Building2 className="w-4 h-4" />
                  {space.space_type}
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 text-gray-700 rounded-lg text-sm font-medium">
                  <DollarSign className="w-4 h-4" />
                  {space.deal_type}
                </span>
                <span
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium ${
                    space.status === "AVAILABLE"
                      ? "bg-green-100 text-green-700 border border-green-200"
                      : "bg-yellow-100 text-yellow-700 border border-yellow-200"
                  }`}
                >
                  <CheckCircle className="w-4 h-4" />
                  {space.status}
                </span>
              </div>
            </div>

            {/* Description */}
            {space.SpaceProfile?.description && (
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-gray-600" />
                  About This Property
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {space.SpaceProfile.description}
                </p>
              </div>
            )}

            {/* Two Column Layout for Features and Location */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Features */}
              {features.length > 0 && (
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    Features
                  </h3>
                  <div className="space-y-2">
                    {features.map((feature) => (
                      <div
                        key={feature}
                        className="flex items-center gap-2 text-sm text-gray-700 py-1"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Location */}
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-blue-600" />
                  Location
                </h3>
                <div className="space-y-2 text-sm">
                  <p className="font-medium text-gray-900">
                    {space.Location?.name}
                  </p>
                  <p className="text-gray-600">{space.Address?.street}</p>
                  <p className="text-gray-600">
                    {space.Address?.city}, {space.Address?.province}
                  </p>
                  <p className="text-gray-500">
                    {space.Address?.postal_code}, {space.Address?.country}
                  </p>
                </div>
              </div>
            </div>

            {/* Nearby Amenities */}
            {nearbyFeatures.length > 0 && (
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-500" />
                  Nearby Places
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {nearbyFeatures.map((feature) => (
                    <div
                      key={feature}
                      className="flex items-center gap-2 text-sm text-gray-700 py-1"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-yellow-500" />
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Contact CTA - Sticky on mobile */}
            <div className="bg-white border-t-2 border-gray-200 pt-4 pb-2 sticky bottom-0 -mx-6 px-6 md:relative md:mx-0 md:px-0 md:border-0 md:pt-0">
              <h3 className="text-base font-semibold text-gray-900 mb-3">
                Ready to view this property?
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <button className="flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium shadow-sm">
                  <Phone className="w-5 h-5" />
                  <span className="hidden sm:inline">Call</span>
                </button>
                <button className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition font-medium">
                  <Mail className="w-5 h-5" />
                  <span className="hidden sm:inline">Message</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default ViewFinder;
