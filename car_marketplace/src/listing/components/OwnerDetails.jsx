import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageCircle, Mail, User } from "lucide-react";
import { useUser } from "@clerk/clerk-react";
import { CreateSendBirdUser, createChannelWithCheck } from "@/shared/Service";
import { useNavigate } from "react-router";

function OwnerDetails({ data }) {
  // console.log("OwnerDetails data:", data);
  const { user } = useUser();
  const navigation = useNavigate(); 

  const title = data?.listing_title || "No title provided";
  const ownerId = data?.email?.split("@")[0];

  
  const userId = user?.primaryEmailAddress?.emailAddress?.split("@")[0] ;

  const handleSendMessage = async () => {
    try {
      let clientResponse = null;
      let ownerResponse = null;

      try {
        const nickname = user?.fullName;
        const profileUrl = user?.imageUrl;

        console.log("Creating SendBird user with:", {
          userId: userId,
          nickname: nickname,
          profileUrl: profileUrl,
        });

        clientResponse = await CreateSendBirdUser({
          userId: userId,
          nickname: nickname,
          profileUrl: profileUrl,
        });

        // console.log("SendBird user created:", clientResponse);
      } catch (error) {
        console.error("Error creating SendBird user:", error);

        if (error.response?.status !== 400) {
          throw error;
        }
        console.log("User might already exist, continuing...");
      }


      try {
        const ownerNickname = data?.fullName || ownerId;
        const ownerProfileUrl =
          data?.image || "https://robohash.org/mail@ashallendesign.co.uk";

        console.log("Creating SendBird user(owner) with:", {
          userId: ownerId, 
          nickname: ownerNickname,
          profileUrl: ownerProfileUrl,
        });

        ownerResponse = await CreateSendBirdUser({
          userId: ownerId, 
          nickname: ownerNickname,
          profileUrl: ownerProfileUrl,
        });

        // console.log("SendBird user(owner) created:", ownerResponse);
      } catch (error) {
        console.error("Error creating SendBird user (owner):", error);
        
        if (error.response?.status !== 400) {
          throw error;
        }
        console.log("Owner might already exist, continuing...");
      }

    
      try {
        // console.log(
        //   "Creating channel with ownerId:",
        //   ownerId,
        //   "and userId:",
        //   userId
        // );

        
        const clientData = {
          userId: userId,
          nickname: user?.fullName || user?.firstName || userId,
          profileUrl: user?.imageUrl || user?.image || null,
        };

        const ownerData = {
          userId: ownerId,
          nickname: data?.fullName || ownerId,
          profileUrl:
            data?.image || "https://robohash.org/mail@ashallendesign.co.uk",
        };

        const channelResponse = await createChannelWithCheck(
          clientData,
          ownerData,
          title
        );

        // console.log("Channel created successfully:", channelResponse);
        navigation("/profil?tab=inbox");
      } catch (error) {
        console.error("Error creating channel:", error);
        console.error("Channel creation error details:", error.response?.data);
        throw error;
      }
    } catch (error) {
      console.error("Global error in handleSendMessage:", error);
      
    }
  };

  const getInitials = (name) => {
    if (!name) return "";
    const parts = name.split(" ");
    if (parts.length === 1) {
      return parts[0].charAt(0).toUpperCase();
    }
    
    return parts.map((part) => part.charAt(0).toUpperCase()).join("");
  };

  return (
    <div className="w-full flex flex-col shadow-md bg-white p-6 rounded-lg mt-4 border border-gray-100 hover:shadow-lg transition-shadow duration-200">

      <div className="flex items-center gap-2 mb-6">
        <h2 className="text-xl font-bold text-gray-900">
          Advertiser Information
        </h2>
      </div>


      <div className="flex justify-center mb-6">
        <div className="relative">
          <Avatar className="w-20 h-20 ring-4 ring-blue-100 shadow-md">
            <AvatarImage
              src={data?.image}
              alt={data?.fullName || "Avatar utilisateur"}
              className="object-cover"
            />
            <AvatarFallback className="bg-blue-500 text-white text-lg font-semibold">
              {getInitials(data.fullName)}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>


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

      <button
        onClick={handleSendMessage}
        disabled={!data.email || !userId}
        className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer"
      >
        <MessageCircle className="w-4 h-4" />
        Send a message
      </button>
    </div>
  );
}

export default OwnerDetails;
