import { db } from "@/firebase/config";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import { BsCashCoin } from "react-icons/bs";
import { useReactToPrint } from "react-to-print";

const ExpenseReport = () => {
  const [expenses, setExpenses] = useState([]);
 const [dateFrom, setDateFrom] = useState("");
 const [dateTo, setDateTo] = useState("");
 const [selectedCategory, setSelectedCategory] = useState("");
 const [filteredExpenses, setFilteredExpenses] = useState([]);
 const [filteredTotal, setFilteredTotal] = useState(0);

      const handleSelectChange = (e) => {
        const category = e.target.value;
        setSelectedCategory(category);
        filterExpenses(dateFrom, dateTo, category);
        
    
      };

      const handleDateFromChange = (e) => {
        setDateFrom(e.target.value);
      };

      const handleDateToChange = (e) => {
        setDateTo(e.target.value);
      };

  



  
const fetchExpenses = async () => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    const stationId = user?.station_id; // Assuming station_id is stored in the user object

    console.log("stationId", stationId);

    if (stationId) {
      // Fetch all expenses for the station in realtime using onSnapshot
      const q = query(
        collection(db, "expenses"),
        where("station", "==", stationId)
      );
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const documents = [];
        querySnapshot.forEach((doc) => {
          documents.push({ ...doc.data(), id: doc.id });
        });
        setExpenses(documents);
        console.log("documents", documents);
      });

      return () => {
        // Unsubscribe from the listener when the component unmounts
        unsubscribe();
      };
    }

    setLoading(false);
  } catch (error) {
    console.error("Error fetching stocks", error);
    setLoading(false);
  }
};

  



   
 const filterExpenses = (fromDate, toDate, category) => {
   let filteredExpenses = expenses;

  
   // Filter by category
   if (category) {
     filteredExpenses = filteredExpenses.filter(
       (expense) => expense.category === category
     );
   }

   // Filter by date range
   if (fromDate && toDate) {
     filteredExpenses = filteredExpenses.filter(
       (expense) => expense.date >= fromDate && expense.date <= toDate
     );
   }

   // Update the state
   setFilteredExpenses(filteredExpenses);

   // Calculate and update the total
   const total = filteredExpenses.reduce(
     (acc, expense) => acc + expense.amount,
     0
   );
   setFilteredTotal(total);
 };


  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Expense Report",
   // onAfterPrint: () => alert("You have printed the report"),
  });

  //print message when print is cancelled
  const handlePrintCancel = () => {
    alert("Print cancelled");
  };


  useEffect(() => {
    fetchExpenses();

    // Filter expenses when the date range or category changes
    filterExpenses(dateFrom, dateTo, selectedCategory);
  }
  , [dateFrom, dateTo, selectedCategory]);




  return (
    <div className="container m-8 w-full bg-gray-50 p-8">
      <div className="flex justify-between p-8">
        <div className="flex gap-4">
          <div className="flex-col items-center">
            <label className="block text-sm">Date From</label>
            <input
              name=""
              class="block w-full px-4 py-3 mt-2 bg-white text-gray-700 border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              type="date"
              value={dateFrom}
              onChange={handleDateFromChange}
            />
          </div>
          <div className="flex-col items-center">
            <label className="block text-sm">Date To</label>
            <input
              // onChange={handleSelectChange}
              name=""
              class="block w-full px-4 py-3 mt-2 bg-white text-gray-700 border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              type="date"
              value={dateTo}
              onChange={handleDateToChange}
            />
          </div>
        </div>
      </div>
    
      <div>
        <select
          // onChange={handleSelectChange}
          onChange={handleSelectChange}
          name="category"
          class="block w-full px-4 py-3 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
        >
          <option
           value={""}
          >All Categories</option>
          <option
           value={"MoMo Charges"}
          >MoMo Charges</option>
          <option 
           value={"Salary"}
          >Salary</option>
          <option 
           value={"ECG Bills"}
          >ECG Bills</option>
          <option 
           value={"Water"}
          >Water</option>
          <option 
           value={"Stationary"}
          >Stationary</option>
          <option 
           value={"Transport"}
          >Transport</option>
          <option 
            value={"Repairs"}
          >Repairs</option>
          <option 
            value={"Bank Charges"}
          >Bank Charges</option>
          <option 
            value={"Internet"}
          >Internet</option>
          <option 
            value={"Others"}
          >Others</option>
        </select>
      </div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-8 rounded m-4"
        onClick={handlePrint}
      >
        Print Report
      </button>
      <div className="flex" ref={componentRef}>
        <div className="w-full col-span-3  relative lg:h-[70vh] h-[50vh] m-auto p-4 border rounded-lg bg-white overflow-scroll">
          <p>From : {dateFrom}</p>
          <p>To: {dateTo} </p>
          <h1 className="text-2xl p-4 text-center font-bold">
            <span>HERITS PETROLEUM CO. LTD EXPENSE REPORT</span>
          </h1>

          <table className="table-auto w-full text-left">
            <thead>
              <tr>
                <th className="border px-4 py-2">No.</th>
                <th className="border px-4 py-2">Category</th>
                <th className="border px-4 py-2">Amount</th>
                <th className="border px-4 py-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredExpenses.map((expense, id) => (
                <tr key={expense.id}>
                  <td className="border px-4 py-2">{id + 1}</td>
                  <td className="border px-4 py-2">{expense.category}</td>
                  <td className="border px-4 py-2">{expense.amount}</td>
                  <td className="border px-4 py-2">{expense.date}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="py-4">
            <li className="bg-gray-200 hover:bg-gray-100 text-black font-bold rounded-lg my-3 p-4 flex items-center cursor-pointer">
              <div className=" rounded-lg p-3"></div>
              <div className="pl-4 text-xl ">
                <p className="">Total</p>
                {/* <p className="text-gray-400 text-sm">Ghc 2000</p>  */}
              </div>
              <p className="lg:flex md:hidden absolute right-6 text-lg font-bold">
                Ghc {filteredTotal.toFixed(2)}
              </p>
            </li>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpenseReport;
