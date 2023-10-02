import React, { useEffect, useState } from "react";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { db } from "@/firebase/config";
import { FaEdit, FaPencilAlt } from "react-icons/fa";
import { useRouter } from "next/router";
import BarChart from "@/components/BarChart";
import Loader from "@/components/Loader";
import { toast } from "react-hot-toast";
import { Fragment } from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Select,
  Option,
  Input,
  Card,
  Textarea,
} from "@material-tailwind/react";
import { Bar } from "react-chartjs-2";
import { nanoid } from "nanoid";

const TankDetail = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);
  const router = useRouter();
  const { id } = router.query;
  const [tank , setTank] = useState(null);
  const [pump, setPump] = useState({
    id: nanoid(),
    name: "",

    });

  


const fetchTank = async () => {
    setLoading(true);

     try {
      //fetch tank  details realtime form firestore
        const docRef = doc(db, "tanks", id);
        const docSnap = await onSnapshot(docRef, (doc) => {

            if (doc.exists()) {
                console.log("Document data:", doc.data());
                setTank(doc.data());
                setLoading(false);
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");

                setLoading(false);
                toast.error(
                    "Unable to provide data check your internet connection and try again"
                );
            }
        });
    } catch (error) {
        setLoading(false);
    }
};


        


useEffect(() => {
    fetchTank();
}, [id]);



 const handleAddPump = async (e) => {
   e.preventDefault(); // Prevents the default form submission behavior

   try {
     if (pump.name.trim() !== "") {
       // Update the tank's pumps array
       const updatedTank = {
         ...tank,
         pumps: [...tank.pumps, pump], // Add the new pump to the pumps array
       };

       const docRef = doc(db, "tanks", id);
       await setDoc(docRef, updatedTank);

       // Close the dialog and reset the pump state
       setPump({
         id: nanoid(),
         name: "",
       });
       handleOpen();
       toast.success("Pump added successfully!");
     } else {
       toast.error("Pump name cannot be empty.");
     }
   } catch (error) {
     console.error("Error adding pump:", error);
     toast.error("An error occurred while adding the pump.");
   }
 };


  



  return (
    <div className="p-8 w-full shadow-lg">
      <div>
        <h2 className="font-bold text-xl">Tank Details</h2>

        <>
          <div className="flex justify-between py-14 max-w-4xl">
            <div className="">
              <p className="text-lg">Tank Details</p>
              <p className="text-gray-500">
                You can view and edit tank details here
              </p>
            </div>
            <div className="sm:px-10 flex items-center">
              <button className="py-2 px-8 bg-blue-500 rounded text-white">
                Edit
              </button>
              <div className="mx-2">
                <button className="py-2 px-4 bg-white rounded-md text-blue-500 border-blue-500 border-2 ">
                  Add Pump
                </button>
              </div>
            </div>
          </div>
          <div>
            <hr className="" />
            <div className="py-8 flex justify-between max-w-xl">
              <p>
                <span className="font-bold text-gray-700">Name:</span>
              </p>
              <p className="">
''
              </p>
            </div>
            <hr />
          </div>
          <div>
            <hr className="" />
            <div className="py-8 flex justify-between max-w-xl">
              <p>
                <span className="font-bold text-gray-700">Content:</span>
              </p>
              <p className="">
                /
              </p>
            </div>
            <hr />
          </div>
          <div>
            <hr className="" />
          </div>
          <div>
            <hr className="" />
            <div className="py-8 flex justify-between max-w-xl">
              <p>
                <span className="font-bold text-gray-700">Volume:</span>
              </p>
              <p className="">
                ''
                gal</p>
            </div>
            <hr />
          </div>
          <div>
            <hr className="" />
            <div className="py-8 flex justify-between max-w-xl">
              <p>
                <span className="font-bold text-gray-700">Pumps:</span>
              </p>
              <p className="">
                <ul>
                  <li>Pump 1</li>
                  <li>Pump 2</li>
                  <li>Pump 3</li>
                </ul>
              </p>
            </div>
            <hr />
          </div>
          <div>
            <hr className="" />
            <div className="py-8 flex justify-between max-w-xl">
              <p>
                <span className="font-bold text-gray-700">
                  Refilled History
                </span>
              </p>
              <p className="">
                <ul>
                  <li>12/12/2021</li>
                  <li>12/12/2021</li>
                  <li>12/12/2021</li>
                </ul>
              </p>
            </div>
            <hr />
          </div>
        </>
      </div>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>
            Add Pump  
        </DialogHeader>
        <DialogBody divider>
          <form onSubmit={handleAddPump}>
            <div className="grid grid-cols-1 gap-6 mt-4">
              <label className="block">
                <span className="text-gray-700">
                    Pump Name
                </span>
                <Input
                  type="text"
                  name="name"
                  id="name"
                  required
                  value={pump ? pump.name : ""}
                  onChange={(e) =>
                    setPump({ ...pump, name: e.target.value })
                  }
                  className="block w-full mt-1 form-input py-3 border-2 rounded "
                />
              </label>
            

             
            </div>
            <div className="flex justify-end mt-6">
              <button
                type="button"
                onClick={handleOpen}
                className="px-4 py-2 text-sm font-medium text-gray-700 transition-colors duration-150 bg-gray-200 border border-transparent rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 ml-4 text-sm font-medium text-white transition-colors duration-150 bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Save Changes
              </button>
            </div>
          </form>
        </DialogBody>
      </Dialog>
    </div>
  );
   
};

export default TankDetail;
