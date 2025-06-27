import React, { useState } from "react";
import { SendBirdProvider } from "@sendbird/uikit-react";
import "@sendbird/uikit-react/dist/index.css";
import { useUser } from "@clerk/clerk-react";
import { GroupChannelList } from "@sendbird/uikit-react/GroupChannelList";
import { GroupChannel } from "@sendbird/uikit-react/GroupChannel";
import { MessageCircle } from "lucide-react";

function Chatbox() {
  const { user } = useUser();
  const userId = user?.primaryEmailAddress?.emailAddress?.split("@")[0];
  const [channelUrl, setChannelUrl] = useState(null);


  const handleChannelSelect = (channel) => {
    setChannelUrl(channel?.url);
  };



  return (
    <div className="p-2 sm:p-4 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          <SendBirdProvider
            appId={import.meta.env.VITE_SENDBIRD_APP_ID}
            userId={userId}
            nickname={user?.fullName}
            profileUrl={user?.imageUrl}
            allowProfileEdit={true}
          >
            {/* Layout Desktop */}
            <div className="flex flex-col lg:grid lg:grid-cols-3 h-[600px]">
              {/* Liste des conversations */}
              <div className="lg:col-span-1 border-b lg:border-b-0 lg:border-r bg-gray-50 h-1/2 lg:h-auto">
                <div className="p-4 border-b bg-white">
                  <div className="flex items-center space-x-3">
                    <MessageCircle className="w-5 h-5 text-blue-600" />
                    <h2 className="font-semibold text-gray-900">
                      Conversations
                    </h2>
                  </div>
                </div>
                <div className="h-full overflow-auto">
                  <GroupChannelList
                    onChannelSelect={handleChannelSelect}
                    channelListQueryParams={{
                      includeEmpty: true,
                      showFrozen: true,
                      showCoverImage: true,
                      showLastMessage: true,
                    }}
                  />
                </div>
              </div>

              {/* Zone de chat */}
              <div className="lg:col-span-2 flex-1 bg-white h-1/2 lg:h-auto overflow-hidden">
                {channelUrl ? (
                  <GroupChannel channelUrl={channelUrl} />
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-gray-500 p-8">
                    <MessageCircle className="w-16 h-16 text-gray-300 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      Aucune conversation sélectionnée
                    </h3>
                    <p className="text-center text-gray-500">
                      Choisissez une conversation dans la liste pour commencer à
                      discuter
                    </p>
                  </div>
                )}
              </div>
            </div>
          </SendBirdProvider>
        </div>
      </div>
    </div>
  );
}

export default Chatbox;
