import Cards from "@/components/Cards";
import Progressings from "@/components/Progrssings";
import Recordings from "@/components/Recordings";
import StocksList from "@/components/stocks/StocksList";
import TanksList from "@/components/tanks/TanksList";
import { db } from "@/firebase/config";
import { collection, onSnapshot, query } from "firebase/firestore";
import React, { use, useEffect, useState } from "react";
import { AiOutlineRight } from "react-icons/ai";
import { BsCashCoin, BsFuelPumpDiesel, BsPerson } from "react-icons/bs";
import { FaArrowAltCircleRight } from "react-icons/fa";

const Tanks = () => {
  const [tanks, setTanks] = useState([]);
  const [loading, setLoading] = useState(false);

  // const [investors, setInvestors] = useState([]);
  // const [investment, setInvestment] = useState([]);
  // const [returns, setReturns] = useState([]);
  // const [totalInvestment, setTotalInvestment] = useState([]);
  // const [totalReturns, setTotalReturns] = useState([]);
  // const [totalInvestors, setTotalInvestors] = useState([]);
  // const [loading, setLoading] = useState(false);
  // const [totalAmount, setTotalAmount] = useState(0);

  // const fetchInvestors = async () => {
  //   setLoading(true);
  //   try {
  //     //firestore in real time
  //     const q = query(collection(db, "investors"));
  //     const unsubscribe = onSnapshot(q, (querySnapshot) => {
  //       const documents = [];
  //       querySnapshot.forEach((doc) => {
  //         documents.push({ ...doc.data(), id: doc.id });
  //       });
  //       setInvestors(documents);
  //       console.log(documents);
  //       setLoading(false);
  //     });
  //   } catch (error) {
  //     console.log(error);
  //     setLoading(false);
  //   }
  // };

  // const fetchInvestmentTotal = async () => {
  //   setLoading(true);
  //   try {
  //     const q = query(collection(db, "investors"));
  //     const unsubscribe = onSnapshot(q, (querySnapshot) => {
  //       const documents = [];
  //       let totalAmountValue = 0;

  //       querySnapshot.forEach((doc) => {
  //         const data = doc.data();
  //         documents.push({ ...data, id: doc.id });
  //         totalAmountValue += data.amount || 0; // Assuming the field name is 'amount'
  //       });

  //       setInvestors(documents);
  //       setTotalAmount(totalAmountValue);
  //       console.log("totalAmountValue", totalAmountValue); // This will be the sum of all the 'amount' fields

  //       console.log(documents);
  //       setLoading(false);
  //     });
  //   } catch (error) {
  //     console.log(error);
  //     setLoading(false);
  //   }
  // };

  // const fetchReturnsTotal = async () => {
  //   setLoading(true);
  //   try {
  //     const q = query(collection(db, "investors"));
  //     const unsubscribe = onSnapshot(q, (querySnapshot) => {
  //       const documents = [];
  //       let totalReturnsValue = 0;

  //       querySnapshot.forEach((doc) => {
  //         const data = doc.data();
  //         documents.push({ ...data, id: doc.id });
  //         totalReturnsValue += data.investmentReturn || 0; // Assuming the field name is 'amount'
  //       });

  //       setInvestors(documents);
  //       setTotalReturns(totalReturnsValue);
  //       console.log("totalReturnsValue", totalReturnsValue); // This will be the sum of all the 'amount' fields

  //       console.log(documents);
  //       setLoading(false);
  //     });
  //   } catch (error) {
  //     console.log(error);
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   fetchInvestors();
  //   fetchInvestmentTotal();
  //   fetchReturnsTotal();
  // }, []);

  return (
    <div className="w-full h-full bg-gray-50   my-4 ">
      {/* <section class="text-gray-600 body-font">
        <div class="container   ">
          <div class="flex flex-wrap ">
            <div class="p-4 md:w-1/3">
              <div class="flex rounded-lg h-32 bg-white p-8 flex-col shadow-lg">
                <div class="flex items-center mb-3">
                  <div class="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-indigo-500 text-white flex-shrink-0">
                    <BsFuelPumpDiesel />
                  </div>
                  <div>
                    <h2 class="text-gray-900 text-lg title-font font-medium">
                      25
                      {/* {investors.length} 
                    </h2>
                    <p class="leading-relaxed text-base">Total Pumps</p>
                  </div>
                </div>
                <div class="flex-grow"></div>
              </div>
            </div>
            <div class="p-4 md:w-1/3">
              <div class="flex rounded-lg h-32 bg-white p-8 flex-col shadow-lg">
                <div class="flex items-center mb-3">
                  <div class="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-indigo-500 text-white flex-shrink-0">
                    <BsCashCoin />
                  </div>
                  <div>
                    <h2 class="text-gray-900 text-lg title-font font-medium">
                      Ghc
                 
                    </h2>
                    <h2>Total Super Tanks</h2>
                  </div>
                </div>
                <div class="flex-grow"></div>
              </div>
            </div>
            <div class="p-4 md:w-1/3 ">
              <div class="flex rounded-lg h-32 bg-white p-8 flex-col shadow-lg">
                <div class="flex items-center mb-3">
                  <div class="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-indigo-500 text-white flex-shrink-0">
                    <BsPerson />
                  </div>
                  <div>
                    <h2 class="text-gray-900 text-lg title-font font-medium">
                      125
                       {totalReturns} 
                    </h2>
                    <h2>Total Diesel Tanks</h2>
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
        <TanksList />
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

export default Tanks;
