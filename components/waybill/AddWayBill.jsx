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

const AddWayBill = () => {
  const [open, setOpen] = useState(false);
  const [tanks, setTanks] = useState([]);
  const [loading, setLoading] = useState(false);
  

  const handleOpen = () => setOpen(!open);
  const [user, setUser] = useState(null);
  const [purchase, setPurchase] = useState({
    id: nanoid(),
    //this takes an integer
    fuel_type: "",
    supplier: "",
   initial_quantity: "",
    profit: "",
    delivered_quantity: "",
    receipt: "",
    truck_number: "",
    driver: "",
    phone_number: "",
    loading_date: "",
    delivered_date: "",
    shipping_shortage: "",




    cost_litre: "",
    cost_total: "",
    sell_litre: "",
    date: "",
    station: "",
    amount: 0,
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setUser(user);
  }, []);

 

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    setPurchase({ ...purchase, [name]: value });



  };


  const handleUploadFile = async (e) => {
    const file = e.target.files[0];
    const storageRef = storage.ref();
    const fileRef = storageRef.child(file.name);
    await fileRef.put(file);
    const fileUrl = await fileRef.getDownloadURL();
    setPurchase({ ...purchase, receipt: fileUrl });

  };


  const handleAddPurchase = async (e) => {
    e.preventDefault();

    try {
      const docRef = doc(db, "purchases", purchase.id);
      const purchaseData = {
        id: purchase.id,
        fuel_type: purchase.fuel_type,
        supplier: purchase.supplier,
        receipt: purchase.receipt,
        loading_date: purchase.loading_date,
        delivered_date: purchase.delivered_date,
        initial_quantity: purchase.initial_quantity,
        delivered_quantity: purchase.delivered_quantity,
        shipping_shortage: parseInt(purchase.initial_quantity - purchase.delivered_quantity),
        cost_litre: purchase.cost_litre,
        sell_litre: purchase.sell_litre,
        profit: (purchase.sell_litre - purchase.cost_litre) * purchase.delivered_quantity,
        date: purchase.date,
        station: user?.station_id,
      };

      await setDoc(docRef, purchaseData);
      toast.success("Purchase created successfully");

      handleOpen();

      //empty fields
      setPurchase({
        id: nanoid(),
        //this takes an integer
        fuel_type: "",  
        supplier: "",

        initial_quantity: "",
        profit: "",
        delivered_quantity: "",
        receipt: "",
        truck_number: "",
        driver: "",
        phone_number: "",
        loading_date: "",
        delivered_date: "",
        shipping_shortage: "",

        cost_litre: "",
        cost_total: "",
        sell_litre: "",
        date: "",
        station: "",
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
            Add Waybill
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
          <h5 className="font-bold text-blue-400">Add Waybill</h5>
        </DialogHeader>
        <DialogBody divider>
          <form onSubmit={handleAddPurchase}>
            {/* <div className="">
              <label class="block text-sm font-medium ">Upload Receipt</label>
              <div class="mt-1 flex justify-center px-6 pt-2 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div class="space-y-1 text-center">
                  
                  <div class="flex text-sm text-gray-600">
                    <label
                      for="file-upload"
                      class="relative cursor-pointer rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                    >
                      <span class="">Upload a file</span>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        class="sr-only"
                        onChange={handleUploadFile}

                        value={purchase.receipt}

                         
                      />
                    </label>
                    <p class="pl-1">or drag and drop</p>
                  </div>
                </div>
              </div>
            </div> */}

            <div class="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-3">
              <div>
                <label class="text-gray-700 dark:text-gray-200" for="username">
                  Driver's name
                </label>
                <input
                  value={purchase.driver}
                  id="username"
                  type="text"
                  name="driver"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                  onChange={
                    (e) => setPurchase({ ...purchase, driver: e.target.value })
                    // handleInputChange(e)
                  }
                />
              </div>

              <div>
                <label
                  class="text-gray-700 dark:text-gray-200"
                  for="emailAddress"
                >
                  Truck number
                </label>
                <input
                  value={purchase.truck_number}
                  id="emailAddress"
                  type="text"
                  class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                  name="truck_number"
                  onChange={(e) =>
                    setPurchase({ ...purchase, truck_number: e.target.value })
                  }
                />
              </div>
            </div>

            <div class="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-3">
              <div>
                <label class="" for="password">
                  Driver's Phone
                </label>
                <input
                  id="contact"
                  type="text"
                  class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                  name="phone_number"
                  value={purchase.phone_number}
                  onChange={(e) =>
                    setPurchase({ ...purchase, phone_number: e.target.value })
                  }
                />
              </div>

              <div>
                <label class="" for="">
                  Supplier
                </label>
                <select
                  class="block w-full px-4 py-3 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                  onChange={handleSelectChange}
                  name="supplier"
                >
                  <option disabled>Select Supplier</option>
                  <option value={"OMC"}>OMC</option>
                  <option value={"BOST"}>BOST</option>
                </select>
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
                <label for="initial_quantity">Loading Quantity (litres)</label>
                <input
                  id=""
                  type="number"
                  class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                  min={0}
                  step={0.01}
                  placeholder="Quantity (litres)"
                  value={purchase.initial_quantity}
                  onChange={(e) =>
                    setPurchase({
                      ...purchase,
                      initial_quantity: parseFloat(e.target.value),
                    })
                  }
                />
              </div>
              <div>
                <label for="">Delivered Quantity(litres)</label>
                <input
                  min={0}
                  step={0.01}
                  placeholder="Quantity (litres)"
                  id="quantity"
                  onChange={(e) =>
                    setPurchase({
                      ...purchase,
                      delivered_quantity: parseFloat(e.target.value),
                    })
                  }
                  value={purchase.delivered_quantity}
                  type="number"
                  class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                />
              </div>
              <div>
                <label for="loading">Loading Date</label>
                <input
                  id="loading"
                  type="date"
                  class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                  value={purchase.loading_date}
                  onChange={(e) =>
                    setPurchase({ ...purchase, loading_date: e.target.value })
                  }
                />
              </div>

              <div>
                <label for="delivered">Delivered Date</label>
                <input
                  id="delivery_date"
                  type="date"
                  class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                  value={purchase.delivered_date}
                  onChange={(e) =>
                    setPurchase({ ...purchase, delivered_date: e.target.value })
                  }
                />
              </div>

              <div>
                <label for="">Cost per litre(Ghc)</label>
                <input
                  id="cost_litre"
                  min={0}
                  step={0.01}
                  type="number"
                  class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                  value={purchase.cost_litre}
                  onChange={(e) =>
                    setPurchase({
                      ...purchase,
                      cost_litre: parseFloat(e.target.value),
                    })
                  }
                />
              </div>
              <div>
                <label for="">Selling price Per litre</label>
                <input
                  min={0}
                  step={0.01}
                  id="cost_litre"
                  type="number"
                  class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                  value={purchase.sell_litre}
                  onChange={(e) =>
                    setPurchase({
                      ...purchase,
                      sell_litre: parseFloat(e.target.value),
                    })
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

export default AddWayBill;

