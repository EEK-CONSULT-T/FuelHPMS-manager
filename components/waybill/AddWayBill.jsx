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
    quantity: "",
    profit: "",


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

  // console.log("this", user);

  // const [tank, setTank] = useState({
  //   id: nanoid(),
  //   name: "",
  //   //this takes an integer
  //   tank_content: "",

  //   current_volume: "",
  //   pumps: [],

  //   fuel_type: "",
  //   station: "",
  // });

  //fetch all tanks in realtime
  // const fetchTanks = async () => {
  //   setLoading(true);

  //   try {
  //     const q = query(
  //       collection(db, "tanks"),
  //       where("station", "==", user?.station_id)
  //     );
  //     const unsubscribe = onSnapshot(q, (querySnapshot) => {
  //       const tank = [];
  //       querySnapshot.forEach((doc) => {
  //         tank.push({ ...doc.data(), id: doc.id });
  //       });
  //       setTanks(tank);
  //       setLoading(false);
  //       console.log("Tanks", tank);
  //     });
  //     return unsubscribe;
  //   } catch (error) {
  //     setLoading(false);
  //     console.log(error);
  //   }
  // };

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setTank({ ...tank, [name]: value });
  // };

  //handle selected category

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    setPurchase({ ...purchase, [name]: value });
  };

  const handleAddPurchase = async (e) => {
    e.preventDefault();

    try {
      const docRef = doc(db, "purchases", purchase.id);
      const purchaseData = {
        id: purchase.id,
        fuel_type: purchase.fuel_type,
        supplier: purchase.supplier,
        quantity: purchase.quantity,
        cost_litre: purchase.cost_litre,
        cost_total: purchase.cost_total,
        sell_litre: purchase.sell_litre,
        cost_total: purchase.cost_litre * purchase.quantity,
        profit: (purchase.sell_litre - purchase.cost_litre) * purchase.quantity,
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
        quantity: "",
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
            Add Purchase
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
          <h5 className="font-bold text-blue-400">Add Purchase</h5>
        </DialogHeader>
        <DialogBody divider>
          <form onSubmit={handleAddPurchase}>
            <div className="flex items-center justify-">
              <div className="m-2">
                <label htmlFor="">Quantity (litres)</label>
                <input
                  min={0}
                  step={0.01}
                  type="number"
                  placeholder="Quantity (litres)"
                  className="border-2 border-gray-300 p-2 rounded-lg w-full"
                  required
                  name="quantity"
                  onChange={(e) =>
                    setPurchase({
                      ...purchase,
                      quantity: parseFloat(e.target.value),
                    })
                  }
                  value={purchase.quantity}
                />
              </div>
              <div className="m-2">
                <label htmlFor="">Price (per litre)</label>
                <input
                  min={0}
                  step={0.01}
                  type="number"
                  placeholder="Price (per litre)"
                  className="border-2 border-gray-300 p-2 rounded-lg w-full"
                  required
                  name="cost_litre"
                  onChange={(e) =>
                    setPurchase({
                      ...purchase,
                      cost_litre: parseFloat(e.target.value),
                    })
                  }
                  value={purchase.cost_litre}
                />
              </div>
            </div>
            <div className="flex items-center justify-">
              <div className="m-2">
                <label htmlFor="">Selling Price (per litre)</label>
                <input
                  min={0}
                  step={0.01}
                  type="number"
                  placeholder="Selling Price (per litre)"
                  className="border-2 border-gray-300 p-2 rounded-lg w-full"
                  name="sell_litre"
                  onChange={(e) =>
                    setPurchase({
                      ...purchase,

                      sell_litre: parseFloat(e.target.value),
                    })
                  }
                  value={purchase.sell_litre}
                />
              </div>
              <div className="m-2">
                <label htmlFor="">Date</label>
                <input
                  type="date"
                  placeholder="Date"
                  className="border-2 border-gray-300 p-2 rounded-lg w-full"
                  name="date"
                  onChange={(e) =>
                    setPurchase({ ...purchase, date: e.target.value })
                  }
                  value={purchase.date}
                />
              </div>
            </div>
            <div className="m-2 flex-col flex">
              <label htmlFor="">Select 
               Supplier
              </label>
              <select
                className="w-full py-3 rounded-lg border-2 border-gray-300 px-4"
                label="Select Supplier"
                value={purchase.supplier}
                onChange={handleSelectChange}
                name="supplier"
                required
              >
                <option value={""} disabled>
                  Select Supplier
                </option>
                <option value={"MOC"}>
                  MOC
                </option>
                <option value={"BOST"}>
                  BOST
                </option>
              </select>
            </div>

            <div className="m-2 flex-col flex">
              <label htmlFor="">Select 
                Fuel Type
              </label>
              <select
                className="w-full py-3 rounded-lg border-2 border-gray-300 px-4"
                label="Select Fuel Type"
                value={purchase.fuel_type}
                onChange={handleSelectChange}
                name="fuel_type"
                required
              >
                <option value={""} disabled>
                  Select Fuel Type
                </option>
                <option value={"Diesel"}>Diesel</option>
                <option value={"Super"}>
                  Super
                </option>
                <option value={"Kerosene"}>Kerosene</option>
              </select>
            </div>

            <div className="flex justify-between m-4 py-8">
              <button
                className="bg-blue-400 text-white px-6 py-2 rounded-xl hover:bg-blue-gray-500 w-full"
                type="submit"
              >
                <span>Submit</span>
              </button>
            </div>
          </form>
        </DialogBody>
      </Dialog>
    </div>
  );
};

export default AddWayBill;

