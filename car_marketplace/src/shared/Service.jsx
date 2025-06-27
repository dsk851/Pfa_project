import axios from "axios";

const Sendbird_app_id = import.meta.env.VITE_SENDBIRD_APP_ID;
const Sendbird_api_token = import.meta.env.VITE_SENDBIRD_API_TOKEN;

export const FormatResult = (resp) => {
  let result = [];
  let finalResult = [];

  resp.forEach((item) => {
    const listingId = item.car_listing?.id;
    if (!result[listingId]) {
      result[listingId] = {
        car: item.car_listing,
        images: [],
      };
    }

    if (item.car_images) {
      result[listingId].images.push(item.car_images);
    }
  });

  result.forEach((item) => {
    finalResult.push({
      ...item.car,
      images: item.images,
    });
  });

  return finalResult;
};

export const CreateSendBirdUser=(client)=>{
  return axios.post(
    `https://api-${Sendbird_app_id}.sendbird.com/v3/users`,
    {
      "user_id": client?.userId,
      "nickname": client?.nickname,
      "profile_url": client?.profileUrl,
      "issue_access_token": false,
      "session_token_expires_at": Date.now() + 86400000,
      "metadata": {
        "font_preference": "candara",
        "font_color": "black",
      },
    },
    {
      headers: {
        'Content-Type': "application/json",
        'Api-Token': Sendbird_api_token,
      },
    }
  );
    }

export const createChannel = (client, owner, channel_name) => {
      // ✅ Adaptation pour supporter différents formats d'objets
      const clientUserId = client?.userId || client?.user_id;
      const ownerUserId = owner?.userId || owner?.user_id;
      const clientNickname = client?.nickname;
      const ownerNickname = owner?.nickname || "Owner";
      const clientProfileUrl =
        client?.profileUrl ||
        client?.profile_url ||
        "https://robohash.org/mail@ashallendesign.co.uk";
      const ownerProfileUrl =
        owner?.profileUrl ||
        owner?.profile_url ||
        "https://robohash.org/mail@ashallendesign.co.uk";

      console.log("Creating channel with:", {
        clientUserId,
        ownerUserId,
        channel_name,
      });

      return axios.post(
        `https://api-${Sendbird_app_id}.sendbird.com/v3/group_channels`,
        {
          name: channel_name,
          // ✅ Générer une URL unique pour chaque channel
          channel_url: `private_chat_${clientUserId}_${ownerUserId}_${Date.now()}`,
          cover_url: "https://sendbird.com/main/img/cover/cover_08.jpg",
          user_ids: [clientUserId, ownerUserId],
          is_distinct: false,
          is_public: false,
          is_super: false,
          is_ephemeral: false,
          is_access_code_required: false,
          joined_member_count: 2, // ✅ Correction: 2 membres au lieu de 1
          unread_mention_count: 0,
          members: [
            {
              user_id: clientUserId,
              nickname: clientNickname,
              profile_url: clientProfileUrl,
              role: "operator",
              metadata: {
                font_preference: "candara",
                font_color: "black",
              },
            },
            // ✅ Ajout du propriétaire dans les membres aussi
            {
              user_id: ownerUserId,
              nickname: ownerNickname,
              profile_url: ownerProfileUrl,
              role: "operator",
              metadata: {
                font_preference: "candara",
                font_color: "black",
              },
            },
          ],
          operators: [
            {
              user_id: clientUserId,
              nickname: clientNickname,
              profile_url: clientProfileUrl,
            },
            {
              user_id: ownerUserId,
              nickname: ownerNickname,
              profile_url: ownerProfileUrl,
            },
          ],
        },
        {
          headers: {
            "Content-Type": "application/json",
            "Api-Token": Sendbird_api_token,
          },
        }
      );
    }

export const createChannelWithCheck = async (
      client,
      owner,
      channel_name
    ) => {
      const clientUserId = client?.userId || client?.user_id;
      const ownerUserId = owner?.userId || owner?.user_id;

      try {
        
        const existingChannels = await axios.get(
          `https://api-${Sendbird_app_id}.sendbird.com/v3/users/${clientUserId}/my_group_channels`,
          {
            headers: {
              "Content-Type": "application/json",
              "Api-Token": Sendbird_api_token,
            },
            params: {
              members_include_in: ownerUserId,
              limit: 100,
            },
          }
        );

        
        const duplicateChannel = existingChannels.data.channels?.find(
          (channel) => channel.name === channel_name
        );

        if (duplicateChannel) {
          console.log(
            "⚠️ Canal existant trouvé avec le même nom:",
            duplicateChannel.name
          );

          
          return {
            data: duplicateChannel,
            isExisting: true,
          };
        }

        
        console.log("✅ Création d'un nouveau canal:", channel_name);
        const newChannel = await createChannel(client, owner, channel_name);

        return {
          data: newChannel.data,
          isExisting: false,
        };
      } catch (error) {
        console.error(
          "Erreur lors de la vérification/création du canal:",
          error
        );
        throw error;
      }
    };