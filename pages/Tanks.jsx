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

// import React, { useEffect, useState } from "react";
// import {
//   collection,
//   getFirestore,
//   getDocs,
//   updateDoc,
//   doc,
//   getDoc,
//   deleteDoc,
// } from "firebase/firestore";
// import { Card, Typography } from "@material-tailwind/react";
// import Link from "next/link.js";
// import { auth, db } from "@/firebase/config.js";

// import {
//   Dialog,
//   DialogHeader,
//   DialogBody,
//   DialogFooter,
// } from "@material-tailwind/react";
// import { CheckIcon } from "lucide-react";
// import { toast } from "react-hot-toast";
// import { createUserWithEmailAndPassword } from "firebase/auth";
// import { AddUser } from "@/components/user/AddUser";

// import {
//   MagnifyingGlassIcon,
//   ChevronUpDownIcon,
// } from "@heroicons/react/24/outline";
// import { PencilIcon, UserPlusIcon } from "@heroicons/react/24/solid";
// import {
//   CardHeader,
//   Input,
//   CardBody,
//   Chip,
//   CardFooter,
//   Tabs,
//   TabsHeader,
//   Tab,
//   Avatar,
//   IconButton,
//   Tooltip,
// } from "@material-tailwind/react";
// import { FaFileDownload } from "react-icons/fa";
// import {
//   Menu,
//   MenuHandler,
//   MenuList,
//   MenuItem,
//   Button,
// } from "@material-tailwind/react";
// import { HiDotsHorizontal, HiDotsVertical } from "react-icons/hi";
// import { BsCashCoin } from "react-icons/bs";

// const Stocks = () => {
//   const [users, setUsers] = useState([]);

//   const [loading, setLoading] = useState(true);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [blockAll, setBlockAll] = useState(false);
//   const [sortOption, setSortOption] = useState("all"); // 'all', 'blocked', or 'unblocked'
//   const [sortOrder, setSortOrder] = useState("asc");

//   //password for all users

//   //pull user data from local storage

//   //pull user data from local storage

//   // useEffect(() => {
//   //   const fetchUsers = async () => {
//   //     setLoading(true);
//   //     try {
//   //       const querySnapshot = await getDocs(collection(db, "users"));
//   //       const usersData = querySnapshot.docs.map((doc) => doc.data());
//   //       setUsers(usersData);
//   //       setLoading(false);
//   //       console.log(usersData);
//   //     } catch (error) {
//   //       console.log(error);
//   //       setLoading(false);
//   //     }
//   //   };

//   //   fetchUsers();
//   // }, []);

//   // const [open, setOpen] = React.useState(false);

//   // const handleOpen = () => setOpen(!open);

//   // const handleSortChange = () => {
//   //   // Toggle the sorting order when this function is called
//   //   setSortOrder(sortOrder === "asc" ? "desc" : "asc");
//   // };

//   // const handleSortOptionChange = (e) => {
//   //   // Update the sorting option when the select value changes
//   //   setSortOption(e.target.value);
//   // };

//   // const handleBlockAllChange = (e) => {
//   //   const isChecked = e.target.checked;
//   //   setBlockAll(isChecked);

//   //   // Update the block field for all users in the state
//   //   setUsers((prevUsers) =>
//   //     prevUsers.map((user) => ({
//   //       ...user,
//   //       block: isChecked,
//   //     }))
//   //   );

//   //   // Update all user documents in the database with the new block status
//   //   users.forEach((user) => {
//   //     updateDoc(doc(db, "users", user.id), { block: isChecked });
//   //   });
//   // };

//   // const handleBlockChange = async (userId, isChecked) => {
//   //   setUsers((prevUsers) =>
//   //     prevUsers.map((user) =>
//   //       user.id === userId ? { ...user, block: isChecked } : user
//   //     )
//   //   );

//   //   // Update the user document in the database with the new block status
//   //   try {
//   //     await updateDoc(doc(db, "users", userId), { block: isChecked });
//   //   } catch (error) {
//   //     console.log("Error updating user:", error);
//   //   }
//   // };

//   // const filteredUsers = users.filter((user) =>
//   //   user.fullName.toLowerCase().includes(searchQuery.toLowerCase())
//   // );

//   // const sortedUsers = filteredUsers.slice().sort((a, b) => {
//   //   // Filter users based on the 'sortOption' state
//   //   if (sortOption === "blocked" && a.block !== b.block) {
//   //     return a.block ? -1 : 1;
//   //   } else if (sortOption === "unblocked" && a.block !== b.block) {
//   //     return a.block ? 1 : -1;
//   //   }

