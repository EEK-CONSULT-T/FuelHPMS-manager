import Cards from "@/components/Cards";
import Progressings from "@/components/Progrssings";
import Recordings from "@/components/Recordings";
import React, { use, useEffect, useState } from "react";
import { AiOutlineRight } from "react-icons/ai";
import { BsCashCoin, BsFuelPump, BsPerson } from "react-icons/bs";
import { FaArrowAltCircleRight } from "react-icons/fa";
import Investors from "./Investors";
import StationList from "@/components/stations./stationList";
import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "@/firebase/config";
import ExpenseList from "@/components/expenditure/expenseList";
import Report from "@/components/expenditure/Report";

const Expenses = () => {
    const [expense, setExpense] = useState([]);
    const [loading, setLoading] = useState(false);
    const [totalAmount, setTotalAmount] = useState(0);

//   const [stations, setStations] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [totalAmount, setTotalAmount] = useState(0);

//   const fetchStations = async () => {
//     setLoading(true);
//     try {
//       //firestore in real time
//       const q = query(collection(db, "stations"));
//       const unsubscribe = onSnapshot(q, (querySnapshot) => {
//         const documents = [];
//         querySnapshot.forEach((doc) => {
//           documents.push({ ...doc.data(), id: doc.id });
//         });
//         setStations(documents);
//         console.log(documents);
//         setLoading(false);
//       });
//     } catch (error) {
//       console.log(error);
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchStations();
//   }, []);

  return (
    <div className="w-full h-full bg-gray-50   my-4 ">
      {/* <section class="text-gray-600 body-font">
        <div class="container   ">
          <div class="flex flex-wrap ">
            <div class="p-4 md:w-1/4">
              <div class="flex rounded-lg h-32 bg-white p-8 flex-col">
                <div class="flex items-center mb-3">
                  <div class="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-indigo-500 text-white flex-shrink-0">
                    <BsCashCoin />
                  </div>
                  <div>
                    <h2 class="text-gray-900 text-lg title-font font-medium">
                        Ghc 1,000,000
                    </h2>
                    <p class="leading-relaxed text-base">Total 
                     
                      Expenditure
                    </p>
                  </div>
                </div>
                <div class="flex-grow"></div>
              </div>
            </div>
            <div class="p-4 md:w-1/4">
              <div class="flex rounded-lg h-32 bg-white p-8 flex-col shadow-sm">
                <div class="flex items-center mb-3">
                  <div class="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-indigo-500 text-white flex-shrink-0">
                    <BsCashCoin />
                  </div>
                  <div>
                    <h2 class="text-gray-900 text-lg title-font font-medium">
                      Ghc 1,000,000
                    </h2>
                    <h2>Total Sales</h2>
                  </div>
                </div>
                <div class="flex-grow"></div>
              </div>
            </div>
            <div class="p-4 md:w-1/4">
              <div class="flex rounded-lg h-32 bg-white p-8 flex-col shadow-sm">
                <div class="flex items-center mb-3">
                  <div class="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-indigo-500 text-white flex-shrink-0">
                    <BsCashCoin />
                  </div>
                  <div>
                    <h2 class="text-gray-900 text-lg title-font font-medium">
                      Ghc 24,000
                    </h2>
                    <h2>Total Expenditure</h2>
                  </div>
                  {/* <h2 class="text-gray-900 text-lg title-font font-medium">
                    Neptune
                  </h2> 
                </div>
                <div class="flex-grow"></div>
              </div>
            </div>
            <div class="p-4 md:w-1/4">
              <div class="flex rounded-lg h-32 bg-white p-8 flex-col shadow-sm">
                <div class="flex items-center mb-3">
                  <div class="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-indigo-500 text-white flex-shrink-0">
                    <BsCashCoin />
                  </div>
                  <div>
                    <h2 class="text-gray-900 text-lg title-font font-medium">
                      20000
                    </h2>
                    <h2>Total Stocks</h2>
                  </div>
                <h2 class="text-gray-900 text-lg title-font font-medium">
                    Neptune
                  </h2> 
                </div>
                <div class="flex-grow"></div>
              </div>
            </div>
          </div>
        </div>
      </section> */}
      <div className="">


        <ExpenseList />
        {/* <Cards /> 
        <div className="p-4 grid md:grid-cols-1 grid-cols-1 gap-4 ">
          <Progressings />
          <Recordings />
        </div>
        {/* <Report /> */}
      </div>
    </div>
  );
};

export default Expenses;
