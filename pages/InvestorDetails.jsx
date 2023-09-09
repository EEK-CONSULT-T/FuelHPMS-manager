import React, { useEffect, useState } from "react";

import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { db } from "@/firebase/config";
import { FaDownload, FaEdit, FaPencilAlt } from "react-icons/fa";
import { useRouter } from "next/router";
import BarChart from "@/components/BarChart";
import Loader from "@/components/Loader";
import { toast } from "react-hot-toast";
import { Fragment } from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Select,
  Option,
  Input,
  Card,
} from "@material-tailwind/react";
import { Bar } from "react-chartjs-2";

const InvestorDetails = () => {
  const [user, setUser] = useState(null);
  const [givings, setGivings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [selectedRole, setSelectedRole] = useState("");
  const [subroles, setSubroles] = useState([]);

  const handleSubroleChange = (e) => {
    const { name, checked } = e.target;
    if (checked) {
      setSubroles((prevSubroles) => [...prevSubroles, name]);
      toast.success(`${name} subrole added`);
    } else {
      setSubroles((prevSubroles) =>
        prevSubroles.filter((role) => role !== name)
      );
      toast.success(`${name} subrole removed`);
    }
  };

  // Add this useEffect to persist subroles in local storage

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(!open);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    setLoading(true);

    try {
      const docRef = doc(db, "users", id);

      const unsubscribe = onSnapshot(docRef, (docSnap) => {
        if (docSnap.exists()) {
          console.log("Document data:", docSnap.data());
          setUser(docSnap.data());
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

  useEffect(() => {
    const fetchGivings = async () => {
      try {
        const givingsColRef = collection(db, "givings");
        const querySnapshot = await getDocs(
          query(givingsColRef, where("user_id", "==", id))
        );
        const givingsData = querySnapshot.docs.map((doc) => doc.data());
        setGivings(givingsData);
        console.log(id);

        console.log("Givings", givingsData);
      } catch (error) {
        console.log(error);
      }
    };

    if (id) {
      fetchGivings();
    }
  }, [id]);

  useEffect(() => {
    // Update the Firestore database with the subroles when the component mounts
    if (user) {
      const docRef = doc(db, "users", user.id);
      setDoc(docRef, { subroles }, { merge: true });
    }
  }, [user, subroles]);

  const editHandler = async (e) => {
    e.preventDefault();
    console.log("Edit");
    try {
      const docRef = doc(db, "users", user.id);
      const userData = {
        id: user.id,
        fullName: user.fullName,
        photo: user.photo,
        username: user.username,
        dateOfBirth: user.dateOfBirth,
        email: user.email,
        phoneNumber: user.phoneNumber,
        profileType: user.profileType,
      };
      await setDoc(docRef, userData);
      toast.success("User updated successfully");
      handleOpen();
    } catch (error) {
      console.log(error);
    }
  };

  const getWeekDay = (date) => {
    const weekdays = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const day = new Date(date).getDay();
    return weekdays[day];
  };

  const groupGivingsByDay = () => {
    const weekdays = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    const getRandomColor = () => {
      const letters = "0123456789ABCDEF";
      let color = "#";
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    };

    const groupedGivings = weekdays.reduce((accumulator, dayOfWeek) => {
      accumulator[dayOfWeek] = {
        amount: 0,
        color: getRandomColor(),
      };
      return accumulator;
    }, {});

    givings.forEach((giving) => {
      const dayOfWeek = getWeekDay(giving.date_paid.toDate());
      groupedGivings[dayOfWeek].amount += giving.amount;
    });

    return Object.entries(groupedGivings).map(([dayOfWeek, data]) => ({
      dayOfWeek,
      amount: data.amount,
      color: data.color,
    }));
  };

  const givingsData = {
    labels: groupGivingsByDay().map((giving) => giving.dayOfWeek),
    datasets: [
      {
        label: "Givings",
        data: groupGivingsByDay().map((giving) => giving.amount),
        backgroundColor: groupGivingsByDay().map((giving) => giving.color),
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };
  const calculateTotalGivingsByType = () => {
    const totalGivingsByType = {};

    // Initialize totalGivingsByType with all giving_types and set their initial amount to 0
    givings.forEach((giving) => {
      const { giving_type } = giving;
      totalGivingsByType[giving_type] = 0;
    });

    // Increment the amounts for each giving_type
    givings.forEach((giving) => {
      const { giving_type, amount } = giving;
      totalGivingsByType[giving_type] += amount;
    });

    return totalGivingsByType;
  };

  const totalGivingsByType = calculateTotalGivingsByType();

  return (
    <>
    <div className="bg-gray-100 w-full h-full p-8">
     <div className="flex justify-around items-center w-full">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">
            Shareholder Details
            </h1>
          </div>
          <div className="flex justify-around items-center">
            <button
              
              className="flex items-center mr-4 px-4 py-2 space-x-2 text-sm font-medium text-white transition-colors duration-150 bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <FaPencilAlt className="w-5 h-5" />
              <span>Edit</span>
            </button>
            <button
            
              className="flex items-center px-4 py-2 space-x-2 text-sm font-medium text-blue-500 transition-colors duration-150 bg-white border border-blue-500 hover:text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <FaDownload className="w-5 h-5" />
              <span>Download contract </span>
            </button>
          </div>
        </div> 

      
      <div class="mt-6 border-t border-gray-100 p-8">
        <dl class="divide-y divide-gray-100">
          
          <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt class="text-sm font-medium leading-6 text-gray-900">
              Profile Photo
            </dt>
            <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              <img
                src="https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-5.jpg"
                className="w-20 h-20 rounded-full"
              />
            </dd>
          </div>

          <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt class="text-sm font-medium leading-6 text-gray-900">
              Full name
            </dt>
            <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              Michael Clad
            </dd>
          </div>
         
          <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt class="text-sm font-medium leading-6 text-gray-900">
              Email address
            </dt>
            <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              michclad@gmail.com
            </dd>
          </div>

         <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt class="text-sm font-medium leading-6 text-gray-900">
              Date of birth
            </dt>
            <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              20/08/1990
            </dd>
          </div>
          <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt class="text-sm font-medium leading-6 text-gray-900">Contact</dt>
            <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              233 5599 11251
            </dd>
          </div>
          <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt class="text-sm font-medium leading-6 text-gray-900">
              Investment amount
            </dt>
            <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              Ghc 15,000
            </dd>
          </div>
          <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt class="text-sm font-medium leading-6 text-gray-900">
              Years of investment
            </dt>
            <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              1 year
            </dd>
          </div>
          <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt class="text-sm font-medium leading-6 text-gray-900">
              Percentage of investment
            </dt>
            <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              25%
            </dd>
          </div>
          <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt class="text-sm font-medium leading-6 text-gray-900">
              Date of investment
            </dt>
            <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              20/08/2023
            </dd>
          </div>
          <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt class="text-sm font-medium leading-6 text-gray-900">
              End date of investment
            </dt>
            <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              20/08/2024
            </dd>
          </div>
          <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt class="text-sm font-medium leading-6 text-gray-900">
              Expected investment return
            </dt>
            <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              Ghc 2,000
            </dd>
          </div>
        </dl>
      </div>

    
     

      <div className="px-4 sm:px-0">
        <h3 className="text-3xl font-semibold leading-7 text-gray-900">
          Contract History 

        </h3>
      </div>


      {givings.length > 0 && (
        <div className="p-8">
          <div className=" border-t border-gray-100">
            <dl className="divide-y divide-gray-100">
              <div className="px-4  sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-xl font-medium leading-6 text-gray-900">
                  Total Givings
                </dt>
                <dd className="mt-1 text-xl leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  Gh{givings.reduce((a, b) => a + b.amount, 0)}
                </dd>
              </div>
            </dl>
          </div>

          <div className="mt-6"></div>
        </div>
      )}

      <div className="mt-6">
        <h3 className="text-3xl font-semibold leading-7 text-gray-900"></h3>
        <div className="mt-4">
          {Object.entries(totalGivingsByType).map(([givingType, total]) => (
            <div key={givingType} className="flex items-center mt-2">
              <span className="text-lg font-medium text-gray-900">
                {givingType}:
              </span>
              <span className="ml-2 text-lg text-gray-700">Gh{total}</span>
            </div>
          ))}
        </div>
      </div>

    
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>Edit User</DialogHeader>
        <DialogBody divider>
          <form onSubmit={editHandler}>
            <div className="grid grid-cols-1 gap-6 mt-4">
              <label className="block">
                <span className="text-gray-700">Full Name</span>
                <Input
                  type="text"
                  name="fullName"
                  id="fullName"
                  required
                  value={user ? user.fullName : ""}
                  onChange={(e) =>
                    setUser({ ...user, fullName: e.target.value })
                  }
                  className="block w-full mt-1 form-input py-3 border-2 rounded "
                />
              </label>
              <label className="block">
                <span className="text-gray-700">Email</span>
                <Input
                  type="email"
                  name="email"
                  id="email"
                  required
                  value={user ? user.email : ""}
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                  className="block w-full mt-1 form-input"
                />
              </label>

              <label className="block">
                <span className="text-gray-700">Phone Number</span>
                <Input
                  type="text"
                  name="phoneNumber"
                  id="phoneNumber"
                  required
                  value={user ? user.phoneNumber : ""}
                  onChange={(e) =>
                    setUser({ ...user, phoneNumber: e.target.value })
                  }
                  className="block w-full mt-1 form-input"
                />
              </label>
              <label className="block">
                <span className="text-gray-700">Role</span>

                <select
                  value={user ? user.profileType : ""}
                  onChange={(e) =>
                    setUser({ ...user, profileType: e.target.value })
                  }
                  className="block w-full mt-1 form-select py-2 "
                >
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
              </label>
            </div>

            <div className="flex justify-end mt-6">
              <button
                type="button"
                onClick={handleOpen}
                className="px-4 py-2 text-sm font-medium text-gray-700 transition-colors duration-150 bg-gray-200 border border-transparent rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 ml-4 text-sm font-medium text-white transition-colors duration-150 bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Save Changes
              </button>
            </div>
          </form>
        </DialogBody>
                </Dialog>
    </div>
     
            
    
        
        
    </>
  );
};

export default InvestorDetails;
