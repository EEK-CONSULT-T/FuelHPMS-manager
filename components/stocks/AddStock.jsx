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
import { Timestamp, collection, deleteDoc, doc, onSnapshot, query, setDoc, where } from "firebase/firestore";
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
    closing_volume: 0,
    price: "",
    date: "",
    shortage: 0,
    sales: 0,
    pump: "",
    opening_time : "",
    closing_time: "",
    station: "",
    amount: 0,

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

  // Extract the fuel_type from the selected tank and set it in the stock state
  const fuelType = selectedTank ? selectedTank.fuel_type : "";
  setTank({ ...tank, [name]: value, pumps: selectedTank?.pumps || [] });
  setStock({ ...stock, fuel_type: fuelType }); // Set the fuel_type in the stock state
};
  //fetch all tanks from firestore


  

  const handleAddStock = async (e) => {
    e.preventDefault();

    try {
      const docRef = doc(db, "stocks", stock.id);
      const stockData = {
        id: stock.id,
        opening_volume: stock.opening_volume,
         fuel_type: stock.fuel_type,

        //closing_volume: parseFloat(stock.closing_volume),
        price: stock.price,
        pump://store the pump object in the stock
        {
          id: stock.pump,
          name: tank.pumps.find((pump) => pump.id === stock.pump)?.name,
        },
        

        opening_time: stock.opening_time,
      //  closing_time: stock.closing_time,
        date:stock.date,  
        station: user?.station_id,
        //sales: (stock.opening_volume - stock.closing_volume),
       // amount: (stock.opening_volume - stock.closing_volume) * stock.price,
    
      
      };

      await setDoc(docRef, stockData);
      toast.success("Stock created successfully");

      handleOpen();

      //empty fields
      setStock({
        id: nanoid(),
        //this takes an integer
        tank: "",
        opening_volume: "",
        closing_volume: "",
        price: "",
        fuel_type: "",
        pump: "",
        opening_time : "",
        closing_time: "",
        date: "",
        station: "",
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
                  <label htmlFor="">Opening Readings(litres)</label>
                  <input
                    min={0}
                    step={0.01}
                    type="number"
                    placeholder="Opening Reading(litres)"
                    className="border-2 border-gray-300 p-2 rounded-lg w-full"
                    required
                    name="opening_volume"
                    onChange={(e) =>
                      setStock({
                        ...stock,
                        opening_volume: parseFloat(e.target.value),
                      })
                    }
                    value={stock.opening_volume}
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
                    name="price"
                    onChange={(e) =>
                      setStock({
                        ...stock,
                        price: parseFloat(e.target.value),
                      })
                    }
                    value={stock.price}
                  />
                </div>
                <div className="m-2">
                  <label htmlFor="">Opening Time</label>
                  <input
                    type="time"
                    placeholder="Opening Time"
                    className="border-2 border-gray-300 p-2 rounded-lg w-full"
                    required
                    name="opening_time"
                    onChange={(e) =>
                      setStock({ ...stock, opening_time: e.target.value })
                    }
                    value={stock.opening_time}
                  />
                </div>
              </div>
              <div className="flex items-center justify-">
                {/* <div className="m-2">
                  <label htmlFor="">Closing Volume(litres)</label>
                  <input
                    min={0}
                    step={0.01}
                    type="number"
                    placeholder="Closing Volume (litres)"
                    className="border-2 border-gray-300 p-2 rounded-lg w-full"
                    name="closing_volume"
                    onChange={(e) =>
                      setStock({
                        ...stock,
                        closing_volume: parseFloat(e.target.value),
                      })
                    }
                    value={stock.closing_volume}
                  />
                </div> */}
                {/* <div className="m-2">
                  <label htmlFor="">New Price (per litre)</label>
                  <input
                    min={0}
                    step={0.01}
                    type="number"
                    placeholder="New Price (per litre)"
                    className="border-2 border-gray-300 p-2 rounded-lg w-full"
                    name="new_price"
                    onChange={(e) =>
                      setStock({
                        ...stock,
                        new_price: parseFloat(e.target.value),
                      })
                    }
                    value={stock.new_price}
                  />
                </div> */}

                <div className="m-2">
                  <label htmlFor="">Date</label>
                  <input
                    type="date"
                    placeholder="Date"
                    className="border-2 border-gray-300 p-2 rounded-lg w-full"
                    name="date"
                    onChange={(e) =>
                      setStock({ ...stock, date: e.target.value })
                    }
                    value={stock.date}
                  />
                </div>
                {/* <div className="m-2">
                  <label htmlFor="">Closing Time</label>
                  <input
                    type="time"
                    placeholder="Closing Time"
                    className="border-2 border-gray-300 p-2 rounded-lg w-full"
                    name="closing_time"
                    onChange={(e) =>
                      setStock({ ...stock, closing_time: e.target.value })
                    }
                    value={stock.closing_time}
                  />
                </div> */}
              </div>

              {/**display all fetched tanks */}

              <div className="m-2 flex-col flex">
                <label htmlFor="">Select</label>
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
                  value={stock.pump}
                  onChange={(e) => setStock({ ...stock, pump: e.target.value })}
                  name="pump"
                  required
                >
                  <option value="" disabled>
                    Select Pump
                  </option>
                  {tank.pumps.map((pump) => (
                    <>
                      <option value="" disabled>
                        Select Pump
                      </option>
                      <option key={pump.id} value={pump.id}>
                        {pump.name}
                      </option>
                    </>
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
