import { db } from "@/firebase/config";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import { BsCashCoin } from "react-icons/bs";
import { useReactToPrint } from "react-to-print";
const SalesReport = () => {
  const [stocks, setStocks] = useState([]);
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [selectedFuelType, setSelectedFuelType] = useState("");
  const [filteredStocks, setFilteredStocks] = useState([]);
  const [filteredTotal, setFilteredTotal] = useState(0);
  const [filteredTotalShortage, setFilteredTotalShortage] = useState(0);
  const [filteredTotalSales, setFilteredTotalSales] = useState(0);

  const handleSelectChange = (e) => {
    const fuel_type = e.target.value;
    setSelectedFuelType(fuel_type);
    filterStocks(dateFrom, dateTo, fuel_type);
  };

  const handleDateFromChange = (e) => {
    setDateFrom(e.target.value);
  };

  const handleDateToChange = (e) => {
    setDateTo(e.target.value);
  };

  const fetchStocks = async () => {
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
          setStocks(documents);
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

  const filterStocks = (fromDate, toDate, fuel_type) => {
    let filteredStocks = stocks;

    // Filter by category
    if (fuel_type) {
      filteredStocks = filteredStocks.filter(
        (stock) => stock.fuel_type === fuel_type
      );
    }

    // Filter by date range
    if (fromDate && toDate) {
      filteredStocks = filteredStocks.filter(
        (stock) => stock.date >= fromDate && stock.date <= toDate
      );
         }

    // Update the state
    setFilteredStocks(filteredStocks);

    // Calculate and update the total
    const total = filteredStocks.reduce(
      (acc, stock) => acc + stock.amount_paid,
      0
    );
    setFilteredTotal(total);

    const salesTotal = filteredStocks.reduce(
      (acc, stock) => acc + stock.sales,
      0
    );
    setFilteredTotalSales(salesTotal);

    const shortageTotal = filteredStocks.reduce(
      (acc, stock) => acc + stock.shortage,
      0
    );

    setFilteredTotalShortage(shortageTotal);

  };


  //Call and update the total
  

 
  

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Sales Report",
    // onAfterPrint: () => alert("You have printed the report"),
  });

  //print message when print is cancelled
  const handlePrintCancel = () => {
    alert("Print cancelled");
  };

  useEffect(() => {
    fetchStocks();

    filterStocks(dateFrom, dateTo, selectedFuelType);
  }, [dateFrom, dateTo, selectedFuelType]);

  return (
    <div className="container m-8 w-full bg-gray-50 p-8">
      <div className="flex justify-between p-8">
        <div className="flex gap-4">
          <div className="flex-col items-center">
            <label className="block text-sm">Date From</label>
            <input
              name="dateFrom"
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
          name="fuel_type"
          class="block w-full px-4 py-3 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
          onChange={handleSelectChange}
        >
          <option value="">All Categories</option>
          <option value="Super">Super</option>
          <option value="Diesel">Diesel</option>
          <option value="Kerosene">Kerosene</option>
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
            <span>HERITS PETROLEUM CO. LTD SALES REPORT</span>
          </h1>

          <table className="table-auto w-full text-left">
            <thead>
              <tr>
                <th className="border px-4 py-2">No.</th>
                <th className="border px-4 py-2">Fuel Type</th>
                <th className="border px-4 py-2">Amount (Ghc)</th>
                <th className="border px-4 py-2">Litres sold</th>
                <th className="border px-4 py-2">Shortage(Ghc)</th>

                <th className="border px-4 py-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredStocks.map((expense, id) => (
                <>
                  <tr key={expense.id}>
                    <td className="border px-4 py-2">{id + 1}</td>
                    <td className="border px-4 py-2">{expense.fuel_type}</td>
                    <td className="border px-4 py-2">
                      {expense.amount_paid.toFixed(2)}
                    </td>
                    <td className="border px-4 py-2">
                      {expense.sales.toFixed(2)}
                    </td>

                    <td className="border px-4 py-2">
                      {expense.shortage.toFixed(2)}
                    </td>
                    <td className="border px-4 py-2">{expense.date}</td>
                  </tr>
                  <tr>
                    <td colSpan={2} className="border px-4 py-2 font-bold">Total</td>

                    <td className="border px-4 py-2 font-bold">
                       {expense.amount_paid.toFixed(2)} 
                    </td>
                    <td className="border px-4 py-2 font-bold">
                      {expense.sales.toFixed(2)}
                    </td>

                    <td className="border px-4 py-2 font-bold">
                      {expense.shortage.toFixed(2)}
                    </td>
                    <td className="border px-4 py-2 font-bold">
                    </td>
                   
                  </tr>
                </>
              ))}
            </tbody>
          </table>

          {/* <div className="py-4">
            <li className="bg-gray-200 hover:bg-gray-100 text-black font-bold rounded-lg  p-4 flex items-center cursor-pointer">
              <div className=" rounded-lg p-3"></div>
              <div className="pl-4 text-xl ">
                <p className="">Total</p>
              </div>
              <p className="lg:flex md:hidden absolute right-6 text-lg font-bold">
                Ghc {filteredTotal.toFixed(2)}
              </p>
            </li>

            <li className="bg-gray-200 hover:bg-gray-100 text-black font-bold rounded-lg  p-4 flex items-center cursor-pointer">
              <div className=" rounded-lg p-3"></div>
              <div className="pl-4 text-xl ">
                <p className="">Total litres sold</p>
              </div>
              <p className="lg:flex md:hidden absolute right-6 text-lg font-bold">
                {filteredTotalSales.toFixed(2)} litres
              </p>
            </li>
            <li className="bg-gray-200 hover:bg-gray-100 text-black font-bold rounded-lg  p-4 flex items-center cursor-pointer">
              <div className=" rounded-lg p-3"></div>
              <div className="pl-4 text-xl ">
                <p className="">Total shortage</p>
               <p className="text-gray-400 text-sm">Ghc 2000</p>  
              </div>
              <p className="lg:flex md:hidden absolute right-6 text-lg font-bold">
                Ghc {filteredTotalShortage.toFixed(2)}
              </p>
            </li>
          </div> 
          */}
        </div>
      </div>
    </div>
  );
};

export default SalesReport;
