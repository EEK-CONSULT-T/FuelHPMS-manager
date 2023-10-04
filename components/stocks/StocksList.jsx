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
import { collection, doc, getDoc, onSnapshot, query, where } from "firebase/firestore";
import { db } from "@/firebase/config";





//  const [loading, setLoading] = useState(false);
//  const [error, setError] = useState(null);
//  const [totalVolume, setTotalVolume] = useState(0);
//  const [totalSuperTanks, setTotalSuperTanks] = useState(0);
//  const [totalDieselTanks, setTotalDieselTanks] = useState(0);
//  const [totalKeroseneTanks, setTotalKeroseneTanks] = useState(0);
//  const [totalPumps, setTotalPumps] = useState(0);

 // const fetchTanks = async () => {

//  const fetchTanks = async () => {
//    try {
//      const user = JSON.parse(localStorage.getItem("user"));
//      const stationId = user?.station_id; // Assuming station_id is stored in the user object

//      console.log("stationId", stationId);

//      if (stationId) {
//        // Fetch all expenses for the station in realtime using onSnapshot
//        const q = query(
//          collection(db, "tanks"),
//          where("station", "==", stationId)
//        );
//        const unsubscribe = onSnapshot(q, (querySnapshot) => {
//          const documents = [];
//          querySnapshot.forEach((doc) => {
//            documents.push({ ...doc.data(), id: doc.id });
//          });
//          setTanks(documents);
//          console.log("Tanks", documents);

//          // Calculate total volume
//          const totalVolume = documents.reduce(
//            (acc, tank) => acc + tank.current_volume,
//            0
//          );
//          setTotalVolume(totalVolume);

//          // Calculate total super tanks
//          const totalSuperTanks = documents.filter(
//            (tank) => tank.fuel_type === "Super"
//          ).length;

//          setTotalSuperTanks(totalSuperTanks);

//          // Calculate total diesel tanks

//          const totalDieselTanks = documents.filter(
//            (tank) => tank.fuel_type === "Diesel"
//          ).length;

//          // Calculate total kerosene tanks

//          const totalKeroseneTanks = documents.filter(
//            (tank) => tank.fuel_type === "Kerosene"
//          ).length;

//          setTotalDieselTanks(totalDieselTanks);

//          setTotalKeroseneTanks(totalKeroseneTanks);

//          // Calculate total pumps

//          const totalPumps = documents.reduce(
//            (acc, tank) => acc + tank.pumps.length,
//            0
//          );

//          setTotalPumps(totalPumps);
//        });

//        return () => {
//          // Unsubscribe from the listener when the component unmounts
//          unsubscribe();
//        };
//      }

//      setLoading(false);
//    } catch (error) {
//      console.error("Error fetching tanks", error);
//      setLoading(false);
//    }
//  };

//  useEffect(() => {
//    fetchTanks();
//  }, []);