//   //   // If 'sortOption' is 'all' or both users have the same 'block' status, sort based on 'sortOrder'
//   //   if (sortOrder === "asc") {
//   //     return a.block - b.block;
//   //   } else {
//   //     return b.block - a.block;
//   //   }
//   // });

//   // const [currentPage, setCurrentPage] = useState(1);
//   // const usersPerPage = 10;

//   // // Function to get the index of the first and last user of the current page
//   // const indexOfLastUser = currentPage * usersPerPage;
//   // const indexOfFirstUser = indexOfLastUser - usersPerPage;
//   // const currentUsers = sortedUsers.slice(indexOfFirstUser, indexOfLastUser);

//   // // Function to handle page change
//   // const handlePageChange = (pageNumber) => {
//   //   setCurrentPage(pageNumber);
//   // };

//   // //authenticating user and storing in user database
//   // const addUser = async () => {
//   //   handleOpen();
//   // };

//   // // ...
//   // const handleDeleteUser = async (userId) => {
//   //   // Perform the deletion process
//   //   try {
//   //     // Delete the user document from the database
//   //     await deleteDoc(doc(db, "users", userId));

//   //     // Remove the user from the state (updated users list)
//   //     setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));

//   //     toast.success("User deleted successfully!");
//   //   } catch (error) {
//   //     console.error("Error deleting user:", error);
//   //     toast.error("An error occurred while deleting the user.");
//   //   }
//   // };
//   // ...

//   const TABS = [
//     {
//       label: "All",
//       value: "all",
//     },
//     {
//       label: "Monitored",
//       value: "monitored",
//     },
//     {
//       label: "Unmonitored",
//       value: "unmonitored",
//     },
//   ];

//   const TABLE_HEAD = [
//     "Tanks",
//     "Location",
//     "Content",
//     "Currrent Volume",
//     "Last refilled",
//     "Tank Percentage",
//     "Status",
//     "Action",
//   ];

//   const TABLE_ROWS = [
//     {
//       id: 1,
//       tank: "Tank 1",
//       location: "Accra",
//       content: "LPG",
//       currentVolume: "1000",
//       lastRefilled: "12/12/2021",
//       tankPercentage: "100%",
//       status: "Active",
//       action: "View Details",
//     },
//     {
//       id: 2,
//       tank: "Tank 2",
//       location: "Accra",
//       content: "LPG",
//       currentVolume: "1000",
//       lastRefilled: "12/12/2021",
//       tankPercentage: "100%",
//       status: "Active",
//       action: "View Details",
//     },
//     {
//       id: 3,
//       tank: "Tank 3",
//       location: "Kumasi",
//       content: "LPG",
//       currentVolume: "1000",
//       lastRefilled: "12/12/2021",
//       tankPercentage: "100%",
//       status: "Active",
//       action: "View Details",
//     },
//   ];

//   return (
//     <>
//       <div>
//         <div>
//           <h2 className="text-3xl">
//             <span className="text-blue-500">Stocks</span> Management
//           </h2>
//         </div>

//         <div className="grid grid-cols-2 lg:grid-cols-2 gap-4">
//           <div className="col-span-1 bg-white flex justify-between w-full border p-4 rounded-lg">
//             <div className="flex items-center">
//               <div className=" flex items-center m-2 rounded-lg">
//                 <BsCashCoin size={60} className="p-4   text-gray-600" />
//               </div>
//             </div>
//           </div>
//           <div className="col-span-1 bg-white flex justify-between w-full border p-4 rounded-lg">
//             <div className="flex items-center">
//               <div className=" flex items-center m-2 rounded-lg">
//                 <BsCashCoin size={60} className="p-4   text-gray-600" />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       {/* <Card className="h-full w-full p-8">
//         <CardHeader floated={false} shadow={false} className="rounded-none">
//           <div className="mb-8 flex items-center justify-between gap-8">
//             <div>
//               <Typography variant="h5" color="blue-gray">
//                 Employees
//               </Typography>
//               <Typography color="gray" className="mt-1 font-normal">
//                 See information about all employees
//               </Typography>
//             </div>
//             <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
//               <Button
//                 variant="outlined"
//                 size="sm"
//                 className="flex items-center justify-around"
//               >
//                 Download report <FaFileDownload className="h-4 w-4" />
//               </Button>
//               <Button className="flex items-center gap-3" size="sm">
//                 <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Add
//                 employee
//               </Button>
//             </div>
//           </div>
//           {/* <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
//             <Tabs value="all" className="w-full md:w-max">
//               <TabsHeader>
//                 {TABS.map(({ label, value }) => (
//                   <Tab key={value} value={value}>
//                     &nbsp;&nbsp;{label}&nbsp;&nbsp;
//                   </Tab>
//                 ))}
//               </TabsHeader>
//             </Tabs>
//             <div className="w-full md:w-72">
//               <Input
//                 label="Search"
//                 icon={<MagnifyingGlassIcon className="h-5 w-5" />}
//               />
//             </div>
//           </div>
//         </CardHeader>
//         <CardBody className="overflow-scroll px-0">
//           <table className="mt-4 w-full min-w-max table-auto text-left">
//             <thead>
//               <tr>
//                 {TABLE_HEAD.map((head, index) => (
//                   <th
//                     key={head}
//                     className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
//                   >
//                     <Typography
//                       variant="small"
//                       color="blue-gray"
//                       className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
//                     >
//                       {head}{" "}
//                       {index !== TABLE_HEAD.length - 1 && (
//                         <ChevronUpDownIcon
//                           strokeWidth={2}
//                           className="h-4 w-4"
//                         />
//                       )}
//                     </Typography>
//                   </th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody>
//               {TABLE_ROWS.map(
//                 ({ img, name, email, job, salary, phone }, index) => {
//                   const isLast = index === TABLE_ROWS.length - 1;
//                   const classes = isLast
//                     ? "p-4"
//                     : "p-4 border-b border-blue-gray-50";

