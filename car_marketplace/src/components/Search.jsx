import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { FaSearch, FaRedo } from "react-icons/fa";
import Data from "@/shared/Data";
import { useState } from "react";
import { Link } from "react-router";

function Search() {
  const [cars, setCars] = useState("");
  const [make, setMake] = useState("");
  const [price, setPrice] = useState("");

  // Vérifie si au moins une option est sélectionnée
  const isAtLeastOneSelected = cars !== "" || make !== "" || price !== "";

  // Crée l'URL de recherche basée sur les paramètres sélectionnés
  const buildSearchUrl = () => {
    const params = [];

    if (cars !== "") params.push(`cars=${cars}`);
    if (make !== "") params.push(`make=${make}`);
    if (price !== "") params.push(`price=${price}`);

    return `/search?${params.join("&")}`;
  };

  // Fonction pour réinitialiser tous les champs
  const handleRefresh = () => {
    setCars("");
    setMake("");
    setPrice("");
  };

  return (
    <div className="flex justify-center w-full px-2 py-4 sm:py-6">
      <div
        className="bg-white rounded-lg md:rounded-full flex flex-col sm:flex-row sm:justify-between gap-3 p-3 md:p-5 items-center 
                     w-full max-w-[90%] sm:max-w-[95%] md:max-w-[720px] lg:max-w-[850px] shadow-lg 
                     transition-all duration-300"
      >
        {/* Car Status Select */}
        <div className="w-full sm:flex-1 md:flex-none md:w-[22%]">
          <Select value={cars} onValueChange={(value) => setCars(value)}>
            <SelectTrigger className="w-full border border-gray-300 rounded-md h-11 md:h-12">
              <SelectValue placeholder="Cars" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="New">New</SelectItem>
              <SelectItem value="Used">Used</SelectItem>
              <SelectItem value="Certified Pre-Owned">
                Certified Pre-Owned
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Separator
          orientation="vertical"
          className="hidden sm:block h-7 md:h-8 border-gray-300"
        />

        {/* Car Brand Select */}
        <div className="w-full sm:flex-1 md:flex-none md:w-[30%]">
          <Select value={make} onValueChange={(value) => setMake(value)}>
            <SelectTrigger className="w-full border border-gray-300 rounded-md h-11 md:h-12">
              <SelectValue placeholder="Car Brands" />
            </SelectTrigger>
            <SelectContent className="max-h-[200px] overflow-y-auto">
              {Data.carMakes.map((make) => (
                <SelectItem key={make.id} value={make.name}>
                  {make.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Separator
          orientation="vertical"
          className="hidden sm:block h-7 md:h-8 border-gray-300"
        />

        {/* Pricing Select */}
        <div className="w-full sm:flex-1 md:flex-none md:w-[22%]">
          <Select value={price} onValueChange={(value) => setPrice(value)}>
            <SelectTrigger className="w-full border border-gray-300 rounded-md h-11 md:h-12">
              <SelectValue placeholder="Pricing" />
            </SelectTrigger>
            <SelectContent>
              {Data.Pricing.map((price) => (
                <SelectItem key={price.id} value={price.amount}>
                  {price.amount}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="w-full sm:w-auto sm:flex-none md:w-[16%] flex justify-center gap-2 mt-2 sm:mt-0 md:ml-2">
          {/* Bouton de rafraîchissement */}
          <button
            onClick={handleRefresh}
            className="rounded-full bg-gray-200 text-gray-600 
                     hover:bg-gray-300 active:bg-gray-400 transition-all duration-200 
                     flex items-center justify-center w-10 h-10 md:w-11 md:h-11"
            title="Rafraîchir les sélections"
          >
            <FaRedo className="text-sm" />
          </button>

          {/* Bouton de recherche */}
          {isAtLeastOneSelected ? (
            <Link to={buildSearchUrl()} className="text-black">
              <button
                className="rounded-full bg-primary text-white 
                           hover:bg-blue-600 active:bg-blue-700 transition-all duration-200 
                           flex items-center justify-center w-10 h-10 md:w-11 md:h-11"
              >
                <FaSearch className="text-lg" />
              </button>
            </Link>
          ) : (
            <button
              className="rounded-full bg-primary text-white 
                         hover:bg-blue-600 active:bg-blue-700 transition-all duration-200 
                         flex items-center justify-center w-10 h-10 md:w-11 md:h-11"
              disabled={!isAtLeastOneSelected}
            >
              <FaSearch className="text-lg" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Search;
