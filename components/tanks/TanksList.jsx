import React, { useEffect, useState } from 'react'
import AddTank from '../stocks/AddTanks';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '@/firebase/config';
import { BsCashCoin, BsFuelPumpDiesel, BsPerson } from 'react-icons/bs';
import Link from 'next/link';
import { GiFuelTank } from 'react-icons/gi';

const TanksList = () => {
    const [tanks, setTanks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [totalVolume, setTotalVolume] = useState(0);
    const [totalSuperTanks, setTotalSuperTanks] = useState(0);
    const [totalDieselTanks, setTotalDieselTanks] = useState(0);
    const [totalKeroseneTanks, setTotalKeroseneTanks] = useState(0);
    const [totalPumps, setTotalPumps] = useState(0);
    const [totalSuperVolume, setTotalSuperVolume] = useState(0);
    const [totalDieselVolume, setTotalDieselVolume] = useState(0);
    const [totalKeroseneVolume, setTotalKeroseneVolume] = useState(0);

    

   // const fetchTanks = async () => {
        

  const fetchTanks = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const stationId = user?.station_id; // Assuming station_id is stored in the user object

      console.log("stationId", stationId);

      if (stationId) {
        // Fetch all expenses for the station in realtime using onSnapshot
        const q = query(
          collection(db, "tanks"),
          where("station", "==", stationId)
        );
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          const documents = [];
          querySnapshot.forEach((doc) => {
            documents.push({ ...doc.data(), id: doc.id });
          });
          setTanks(documents);
          console.log("Tanks", documents);

          // Calculate total volume
            const totalVolume = documents.reduce(
                (acc, tank) => acc + tank.current_volume,
                0
            );
            setTotalVolume(totalVolume);

            // Calculate total super volume
            const totalSuperVolume = documents.filter(
                (tank) => tank.fuel_type === "Super"
            ).reduce(
                (acc, tank) => acc + tank.current_volume,

                0
            );
            setTotalSuperVolume(totalSuperVolume);

            // Calculate total diesel volume
            const totalDieselVolume = documents.filter(

                (tank) => tank.fuel_type === "Diesel"
            ).reduce(
                (acc, tank) => acc + tank.current_volume,

                0
            );
            setTotalDieselVolume(totalDieselVolume);

            // Calculate total kerosene volume
            const totalKeroseneVolume = documents.filter(

                (tank) => tank.fuel_type === "Kerosene" 
            ).reduce(
                (acc, tank) => acc + tank.current_volume,

                0
            );
            setTotalKeroseneVolume(totalKeroseneVolume);




            // Calculate total super tanks
            const totalSuperTanks = documents.filter(
                (tank) => tank.fuel_type === "Super"
            ).length;

            setTotalSuperTanks(totalSuperTanks);
            
            // Calculate total diesel tanks

            const totalDieselTanks = documents.filter(
                (tank) => tank.fuel_type === "Diesel"
            ).length;

            // Calculate total kerosene tanks

            const totalKeroseneTanks = documents.filter(
                (tank) => tank.fuel_type === "Kerosene"
            ).length;


            setTotalDieselTanks(totalDieselTanks);

            setTotalKeroseneTanks(totalKeroseneTanks);

            // Calculate total pumps

            const totalPumps = documents.reduce(
                (acc, tank) => acc + tank.pumps.length,
                0
            );

       

            setTotalPumps(totalPumps);

        });

        return () => {
          // Unsubscribe from the listener when the component unmounts
          unsubscribe();
        };
      }

      setLoading(false);
    } catch (error) {
      console.error("Error fetching tanks", error);
      setLoading(false);
    }
  };

    useEffect(() => {
        fetchTanks();
    },


     []);





  return (
    <>
      <div>
        <section class="text-gray-600 body-font">
          <div class="container   ">
            <div class="flex flex-wrap ">
              <div class="p-4 md:w-1/4">
                <div class="flex rounded-lg h-32 bg-white p-8 flex-col shadow-lg">
                  <div class="flex items-center mb-3">
                    <div class="w-24 h-24 mr-3 inline-flex items-center justify-center rounded-full  text-blue-400 flex-shrink-0">
                      <BsFuelPumpDiesel size={40} />
                    </div>
                    <div>
                      <h2 class="text-gray-900 text-lg title-font font-medium">
                        {totalVolume}
                        {/* {investors.length} */}
                      </h2>
                      <p class="leading-relaxed text-base">
                        Current Total Volume
                      </p>
                    </div>
                  </div>
                  <div class="flex-grow"></div>
                </div>
              </div>
              <div class="p-4 md:w-1/4">
                <div class="flex rounded-lg h-32 bg-white p-8 flex-col shadow-lg">
                  <div class="flex items-center mb-3">
                    <div class="w-24 h-24 mr-3 inline-flex items-center justify-center rounded-full  text-red-500 flex-shrink-0">
                      <BsFuelPumpDiesel size={40} />
                    </div>
                    <div>
                      <h2 class="text-gray-900 text-lg title-font font-medium">
                        {totalSuperVolume}
                      </h2>
                      <h2>Total Super Volume</h2>
                    </div>
                  </div>
                  <div class="flex-grow"></div>
                </div>
              </div>
              <div class="p-4 md:w-1/4">
                <div class="flex rounded-lg h-32 bg-white p-8 flex-col shadow-lg">
                  <div class="flex items-center mb-3">
                    <div class="w-24 h-24 mr-3 inline-flex items-center justify-center rounded-full text-green-500  flex-shrink-0">
                      <BsFuelPumpDiesel size={40} />
                    </div>
                    <div>
                      <h2 class="text-gray-900 text-lg title-font font-medium">
                        {totalDieselVolume}
                      </h2>
                      <h2>Total Diesel Volume</h2>
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
                    <div class="w-24 h-24 mr-3 inline-flex items-center justify-center rounded-full   flex-shrink-0">
                      <BsFuelPumpDiesel size={40} />
                    </div>
                    <div>
                      <h2 class="text-gray-900 text-lg title-font font-medium">
                        {totalKeroseneVolume}
                      </h2>
                      <h2>Total Kerosene Volume</h2>
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
                    <div class="w-24 h-24 mr-3 inline-flex items-center justify-center rounded-full text-blue-500  flex-shrink-0">
                      <GiFuelTank size={40} />
                    </div>
                    <div>
                      <h2 class="text-gray-900 text-lg title-font font-medium">
                        {totalSuperTanks}
                      </h2>
                      <h2>Total Super Tanks</h2>
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
                    <div class="w-24 h-24 mr-3 inline-flex items-center justify-center rounded-full text-green-500  flex-shrink-0">
                      <GiFuelTank size={40} />
                    </div>
                    <div>
                      <h2 class="text-gray-900 text-lg title-font font-medium">
                        {totalDieselTanks}
                      </h2>
                      <h2>Total Diesel Tanks</h2>
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
                    <div class="w-24 h-24 mr-3 inline-flex items-center justify-center rounded-full text-red-500  flex-shrink-0">
                      <GiFuelTank size={40} />
                    </div>
                    <div>
                      <h2 class="text-gray-900 text-lg title-font font-medium">
                        {totalKeroseneTanks}
                      </h2>
                      <h2>Total Kerosene Tanks</h2>
                    </div>
                  </div>
                  <div class="flex-grow"></div>
                </div>
              </div>
              <div class="p-4 md:w-1/4">
                {/*<div class="flex rounded-lg h-32 bg-white p-8 flex-col shadow-lg">
                  <div class="flex items-center mb-3">
                    <div class="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-indigo-500 text-white flex-shrink-0">
                      <BsPerson />
                    </div>
                    <div>
                      <h2 class="text-gray-900 text-lg title-font font-medium">
                        {totalPumps}
                      </h2>
                      <h2>Total Pumps</h2>
                    </div>
                     <h2 class="text-gray-900 text-lg title-font font-medium">
                    Neptune
                  </h2> 
                  </div>
                  <div class="flex-grow"></div>
                </div> */}
              </div>
            </div>
          </div>
        </section>
      </div>
      <div className="p-4 rounded-lg bg-white m-4">
        <h1 className="font-bold text-xl">Tanks List</h1>
        <h1>
          Current Total Volume :{" "}
          <span className="font-bold text-2xl">{totalVolume} gallons</span>
        </h1>

        <div className="flex justify-between">
          <div className="flex items-center">
            <div>
              <AddTank />
            </div>
          </div>
          {/* <div className="flex flex-col">
            <label htmlFor="category" className="py-1">
              Filter by supplier
            </label>
            <select
              className="border-2 px-4 py-2 rounded-lg"
             // value={selectedSupplier}
             // onChange={(e) => setSelectedSupplier(e.target.value)}
            >
              <option value="" disabled>
                Filter by supplier
              </option>
              <option value="">All</option>
              <option value="MOC">MOC</option>
              <option value="BOST">BOST</option>
            </select>
          </div> */}
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Search"
              className="border-2 border-gray-300 p-2 rounded-lg"
            />

            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg ml-2">
              Download Report
            </button>
          </div>
        </div>

        <table className="w-full mt-4">
          <thead>
            <tr className="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
              <th className="px-4 py-3">No.</th>
              <th className="px-4 py-3">Tank Name</th>

              <th className="px-4 py-3">Tank Content</th>
              <th className="px-4 py-3">Current Volume </th>
              <th className="px-4 py-3">Last Refilled</th>
            </tr>
          </thead>
          <tbody>
            {tanks.map((tank, index) => (
              <tr className="text-gray-700">
                <td className="px-4 py-3 border">
                  <div className="flex items-center text-sm">
                    <div>
                      <p className="font-semibold text-black">{index + 1}</p>
                    </div>
                  </div>
                </td>

                <td className="px-4 py-3 border">
                  <p className="font-semibold text-black">{tank.name}</p>
                </td>
                <td className="px-4 py-3 border">
                  <p className="font-semibold text-black">{tank.fuel_type}</p>
                </td>
                <td className="px-4 py-3 border">
                  <p className="font-semibold text-black">
                    {tank.current_volume} gal
                  </p>
                </td>
                <td className="px-4 py-3 border">
                  <p className="font-semibold text-black">
                    {tank.last_refilled}
                  </p>
                </td>

                <td className="px-4 py-3 border">
                  <Link href={`/tanks/${tank.id}`}>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
                      Details
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default TanksList