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
import AddWayBill from "../components/waybill/AddWayBill";
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

export default function PurchaseList() {
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);

  const [selectedPurchase, setSelectedPurchase] = useState(null);
  const handleOpen = (purchase) => {
    setSelectedPurchase(purchase);
    setOpen(true);
  };


  
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalDieselQuantity, setTotalDieselQuantity] = useState(0);
  const [totalKeroseneQuantity, setTotalKeroseneQuantity] = useState(0);
  const [totalSuperQuantity, setTotalSuperQuantity] = useState(0);

  const [totalDieselProfit, setTotalDieselProfit] = useState(0);
  const [totalKeroseneProfit, setTotalKeroseneProfit] = useState(0);
  const [totalSuperProfit, setTotalSuperProfit] = useState(0);

  const [totalProfit , setTotalProfit] = useState(0);


  


  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
const [filteredPurchases, setFilteredPurchases] = useState([]);
const [selectedFuelType, setSelectedFuelType] = useState("");
const [selectedSupplier, setSelectedSupplier] = useState("");


 
    

  const handleDateFromChange = (e) => {
    setDateFrom(e.target.value);
  };

  const handleDateToChange = (e) => {
    setDateTo(e.target.value);
  };

  const handleSearchQueryChange = (e) => {
    setSearchQuery(e.target.value);
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
          console.log("purchases", documents);
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
    fetchPurchases();
    fetchTotals();
  }, []);


 const filterPurchases = () => {
   const filtered = purchases.filter((purchase) => {
     const fuelTypeMatches =
       purchase.fuel_type.toLowerCase().includes(searchQuery.toLowerCase()) &&
       (!selectedFuelType || purchase.fuel_type === selectedFuelType ) &&
        (!selectedSupplier || purchase.supplier === selectedSupplier);
     const dateMatches =
       (!dateFrom || purchase.date >= dateFrom) &&
       (!dateTo || purchase.date <= dateTo);
     return fuelTypeMatches && dateMatches;
   });
   setFilteredPurchases(filtered);
 };


useEffect(() => {
  filterPurchases(); // Call the filtering function
}, [purchases, searchQuery, dateFrom, dateTo, selectedFuelType, selectedSupplier]);



