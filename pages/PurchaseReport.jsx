import { db } from "@/firebase/config";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import { BsCashCoin } from "react-icons/bs";
import { useReactToPrint } from "react-to-print";

const PurchaseReport = () => {
  const [purchases, setPurchases] = useState([]);
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [selectedFuelType, setSelectedFuelType] = useState("");
  const [filteredPurchases, setFilteredPurchases] = useState([]);
  const [filteredTotal, setFilteredTotal] = useState(0);

  
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

    // Filter expenses when the date range or category changes
    filterPurchases(dateFrom, dateTo, selectedFuelType);
  }, [dateFrom, dateTo, selectedFuelType]);

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
              onChange={(e) => setDateFrom(e.target.value)}
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
              onChange={(e) => setDateTo(e.target.value)}
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
            <span>HERITS PETROLEUM CO. LTD WAYBILL REPORT</span>
          </h1>

          <table className="table-auto w-full text-left">
            <thead>
              <tr>
                <th className="border px-4 py-2">No.</th>
                <th className="border px-4 py-2">Fuel Type</th>
                <th className="border px-4 py-2">Loading Quantity</th>

                <th className="border px-4 py-2">Delivered Quantity</th>
                <th className="border px-4 py-2">Cost / Litre (Ghc)</th>
                <th className="border px-4 py-2">Overage</th>
                <th className="border px-4 py-2">Shortage</th>
                <th className="border px-4 py-2">Supplier</th>

                <th className="border px-4 py-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredPurchases.map((expense, id) => (
                <tr key={expense.id}>
                  <td className="border px-4 py-2">{id + 1}</td>
                  <td className="border px-4 py-2">{expense.fuel_type}</td>
                  <td className="border px-4 py-2">
                    {expense.initial_quantity}
                  </td>
                  <td className="border px-4 py-2">
                    {expense.delivered_quantity}
                  </td>
                  <td className="border px-4 py-2">{expense.cost_litre}</td>

                  <td className="border px-4 py-2">{expense.overage}</td>
                  <td className="border px-4 py-2">
                    {expense.shipping_shortage}
                  </td>
                  <td className="border px-4 py-2">{expense.supplier}</td>

                  <td className="border px-4 py-2">{expense.date}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="py-4">
            <li className="bg-gray-200 hover:bg-gray-100 text-black font-bold rounded-lg my-3 p-4 flex items-center cursor-pointer">
              <div className=" rounded-lg p-3"></div>
              <div className="pl-4 text-xl ">
                <p className="">Total Cost</p>
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

export default PurchaseReport;
