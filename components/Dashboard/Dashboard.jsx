import React, { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2';
import { BsCashCoin } from 'react-icons/bs';
import { FaGasPump, FaUsers, FaWallet } from 'react-icons/fa';












import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from '@/firebase/config';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top", // place legend on the right side of chart
    },
    title: {
      display: true,
      text: "Sales Chart",
    },
  },
};

const labels = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const Dashboard = () => {
    const [totalexpenditure , setTotalexpenditure] = useState(0);
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalSales, setTotalSales] = useState(0);
    const [sales, setSales] = useState([]);
    const [loading, setLoading] = useState(false);





const data = {
  labels,
  datasets: [
    {
      label: "Sales",
      data: sales,
       
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
  ],
};


const fetchTotals = async () => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    const stationId = user?.station_id;
    const currentYear = new Date().getFullYear().toString();

    // Fetch users from Firestore for the current year
    const userCollectionRef = collection(db, "users");
    const userQuery = query(
      userCollectionRef,
      where("station_id", "==", stationId)
    );
    const unsubscribeUsers = onSnapshot(userQuery, (querySnapshot) => {
      const documents = [];
      querySnapshot.forEach((doc) => {
        if (doc.data().date && doc.data().date.startsWith(currentYear)) {
          documents.push({ ...doc.data(), id: doc.id });
        }
      });
      setTotalUsers(documents.length);
    });

    // Fetch sales from Firestore for the current year
    const salesCollectionRef = collection(db, "stocks");
    const salesQuery = query(
      salesCollectionRef,
      where("station", "==", stationId)
    );
    const unsubscribeSales = onSnapshot(salesQuery, (querySnapshot) => {
      let totalSalesValue = 0;
      const salesData = [];
      querySnapshot.forEach((doc) => {
        if (doc.data().date && doc.data().date.startsWith(currentYear)) {
          const saleAmount = doc.data().amount;
          totalSalesValue += saleAmount;
          salesData.push(saleAmount);
        }
      });
      setTotalSales(totalSalesValue);
      setSales(salesData);
    });

    // Fetch expenditures from Firestore for the current year
    const expensesCollectionRef = collection(db, "expenses");
    const expensesQuery = query(
      expensesCollectionRef,
      where("station", "==", stationId)
    );
    const unsubscribeExpenses = onSnapshot(expensesQuery, (querySnapshot) => {
      let totalExpenditureValue = 0;
      querySnapshot.forEach((doc) => {
        if (doc.data().date && doc.data().date.startsWith(currentYear)) {
          totalExpenditureValue += doc.data().amount;
        }
      });
      setTotalexpenditure(totalExpenditureValue);
    });

    return () => {
      unsubscribeUsers();
      unsubscribeSales();
      unsubscribeExpenses();
    };
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
    
  useEffect(() => {
    fetchTotals();
  }, );


  


    const cardsData = [

        {
            id: 1,
            title: "Total Expenditure",
            icon: <BsCashCoin size={60} className="p-4   text-yellow-800" />,
            value: totalexpenditure,
        },

        {
            id: 2,
            title: "Total Employees",
            icon: <FaUsers size={60} className="p-4 text-gray-400 rounded-md " />,
            value: totalUsers,
        },
        {
            id: 3,
            title: "Total Sales",
            icon: <FaWallet size={60} className="p-4 text-blue-400 rounded-md " />,
            value: totalSales,
        },
        {
            id: 4,
            title: "Total Stocks",
            icon: <FaGasPump size={60} className="p-4 text-red-400 rounded-md " />,
            value: 2000,
        },
    ];


  return (
    <div>
      <div className="flex justify-between px-4 pt-4">
        <h2 className="font-bold text-2xl">Dashboard</h2>

       
      </div>

      <div className="grid lg:grid-cols-5 gap-4 p-4">
        {cardsData.map((card) => (
          <div
            className="lg:col-span-1 col-span-1 bg-white flex justify-between w-full border p-4 rounded-lg"
            key={card.id}
          >
            <div className="flex items-center">
              <div className=" flex items-center m-2 rounded-lg">
                {card.icon}
              </div>
              <div className="flex flex-col w-full ">
                <p className="text-2xl font-bold">
                  {card.id === 1 || card.id === 3
                    ? card.value.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                      })
                    : card.value}
                </p>
                <p className="text-gray-600">{card.title}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className=" md:col-span-1  relative lg:h-[70vh] h-[50vh] m-6 p-8 border rounded-lg bg-white md:py-16">
        <h1>
          Total <span className="text-blue-500">Sales</span>
        </h1>
        <h1 className="text-4xl">
          <span className="text-blue-500">
            Ghc{" "}
            {totalSales.toLocaleString(undefined, {
              minimumFractionDigits: 2,
            })}
          </span>
        </h1>
        <Line options={options} data={data} />
      </div>
    </div>
  );
}

export default Dashboard