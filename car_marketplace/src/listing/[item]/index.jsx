import React from "react";
import Header from "@/components/Header";
import SearchBar from "@/components/Search";
import { db } from "../../../configs";
import { CarImages, CarListing } from "../../../configs/schema";
import { useParams } from "react-router";
import { eq } from "drizzle-orm";
import { Skeleton } from "@/components/ui/skeleton";
import FormatResult from "../../shared/Service";
import HeaderDetails from "../components/HeaderDetails";
import CarImage from "../components/CarImage";
import Details from "../components/Details";
import Description from "../components/Description";
import Features from "../components/Features";
import Pricing from "../components/Pricing";
import UserDetails from "../components/UserDetails";
import Footer from "@/components/Footer";
import { useNavigate } from "react-router";
import FinanceCalculator from "../components/FinanceCalculator";

function SearchById() {
  const Navigate = useNavigate();
  const [data, setData] = React.useState([]);
  const { id } = useParams();
  const [carDetails, setCarDetails] = React.useState([]);

  const fetchData = async (id) => {
    const result = await db
      .select()
      .from(CarListing)
      .leftJoin(CarImages, eq(CarListing.id, CarImages.carListingId))
      .where(eq(CarListing.id, id));
    console.log("resulat", result);
    const resp = FormatResult(result);
    console.log("response formate 1", resp);

    setData((prevData) => ({
      ...prevData,
      email: resp[0]?.createdBy,
      fullName: resp[0]?.username,
      image: resp[0]?.userImageUrl,
    }));
    setCarDetails(resp[0]);
  };

  React.useEffect(() => {
    fetchData(id);
  }, [id]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Container principal avec padding responsive */}
      <div className="flex-grow px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 mt-4">
        {/* Bouton de retour (optionnel - décommenté si nécessaire) */}
        {/* <div className="flex justify-end mb-4">
          <button 
            onClick={() => Navigate("/profil")} 
            className="px-4 py-2 text-sm md:text-base bg-white border border-blue-900 text-blue-900 rounded-lg hover:bg-blue-50 transition-all duration-300 font-medium"
          >
            ← Retour aux annonces
          </button>
        </div> */}

        {/* Header details */}
        <div className="mb-6">
          <HeaderDetails carDetails={carDetails} />
        </div>

        {/* Grille principale responsive */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Colonne de gauche - Contenu principal */}
          <div className="lg:col-span-2 space-y-6">
            {/* Images de la voiture */}
            <div className="w-full">
              <CarImage carDetails={carDetails} />
            </div>

            {/* Caractéristiques */}
            <div className="w-full">
              <Details carDetails={carDetails} />
            </div>
            {/*Finance calculator*/}
            <div className="w-full">
              <FinanceCalculator carDetails={carDetails} />
            </div>
          </div>

          {/* Colonne de droite - Informations complémentaires */}
          <div className="lg:col-span-1 space-y-6">
            {/* Prix - Affiché en premier sur mobile */}
            <div className="order-1 lg:order-none">
              <Pricing carDetails={carDetails} />
            </div>

            {/* Description */}
            <div className="order-3 lg:order-none">
              <Description carDetails={carDetails} />
            </div>
            {/* Détails de la voiture */}
            <div className="order-4 lg:order-none">
              <Features carDetails={carDetails} />
            </div>

            {/* Détails du vendeur */}
            <div className="order-2 lg:order-none">
              <UserDetails data={data} />
            </div>
          </div>
        </div>

        {/* Espacement avant le footer */}
        <div className="mt-12 lg:mt-16"></div>
      </div>

      <Footer />
    </div>
  );
}

export default SearchById;
