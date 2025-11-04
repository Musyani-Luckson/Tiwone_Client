import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ImageSliderProps {
  images: (string | number)[];
  className?: string;
}

export default function ImageSlider({
  images,
  className = "",
}: ImageSliderProps) {
  const [current, setCurrent] = useState(0);
  const total = images.length;

  const nextSlide = () => setCurrent((prev) => (prev + 1) % total);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + total) % total);

  if (!images || images.length === 0) {
    return (
      <div
        className={`bg-gray-100 flex items-center justify-center ${className}`}
      >
        <span className="text-gray-400 text-sm">No Images</span>
      </div>
    );
  }

  return (
    <div className={`relative group overflow-hidden rounded-t-md ${className}`}>
      <AnimatePresence mode="wait">
        <motion.img
          key={images[current]}
          src={
            typeof images[current] === "string"
              ? images[current]
              : String(images[current])
          }
          alt={`Property image ${current + 1}`}
          initial={{ opacity: 0, scale: 1.02 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full h-64 sm:h-50 md:h-56 lg:h-54 object-cover"
        />
      </AnimatePresence>

      {/* Navigation Buttons */}
      {total > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute top-1/2 left-2 transform -translate-y-1/2 
                       bg-black/40 hover:bg-black/60 text-white p-1.5 rounded-full 
                       opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={nextSlide}
            className="absolute top-1/2 right-2 transform -translate-y-1/2 
                       bg-black/40 hover:bg-black/60 text-white p-1.5 rounded-full 
                       opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <ChevronRight size={18} />
          </button>
        </>
      )}

      {/* Dots Indicator */}
      {total > 1 && (
        <div className="absolute bottom-2 left-0 right-0 flex justify-center space-x-1">
          {images.map((_, i) => (
            <span
              key={i}
              className={`w-2 h-2 rounded-full transition ${
                i === current ? "bg-white" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
