import React, { Fragment, use, useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Progress,
  Option,
  Select,
} from "@material-tailwind/react";
import { toast } from "react-hot-toast";
import {
  Timestamp,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { db, storage } from "@/firebase/config";
import { nanoid } from "nanoid";

const AddCredit = () => {
  const [open, setOpen] = useState(false);


  const handleOpen = () => setOpen(!open);
  const [user, setUser] = useState(null);

  const [credit, setCredit] = useState({
    id: nanoid(),
    
    fuel_type: "",
    name: "",
    amount: 0,
    phone_number: " ",
    date: "",
    location: "",
    station: "",

  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setUser(user);
  }, []);

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    setCredit({ ...credit, [name]: value });
  };

  

  const handleAddCredit = async (e) => {
    e.preventDefault();

    try {
      const docRef = doc(db, "creditors", credit.id);
      const creditData = {
        id: credit.id,
        fuel_type: credit.fuel_type,
        name: credit.name,
        location: credit.location,
        amount: parseInt(credit.amount),
        phone_number: credit.phone_number,
        date: credit.date,
        station: user?.station_id,
      };

      await setDoc(docRef, creditData);
      toast.success("Credit added  successfully");

      handleOpen();

      //empty fields
      setCredit({
        id: nanoid(),
        //this takes an integer
        fuel_type: "",
        name: "",
        amount:0,
        phone_number: " ",
        date: "",

      });

    } catch (error) {
      console.log(error);
      alert(error.message);
      toast.error(error.message);
    }
  };

  return (
    <div>
      <div className="flex justify-between px-4 pt-8">
        <div className="flex items-center">
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-lg "
            onClick={handleOpen}
          >
            Add Creditor
          </button>
        </div>
      </div>

      <Dialog
        open={open}
        handler={handleOpen}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
      >
        <DialogHeader>
          <h5 className="font-bold text-blue-400">Add Creditor</h5>
        </DialogHeader>
        <DialogBody divider>
          <form onSubmit={handleAddCredit}>
          

            <div class="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-3">
              <div>
                <label class="text-gray-700 dark:text-gray-200" for="username">
                  Creditor's name
                </label>
                <input
                  value={credit.name}
                  id="username"
                  type="text"
                  name="name"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                  onChange={
                    (e) => setCredit({ ...credit, name: e.target.value })
                  }
                />
              </div>

              <div>
                <label
                  class="text-gray-700 dark:text-gray-200"
                  for="emailAddress"
                >
                  Creditor's phone
                </label>
                <input
                  value={credit.phone_number}
                  id="emailAddress"
                  type="text"
                  class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                  name="phone_number"
                  onChange={(e) =>
                    setCredit({ ...credit, phone_number: e.target.value })
                  }
                />
              </div>

              <div>
                <label
                  class="text-gray-700 dark:text-gray-200"
                  for="emailAddress"
                >
                  Location
                </label>
                <input
                  value = {credit.location}
                  id="emailAddress"
                  type="text"
                  class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                  name="location"
                  onChange={(e) =>
                    setCredit({ ...credit, location: e.target.value })
                  }
                />
              </div>
            </div>

            <div class="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-3">
              <div>
                <label class="" for="password">
                  Amount (Ghc)
                </label>
                <input
                  id="contact"
                  type="text"
                  class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                  name="amount"
                  value={credit.amount}
                  onChange={(e) =>
                    setCredit({ ...credit, amount: e.target.value })
                  }
                />
              </div>

             
              <div>
                <label class="" for="">
                  Fuel Type
                </label>
                <select
                  onChange={handleSelectChange}
                  name="fuel_type"
                  class="block w-full px-4 py-3 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                >
                  <option disabled value={" "}>
                    Select Fuel Type
                  </option>
                  <option value={"Super"}>Super</option>
                  <option value={"Diesel"}>Diesel</option>
                  <option value={"Kerosene"}>Kerosene</option>
                </select>
              </div>


             

              <div>
                <label for="loading">Date</label>
                <input
                  id="loading"
                  type="date"
                  class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                  value={credit.date}
                  onChange={(e) =>
                    setCredit({ ...credit, date: e.target.value })
                  }
                />
              </div>

            

             
            
            </div>
            <div className="w-full h-full flex justify-center my-8">
              <button className=" py-4 w-full bg-green-500 text-white hover:bg-green-600 font-bold text-lg rounded-md">
                Submit
              </button>
            </div>
          </form>
        </DialogBody>
      </Dialog>
    </div>
  );
};

export default AddCredit
