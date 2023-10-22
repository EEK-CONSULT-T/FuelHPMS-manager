import React, { useState, useEffect } from "react";
import {  Line } from "react-chartjs-2";
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
      position: 'top' // place legend on the right side of chart
    },
    title: {
      display: true,
      text: 'Sales Chart',
    },
  },
};



const labels = ["January", "February", "March", "April", "May", "June", "July","August","September","October","November", "December"];

export const data = {
  labels,
  datasets: [
    {
      label: "Sales",
      data: [0, 10, 5, 2, 20, 30, 45],
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    
  ],
};

const Progressings = () => {
  const [sales, setSales] = useState([]);

  const fetchSales = async () => {
    //fetch sales from firestore  using onspashot
    try
    {

    }
    catch(error)
    {

    }
  }
      
 
      

  return (
    <>
      <div className="w-full md:col-span-1  relative lg:h-[70vh] h-[50vh] m-auto p-8 border rounded-lg bg-white md:py-16">
        <p>Total 
        <span className="text-blue-500"> 
         Sales
        </span>
        </p>
        <h1 className="text-4xl">
          <span className="text-blue-500">
             Cedi sign Ghc 24,000,000
          </span>
        </h1>
         <Line options={options} data={data} />
        
      </div>
    </>
  );
};

export default Progressings;
