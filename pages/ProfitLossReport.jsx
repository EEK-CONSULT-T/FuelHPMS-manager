import React, { useEffect, useRef, useState } from "react";

import {
  Card,
  Typography,
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import { BsCashCoin } from "react-icons/bs";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "@/firebase/config";
import { useReactToPrint } from "react-to-print";

const ProfitLossReport = () => {
   const [purchases, setPurchases] = useState([]);
   const [dateFrom, setDateFrom] = useState("");
   const [dateTo, setDateTo] = useState("");
   const [selectedFuelType, setSelectedFuelType] = useState("");
   const [filteredPurchases, setFilteredPurchases] = useState([]);
   const [filteredTotal, setFilteredTotal] = useState(0);


   //expenses
    const [expenses, setExpenses] = useState([]);
    const [filteredExpenseTotal, setFilteredExpenseTotal] = useState(0);
    const [filteredExpenses, setFilteredExpenses] = useState([]);

//creditors
    const [creditors, setCreditors] = useState([]);
    const [filteredCreditorTotal, setFilteredCreditorTotal] = useState(0);
    const [filteredCreditors, setFilteredCreditors] = useState([]);

    //sales
    const [sales, setSales] = useState([]);
    const [filteredSalesTotal, setFilteredSalesTotal] = useState(0);
    const [filteredSales, setFilteredSales] = useState([]);


    

   const handleSelectChange = (e) => {
     const fuel_type = e.target.value;
     setSelectedFuelType(fuel_type);
     filterPurchases(dateFrom, dateTo, fuel_type);
   };

   const handleDateFromChange = (e) => {
     setDateFrom(e.target.value);
   };

   const handleDateToChange = (e) => {
     setDateTo(e.target.value);
   };

const fetchCreditors = async () => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    const stationId = user?.station_id; // Assuming station_id is stored in the user object

    console.log("stationId", stationId);

    if (stationId) {
      // Fetch all expenses for the station in realtime using onSnapshot
      const q = query(
        collection(db, "creditors"),
        where("station", "==", stationId)
      );
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const documents = [];
        querySnapshot.forEach((doc) => {
          documents.push({ ...doc.data(), id: doc.id });
        });
        setCreditors(documents);
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





   const fetchSales = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const stationId = user?.station_id; // Assuming station_id is stored in the user object

        console.log("stationId", stationId);

        if (stationId) {
          // Fetch all expenses for the station in realtime using onSnapshot
          const q = query(
            collection(db, "stocks"),
            where("station", "==", stationId)
          );
          const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const documents = [];

            querySnapshot.forEach((doc) => {
              documents.push({ ...doc.data(), id: doc.id });
            });
            setSales(documents);
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


            //
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




   const fetchPurchases = async () => {
     try {
       const user = JSON.parse(localStorage.getItem("user"));
       const stationId = user?.station_id; // Assuming station_id is stored in the user object

       console.log("stationId", stationId);

       if (stationId) {
         // Fetch all expenses for the station in realtime using onSnapshot
         const q = query(
           collection(db, "purchases"),
           where("station", "==", stationId)
         );
         const unsubscribe = onSnapshot(q, (querySnapshot) => {
           const documents = [];
           querySnapshot.forEach((doc) => {
             documents.push({ ...doc.data(), id: doc.id });
           });
           setPurchases(documents);
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

   const filterCreditors = (fromDate, toDate,fuel_type) => {
      let filteredCreditors = creditors;

      // Filter by category
      if (fuel_type) {
        filteredCreditors = filteredCreditors.filter(
          (creditor) => creditor.fuel_type === fuel_type
        );
      }

      // Filter by date range
      if (fromDate && toDate) {
        filteredCreditors = filteredCreditors.filter(
          (creditor) => creditor.date >= fromDate && creditor.date <= toDate
        );
      }

      // Update the state
      setFilteredCreditors(filteredCreditors);

      // Calculate and update the total
      const total = filteredCreditors.reduce(
        (acc, creditor) => acc + creditor.amount,
        0
      );
      setFilteredCreditorTotal(total);
      console.log("Filtered Total Creditors", total);
    };



 

   const filterSales = (fromDate, toDate,fuel_type) => {
      let filteredSales = sales;

      // Filter by category
      if (fuel_type) {
        filteredSales = filteredSales.filter(
          (sale) => sale.fuel_type === fuel_type
        );
      }

      // Filter by date range
      if (fromDate && toDate) {
        filteredSales = filteredSales.filter(
          (sale) => sale.date >= fromDate && sale.date <= toDate
        );
      }

      // Update the state
      setFilteredSales(filteredSales);

      // Calculate and update the total
      const total = filteredSales.reduce(
        (acc, sale) => acc + sale.amount_paid,
        0
      );
      setFilteredSalesTotal(total);
      console.log("Filtered Total Sales", total);
    };




 const filterExpenses = (fromDate, toDate) => {
   let filteredExpenses = expenses;

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
   setFilteredExpenseTotal(total);
   console.log("Filtered Total Expenses", total);
 };


   const filterPurchases = (fromDate, toDate, fuel_type) => {
     let filteredPurchases = purchases;

     // Filter by category
     if (fuel_type) {
       filteredPurchases = filteredPurchases.filter(
         (purchase) => purchase.fuel_type === fuel_type
       );
     }

     // Filter by date range
     if (fromDate && toDate) {
       filteredPurchases = filteredPurchases.filter(
         (purchase) => purchase.date >= fromDate && purchase.date <= toDate
       );
     }

     // Update the state
     setFilteredPurchases(filteredPurchases);

     // Calculate and update the total
     const total = filteredPurchases.reduce(
       (acc, purchase) => acc + purchase.cost_total,
       0
     );
     setFilteredTotal(total);

     //calculate total overage

     //calculate total shortage

    



   };

   const componentRef = useRef();
   const handlePrint = useReactToPrint({
     content: () => componentRef.current,
     documentTitle: "Waybill Report",
     // onAfterPrint: () => alert("You have printed the report"),
   });

   //print message when print is cancelled
   const handlePrintCancel = () => {
     alert("Print cancelled");
   };

 useEffect(() => {
   fetchPurchases();
   fetchExpenses();
    fetchSales();
    fetchCreditors();

   // Filter expenses when the date range or category changes
   filterPurchases(dateFrom, dateTo, selectedFuelType);
   filterExpenses(dateFrom, dateTo);
    filterSales(dateFrom, dateTo, selectedFuelType);
    filterCreditors(dateFrom, dateTo, selectedFuelType);
 }, [dateFrom, dateTo, selectedFuelType]);


 const GrossProfit = (filteredSalesTotal + filteredCreditorTotal) - filteredTotal;
  const NetProfit = GrossProfit - filteredExpenseTotal;

  return (
    <div className="container m-8 w-full bg-gray-100 p-8">
      <div className="flex gap-4">
        <div className="flex-col items-center">
          <label className="block text-sm">Date From</label>
          <input
            name=""
            className="block w-full px-4 py-3 mt-2 bg-white text-gray-700 border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
            type="date"
            value={dateFrom}
            onChange={handleDateFromChange}
          />
        </div>
        <div className="flex-col items-center">
          <label className="block text-sm">Date To</label>
          <input
            name="DateTo"
            className="block w-full px-4 py-3 mt-2 bg-white text-gray-700 border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
            type="date"
            value={dateTo}
            onChange={handleDateToChange}
          />
        </div>

        <div>
          <label className="block text-sm">Fuel Type</label>
          <select
            // onChange={handleSelectChange}
            name="fuel_type"
            onChange={handleSelectChange}
            className="block w-full px-4 py-3 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
          >
            <option value={""}>All Categories</option>
            <option value="Super">Super</option>
            <option value="Diesel">Diesel</option>
            <option value="Kerosene">Kerosene</option>
          </select>
        </div>
      </div>

      {/* <button
        onClick={generateReport}
        className="bg-blue-500 px-4 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300 my-4"
      >
        Generate Report
      </button> */}
      <div className="flex">
        <div className="w-full col-span-3  relative lg:h-[70vh] h-[50vh] m-auto p-4 border rounded-lg bg-white overflow-scroll">
          <p>Date From:</p>
          <p>Date To:</p>
          <h1 className="text-2xl p-4 text-center font-bold m-4">
            <span>HERITS PETROLEUM CO. LTD PROFIT AND LOSS REPORT</span>
          </h1>

          {/* <h1 className="text-2xl"> </h1> */}
          <ul>
            <li className="bg-gray-50 hover:bg-gray-100 rounded-lg my-3 p-2 flex items-center cursor-pointer">
              {/* <div className=" rounded-lg p-3">
                   <BsCashCoin className="text-yellow-800 " size={30} /> 
                </div> */}
              <div className="pl-4">
                <p className="text-gray-800 font-bold">Sales</p>
                <p className="text-gray-400 text-sm">{/** */}</p>
              </div>
              {/* <p className="lg:flex md:hidden absolute right-6 text-sm">
                  Ghc 2000
                </p> */}
            </li>
            <li className="bg-gray-50 hover:bg-gray-100 rounded-lg my-3 p-2 flex items-center cursor-pointer">
              {/* <div className=" rounded-lg p-3">
                   <BsCashCoin className="text-yellow-800 " size={30} /> 
                </div> */}
              <div className="pl-4">
                <p className="text-gray-800 "> Cash sales</p>
                {/* <p className="text-gray-400 text-sm">Ghc 2000</p>  */}
              </div>
              <p className="lg:flex md:hidden absolute right-6 text-sm">
              Ghc  {filteredSalesTotal.toFixed(2)}
              </p>
            </li>
            <li className="bg-gray-50 hover:bg-gray-100 rounded-lg my-3 p-2 flex items-center cursor-pointer">
              {/* <div className=" rounded-lg p-3">
                   <BsCashCoin className="text-yellow-800 " size={30} /> 
                </div> */}
              <div className="pl-4">
                <p className="text-gray-800 "> Credit sales</p>
                {/* <p className="text-gray-400 text-sm">Ghc 2000</p>  */}
              </div>
              <p className="lg:flex md:hidden absolute right-6 text-sm">
                { filteredCreditorTotal.toFixed(2)}
              </p>
            </li>
            <li className="bg-gray-50 hover:bg-gray-100 rounded-lg my-3 p-2 flex items-center cursor-pointer">
              {/* <div className=" rounded-lg p-3">
                   <BsCashCoin className="text-yellow-800 " size={30} /> 
                </div> */}
              {/* <div className="pl-4">
                <p className="text-gray-800 ">Other(overage)</p>
              </div> */}
              <p className="lg:flex md:hidden absolute right-6 text-sm">
                {/* Ghc {totalOverage} */}
              </p>
            </li>

            <li className="bg-gray-50 hover:bg-gray-100 rounded-lg my-3 p-2 flex items-center cursor-pointer">
              {/* <div className=" rounded-lg p-3">
                   <BsCashCoin className="text-yellow-800 " size={30} /> 
                </div> */}
              <div className="pl-4">
                <p className="text-gray-800 font-bold">Purchases</p>
              </div>
              {/* <p className="lg:flex md:hidden absolute right-6 text-sm">
                Ghc 2000
              </p> */}
            </li>

            <li className="bg-gray-50 hover:bg-gray-100 rounded-lg my-3 p-2 flex items-center cursor-pointer">
              {/* <div className=" rounded-lg p-3">
                   <BsCashCoin className="text-yellow-800 " size={30} /> 
                </div> */}
              <div className="pl-4">
                <p className="text-gray-800 ">Total Purchases</p>
                {/* <p className="text-gray-400 text-sm">Ghc 2000</p>  */}
              </div>
              <p className="lg:flex md:hidden absolute right-6 text-sm">
                {filteredTotal.toFixed(2)}
              </p>
            </li>
            <li className="bg-gray-50 hover:bg-gray-100 rounded-lg my-3 p-2 flex items-center cursor-pointer">
              {/* <div className=" rounded-lg p-3">
                   <BsCashCoin className="text-yellow-800 " size={30} /> 
                </div> */}
              <div className="pl-4">
                <p className="text-gray-800 font-bold">Expenditure</p>
                {/* <p className="text-gray-400 text-sm">Ghc 2000</p>  */}
              </div>
              {/* <p className="lg:flex md:hidden absolute right-6 text-sm">
                Ghc 2000
              </p> */}
            </li>
            <li className="bg-gray-50 hover:bg-gray-100 rounded-lg my-3 p-2 flex items-center cursor-pointer">
              {/* <div className=" rounded-lg p-3">
                   <BsCashCoin className="text-yellow-800 " size={30} /> 
                </div> */}
              <div className="pl-4">
                <p className="text-gray-800 ">Total expenses</p>
                {/* <p className="text-gray-400 text-sm">Ghc 2000</p>  */}
              </div>
              <p className="lg:flex md:hidden absolute right-6 text-sm">
                {/* Ghc {totalExpenses} */}
                {filteredExpenseTotal.toFixed(2)}
              </p>
            </li>
            <div className="py-4">
              <li className="bg-gray-50 hover:bg-gray-100 rounded-lg text-yellow-800 my-3 p-2 flex items-center cursor-pointer">
                {/* <div className=" rounded-lg p-3">
                   <BsCashCoin className="text-yellow-800 " size={30} /> 
                </div> */}
                <div className="pl-4 text-xl">
                  <p className="">Gross profit</p>
                  {/* <p className="text-gray-400 text-sm">Ghc 2000</p>  */}
                </div>
                <p className="lg:flex md:hidden absolute right-6 text-sm font-bold">
                   Ghc {GrossProfit} 
                </p>
              </li>
              <li className="bg-gray-50 hover:bg-gray-100 text-blue-600 rounded-lg my-3 p-2 flex items-center cursor-pointer">
                {/* <div className=" rounded-lg p-3">
                   <BsCashCoin className="text-yellow-800 " size={30} /> 
                </div> */}
                <div className="pl-4 text-xl ">
                  <p className="">Net profit</p>
                  {/* <p className="text-gray-400 text-sm">Ghc 2000</p>  */}
                </div>
                <p className="lg:flex md:hidden absolute right-6 text-sm font-bold">
                 Ghc  {NetProfit} 
                </p>
              </li>
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProfitLossReport;



