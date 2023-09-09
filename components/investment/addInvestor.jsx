import React, { Fragment, useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Progress,
  Option,
  Select,
} from "@material-tailwind/react";
import { toast } from "react-hot-toast";
import {
  Timestamp,
  collection,
  doc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { db, storage } from "@/firebase/config";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { nanoid } from "nanoid";

const AddInvestor = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);
  const [investment, setInvestment] = useState({
    id: nanoid(),
    name: "",
    imageUrl: "",
    amount: "",
    percentage: "",
    startDate: "",
    duration: "",
    endDate: "",
  });

   const handleInputChange = (e) => {
     const { name, value } = e.target;
     setInvestment({ ...investment, [name]: value });
   };
  
  const handleAddInvestor = async (e) => {
    e.preventDefault();
    console.log(investment);
  };

  //simlpe interest formula
  const investmentReturn = (investment.amount * investment.percentage/100 * investment.duration);


  //accrued amount 
   const accruedAmount = investmentReturn + investment.amount;
  // const [investment, setInvestment] = useState({
  //   id: nanoid(),
  //   title: "",
  //   description: "",
  //   imageUrl: "",
  //   link: "",
  //   percentage: "",
  //   investmentReturn: "",
  //   amount: "",
  //   startDate: "",
  //   endDate: "",
    
  //   //an array of strings of user IDs
  // });

  const [uploadProgress, setUploadProgress] = useState(0);

  
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    console.log(file);

    const storageRef = ref(storage, `Eimages/${Date.now()}${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      },
      (error) => {
        alert(error.message);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setInvestment44({ ...investment, imageUrl: downloadURL });
          alert("Image uploaded successfully");
        });
      }
    );
  };

  // const handleAddEvent = async (e) => {
  //   e.preventDefault();
  //   console.log(investment);

  //   try {
  //     const docRef = doc(db, "investments", investment.id); // Replace `investment.id` with the actual document ID

  //     const startDate = new Date(investment.startDate);
  //     const endDate = new Date(investment.endDate);

  //     const investmentData = {
  //       id: investment.id,
  //       title: investment.title,
  //       amount: investment.amount,
  //       startDate: serverTimestamp(startDate),
  //       endDate: serverTimestamp(endDate),
  //       venue: investment.venue,
  //        percentage: investment.percentage,
  //       imageUrl: investment.imageUrl,
  //       link: investment.link,
  //       investmentReturn: investment.investmentReturn,
      
  //     };

  //     await setDoc(docRef, investmentData);
  //     toast.success("Event created successfully");

  //     handleOpen();

  //     //console.log("Document written with ID: ", docRef.id);
  //   } catch (error) {
  //     console.log(error);
  //     alert(error.message);
  //   }
  // };
const formattedInvestmentReturn = investmentReturn.toLocaleString("en-US", {
  style: "currency",
  currency: "GHS",
});

  return (
    <div>
      <Fragment>
        <div className="flex justify-between px-4 pt-8">
          <div className="flex items-center">
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded-lg "
              onClick={handleOpen}
            >
              Add Investor
            </button>
          </div>
        </div>

        <Dialog
          open={open}
          handler={handleOpen}
          animate={{
            mount: { scale: 1, y: 0 },
            unmount: { scale: 0.9, y: -100 },
          }}
        >
          <DialogHeader>Add Investor</DialogHeader>
          <DialogBody divider>
            <form onSubmit={handleAddInvestor}>
              <div className="m-2">
                <label htmlFor="">Investor's name</label>
                <input
                  type="text"
                  placeholder="Investor's name"
                  className="border-2 border-gray-300 p-2 rounded-lg w-full"
                  onChange={handleInputChange}
                  value={investment.name}
                  name="name"
                />
              </div>

              <div className="m-2">
                <label htmlFor="">Return Date</label>
                <input
                  type="date"
                  placeholder="Starting investment date"
                  className="border-2 border-gray-300 p-2 rounded-lg w-full"
                  onChange={handleInputChange}
                  value={investment.endDate}
                  name="endDate"
                />
              </div>
            

              {uploadProgress === 0 ? null : (
                <Progress value={uploadProgress} color="blue" />
              )}

              <div className="flex flex-col mt-2">
                <label htmlFor="imageUrl">Upload Image of Investor</label>
                <input
                  type="file"
                  accept="image/*"
                  name="imageUrl"
                  className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:border-blue-400"
                  onChange={(e) => handleImageChange(e)}
                />
                {investment.imageUrl === "" ? null : (
                  <input
                    className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:border-blue-400"
                    type="text"
                    name="imageUrl"
                    placeholder="Image URL"
                    value={investment.imageUrl}
                    disabled
                  />
                )}
              </div>

              {/* <div className="m-2">
                <label htmlFor="">Event link</label>
                <input
                  type="url"
                  placeholder="Event link"
                  className="border-2 border-gray-300 p-2 rounded-lg w-full"
                  name="link"
                  onChange={handleInputChange}
                  value={event.link}
                />
              </div> */}
              <div className="m-2">
                <label htmlFor="">Investment amount</label>
                <input
                  type="number"
                  placeholder="Investment amount"
                  className="border-2 border-gray-300 p-2 rounded-lg w-full"
                  name="amount"
                  onChange={handleInputChange}
                  value={investment.amount}

                />
              </div>
              <div className="m-2">
                <label htmlFor="">Investment Percentage(%)</label>
                <input
                  type="number"
                  placeholder="Investor's percentage"
                  className="border-2 border-gray-300 p-2 rounded-lg w-full"
                  name="percentage"
                  onChange={handleInputChange}
                  value={investment.percentage}
                />
              </div>
              <div className="">
                <label htmlFor="category" className="py-1 ">
                 Investment duration
                </label>
                <select
                  className="border-2 border-gray-300 p-2 rounded-lg w-full"
                  required
                  placeholder="Select category type"
                  value={investment.duration}
                  name="duration"
                  onChange={handleInputChange}
                >
                  <option selected disabled>
                    Select investment duration
                  </option>
                  <option value="0.08">1 month</option>
                  <option value="0.17">2 months</option>
                  <option value="0.25">3 months</option>
                  <option value="0.33">4 months</option>
                  <option value="0.42">5 months</option>
                  <option value="0.50">6 months</option>
                </select>
              </div>
              <div className="bg-yellow-100 my-2 p-4 rounded">
                <label htmlFor="">Invested return</label>
                <p>
            
                You will receive <span className="font-bold text-md">
                  {formattedInvestmentReturn}
                  </span> {" "}
                 after {investment.duration}
                  {
                    investment.duration > 1 ? " years" : " year"
                  }
                  
                </p>
                <Input type="text" color="blue" placeholder="Invested return" 
                 value={investmentReturn}
                  name="investmentReturn"
                disabled />
              </div>
              <div className="flex justify-between m-4">
                <button
                  className="bg-blue-400 text-white px-6 py-2 rounded-xl"
                  type="submit"
                >
                  <span>Submit</span>
                </button>
              </div>
            </form>
          </DialogBody>
        </Dialog>
      </Fragment>
    </div>
  );
};

export default AddInvestor;
