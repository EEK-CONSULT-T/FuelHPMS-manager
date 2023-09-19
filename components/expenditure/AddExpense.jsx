import React, { Fragment, useState } from "react";
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

const AddExpense = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);
  const [expense, setExpense] = useState({
    id: nanoid(),
    description: "",
    amount: "",
    category: "",
    station: "",
    date: "",


  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setExpense({ ...expense, [name]: value });
  };

  const handleAddExpense = async (e) => {
    e.preventDefault();
    c
    try {
      const docRef = doc(db, "employees", expense.id);

      const expenseData = {
        id: expense.id,
        description: expense.description,
        amount: expense.amount,
        station: expense.station,
        category: expense.category,
        date: Timestamp.fromDate(new Date(expense.date)),
        };



      await setDoc(docRef, expenseData);
      toast.success("Event created successfully");

      handleOpen();




      //console.log("Document written with ID: ", docRef.id);
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  };

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
              Add Expense
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
            <h5 className="font-bold text-blue-400">Add 
            Expense</h5>
          </DialogHeader>
          <DialogBody divider>
            <form onSubmit={handleAddExpense}>
              <div className="m-2">
                <label htmlFor="">Expense's description</label>
                <input
                  type="text"
                  placeholder="Expense's description"
                  className="border-2 border-gray-300 p-2 rounded-lg w-full"
                  onChange={handleInputChange}
                  value={expense.description}
                  name="description"
                />
              </div>


             
              <div className="m-2">
                <label htmlFor="">Expense's amount</label>
                <input
                  type="number"
                  placeholder="Expense's amount"
                  className="border-2 border-gray-300 p-2 rounded-lg w-full"
                  name="amount"
                  onChange={handleInputChange}
                  value={expense.amount}
                />
              </div>


              <div className="flex justify-between m-4">
                <button
                  className="bg-blue-400 text-white px-6 py-2 rounded-xl"
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

export default AddExpense;
