import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { PencilIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Tabs,
  TabsHeader,
  Tab,
  Avatar,
  IconButton,
  Tooltip,
  Dialog,
  DialogHeader,
  DialogBody,
} from "@material-tailwind/react";
import Link from "next/link";
import AddStock from "./AddStock";
import { useEffect, useState } from "react";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "@/firebase/config";
import toast from "react-hot-toast";
import { BsCashCoin, BsFuelPumpDiesel, BsPerson } from "react-icons/bs";

export default function StocksList() {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pumps, setPumps] = useState([]);
  const [open, setOpen] = useState(false);
  const [closingVolume, setClosingVolume] = useState("");
  const [closingTime, setClosingTime] = useState("");
  const [amountPaid, setAmountPaid] = useState(0);




  const [selectedStock, setSelectedStock] = useState(null);
  const handleOpen = (stock) => {
    setSelectedStock(stock);
    setOpen(true);
  };
  
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalShortage, setTotalShortage] = useState(0);
  const [totalSales, setTotalSales] = useState(0);
  const [dieselTotalAmount, setDieselTotalAmount] = useState(0);
  const [keroseneTotalAmount, setKeroseneTotalAmount] = useState(0);
  const [superTotalAmount, setSuperTotalAmount] = useState(0);
  const [totalSuperSales, setTotalSuperSales] = useState(0);
  const [totalDieselSales, setTotalDieselSales] = useState(0);
  const [totalKeroseneSales, setTotalKeroseneSales] = useState(0);
  const [totalSuperShortage, setTotalSuperShortage] = useState(0);
  const [totalDieselShortage, setTotalDieselShortage] = useState(0);
  const [totalKeroseneShortage, setTotalKeroseneShortage] = useState(0);
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredStocks, setFilteredStocks] = useState([]);
  const [selectedFuelType, setSelectedFuelType] = useState("");



  const handleDateFromChange = (e) => {
    setDateFrom(e.target.value);
  };

  const handleDateToChange = (e) => {
    setDateTo(e.target.value);
  };

const handleSearchQueryChange = (e) => {
  setSearchQuery(e.target.value);
};

useEffect(() => {
  // Update the filtered stocks when stocks change
  setFilteredStocks(
    stocks.filter((stock) =>
      stock.pump.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );
}, [stocks, searchQuery]);

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
          console.log("stocks", documents);
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

  useEffect(() => {
    fetchStocks();
    fetchTotals();
  }, []);

  useEffect(() => {
    filterStocks();
  }, [stocks, searchQuery, dateFrom, dateTo, selectedFuelType]);


  const sales = selectedStock?.opening_volume - closingVolume;
  const amount = sales * selectedStock?.price;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const updatedStock = {
        ...selectedStock,
        closing_volume: parseInt(e.target.closing_volume.value),
        closing_time: e.target.closing_time.value,
        sales: sales,
        amount: amount,
        amount_paid: parseInt(e.target.amount_paid.value),
        shortage: amount - parseInt(e.target.amount_paid.value),
      };

      const stockRef = doc(db, "stocks", selectedStock.id);

      await updateDoc(stockRef, updatedStock);

      setOpen(false);
      toast.success("Stock updated successfully");
      setSelectedStock(null);
    } catch (error) {
      console.error("Error updating stock:", error);
    }
  };