export default function StocksList() {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pumps, setPumps] = useState([]);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);




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
        }
      }

      setLoading(false);

    } catch (error) {
      console.error("Error fetching stocks", error);
      setLoading(false);
    }
  }



  useEffect(() => {
    fetchStocks();
  }
    , []);







  return (
    <Card className="h-full w-full">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-8 flex items-center justify-between gap-8">
          <div>
            <Typography variant="h5" color="blue-gray">
              Stocks List
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              See information about all members
            </Typography>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            <Link href="/Pricing">
              <Button variant="outlined" size="sm" color="green">
                Update Pricing
              </Button>
            </Link>
            {/* <Button variant="outlined" size="sm">
              view tanks
            </Button> */}
            <AddStock />
          </div>
        </div>
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center gap-2">
            <Typography
              variant="small"
              color="blue-gray"
              className="font-normal"
            >
              Update Pricing
            </Typography>
          </div>
          {/* <Tabs value="all" className="w-full md:w-max">
            <TabsHeader>
              {TABS.map(({ label, value }) => (
                <Tab key={value} value={value}>
                  &nbsp;&nbsp;{label}&nbsp;&nbsp;
                </Tab>
              ))}
            </TabsHeader>
          </Tabs> */}
          <div className="w-full md:w-72">
            <Input
              label="Search"
              icon={<MagnifyingGlassIcon className="h-5 w-5" />}
            />
          </div>
        </div>
      </CardHeader>
      <table className="w-full mt-4">
        <thead>
          <tr className="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
            <th className="px-4 py-3">No.</th>
            <th className="px-4 py-3">Tank Name</th>

            <th className="px-4 py-3">
              Volume <br />
              (gal)
            </th>
            <th className="px-4 py-3">Opening Time</th>
            <th className="px-4 py-3">Tank Content</th>
            <th className="px-4 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {stocks.map((tank, index) => (
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
                <p className="font-semibold text-black">{tank.fuel_type}</p>
              </td>
              <td className="px-4 py-3 border">
                <p className="font-semibold text-black">
                  {tank.opening_volume} gal
                </p>
              </td>
              <td className="px-4 py-3 border">
                <p className="font-semibold text-black">
                  {tank.opening_time} am
                </p>
              </td>
              <td className="px-4 py-3 border">
                <p className="font-semibold text-black">
                  {tank.closing_volume} gal
                </p>
              </td>
              <td className="px-4 py-3 border">
                <p className="font-semibold text-black">
                  {tank.closing_time} pm
                </p>
              </td>
              <td className="px-4 py-3 border flex ">
                <button
                  className="bg-green-600 text-white px-4 py-2 rounded-lg"
                  onClick={() => {
                    handleOpen();
                  }}
                >
                  update
                </button>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
                  View Sales
                </button>
              </td>

              {/* <td className="px-4 py-3 border">
                <Link href={`/tanks/${tank.id}`}>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
                    Details
                  </button>
                </Link>
              </td> */}
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
          <form onSubmit={""}>
            <label className="block">
              <span className="text-gray-700">
              Opening Volume <br />
              </span>
              <Input
                type="number"
                name="closing_volume"
                id="closing_volume"
                disabled
                value={""}
                // value={user ? user.fullName : ""}
                // onChange={(e) => setUser({ ...user, fullName: e.target.value })}
                className="block w-full mt-1 form-input py-3 border-2 rounded "
              />
            </label>
            <label className="block">
              <span className="text-gray-700">
                Opening Time <br />
              </span>
              <Input disabled
                type="number"
                name="closing_volume"
                id="closing_volume"
                value={""}
                // value={user ? user.fullName : ""}
                // onChange={(e) => setUser({ ...user, fullName: e.target.value })}
                className="block w-full mt-1 form-input py-3 border-2 rounded "
              />
            </label>
            <label className="block">
              <span className="text-gray-700">
                Closing Volume <br />
              </span>
              <Input
                type="number"
                name="closing_volume"
                id="closing_volume"
                required
                value={""}
                // value={user ? user.fullName : ""}
                // onChange={(e) => setUser({ ...user, fullName: e.target.value })}
                className="block w-full mt-1 form-input py-3 border-2 rounded "
              />
            </label>
            <label className="block">
              <span className="text-gray-700">
                Closing Volume <br />
              </span>
              <Input
                type="number"
                name="closing_volume"
                id="closing_volume"
                required
                value={""}
                // value={user ? user.fullName : ""}
                // onChange={(e) => setUser({ ...user, fullName: e.target.value })}
                className="block w-full mt-1 form-input py-3 border-2 rounded "
              />
            </label>

            {/* <div className="grid grid-cols-1 gap-6 mt-4">
              <label className="block">
                <span className="text-gray-700">Full Name</span>
                <Input
                  type="text"
                  name="fullName"
                  id="fullName"
                  required
                  value={user ? user.fullName : ""}
                  onChange={(e) =>
                    setUser({ ...user, fullName: e.target.value })
                  }
                  className="block w-full mt-1 form-input py-3 border-2 rounded "
                />
              </label>
              <label className="block">
                <span className="text-gray-700">Email</span>
                <Input
                  type="email"
                  name="email"
                  id="email"
                  required
                  value={user ? user.email : ""}
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                  className="block w-full mt-1 form-input"
                />
              </label>

              <label className="block">
                <span className="text-gray-700">Phone Number</span>
                <Input
                  type="text"
                  name="phoneNumber"
                  id="phoneNumber"
                  required
                  value={user ? user.phoneNumber : ""}
                  onChange={(e) =>
                    setUser({ ...user, phoneNumber: e.target.value })
                  }
                  className="block w-full mt-1 form-input"
                />
              </label>
              <label className="block">
                <span className="text-gray-700">Role</span>

                <select
                  value={user ? user.profileType : ""}
                  onChange={(e) =>
                    setUser({ ...user, profileType: e.target.value })
                  }
                  className="block w-full mt-1 form-select py-2 "
                >
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
              </label>
            </div> */}

            <div className="flex justify-end mt-6">
              <button
                type="button"
                onClick={handleOpen}
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
  );
}
