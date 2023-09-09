import Cards from "@/components/Cards";
import Progressings from "@/components/Progrssings";
import Recordings from "@/components/Recordings";
import React from "react";
import { AiOutlineRight } from "react-icons/ai";
import { BsCashCoin, BsPerson } from "react-icons/bs";
import { FaArrowAltCircleRight } from "react-icons/fa";

const Investmnet = () => {
  return (
    <div className="w-full h-full bg-gray-50   my-4 ">
      <section class="text-gray-600 body-font">
        <div class="container   ">
          <div class="flex flex-wrap ">
            <div class="p-4 md:w-1/3">
              <div class="flex rounded-lg h-32 bg-white p-8 flex-col">
                <div class="flex items-center mb-3">
                  <div class="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-indigo-500 text-white flex-shrink-0">
                    <BsPerson />
                  </div>
                  <div>
                    <h2 class="text-gray-900 text-lg title-font font-medium">
                      123
                    </h2>
                    <p class="leading-relaxed text-base">Total Investors</p>
                  </div>
                </div>
                <div class="flex-grow"></div>
              </div>
            </div>
            <div class="p-4 md:w-1/3">
              <div class="flex rounded-lg h-32 bg-white p-8 flex-col">
                <div class="flex items-center mb-3">
                  <div class="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-indigo-500 text-white flex-shrink-0">
                    <BsCashCoin />
                  </div>
                  <div>
                    <h2 class="text-gray-900 text-lg title-font font-medium">
                      Ghc 1,000,000
                    </h2>
                    <h2>Total Investment</h2>
                  </div>
                </div>
                <div class="flex-grow"></div>
              </div>
            </div>
            <div class="p-4 md:w-1/3">
              <div class="flex rounded-lg h-32 bg-white p-8 flex-col">
                <div class="flex items-center mb-3">
                  <div class="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-indigo-500 text-white flex-shrink-0">
                    <BsCashCoin />
                  </div>
                  <div>
                    <h2 class="text-gray-900 text-lg title-font font-medium">
                      Ghc 24,000,000
                    </h2>
                    <h2>Investment Returns</h2>
                  </div>
                  {/* <h2 class="text-gray-900 text-lg title-font font-medium">
                    Neptune
                  </h2> */}
                </div>
                <div class="flex-grow"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="">
        {/* <Cards /> */}
        <div className="p-4 grid md:grid-cols-1 grid-cols-1 gap-4 ">
          <Progressings />
           <Recordings /> 
        </div>
        {/* <Report /> */}
      </div>
    </div>
  );
};

export default Investmnet;