const fetchTotals = async () => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    const stationId = user?.station_id; // Assuming station_id is stored in the user object

    console.log("stationId", stationId);

    if (stationId) {
      const q = query(
        collection(db, "stocks"),
        where("station", "==", stationId)
      );
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        let totalAmountValue = 0;
        let totalSalesValue = 0;
        let totalSuperAmountValue = 0;
        let totalDieselAmountValue = 0;
        let totalKeroseneAmountValue = 0;
        let totalSuperSalesValue = 0;
        let totalDieselSalesValue = 0;
        let totalKeroseneSalesValue = 0;
        let totalSuperShortageValue = 0;
        let totalDieselShortageValue = 0;
        let totalKeroseneShortageValue = 0;

        querySnapshot.forEach((doc) => {
          const stock = doc.data();
          totalAmountValue += stock.amount || 0;
          totalSalesValue += stock.sales || 0;



                   

          // Calculate total sales and amount for each fuel type
          if (stock.fuel_type === "Super") {
            totalSuperSalesValue += stock.sales || 0;
            totalSuperAmountValue += stock.amount || 0;
            totalSuperShortageValue += stock.shortage || 0;
          } else if (stock.fuel_type === "Diesel") {
            totalDieselSalesValue += stock.sales || 0;
            totalDieselAmountValue += stock.amount || 0;
            totalDieselShortageValue += stock.shortage || 0;
          } else if (stock.fuel_type === "Kerosene") {
            totalKeroseneSalesValue += stock.sales || 0;
            totalKeroseneAmountValue += stock.amount || 0;
            totalKeroseneShortageValue += stock.shortage || 0;
          }
        });

        setTotalAmount(totalAmountValue);
        setTotalSales(totalSalesValue);
        setDieselTotalAmount(totalDieselAmountValue);
        setKeroseneTotalAmount(totalKeroseneAmountValue);
        setSuperTotalAmount(totalSuperAmountValue);
        setTotalSuperSales(totalSuperSalesValue);
        setTotalDieselSales(totalDieselSalesValue);
        setTotalKeroseneSales(totalKeroseneSalesValue);
        setTotalSuperShortage(totalSuperShortageValue);
        setTotalDieselShortage(totalDieselShortageValue);
        setTotalKeroseneShortage(totalKeroseneShortageValue);
      });

      return () => {
        // Unsubscribe from the listener when the component unmounts
        unsubscribe();
      };
    }
  } catch (error) {
    console.error("Error fetching totals", error);
  }
};

const handleDeleteStock = async (id) => {
  try {
    await deleteDoc(doc(db, "stocks", id));
    toast.success("Stock deleted successfully");
  } catch (error) {
    console.error("Error deleting stock", error);
  }
}

