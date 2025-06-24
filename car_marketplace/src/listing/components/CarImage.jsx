import React, { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

function CarImages({ carDetails }) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  if (!carDetails?.images || carDetails.images.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 mt-6">
        <div className="text-center">
          <div className="w-20 h-20 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <svg
              className="w-10 h-10 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
          <p className="text-lg font-medium text-gray-900 mb-2">
            Aucune image disponible
          </p>
          <p className="text-gray-500">
            Les photos du véhicule ne sont pas encore disponibles.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
      {/* En-tête */}
      <div className="p-2">
        {/* Layout responsive : vertical sur mobile, horizontal sur desktop */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Image principale */}
          <div className="flex-1">
            <div className="relative aspect-video bg-gray-100 rounded-xl overflow-hidden shadow-lg group">
              <img
                src={carDetails.images[selectedImageIndex]?.imageUrl}
                alt={`Photo principale du véhicule ${selectedImageIndex + 1}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                onError={(e) => {
                  e.target.src =
                    "https://via.placeholder.com/800x450?text=Image+du+véhicule";
                }}
              />

              {/* Indicateur du nombre d'images */}
              <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-medium">
                {selectedImageIndex + 1} / {carDetails.images.length}
              </div>

              {/* Navigation directe sur l'image (mobile) */}
              {carDetails.images.length > 1 && (
                <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-4 lg:hidden">
                  <button
                    onClick={() =>
                      setSelectedImageIndex((prev) =>
                        prev === 0 ? carDetails.images.length - 1 : prev - 1
                      )
                    }
                    className="bg-white/90 hover:bg-white text-gray-800 rounded-full p-2 shadow-lg transition-all duration-200"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={() =>
                      setSelectedImageIndex((prev) =>
                        prev === carDetails.images.length - 1 ? 0 : prev + 1
                      )
                    }
                    className="bg-white/90 hover:bg-white text-gray-800 rounded-full p-2 shadow-lg transition-all duration-200"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Carrousel de miniatures - VERSION SIMPLE */}
          {carDetails.images.length > 1 && (
            <div className="lg:w-40">
              {/* Version horizontale pour mobile */}
              <div className="block lg:hidden">
                <Carousel
                  className="w-full"
                  opts={{
                    loop: true,
                    align: "start",
                  }}
                >
                  <CarouselContent>
                    {carDetails.images.map((image, index) => (
                      <CarouselItem key={index} className="basis-1/4">
                        <div className="p-1">
                          <button
                            onClick={() => setSelectedImageIndex(index)}
                            className={`relative aspect-video w-full rounded-lg overflow-hidden transition-all duration-200 ${
                              selectedImageIndex === index
                                ? "ring-2 ring-blue-500 shadow-lg scale-105"
                                : "hover:shadow-md hover:scale-102 opacity-80 hover:opacity-100"
                            }`}
                          >
                            <img
                              src={image.imageUrl}
                              alt={`Miniature ${index + 1}`}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.target.src =
                                  "https://via.placeholder.com/120x80?text=Image";
                              }}
                            />
                          </button>
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
              </div>

              {/* Version verticale pour desktop */}
              <div className="hidden lg:block">
                <Carousel
                  orientation="vertical"
                  className="h-96"
                  opts={{
                    loop: true,
                    align: "start",
                  }}
                >
                  <CarouselContent className="h-full">
                    {carDetails.images.map((image, index) => (
                      <CarouselItem key={index} className="basis-1/3">
                        <div className="p-4">
                          <button
                            onClick={() => setSelectedImageIndex(index)}
                            className={`relative aspect-video w-full rounded-lg overflow-hidden transition-all duration-200 ${
                              selectedImageIndex === index
                                ? "ring-2 ring-blue-500 shadow-lg scale-105"
                                : "hover:shadow-md hover:scale-102 opacity-80 hover:opacity-100"
                            }`}
                          >
                            <img
                              src={image.imageUrl}
                              alt={`Miniature ${index + 1}`}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.target.src =
                                  "https://via.placeholder.com/160x90?text=Image";
                              }}
                            />
                          </button>
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
              </div>
            </div>
          )}
        </div>

        {/* Points de navigation (mobile uniquement) */}
        {carDetails.images.length > 1 && (
          <div className="flex justify-center gap-2 mt-4 lg:hidden">
            {carDetails.images.map((_, index) => (
              <button
                key={index}
                onClick={() => setSelectedImageIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${
                  selectedImageIndex === index
                    ? "bg-blue-600 w-6"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default CarImages;
