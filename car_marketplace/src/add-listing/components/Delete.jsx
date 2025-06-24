import React from 'react'
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { FaTrash } from "react-icons/fa";
import { db } from '../../../configs';
import { CarListing } from '../../../configs/schema';
import { useNavigate } from 'react-router';
import { eq } from 'drizzle-orm';
import { toast } from "sonner";
import { useState } from 'react';



function Delete({id}) {
  const [carImages, setCarImages] = useState([]);
     const navigate = useNavigate();
    const handleDelete = async () => {
        try {
            const images = await db.delete(CarListing).where(eq(CarListing.id,id)).returning(CarListing.carImages);
            setCarImages(images);
            console.log("carImages", carImages);
            toast.success("Listing deleted successfully");
            navigate("/profil", { replace: true });
            window.location.reload();
        } catch (error) {
            console.error("Error deleting listing:", error);
        }
    };

return (
  <div>
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">
          <FaTrash />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            listing and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            className="bg-red-600 text-white hover:bg-red-700"
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  </div>
);
}

export default Delete