const filterStocks = () => {
  const filtered = stocks.filter((stock) => {
    const pumpNameMatches = stock.pump.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const dateMatches =
      (!dateFrom || stock.date >= dateFrom) &&
      (!dateTo || stock.date <= dateTo) &&
      (!selectedFuelType || stock.fuel_type === selectedFuelType);

    return pumpNameMatches && dateMatches;
  });
  setFilteredStocks(filtered);
};


  return (
    <>
      <section class="text-gray-600 body-font">
        <div class="container   ">
          <div class="flex flex-wrap ">
            <div class="p-4 md:w-1/5">
              <div class="flex rounded-lg h-32 bg-white p-8 flex-col">
                <div class="flex items-center mb-3">
                  <div class="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-indigo-500 text-white flex-shrink-0">
                    <BsFuelPumpDiesel />
                  </div>
                  <div>
                    <h2 class="text-gray-900 text-lg title-font font-medium">
                      {totalAmount}
                      {/* {investors.length} */}
                    </h2>
                    <p class="leading-relaxed text-base">Total Amount</p>
                  </div>
                </div>
                <div class="flex-grow"></div>
              </div>
            </div>
            <div class="p-4 md:w-1/5">
              <div class="flex rounded-lg h-32 bg-white p-8 flex-col">
                <div class="flex items-center mb-3">
                  <div class="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-indigo-500 text-white flex-shrink-0">
                    <BsCashCoin />
                  </div>
                  <div>
                    <h2 class="text-gray-900 text-lg title-font font-medium">
                      {totalSales}
                    </h2>
                    <h2>Total Sales</h2>
                  </div>
                </div>
                <div class="flex-grow"></div>
              </div>
            </div>
            <div class="p-4 md:w-1/5">
              <div class="flex rounded-lg h-32 bg-white p-8 flex-col">
                <div class="flex items-center mb-3">
                  <div class="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-indigo-500 text-white flex-shrink-0">
                    <BsPerson />
                  </div>
                  <div>
                    <h2 class="text-gray-900 text-lg title-font font-medium">
                      {totalSuperSales}
                      {/* {totalReturns} */}
                    </h2>
                    <h2>Total Super Sales</h2>
                  </div>
                  {/* <h2 class="text-gray-900 text-lg title-font font-medium">
                    Neptune
                  </h2> */}
                </div>
                <div class="flex-grow"></div>
              </div>
            </div>
            <div class="p-4 md:w-1/5">
              <div class="flex rounded-lg h-32 bg-white p-8 flex-col">
                <div class="flex items-center mb-3">
                  <div class="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-indigo-500 text-white flex-shrink-0">
                    <BsPerson />
                  </div>
                  <div>
                    <h2 class="text-gray-900 text-lg title-font font-medium">
                      {totalDieselSales}
                      {/* {totalReturns} */}
                    </h2>
                    <h2>Total Diesel Sales</h2>
                  </div>
                  {/* <h2 class="text-gray-900 text-lg title-font font-medium">
                    Neptune
                  </h2> */}
                </div>
                <div class="flex-grow"></div>
              </div>
            </div>
            <div class="p-4 md:w-1/5">
              <div class="flex rounded-lg h-32 bg-white p-8 flex-col">
                <div class="flex items-center mb-3">
                  <div class="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-indigo-500 text-white flex-shrink-0">
                    <BsPerson />
                  </div>
                  <div>
                    <h2 class="text-gray-900 text-lg title-font font-medium">
                      {totalKeroseneSales}
                      {/* {totalReturns} */}
                    </h2>
                    <h2>Total Kerosene Sales</h2>
                  </div>
                  {/* <h2 class="text-gray-900 text-lg title-font font-medium">
                    Neptune
                  </h2> */}
                </div>
                <div class="flex-grow"></div>
              </div>
            </div>
            <div class="p-4 md:w-1/5">
              <div class="flex rounded-lg h-32 bg-white p-8 flex-col">
                <div class="flex items-center mb-3">
                  <div class="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-indigo-500 text-white flex-shrink-0">
                    <BsPerson />
                  </div>
                  <div>
                    <h2 class="text-gray-900 text-lg title-font font-medium">
                      {totalShortage}
                      {/* {totalReturns} */}
                    </h2>
                    <h2>Total Shortage</h2>
                  </div>
                  {/* <h2 class="text-gray-900 text-lg title-font font-medium">
                    Neptune
                  </h2> */}
                </div>
                <div class="flex-grow"></div>
              </div>
            </div>
            <div class="p-4 md:w-1/5">
              <div class="flex rounded-lg h-32 bg-white p-8 flex-col">
                <div class="flex items-center mb-3">
                  <div class="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-indigo-500 text-white flex-shrink-0">
                    <BsPerson />
                  </div>
                  <div>
                    <h2 class="text-gray-900 text-lg title-font font-medium">
                      {superTotalAmount}
                      {/* {totalReturns} */}
                    </h2>
                    <h2>Total Super Amount</h2>
                  </div>
                  {/* <h2 class="text-gray-900 text-lg title-font font-medium">
                    Neptune
                  </h2> */}
                </div>
                <div class="flex-grow"></div>
              </div>
            </div>
            <div class="p-4 md:w-1/5">
              <div class="flex rounded-lg h-32 bg-white p-8 flex-col">
                <div class="flex items-center mb-3">
                  <div class="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-indigo-500 text-white flex-shrink-0">
                    <BsPerson />
                  </div>
                  <div>
                    <h2 class="text-gray-900 text-lg title-font font-medium">
                      {dieselTotalAmount}
                      {/* {totalReturns} */}
                    </h2>
                    <h2>Total Diesel Amount</h2>
                  </div>
                  {/* <h2 class="text-gray-900 text-lg title-font font-medium">
                    Neptune
                  </h2> */}
                </div>
                <div class="flex-grow"></div>
              </div>
            </div>
            <div class="p-4 md:w-1/5">
              <div class="flex rounded-lg h-32 bg-white p-8 flex-col">
                <div class="flex items-center mb-3">
                  <div class="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-indigo-500 text-white flex-shrink-0">
                    <BsPerson />
                  </div>
                  <div>
                    <h2 class="text-gray-900 text-lg title-font font-medium">
                      {keroseneTotalAmount}
                    </h2>
                    <h2>Total Kerosene Amount</h2>
                  </div>
                  {/* <h2 class="text-gray-900 text-lg title-font font-medium">
                    Neptune
                  </h2> */}
                </div>
                <div class="flex-grow"></div>
              </div>
            </div>
            <div class="p-4 md:w-1/5">
              <div class="flex rounded-lg h-32 bg-white p-8 flex-col">
                <div class="flex items-center mb-3">
                  <div class="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-indigo-500 text-white flex-shrink-0">
                    <BsPerson />
                  </div>
                  <div>
                    <h2 class="text-gray-900 text-lg title-font font-medium">
                      {totalSuperShortage}
                      {/* {totalReturns} */}
                    </h2>
                    <h2>Total Super Shortage</h2>
                  </div>
                  {/* <h2 class="text-gray-900 text-lg title-font font-medium">
                    Neptune
                  </h2> */}
                </div>
                <div class="flex-grow"></div>
              </div>
            </div>
            <div class="p-4 md:w-1/5">
              <div class="flex rounded-lg h-32 bg-white p-8 flex-col">
                <div class="flex items-center mb-3">
                  <div class="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-indigo-500 text-white flex-shrink-0">
                    <BsPerson />
                  </div>
                  <div>
                    <h2 class="text-gray-900 text-lg title-font font-medium">
                      {/* {totalReturns} */}
                      {totalDieselShortage}
                    </h2>
                    <h2>Total Diesel Shortage</h2>
                  </div>
                  {/* <h2 class="text-gray-900 text-lg title-font font-medium">
                    Neptune
                  </h2> */}
                </div>
                <div class="flex-grow"></div>
              </div>
            </div>
            <div class="p-4 md:w-1/5">
              <div class="flex rounded-lg h-32 bg-white p-8 flex-col">
                <div class="flex items-center mb-3">
                  <div class="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-indigo-500 text-white flex-shrink-0">
                    <BsPerson />
                  </div>
                  <div>
                    <h2 class="text-gray-900 text-lg title-font font-medium">
                      {totalKeroseneShortage}
                    </h2>
                    <h2>Total Kerosene Shortages</h2>
                  </div>
                </div>
                <div class="flex-grow"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Card className="h-full w-full mx-8">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="mb-8 flex items-center justify-between gap-8">
            <div>
              <Typography variant="h5" color="blue-gray">
                Stocks List
              </Typography>
              <Typography color="gray" className="mt-1 font-normal">
                See information about all members
              </Typography>

              <div className="flex gap-4">
                <div className="">
                  <label htmlFor="category" className="py-1 ">
                    Date from
                  </label>
                  <Input
                    type="date"
                    className="border-2 px-4 "
                    value={dateFrom}
                    onChange={handleDateFromChange}
                  />
                </div>
                <div className="">
                  <label htmlFor="category" className="py-1 ">
                    Date to
                  </label>
                  <Input
                    type="date"
                    className="border-2 px-4 "
                    value={dateTo}
                    onChange={handleDateToChange}
                  />
                </div>
                <div className="flex flex-col items-center">
                  <label htmlFor="category" className="py-1 ">
                    Fuel Type
                  </label>
                  <select
                    name="fuel_type"
                    id="fuel_type"
                    className="border-2 px-4 py-2 rounded-lg"
                    value={selectedFuelType}
                    onChange={(e) => setSelectedFuelType(e.target.value)}
                  >
                    <option value="">All</option>
                    <option value="Super">Super</option>
                    <option value="Diesel">Diesel</option>
                    <option value="Kerosene">Kerosene</option>
                  </select>



                </div>
              </div>
            </div>
            <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
              {/* <Button variant="outlined" size="sm">
              view tanks
            </Button> */}
              <AddStock />
            </div>
          </div>
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex items-center gap-2"></div>

            <div className="w-full md:w-72">
              <Input
                label="Search Pump Name"
                value={searchQuery}
                onChange={handleSearchQueryChange}
                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
              />
            </div>
          </div>
        </CardHeader>
        <table className="w-full mt-4">
          <thead>
            <tr className="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
              <th className="px-4 py-3">No.</th>
              <th className="px-4 py-3">Pump</th>

              <th className="px-4 py-3">Opening Volume(litres)</th>
              <th className="px-4 py-3">Opening Time</th>
              <th className="px-4 py-3">Closing Volume(Litres)</th>
              <th className="px-4 py-3">Shortage (Ghc)</th>

              <th className="px-4 py-3">Closing Time</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredStocks.map((tank, index) => (
              <tr className="text-gray-700" key={tank.id}>
                <td className="px-4 py-3 border">
                  <div className="flex items-center text-sm">
                    <div>
                      <p className="font-semibold text-black">{index + 1}</p>
                    </div>
                  </div>
                </td>

                <td className="px-4 py-3 border">
                  <p className="font-semibold text-black">{tank.pump.name}</p>
                </td>
                <td className="px-4 py-3 border">
                  <p className="font-semibold text-black">
                    {tank.opening_volume}
                  </p>
                </td>
                <td className="px-4 py-3 border">
                  <p className="font-semibold text-black">
                    {tank.opening_time} AM
                  </p>
                </td>
                <td className="px-4 py-3 border">
                  <p className="font-semibold text-black">
                    {tank.closing_volume}
                  </p>
                </td>
                <td className="px-4 py-3 border">
                  <p className="font-semibold text-black">{tank.shortage}</p>
                </td>

                <td className="px-4 py-3 border">
                  <p className="font-semibold text-black">
                    {tank.closing_time} PM
                  </p>
                </td>
                <td className="px-4 py-3 border">
                  <p className="font-semibold text-black">{tank.date}</p>
                </td>
                <td className="px-4 py-3 border flex ">
                  {tank.closing_volume > 0 ? (
                    <>
                      <Link href={`/stocks/${tank.id}`}>
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
                          View Details
                        </button>
                      </Link>

                      <button
                        className="bg-red-600 text-white px-4 py-2 rounded-lg ml-4"
                        onClick={() => handleDeleteStock(tank.id)}
                      >
                        Delete
                      </button>
                    </>
                  ) : (
                    <button
                      className="bg-green-600 text-white px-4 py-2 rounded-lg"
                      onClick={() => handleOpen(tank)}
                    >
                      Update
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
          <Typography variant="small" color="blue-gray" className="font-normal">
            Page 1 of 10
          </Typography>
          <div className="flex gap-2">
            <Button variant="outlined" size="sm">
              Previous
            </Button>
            <Button variant="outlined" size="sm">
              Next
            </Button>
          </div>
        </CardFooter>

        <Dialog open={open} handler={handleOpen}>
          <DialogHeader>
            <Typography color="blue-gray" size="xl">
              <h2 className="font-bold text-2xl">Update Stock</h2>
            </Typography>
          </DialogHeader>
          <DialogBody divider>
            <form onSubmit={handleSubmit}>
              <div className="flex">
                <span className="text-gray-700 font-bold text-xl">
                  Pump Name:
                </span>
                <div>
                  <p className="text-xl">
                    {selectedStock ? selectedStock.pump.name : ""}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 ">
                <label className="block">
                  <span className="text-gray-700">
                    Opening Volume <br />
                  </span>
                  <Input
                    type="number"
                    name="opening_volume"
                    id="opening_volume"
                    disabled
                    value={selectedStock ? selectedStock.opening_volume : ""}
                    className="block w-full mt-1 form-input py-3 border-2 rounded "
                  />
                </label>
                <label className="block">
                  <span className="text-gray-700">
                    Opening Time <br />
                  </span>
                  <Input
                    type="text"
                    name="opening_time"
                    id="opening_time"
                    disabled
                    value={selectedStock ? selectedStock.opening_time : ""}
                    className="block w-full mt-1 form-input py-3 border-2 rounded "
                  />
                </label>
                <label className="block">
                  <span className="text-gray-700">
                    Price (Ghc) <br />
                  </span>
                  <input
                    type="number"
                    name="price"
                    id="price"
                    disabled
                    value={selectedStock ? selectedStock.price : ""}
                    className="block w-full mt-1 form-input py-3 px-3 border-2 rounded-xl"
                  />
                </label>
              </div>
              <div className="flex items-center  gap-4 py-4">
                <label className="block">
                  <span className="text-gray-700">
                    Closing Volume <br />
                  </span>
                  <input
                    type="number"
                    required
                    min={0}
                    step={0.01}
                    name="closing_volume"
                    id="closing_volume"
                    value={closingVolume}
                    onChange={(e) => setClosingVolume(e.target.value)} // Update closingVolume state
                    className="block w-full mt-1 form-input py-3 px-3 border-2 rounded-xl"
                  />
                </label>
                <label className="block">
                  <span className="text-gray-700">
                    Amount Paid <br />
                    (Ghc) <br />
                  </span>
                  <input
                    type="number"
                    name="amount_paid"
                    min={0}
                    value={selectedStock ? selectedStock.amount_paid : ""}
                    step={0.01}
                    className="block w-full mt-1 form-input py-3 px-3 border-2 rounded-xl"
                  />
                </label>

                <label className="block">
                  <span className="text-gray-700">
                    Closing Time <br />
                  </span>
                  <input
                    type="time"
                    name="closing_time"
                    id="closing_time"
                    value={closingTime}
                    onChange={(e) => setClosingTime(e.target.value)} // Update closingTime state
                    className="block w-full mt-1 form-input py-3 px-3 border-2 rounded-xl"
                  />
                </label>
              </div>

              {/* <div className="flex items-center gap-4 ">
                <label className="block">
                  <span className="text-gray-700">
                    Amount to be paid <br />
                  </span>
                     <div>
                  <p className="text-xl font-bold">
          Ghc    {
              amount
              }
                  </p>
                  
                     </div>
                     </label>
                     </div> */}

              <div className="flex justify-end mt-6">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedStock(null);
                    setOpen(false);
                  }}
                  className="px-4 py-2 text-sm font-medium text-gray-700 transition-colors duration-150 bg-gray-200 border border-transparent rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 ml-4 text-sm font-medium text-white transition-colors duration-150 bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </DialogBody>
        </Dialog>
      </Card>
    </>
  );
}
