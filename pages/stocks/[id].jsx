import { db } from "@/firebase/config";
import { Avatar } from "@material-tailwind/react";
import { doc, onSnapshot } from "firebase/firestore";
import { useRouter } from "next/router";
import React, { use, useEffect, useState } from "react";
import toast from "react-hot-toast";

const StockDetails = () => {
  const [stock, setStock] = useState({});
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { id } = router.query;



  

  useEffect(() => {
    setLoading(true);

    try {
      const docRef = doc(db, "stocks", id);

      const unsubscribe = onSnapshot(docRef, (docSnap) => {
        if (docSnap.exists()) {
          console.log("Document data:", docSnap.data());
          setStock(docSnap.data());
          setLoading(false);
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");

          setLoading(false);
          toast.error(
            "Unable to provide data check your internet connection and try again"
          );
        }
      });
    } catch (error) {
      setLoading(false);
    }
  }, [id]);

  return (
    <div className="p-8 w-full shadow-lg">
      <div>
        <h2 className="font-bold text-xl">Stock Details</h2>
        {stock && (
          <>
            <div>
              <hr className="" />
              <div className="py-8 flex justify-between max-w-xl">
                <p>
                  <span className="font-bold text-gray-700">
                    Opening Litres
                  </span>
                </p>
                <p className="">{stock.opening_volume} litres</p>
              </div>
              <hr />
            </div>
            <div>
              <hr className="" />
              <div className="py-8 flex justify-between max-w-xl">
                <p>
                  <span className="font-bold text-gray-700">Opening Time:</span>
                </p>
                <p className="">{stock.opening_time} am</p>
              </div>
              <hr />
            </div>
            <div>
              <hr className="" />
              <div className="py-8 flex justify-between max-w-xl">
                <p>
                  <span className="font-bold text-gray-700">
                    Closing Litres:
                  </span>
                </p>
                <p className="">{stock.closing_volume} litres</p>
              </div>
              <hr />
            </div>
            <div>
              <hr className="" />
              <div className="py-8 flex justify-between max-w-xl">
                <p>
                  <span className="font-bold text-gray-700">Shortage:</span>
                </p>
                <p className="">{stock.shortage} Ghc</p>
              </div>
              <hr />
            </div>
            <div>
              <hr className="" />
              <div className="py-8 flex justify-between max-w-xl">
                <p>
                  <span className="font-bold text-gray-700">Closing Time:</span>
                </p>
                <p className="">{stock.closing_time} pm</p>
              </div>
              <hr />
            </div>
            <div>
              <hr className="" />
              <div className="py-8 flex justify-between max-w-xl">
                <p>
                  <span className="font-bold text-gray-700">
                    Sales Litres:
                  </span>
                </p>
                <p className="">{stock.sales} litres</p>
              </div>
              <hr />
            </div>
            <div>
              <hr className="" />
              <div className="py-8 flex justify-between max-w-xl">
                <p>
                  <span className="font-bold text-gray-700">Amount:</span>
                </p>
                <p className="">{stock.amount} Ghc</p>
              </div>
              <hr />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default StockDetails;