//                   return (
//                     <tr key={name}>
//                       <td className={classes}>
//                         <div className="flex items-center gap-3">
//                           <Avatar src={img} alt={name} size="sm" />
//                           <div className="flex flex-col">
//                             <Typography
//                               variant="small"
//                               color="blue-gray"
//                               className="font-normal"
//                             >
//                               {name}
//                             </Typography>
//                             <Typography
//                               variant="small"
//                               color="blue-gray"
//                               className="font-normal opacity-70"
//                             >
//                               {email}
//                             </Typography>
//                           </div>
//                         </div>
//                       </td>
//                       <td className={classes}>
//                         <div className="flex flex-col">
//                           <Typography
//                             variant="small"
//                             color="blue-gray"
//                             className="font-normal"
//                           >
//                             {job}
//                           </Typography>
//                           <Typography
//                             variant="small"
//                             color="blue-gray"
//                             className="font-normal opacity-70"
//                           ></Typography>
//                         </div>
//                       </td>
//                       {/* <td className={classes}>
//                         <div className="w-max">
//                           <Chip
//                             variant="ghost"
//                             size="sm"
//                             value={online ? "online" : "offline"}
//                             color={online ? "green" : "blue-gray"}
//                           />
//                         </div>
//                       </td>
//                       <td className={classes}>
//                         <Typography
//                           variant="small"
//                           color="blue-gray"
//                           className="font-normal"
//                         >
//                           {salary}
//                         </Typography>
//                       </td>
//                       <td className={classes}>
//                         <Typography
//                           variant="small"
//                           color="blue-gray"
//                           className="font-normal"
//                         >
//                           {phone}
//                         </Typography>
//                       </td>
//                       <td className={classes}>
//                         <Menu>
//                           <MenuList>
//                             <Link href={""}>
//                               <MenuItem>View Details</MenuItem>
//                             </Link>

//                             <MenuItem className="text-red-500">Delete</MenuItem>
//                           </MenuList>

//                           <MenuHandler>
//                             <IconButton variant="text">
//                               <HiDotsHorizontal className="h-4 w-4" />
//                             </IconButton>
//                           </MenuHandler>
//                         </Menu>
//                       </td>
//                     </tr>
//                   );
//                 }
//               )}
//             </tbody>
//           </table>
//         </CardBody>
//         <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
//           <Typography variant="small" color="blue-gray" className="font-normal">
//             Page 1 of 10
//           </Typography>
//           <div className="flex gap-2">
//             <Button variant="outlined" size="sm">
//               Previous
//             </Button>
//             <Button variant="outlined" size="sm">
//               Next
//             </Button>
//           </div>
//         </CardFooter>
//       </Card>

//       {/* <div className="m-8 flex items-center justify-between">
//         <div>
//           <h2 className="text-3xl">All users</h2>
//         </div>

//         <div className="flex justify-end  items-center">
//           <AddUser />

