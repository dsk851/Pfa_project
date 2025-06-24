import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageCircle, Mail, User } from "lucide-react";

function UserDetails({ data }) {
  console.log("data", data);

  // Fonction pour générer les initiales à partir du nom complet
  const getInitials = (fullName) => {
    if (!fullName) return "U";
    return fullName
      .split(" ")
      .map((name) => name.charAt(0).toUpperCase())
      .join("")
      .slice(0, 2);
  };

  // Gestion des cas où data est null/undefined
  if (!data) {
    return (
      <div className="w-full flex flex-col shadow-md bg-white p-6 rounded-lg mt-4">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="w-16 h-16 bg-gray-200 rounded-full mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
          <div className="h-10 bg-gray-200 rounded w-full"></div>
        </div>
      </div>
    );
  }

  const handleSendMessage = () => {
    // Logique pour envoyer un message
    console.log("Sending message to:", data.email);
    // Vous pouvez ajouter ici votre logique d'envoi de message
  };

  return (
    <div className="w-full flex flex-col shadow-md bg-white p-6 rounded-lg mt-4 border border-gray-100 hover:shadow-lg transition-shadow duration-200">
      {/* En-tête */}
      <div className="flex items-center gap-2 mb-6">
        {/* <User className="w-5 h-5 text-blue-600" /> */}
        <h2 className="text-xl font-bold text-gray-900">
          Advertiser Information
        </h2>
      </div>

      {/* Avatar centré */}
      <div className="flex justify-center mb-6">
        <div className="relative">
          <Avatar className="w-20 h-20 ring-4 ring-blue-100 shadow-md">
            <AvatarImage
              src={data.image}
              alt={data.fullName || "Avatar utilisateur"}
              className="object-cover"
            />
            <AvatarFallback className="bg-blue-500 text-white text-lg font-semibold">
              {getInitials(data.fullName)}
            </AvatarFallback>
          </Avatar>
          {/* Indicateur de statut en ligne (optionnel) */}
          {/* <div className="absolute bottom-0 right-0 w-6 h-6 bg-green-500 border-2 border-white rounded-full"></div> */}
        </div>
      </div>

      {/* Informations de l'annonceur */}
      <div className="space-y-4 mb-6">
        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
          <User className="w-4 h-4 text-gray-500 flex-shrink-0" />
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">
              Full Name
            </p>
            <p className="text-sm font-medium text-gray-900">{data.fullName}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
          <Mail className="w-4 h-4 text-gray-500 flex-shrink-0" />
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">
              Email
            </p>
            <p className="text-sm font-medium text-gray-900 break-all">
              {data.email}
            </p>
          </div>
        </div>
      </div>

      {/* Bouton d'action */}
      <button
        onClick={handleSendMessage}
        disabled={!data.email}
        className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer"
      >
        <MessageCircle className="w-4 h-4" />
        Send a message
      </button>

      {/* Message d'état si pas d'email */}
      {!data.email && (
        <p className="text-xs text-gray-500 text-center mt-2">
          Adresse email requise pour envoyer un message
        </p>
      )}
    </div>
  );
}

export default UserDetails;
