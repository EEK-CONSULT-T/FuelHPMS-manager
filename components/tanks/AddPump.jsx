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
import { Timestamp, collection, doc, setDoc } from "firebase/firestore";
import { db, storage } from "@/firebase/config";
import { nanoid } from "nanoid";

const AddPump = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setUser(user);
  }, []);

  console.log("this", user);

  const [pump, setPump] = useState({
    id: nanoid(),
    name: "",
    
  });

  //fetch tanks using link id and add the pump  to the array field of the pumps

    const handleInputChange = (e) => {  
    const { name, value } = e.target;
    setPump({ ...pump, [name]: value });
    };

    const handleAddPump = async (e) => {
    e.preventDefault();
    }

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setTank({ ...tank, [name]: value });
//   };

//   //handle selected category

//   const handleSelectChange = (e) => {
//     const { name, value } = e.target;
//     setTank({ ...tank, [name]: value });
//   };

//   const handleAddTank = async (e) => {
//     e.preventDefault();

//     try {
//       const docRef = doc(db, "tanks", tank.id);
//       const tankData = {
//         id: tank.id,
//         name: tank.name,
//         current_volume: parseFloat(tank.current_volume),
//         station: user?.station_id,
//         pumps: tank.pumps,
//         fuel_type: tank.fuel_type,
//         //take selected date and convert to timestamp
//         last_refilled: tank.last_refilled,
//       };

//       await setDoc(docRef, tankData);
//       toast.success("Tank created successfully");

//       handleOpen();

//       //empty fields
//       setTank({
//         id: nanoid(),
//         name: "",
//         fuel_type: "",
//         current_volume: "",
//         last_refilled: "",
//       });

//       //console.log("Document written with ID: ", docRef.id);
//     } catch (error) {
//       console.log(error);
//       alert(error.message);
//       toast.error(error.message);
//     }
//   };

  //simlpe interest formula




  return (
    <div>
      <Fragment>
        <div className="flex justify-between px-4 pt-8">
          <div className="flex items-center">
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded-lg "
              onClick={handleOpen}
            >
              Add Tank
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
            <h5 className="font-bold text-blue-400">Add Tank</h5>
          </DialogHeader>
          <DialogBody divider>
            <form onSubmit={handleAddTank}>
              <div className="m-2">
                <label htmlFor="">Tank Name (e.g. Tank 1)</label>
                <input
                  type="text"
                  placeholder="Tank Name"
                  className="border-2 border-gray-300 p-2 rounded-lg w-full"
                  required
                  name="name"
                  onChange={handleInputChange}
                  value={tank.name}
                />
              </div>

              <div className="m-2">
                <label htmlFor="">Tank Current Volume(litres)</label>
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

              <div className="m-2 flex-col flex">
                <label htmlFor="">Fuel Type</label>
                <select
                  className="w-full py-3 rounded-lg border-2 border-gray-300 px-4"
                  label="Select Fuel Type"
                  value={tank.fuel_type}
                  onChange={handleSelectChange}
                  name="fuel_type" // Update name to "category"
                  required
                >
                  <option value={""} disabled>
                    Select Fuel Type
                  </option>
                  <option value="Super">Super</option>
                  <option value="Diesel">Diesel</option>
                  <option value="Kerosene">Kerosene</option>
                </select>
              </div>

              <div className="m-2 flex-col flex">
                <label htmlFor="">Last Refilled</label>
                <input
                  type="date"
                  placeholder="Date"
                  className="border-2 border-gray-300 p-2 rounded-lg w-full"
                  name="last_refilled"
                  onChange={handleInputChange}
                  value={tank.last_refilled}
                />
              </div>

              <div className="flex justify-between m-4">
                <button
                  className="bg-blue-400 text-white px-6 py-2 rounded-xl hover:bg-blue-gray-500"
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

export default AddPump;