//           <span className="px-2">Search</span>
//           <input
//             type="text"
//             placeholder="Search a user"
//             className="rounded-md border-gray-500 py-1 px-8 border-2"
//             value={searchQuery}
//             //onChange={(e) => setSearchQuery(e.target.value)}
//           />
//         </div>
//       </div>  */}
//       {/*
//       <Card className="overflow-scroll h-full w-full">
//         <table className="w-full min-w-max table-auto text-left">
//           <thead>
//             <tr>
//               <th
//                 className="border-b border-blue-gray-100 bg-blue-gray-50 p-4 cursor-pointer"
//                 //  onClick={handleSortChange}
//               >
//                 <Typography
//                   variant="small"
//                   color="blue-gray"
//                   className="font-normal leading-none opacity-70"
//                 >
//                   Name
//                 </Typography>
//               </th>
//               <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
//                 <Typography
//                   variant="small"
//                   color="blue-gray"
//                   className="font-normal leading-none opacity-70"
//                 >
//                   Email
//                 </Typography>
//               </th>
//               <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
//                 <Typography
//                   variant="small"
//                   color="blue-gray"
//                   className="font-normal leading-none opacity-70"
//                 >
//                   Role
//                 </Typography>
//               </th>
//               {/* <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
//                 <Typography
//                   variant="small"
//                   color="blue-gray"
//                   className="font-normal leading-none opacity-70"
//                 >
//                   Block action
//                 </Typography>
//               </th>
//               <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
//                 <Typography
//                   variant="small"
//                   color="blue-gray"
//                   className="font-normal leading-none opacity-70"
//                 >
//                   Action
//                 </Typography>
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             {loading ? (
//               <tr>
//                 <td colSpan="5" className="p-4">
//                   Loading...
//                 </td>
//               </tr>
//             ) : currentUsers.length > 0 ? (
//               currentUsers.map((user) => (
//                 <tr key={user.id} className="hover:bg-gray-300">
//                   <td className="p-4">
//                     <Typography
//                       variant="small"
//                       color="blue-gray"
//                       className="font-normal"
//                     >
//                       {user.fullName}
//                     </Typography>
//                   </td>
//                   <td className="p-4">
//                     <Typography
//                       variant="small"
//                       color="blue-gray"
//                       className="font-normal"
//                     >
//                       {user.email}
//                     </Typography>
//                   </td>
//                   <td className="p-4">
//                     <Typography
//                       variant="small"
//                       color="blue-gray"
//                       className="font-normal"
//                     >
//                       {user.profileType}
//                     </Typography>
//                   </td>

//                   <td className="p-4">
//                     <h2 className="text-blue-500">
//                       <Link href="/users/[id]" as={`/users/${user.id}`}>
//                         View Details
//                       </Link>
//                     </h2>
//                     {/* <button
//                       className="text-red-600 mt-2 underline cursor-pointer"
//                       onClick={() => deleteDoc(user.id)}>
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="5" className="p-4">
//                   No users found.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </Card> */}

//       {/* <div className="flex justify-center mt-4">
//         {Array.from(
//           { length: Math.ceil(sortedUsers.length / usersPerPage) },
//           (_, index) => (
//             <button
//               key={index}
//               className={`px-4 py-2 mx-2 text-sm font-medium rounded-md ${
//                 currentPage === index + 1
//                   ? "bg-blue-600 text-white"
//                   : "bg-gray-300 text-gray-700"
//               }`}
//               onClick={() => handlePageChange(index + 1)}
//             >
//               {index + 1}
//             </button>
//           )
//         )}
//       </div> */}

//       {/* <Dialog open={open} handler={handleOpen}>
//           <DialogHeader>Creating a new user</DialogHeader>
//           <DialogBody>
//             <form handleAddUser>
//               <div className="mb-4">
//                 <label className="block text-gray-700 text-sm font-bold mb-2">
//                   Full Name
//                 </label>
//                 <input
//                   type="text"
//                   className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                   value={newUserFullName}
//                   onChange={(e) => setNewUserFullName(e.target.value)}
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block text-gray-700 text-sm font-bold mb-2">
//                   Email address
//                 </label>
//                 <input
//                   type="email"
//                   className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
//                   value={newUserEmail}
//                   onChange={(e) => setNewUserEmail(e.target.value)}
//                 />
//               </div>
//               <DialogFooter>
//                 <Button
//                   variant="text"
//                   color="red"
//                   onClick={handleOpen}
//                   className="mr-1"
//                 >
//                   <span>Cancel</span>
//                 </Button>
//                 <Button variant="gradient" color="green"  type="submit">
//                   <span>Create</span>
//                 </Button>
//               </DialogFooter>
//             </form>
//           </DialogBody>
//         </Dialog>  */}
//     </>
//   );
// };

// export default Stocks;
