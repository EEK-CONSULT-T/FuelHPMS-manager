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
import { Timestamp, collection, doc, onSnapshot, query, setDoc, where } from "firebase/firestore";
import { db, storage } from "@/firebase/config";
import { nanoid } from "nanoid";

const AddStock = () => {
  const [open, setOpen] = useState(false);
    const [tanks, setTanks] = useState([]);
    const [loading, setLoading] = useState(false);

  const handleOpen = () => setOpen(!open);
  const [user, setUser] = useState(null);
  const [stock, setStock] = useState({
    id: nanoid(),
    //this takes an integer
    tank: "",
    fuel_type: "",
    opening_volume: "",
    closing_volume: "",
    old_price: "",
    new_price: "",
    pump: "",
    opening_time : "",
    closing_time: "",
    date_created: "",
    station: "",

  });




  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setUser(user);
  
  }, []);

  console.log("this", user);

  const [tank, setTank] = useState({
    id: nanoid(),
    name: "",
    //this takes an integer
    tank_content: "",

    current_volume: "",
    pumps: [],

    fuel_type: "",
    station: "",
  });

  
  //fetch all tanks in realtime
  const fetchTanks = async () => {
    setLoading(true);

    try {
      const q = query(collection(db, "tanks"), where("station", "==", user?.station_id));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const tank = [];
        querySnapshot.forEach((doc) => {
          tank.push({ ...doc.data(), id: doc.id });
        });
        setTanks(tank);
        setLoading(false);
        console.log("Tanks", tank);
      });
      return unsubscribe;
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTank({ ...tank, [name]: value });
  };

  //handle selected category

 const handleSelectChange = (e) => {
   const { name, value } = e.target;
   const selectedTank = tanks.find((tank) => tank.id === value);
   setTank({ ...tank, [name]: value, pumps: selectedTank?.pumps || [] });
 };


  //fetch all tanks from firestore

  const handleAddStock = async (e) => {
    e.preventDefault();

    try {
      const docRef = doc(db, "tanks", tank.id);
      const tankData = {
        id: tank.id,
        name: tank.name,
        current_volume: parseFloat(tank.current_volume),
        station: user?.station_id,
        pumps: tank.pumps,
        fuel_type: tank.fuel_type,
        //take selected date and convert to timestamp
        last_refilled: tank.last_refilled,
      };

      await setDoc(docRef, tankData);
      toast.success("Tank created successfully");

      handleOpen();

      //empty fields
      setTank({
        id: nanoid(),
        name: "",
        fuel_type: "",
        current_volume: "",
        last_refilled: "",
      });

      //console.log("Document written with ID: ", docRef.id);
    } catch (error) {
      console.log(error);
      alert(error.message);
      toast.error(error.message);
    }
  };



useEffect(() => {
    fetchTanks();
  }
  , [user]);


    
  return (
    <div>
      <Fragment>
        <div className="flex justify-between px-4 pt-8">
          <div className="flex items-center">
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded-lg "
              onClick={handleOpen}
            >
              Add Stock
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
            <h5 className="font-bold text-blue-400">Add Stock</h5>
          </DialogHeader>
          <DialogBody divider>
            <form onSubmit={handleAddStock}>
              <div className="flex items-center justify-">
                <div className="m-2">
                  <label htmlFor=""> Current Volume(litres)</label>
                  <input
                    min={1}
                    type="number"
                    placeholder="Tank Current Volume"
                    className="border-2 border-gray-300 p-2 rounded-lg w-full"
                    required
                    name="opening_volume"
                    onChange={handleInputChange}
                    value=""
                  />
                </div>
                <div className="m-2">
                  <label htmlFor="">Old Price (per litre)</label>
                  <input
                    min={1}
                    type="number"
                    placeholder="Tank Current Volume"
                    className="border-2 border-gray-300 p-2 rounded-lg w-full"
                    required
                    name="current_volume"
                    onChange={handleInputChange}
                    value={tank.current_volume}
                  />
                </div>
                <div className="m-2">
                  <label htmlFor="">Opening Time</label>
                  <input
                    min={1}
                    type="time"
                    placeholder="Tank Current Volume"
                    className="border-2 border-gray-300 p-2 rounded-lg w-full"
                    required
                    name="current_volume"
                    onChange={handleInputChange}
                    value={tank.current_volume}
                  />
                </div>
              </div>
              <div className="flex items-center justify-">
                <div className="m-2">
                  <label htmlFor="">Closing Volume(litres)</label>
                  <input
                    min={1}
                    type="number"
                    placeholder="Tank Current Volume"
                    className="border-2 border-gray-300 p-2 rounded-lg w-full"
                    required
                    name="opening_volume"
                    onChange={handleInputChange}
                    value=""
                  />
                </div>
                <div className="m-2">
                  <label htmlFor="">New Price (per litre)</label>
                  <input
                    min={1}
                    type="number"
                    placeholder="Tank Current Volume"
                    className="border-2 border-gray-300 p-2 rounded-lg w-full"
                    required
                    name="current_volume"
                    onChange={handleInputChange}
                    value={tank.current_volume}
                  />
                </div>
                <div className="m-2">
                  <label htmlFor="">Closing Time</label>
                  <input
                    type="time"
                    className="border-2 border-gray-300 p-2 rounded-lg w-full"
                    required
                    name="closing_time"
                    onChange={handleInputChange}
                    value={tank.current_volume}
                  />
                </div>
              </div>

              {/**display all fetched tanks */}

              <div className="m-2 flex-col flex">
                <label htmlFor="">
                  Select
                </label>
                <select
                  className="w-full py-3 rounded-lg border-2 border-gray-300 px-4"
                  label="Select Tank"
                  value={tank.tank}
                  onChange={handleSelectChange}
                  name="tank" // Update name to "category"
                  required
                >
                  <option value={""} disabled>
                    Select Tank
                  </option>
                  {tanks.map((tank) => (
                    <option value={tank.id}>
                      {tank.name} - {tank.fuel_type}
                    </option>
                  ))}
                </select>
              </div>

              {/**display pumps for the selected tank */}

              <div className="m-2 flex-col flex">
                <label htmlFor="">Pump</label>
                <select
                  className="w-full py-3 rounded-lg border-2 border-gray-300 px-4"
                  label="Select Pump"
                  value={tank.pump}
                  onChange={handleSelectChange}
                  name="pump"
                  required
                >
                  <option value={""} disabled>
                    Select Pump
                  </option>
                  {tank.pumps.map((pump) => (
                    <option key={pump.id} value={pump.id}>
                      {pump.name}
                    </option>
                  ))}
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
      </Fragment>
    </div>
  );
};

export default AddStock;
