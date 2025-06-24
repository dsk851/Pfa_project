import React from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router'
import MyListing from './components/MyListing'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"


function Profile() {
return (
<div>
    <Header />
    <div className='mt-5 mx-5'>
        <Tabs defaultValue="my_listing" className="w-full">
            <TabsList>
                <TabsTrigger className='' value="my_listing">My listing</TabsTrigger>
                <TabsTrigger className='m-4' value="my_profil">Profil</TabsTrigger>
                <TabsTrigger className='' value="inbox">InBox</TabsTrigger>
            </TabsList>
            <TabsContent value="my_listing" className='w-full'>
              <MyListing />
            </TabsContent>
            <TabsContent value="my_profil">My profil</TabsContent>
            <TabsContent value="inbox">Inbox</TabsContent>
        </Tabs>
    </div>
    <Footer/>
</div>

)
}

export default Profile
