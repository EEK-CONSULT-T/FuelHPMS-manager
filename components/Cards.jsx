import { db } from "@/firebase/config";
import { collection, getDocs, onSnapshot, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { BsCashCoin } from "react-icons/bs";
import { FaBell, FaCalendar, FaUser, FaUsers } from "react-icons/fa";

const Cards = () => {
  const [totalexpenditure , setTotalexpenditure] = useState(0);

  const [loading, setLoading] = useState(false);
  const [totalUsers, setTotalUsers] = useState(0);
  const[employees, setEmployees] = useState([]);
  




  const [user, setUser] = useState(null);

 



 


const fetchExpenditure = async () => {
  setLoading(true);
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
        console.log("Expenses", documents);

        // Calculate total expenditure
        const totalExpenditure = documents.reduce(
          (acc, curr) => acc + curr.amount,
          0
        );
        setTotalexpenditure(totalExpenditure);
      });

      return () => {
        // Unsubscribe from the listener when the component unmounts
        unsubscribe();
      };
    }

    


    setLoading(false);
  } catch (error) {
    console.error("Error fetching expenses:", error);
    setLoading(false);
  }
};
    
  console.log("this", totalexpenditure);
    
 //fetching total sales
  const fetchTotalSales = async () => {
    setLoading(true);
    try {
    }
    catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  
  //fetching total stocks
  const totalStocks = async () => {
    setLoading(true);
  }

  //fetching all employees
  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const stationId = user?.station_id; // Assuming station_id is stored in the user object

      console.log("stationId", stationId);

      if (stationId) {
        // Fetch all expenses for the station in realtime using onSnapshot
        const q = query(
          collection(db, "users"),
          where("station_id", "==", stationId)
        );
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          const documents = [];
          querySnapshot.forEach((doc) => {
            documents.push({ ...doc.data(), id: doc.id });
          });
          console.log("Employees", documents);

          // Calculate total expenditure
          const totalEmployees = documents.length;
          setEmployees(totalEmployees);
        });

        return () => {
          // Unsubscribe from the listener when the component unmounts
          unsubscribe();
        };
      }

      setLoading(false);
    } catch (error) {
      console.error("Error fetching employees:", error);  


      setLoading(false);
    }
  };



 
   
  useEffect(() => {
    fetchExpenditure();
    fetchEmployees();
  }, []);





  //  useEffect(() => {
  //    const givingsColRef = collection(db, "givings");

  //    const unsubscribe = onSnapshot(givingsColRef, (querySnapshot) => {
  //      const givingsData = querySnapshot.docs.map((doc) => doc.data());
  //      const totalGivings = givingsData.reduce(
  //        (acc, curr) => acc + curr.amount,
  //        0
  //      );
  //      setTotalGivings(totalGivings);

  //      console.log("Givings", givingsData);
  //    });

  //    return () => {
  //      // Unsubscribe from the listener when the component unmounts
  //      unsubscribe();
  //    };
  //  }, []);


  // useEffect(() => {
  //   const usersColRef = collection(db, "users");

  //   const unsubscribe = onSnapshot(usersColRef, (querySnapshot) => {
  //     const usersData = querySnapshot.docs.map((doc) => doc.data());
  //     const totalUsers = usersData.length;
  //     setTotalUsers(totalUsers);

  //     console.log("Users", usersData);
  //   });

  //   return () => {
  //     // Unsubscribe from the listener when the component unmounts
  //     unsubscribe();
  //   };
  // }, []);

  //  //fetch total users
  //  useEffect(() => {
  //    const eventsColRef = collection(db, "events");

  //     const unsubscribe = onSnapshot(eventsColRef, (querySnapshot) => {
  //       const eventsData = querySnapshot.docs.map((doc) => doc.data());
  //       const totalEvents = eventsData.length;
  //       setTotalEvents(totalEvents);

  //       console.log("Events", eventsData);
  //     });

  //     return () => {
  //       // Unsubscribe from the listener when the component unmounts
  //       unsubscribe();
  //     };
  //   }, []);


    
   
  //   //fetch total events
  //   useEffect(() => {
  //     const notificationsColRef = collection(db, "notifications");

  //     const unsubscribe = onSnapshot(notificationsColRef, (querySnapshot) => {
  //       const notificationsData = querySnapshot.docs.map((doc) => doc.data());
  //       const totalNotifications = notificationsData.length;
  //       setTotalNotifications(totalNotifications);

  //       console.log("Notifications", notificationsData);
  //     });

  //     return () => {
  //       // Unsubscribe from the listener when the component unmounts
  //       unsubscribe();
  //     };
  //   }, []);

       
    
    //fetch total notifications


    


  return (
    <div>
      <div className="grid lg:grid-cols-5 gap-4 p-4">
        <div className="lg:col-span-1 col-span-1 bg-white flex justify-between w-full border p-4 rounded-lg">
          <div className="flex items-center">
            <div className=" flex items-center m-2 rounded-lg">
              <BsCashCoin size={60} className="p-4   text-gray-600" />
            </div>
            <div className="flex flex-col w-full ">
              <p className="text-2xl font-bold">
                Ghc{" "}
                {totalexpenditure.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                })}
              </p>
              <p className="text-gray-600">Total Expenditure</p>
            </div>
          </div>
        </div>

        {/* <div className="lg:col-span-1 col-span-1 bg-white flex justify-between w-full border p-4 rounded-lg">
          <div className="flex items-center rounded">
            <div className=" flex items-center m-2 rounded-lg">
              <FaCalendar size={60} className="p-4 text-gray-600 rounded-md " />
            </div>
            <div className="flex flex-col w-full ">
              <p className="text-2xl font-bold">Ghc 20,000</p>
              <p className="text-gray-600">Total Sales</p>
            </div>
          </div>
        </div> */}
        <div className="lg:col-span-1 col-span-1 bg-white flex justify-between w-full border p-4 rounded-lg">
          <div className="flex items-center rounded">
            <div className=" flex items-center m-2 rounded-lg">
              <FaUsers size={60} className="p-4 text-gray-400 rounded-md " />
            </div>
            <div className="flex flex-col w-full ">
              <p className="text-2xl font-bold">{employees.toLocaleString()}</p>
              <p className="text-gray-600">Total Employees</p>
            </div>
          </div>
        </div>
        <div className="lg:col-span-1 col-span-1 bg-white flex justify-between w-full border p-4 rounded-lg">
          <div className="flex items-center rounded">
            <div className=" flex items-center m-2 rounded-lg">
              <FaUsers size={60} className="p-4 text-gray-400 rounded-md " />
            </div>
            <div className="flex flex-col w-full ">
              <p className="text-2xl font-bold">2000 Ghc</p>
              <p className="text-gray-600">
                Net Sales
              </p>
            </div>
          </div>
        </div>
        <div className="lg:col-span-1 col-span-1 bg-white flex justify-between w-full border p-4 rounded-lg">
          <div className="flex items-center rounded">
            <div className=" flex items-center m-2 rounded-lg">
              <FaUsers size={60} className="p-4 text-gray-400 rounded-md " />
            </div>
            <div className="flex flex-col w-full ">
              <p className="text-2xl font-bold">2000 Ghc</p>
              <p className="text-gray-600">
                Gross Profit
              </p>
            </div>
          </div>
        </div>
        <div className="lg:col-span-1 col-span-1 bg-white flex justify-between w-full border p-4 rounded-lg">
          <div className="flex items-center rounded">
            <div className=" flex items-center m-2 rounded-lg">
              <FaUsers size={60} className="p-4 text-gray-400 rounded-md " />
            </div>
            <div className="flex flex-col w-full ">
              <p className="text-2xl font-bold">2000 litres</p>
              <p className="text-gray-600">Total Stocks</p>
            </div>
          </div>
        </div>
        <div className="lg:col-span-1 col-span-1 bg-white flex justify-between w-full border p-4 rounded-lg">
          <div className="flex items-center rounded">
            <div className=" flex items-center m-2 rounded-lg">
              <FaUsers size={60} className="p-4 text-gray-400 rounded-md " />
            </div>
            <div className="flex flex-col w-full ">
              <p className="text-2xl font-bold">2000 litres</p>
              <p className="text-gray-600">Total Stocks</p>
            </div>
          </div>
        </div>
        <div className="lg:col-span-1 col-span-1 bg-white flex justify-between w-full border p-4 rounded-lg">
          <div className="flex items-center rounded">
            <div className=" flex items-center m-2 rounded-lg">
              <FaUsers size={60} className="p-4 text-gray-400 rounded-md " />
            </div>
            <div className="flex flex-col w-full ">
              <p className="text-2xl font-bold">2000 litres</p>
              <p className="text-gray-600">Total Stocks</p>
            </div>
          </div>
        </div>
        <div className="lg:col-span-1 col-span-1 bg-white flex justify-between w-full border p-4 rounded-lg">
          <div className="flex items-center rounded">
            <div className=" flex items-center m-2 rounded-lg">
              <FaUsers size={60} className="p-4 text-gray-400 rounded-md " />
            </div>
            <div className="flex flex-col w-full ">
              <p className="text-2xl font-bold">2000 litres</p>
              <p className="text-gray-600">Total Stocks</p>
            </div>
          </div>
        </div>
        <div className="lg:col-span-1 col-span-1 bg-white flex justify-between w-full border p-4 rounded-lg">
          <div className="flex items-center rounded">
            <div className=" flex items-center m-2 rounded-lg">
              <FaUsers size={60} className="p-4 text-gray-400 rounded-md " />
            </div>
            <div className="flex flex-col w-full ">
              <p className="text-2xl font-bold">2000 litres</p>
              <p className="text-gray-600">Total Stocks</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cards;
