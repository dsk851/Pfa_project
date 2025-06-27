import React from "react";
import carDetailsData from "./../../shared/carDetailsData.json";
import IconField from "../../../src/add-listing/components/IconField";

function Details({ carDetails }) {
  // Créer une copie pour éviter de modifier l'objet original
  const filteredDetails = { ...carDetails };
  delete filteredDetails.images;
  delete filteredDetails.features;
  delete filteredDetails.id;
  delete filteredDetails.title;
  delete filteredDetails.description;
  delete filteredDetails.tagline;

  console.log("carDetails", filteredDetails);

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden mt-4 sm:mt-6 mx-2 sm:mx-0">
      {/* En-tête avec gradient */}
      <div className="px-3 sm:px-4 md:px-6 py-3 sm:py-4">
        <h2 className="text-lg sm:text-xl font-bold text-black flex items-center">
          Car Details
        </h2>
      </div>

      {/* Contenu principal */}
      <div className="p-3 sm:p-4 md:p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
          {carDetailsData.carDetailsData.map((item, index) => {
            const value = filteredDetails[item.name];

            if (value) {
              return (
                <div
                  key={index}
                  className="group bg-gray-50 hover:bg-blue-50 rounded-lg p-3 sm:p-4 transition-all duration-200 hover:shadow-md border border-gray-200 hover:border-blue-200"
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
                    <div className="flex-shrink-0">
                      <IconField icon={item.icon} label={item.label} />
                    </div>

                    {/* Contenu textuel */}
                    <div className="flex-1 min-w-0 w-full">
                      <p className="text-xs sm:text-sm font-medium text-gray-600 mb-1">
                        {item.label}
                      </p>
                      <p className="text-sm sm:text-base font-semibold text-gray-900 break-words">
                        {value}
                      </p>
                    </div>
                  </div>
                </div>
              );
            }

            return null;
          })}
        </div>

        {/* Message si aucun détail n'est disponible */}
        {carDetailsData.carDetailsData.filter(
          (item) => filteredDetails[item.name]
        ).length === 0 && (
          <div className="text-center py-6 sm:py-8">
            <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <svg
                className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2">
              Aucun détail disponible
            </h3>
            <p className="text-sm sm:text-base text-gray-500 px-4">
              Les informations détaillées du véhicule ne sont pas encore
              disponibles.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Details;
