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

const AddExpense = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setUser(user);
  }, []);

  console.log("this", user);

  const [expense, setExpense] = useState({
    id: nanoid(),
    description: "",
    //this takes an integer
    amount: "",

    category: "",
    station: "",
    date: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setExpense({ ...expense, [name]: value });
  };

  //handle selected category

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    setExpense({ ...expense, [name]: value });
  };



  

  const handleAddExpense = async (e) => {
    e.preventDefault();

    try {
      const docRef = doc(db, "expenses", expense.id);

      const expenseData = {
        id: expense.id,
        description: expense.description,
        amount: parseFloat(expense.amount),
        station: user?.station_id,
        category: expense.category,
        date: expense.date,
      };

      await setDoc(docRef, expenseData);
      toast.success("Expense created successfully");

      handleOpen();

      //empty fields
      setExpense({
        id: nanoid(),
        description: "",
        amount: "",
        category: "",
        station: "",
        date: "",
      });

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
            <h5 className="font-bold text-blue-400">Add Expense</h5>
          </DialogHeader>
          <DialogBody divider>
            <form onSubmit={handleAddExpense}>
              <div className="m-2">
                <label htmlFor="">Expense's description</label>
                <input
                  type="text"
                  placeholder="What is the expense for?"
                  className="border-2 border-gray-300 p-2 rounded-lg w-full"
                  onChange={handleInputChange}
                  value={expense.description}
                  name="description"
                />
              </div>

              <div className="m-2">
                <label htmlFor="">Expense's amount(GHC)</label>
                <input
                  min={1}
                  type="number"
                  placeholder="Expense's amount"
                  className="border-2 border-gray-300 p-2 rounded-lg w-full"
                  name="amount"
                  onChange={handleInputChange}
                  value={expense.amount}
                />
              </div>

              <div className="m-2">
                <label htmlFor="">Date</label>
                <input
                  type="date"
                  placeholder="Date"
                  className="border-2 border-gray-300 p-2 rounded-lg w-full"
                  name="date"
                  onChange={handleInputChange}
                  value={expense.date}
                />
              </div>

              <div className="m-2 flex-col flex">
                <label htmlFor="">Expense Category</label>
                <select
                  className="w-full py-3 rounded-lg border-2 border-gray-300 px-4"
                  label="Select Category"
                  value={expense.category}
                  onChange={handleSelectChange}
                  name="category" // Update name to "category"
                  required
                >
                  <option value={""} disabled>
                    Select Category of Expense
                  </option>
                  <option value="Salary">Salary</option>
                  <option value="Allowance">Allowance</option>
                  <option value="Fuel">Fuel</option>
                  <option value="Maintenance">Maintenance</option>
                  <option value="Rent">Rent</option>
                  <option value="Office Supplies">Office Supplies</option>
                  <option value="Internet">Internet</option>
                  <option value="MoMo Charges">
                    MoMo Charges
                  </option>

                  <option value="Transportation">Transportation</option>
                  <option value="ECG Bills">ECG Bills</option>
                  <option value="Water Bills">Water Bills</option>
                  <option value="Others">Others</option>
                </select>
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

export default AddExpense;
