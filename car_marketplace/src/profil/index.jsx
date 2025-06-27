import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import MyListing from "./components/MyListing";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ChatBox from "./components/Chatbox";
import { useUser, SignInButton, UserProfile } from "@clerk/clerk-react";
import { useSearchParams } from "react-router";

function Profile() {
  const { user, isSignedIn } = useUser();
  const [tab, setTab] = useState("my_listing");
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const tabParam = searchParams.get("tab");
      setTab(tabParam || "my_listing");
  }, [searchParams]);

  return (
    <div className="mt-10 pt-10">
      {isSignedIn ? (
        <div>
          <Header />
          <div className="mt-5 mx-5">
            <Tabs
              defaultValue="my_listing"
              value={tab}
              onValueChange={setTab}
              className="w-full"
            >
              <TabsList>
                <TabsTrigger value="my_listing">My listing</TabsTrigger>
                <TabsTrigger value="my_profil">My Profile</TabsTrigger>
                <TabsTrigger value="inbox">InBox</TabsTrigger>
              </TabsList>

              <TabsContent value="my_listing" className="w-full">
                <MyListing />
              </TabsContent>

              <TabsContent value="my_profil" className="w-full">
                
                      <UserProfile
                        appearance={{
                          elements: {
                            rootBox: "w-full",
                            card: "shadow-none border-none",
                            formButtonPrimary: "bg-blue-600 hover:bg-blue-700",
                          },
                        }}
                      />
                    
              </TabsContent>

              <TabsContent value="inbox" className="w-full">
                <ChatBox />
              </TabsContent>
            </Tabs>
          </div>
          <Footer />
        </div>
      ) : (
        <div className="items-center justify-center h-screen">
          <Header />
          <div className="flex flex-col items-center justify-center h-[250px]">
            <h2 className="text-xl font-bold mb-4">
              Please Sign In to access your profile
            </h2>
            <SignInButton mode="modal" forceRedirectUrl="/">
              <Button>Sign In</Button>
            </SignInButton>
          </div>
          <Footer />
        </div>
      )}
    </div>
  );
}

export default Profile;
