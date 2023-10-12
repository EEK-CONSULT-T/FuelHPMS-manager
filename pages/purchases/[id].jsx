import { db } from "@/firebase/config";
import { Avatar } from "@material-tailwind/react";
import { doc, onSnapshot } from "firebase/firestore";
import { useRouter } from "next/router";
import React, { use, useEffect, useState } from "react";
import toast from "react-hot-toast";

const PurchaseDetails = () => {
  const [stock, setStock] = useState({});
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    setLoading(true);

    try {
      const docRef = doc(db, "purchases", id);

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
        <h2 className="font-bold text-xl">
           Purchase
           Details</h2>
        {stock && (
          <>
            <div>
              <hr className="" />
              <div className="py-8 flex justify-between max-w-xl">
                <p>
                  <span className="font-bold text-gray-700">
                    Quantity Purchased:
                  </span>
                </p>
                <p className="">{stock.quantity} litres</p>
              </div>
              <hr />
            </div>
            <div>
              <hr className="" />
              <div className="py-8 flex justify-between max-w-xl">
                <p>
                  <span className="font-bold text-gray-700">
                     Cost Per Litre:
                    </span>
                </p>
                <p className="">
                  {stock.cost_litre} Ghc
                </p>
              </div>
              <hr />
            </div>
            <div>
              <hr className="" />
              <div className="py-8 flex justify-between max-w-xl">
                <p>
                  <span className="font-bold text-gray-700">
                    Selling Price Per Litre:
                  </span>
                </p>
                <p className="">
                  {stock.sell_litre} Ghc
                </p>
              </div>
              <hr />
            </div>
            <div>
              <hr className="" />
              <div className="py-8 flex justify-between max-w-xl">
                <p>
                  <span className="font-bold text-gray-700">
                    Total Cost:
                  </span>
                </p>
                <p className="">
                  {stock.cost_total} Ghc
                </p>
              </div>
              <hr />
            </div>
            <div>
              <hr className="" />
              <div className="py-8 flex justify-between max-w-xl">
                <p>
                  <span className="font-bold text-gray-700">
                    profit:
                  </span>
                </p>
                <p className="">
                  {stock.profit} Ghc
                </p>
              </div>
              <hr />
            </div>
            <div>
              <hr className="" />
              <div className="py-8 flex justify-between max-w-xl">
                <p>
                  <span className="font-bold text-gray-700">
                    Supplier Name:
                  </span>
                </p>
                <p className="">
                  {stock.supplier}
                </p>
              </div>
              <hr />
            </div>
            <div>
              <hr className="" />
              <div className="py-8 flex justify-between max-w-xl">
                <p>
                  <span className="font-bold text-gray-700">Date:</span>
                </p>
                <p className="">
                  {stock.date}
                </p>
              </div>
              <hr />
            </div>
            
          </>
        )}
      </div>
    </div>
  );
};

export default PurchaseDetails;