const fetchTotals = async () => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    const stationId = user?.station_id;

    console.log("stationId", stationId);

    if (stationId) {
      const q = query(
        collection(db, "purchases"),
        where("station", "==", stationId)
      );
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        let totalQuantityValue = 0;
        let totalDieselQuantityValue = 0;
        let totalDieselProfitValue = 0;
        let totalKeroseneQuantityValue = 0;
        let totalKeroseneProfitValue = 0;
        let totalSuperQuantityValue = 0;
        let totalSuperProfitValue = 0;
        let totalProfitValue = 0; // Define totalProfitValue

        querySnapshot.forEach((doc) => {
          const purchase = doc.data();
          totalQuantityValue += purchase.quantity || 0;
          totalProfitValue += purchase.profit || 0;

          if (purchase.fuel_type === "Super") {
            totalSuperQuantityValue += purchase.quantity || 0;
            totalSuperProfitValue += purchase.profit || 0;
          } else if (purchase.fuel_type === "Diesel") {
            totalDieselProfitValue += purchase.profit || 0;
            totalDieselQuantityValue += purchase.quantity || 0;
          } else if (purchase.fuel_type === "Kerosene") {
            totalKeroseneProfitValue += purchase.profit || 0;
            totalKeroseneQuantityValue += purchase.quantity || 0;
          }
        });

        setTotalQuantity(totalQuantityValue);
        setTotalProfit(totalProfitValue);
        setTotalDieselQuantity(totalDieselQuantityValue);
        setTotalDieselProfit(totalDieselProfitValue);
        setTotalKeroseneQuantity(totalKeroseneQuantityValue);
        setTotalKeroseneProfit(totalKeroseneProfitValue);
        setTotalSuperQuantity(totalSuperQuantityValue);
        setTotalSuperProfit(totalSuperProfitValue);
      });

      return () => {
        unsubscribe();
      };
    }
  } catch (error) {
    console.error("Error fetching totals", error);
  }
};



  const handleDeletePurchase = async (id) => {
    try {
      await deleteDoc(doc(db, "purchases", id));
      toast.success("Purchase deleted successfully");
    } catch (error) {
      console.error("Error deleting purchase", error);
    }
  };

  return (
    <>
      <div>
        <section class="text-gray-600 body-font p-8">
          <div class="container   ">
            <div class="flex flex-wrap ">
              <div class="p-4 md:w-1/4">
                <div class="flex rounded-lg h-32 bg-white p-8 flex-col shadow-lg">
                  <div class="flex items-center mb-3">
                    <div class="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-indigo-500 text-white flex-shrink-0">
                      <BsFuelPumpDiesel />
                    </div>
                    <div>
                      <h2 class="text-gray-900 text-lg title-font font-medium">
                        {/* {totalAmount} */}
                        {/* {investors.length} */}
                        {totalQuantity} (litres)
                      </h2>
                      <p class="leading-relaxed text-base">Total Quantity</p>
                    </div>
                  </div>
                  <div class="flex-grow"></div>
                </div>
              </div>
              <div class="p-4 md:w-1/4">
                <div class="flex rounded-lg h-32 bg-white p-8 flex-col shadow-lg">
                  <div class="flex items-center mb-3">
                    <div class="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-indigo-500 text-white flex-shrink-0">
                      <BsFuelPumpDiesel />
                    </div>
                    <div>
                      <h2 class="text-gray-900 text-lg title-font font-medium">
                        {/* {totalAmount} */}
                        {/* {investors.length} */}
                        Ghc {totalProfit}
                      </h2>
                      <p class="leading-relaxed text-base">Total Profit</p>
                    </div>
                  </div>
                  <div class="flex-grow"></div>
                </div>
              </div>
              <div class="p-4 md:w-1/4">
                <div class="flex rounded-lg h-32 bg-white p-8 flex-col shadow-lg">
                  <div class="flex items-center mb-3">
                    <div class="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-indigo-500 text-white flex-shrink-0">
                      <BsFuelPumpDiesel />
                    </div>
                    <div>
                      <h2 class="text-gray-900 text-lg title-font font-medium">
                        {/* {totalAmount} */}
                        {/* {investors.length} */}
                        {totalDieselProfit}
                      </h2>
                      <p class="leading-relaxed text-base">
                        Total Diesel Quantity(litres)
                      </p>
                    </div>
                  </div>
                  <div class="flex-grow"></div>
                </div>
              </div>
              <div class="p-4 md:w-1/4">
                <div class="flex rounded-lg h-32 bg-white p-8 flex-col shadow-lg">
                  <div class="flex items-center mb-3">
                    <div class="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-indigo-500 text-white flex-shrink-0">
                      <BsFuelPumpDiesel />
                    </div>
                    <div>
                      <h2 class="text-gray-900 text-lg title-font font-medium">
                        {/* {totalAmount} */}
                        {/* {investors.length} */}
                        {totalSuperQuantity}
                      </h2>
                      <p class="leading-relaxed text-base">
                        Total Super Quantity (litres)
                      </p>
                    </div>
                  </div>
                  <div class="flex-grow"></div>
                </div>
              </div>
              <div class="p-4 md:w-1/4">
                <div class="flex rounded-lg h-32 bg-white p-8 flex-col shadow-lg">
                  <div class="flex items-center mb-3">
                    <div class="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-indigo-500 text-white flex-shrink-0">
                      <BsFuelPumpDiesel />
                    </div>
                    <div>
                      <h2 class="text-gray-900 text-lg title-font font-medium">
                        {/* {totalAmount} */}
                        {/* {investors.length} */}
                        {totalKeroseneQuantity}
                      </h2>
                      <p class="leading-relaxed text-base">
                        Total Kerosene Quantity (litres)
                      </p>
                    </div>
                  </div>
                  <div class="flex-grow"></div>
                </div>
              </div>
              <div class="p-4 md:w-1/4">
                <div class="flex rounded-lg h-32 bg-white p-8 flex-col shadow-lg">
                  <div class="flex items-center mb-3">
                    <div class="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-indigo-500 text-white flex-shrink-0">
                      <BsCashCoin />
                    </div>
                    <div>
                      <h2 class="text-gray-900 text-lg title-font font-medium">
                        {/* {totalSales} */}
                        Ghc {totalSuperProfit}
                      </h2>
                      <h2>Total Super Profit</h2>
                    </div>
                  </div>
                  <div class="flex-grow"></div>
                </div>
              </div>
              <div class="p-4 md:w-1/4">
                <div class="flex rounded-lg h-32 bg-white p-8 flex-col shadow-lg">
                  <div class="flex items-center mb-3">
                    <div class="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-indigo-500 text-white flex-shrink-0">
                      <BsPerson />
                    </div>
                    <div>
                      <h2 class="text-gray-900 text-lg title-font font-medium">
                        {/* {totalShortage} */}
                        {/* {totalReturns} */}
                        GHc {totalDieselProfit}
                      </h2>
                      <h2>Total DIesel Profit</h2>
                    </div>
                    {/* <h2 class="text-gray-900 text-lg title-font font-medium">
                    Neptune
                  </h2> */}
                  </div>
                  <div class="flex-grow"></div>
                </div>
              </div>
              <div class="p-4 md:w-1/4">
                <div class="flex rounded-lg h-32 bg-white p-8 flex-col shadow-lg">
                  <div class="flex items-center mb-3">
                    <div class="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-indigo-500 text-white flex-shrink-0">
                      <BsPerson />
                    </div>
                    <div>
                      <h2 class="text-gray-900 text-lg title-font font-medium">
                        {totalKeroseneProfit}
                      </h2>
                      <h2>Total Kerosene Profit</h2>
                    </div>
                  </div>
                  <div class="flex-grow"></div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className="">
          <Card className="h-full w-full mx-8">
            <CardHeader floated={false} shadow={false} className="rounded-none">
              <div className="mb-8 flex items-center justify-between gap-8">
                <div>
                  <Typography variant="h5" color="blue-gray">
                    Purchases
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
                    <div className="flex flex-col">
                      <label htmlFor="category" className="py-1">
                        Fuel Type
                      </label>
                      <select
                        className="border-2 px-4 py-2 rounded-lg"
                        value={selectedFuelType}
                        onChange={(e) => setSelectedFuelType(e.target.value)}
                      >
                        <option value="" disabled>
                          Select Fuel Type
                        </option>
                        <option value="">All</option>
                        <option value="Super">Super</option>
                        <option value="Diesel">Diesel</option>
                        <option value="Kerosene">Kerosene</option>
                      </select>
                    </div>
                    <div className="flex flex-col">
                      <label htmlFor="category" className="py-1">
                        Filter by supplier
                      </label>
                      <select
                        className="border-2 px-4 py-2 rounded-lg"
                        value={selectedSupplier}
                        onChange={(e) => setSelectedSupplier(e.target.value)}
                      >
                        <option value="" disabled>
                          Filter by supplier
                        </option>
                        <option value="">All</option>
                        <option value="MOC">
                          MOC
                        </option>
                        <option value="BOST">
                          BOST
                        </option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                  <AddWayBill />
                </div>
              </div>
              <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                <div className="flex items-center gap-2"></div>

                <div className="w-full md:w-72">
                  <Input
                    label="Search Fuel Type"
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
                  <th className="px-4 py-3">Fuel Type</th>
                  <th className="px-4 py-3">Supplier</th>

                  <th className="px-4 py-3">Purchase Quantity(litres)</th>
                  <th className="px-4 py-3">Cost Per Litre (Ghc)</th>

                  <th className="px-4 py-3">Selling Price Per Litre</th>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredPurchases.map((purchase, index) => (
                  <tr className="text-gray-700" key={purchase.id}>
                    <td className="px-4 py-3 border">
                      <div className="flex items-center text-sm">
                        <div>
                          <p className="font-semibold text-black">
                            {index + 1}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-4 py-3 border">
                      <p className="font-semibold text-black">
                        {purchase.fuel_type}
                      </p>
                    </td>

                    <td className="px-4 py-3 border">
                      <p className="font-semibold text-black">
                        {purchase.supplier}
                      </p>
                    </td>

                    <td className="px-4 py-3 border">
                      <p className="font-semibold text-black">
                        {purchase.quantity}
                      </p>
                    </td>

                    <td className="px-4 py-3 border">
                      <p className="font-semibold text-black">
                        {purchase.cost_litre}
                      </p>
                    </td>

                    <td className="px-4 py-3 border">
                      <p className="font-semibold text-black">
                        {purchase.sell_litre}
                      </p>
                    </td>

                    <td className="px-4 py-3 border">
                      <p className="font-semibold text-black">
                        {purchase.date}
                      </p>
                    </td>

                    <td className="px-4 py-3 border">
                      <Link href={`/purchases/${purchase.id}`}>
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
                          View Details
                        </button>
                      </Link>

                      <button
                        className="bg-red-600 text-white px-4 py-2 rounded-lg ml-4"
                        onClick={() => handleDeletePurchase(purchase.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal"
              >
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

            {/* <Dialog open={open} handler={handleOpen}>
              <DialogHeader>
                <Typography color="blue-gray" size="xl">
                  <h2 className="font-bold text-2xl">Update Stock</h2>
                </Typography>
              </DialogHeader>
              <DialogBody divider>
                <form onSubmit={""}>
                  <div className="flex">
                    <span className="text-gray-700 font-bold text-xl">
                      Pump Name:
                    </span>
                    <div>
                      <p className="text-xl">
                        {/* {selectedStock ? selectedStock.pump.name : ""} 
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
                        // value={selectedStock ? selectedStock.opening_volume : ""}
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
                        //  value={selectedStock ? selectedStock.opening_time : ""}
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
                        // value={selectedStock ? selectedStock.price : ""}
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
                        // value={closingVolume}
                        //onChange={(e) => setClosingVolume(e.target.value)} // Update closingVolume state
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
                        // value={selectedStock ? selectedStock.amount_paid : ""}
                        step={0.01}
                        className="block w-full mt-1 form-input py-3 px-3 border-2 rounded-xl"
                      />
                    </label>
                  </div>

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
            </Dialog> */}
          </Card>
        </div>
      </div>
    </>
  );
}
