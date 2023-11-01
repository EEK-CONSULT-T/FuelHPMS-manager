import React, { use, useEffect, useState } from "react";
import {
  collection,
  getFirestore,
  getDocs,
  updateDoc,
  doc,
  getDoc,
  deleteDoc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { Card, Typography } from "@material-tailwind/react";
import Link from "next/link.js";
import { auth, db } from "@/firebase/config.js";

import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { CheckIcon } from "lucide-react";
import { toast } from "react-hot-toast";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { AddUser } from "@/components/user/AddUser";

import {
  MagnifyingGlassIcon,
  ChevronUpDownIcon,
} from "@heroicons/react/24/outline";
import { PencilIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import {
  CardHeader,
  Input,
  CardBody,
  Chip,
  CardFooter,
  Tabs,
  TabsHeader,
  Tab,
  Avatar,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";
import { FaFileDownload } from "react-icons/fa";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
} from "@material-tailwind/react";
import { HiDotsHorizontal, HiDotsVertical } from "react-icons/hi";
import AddEmployee from "@/components/employees/AddEmployee";

const Customers = () => {
  const [employees, setEmployees] = useState([]);

  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);

  //fetch station from localstoarage
  
  const [user, setUser] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setUser(user);
  }, []);

  console.log("thise", user?.station_id);

  










 useEffect(() => {
  const fetchEmployees = async () => {
    setLoading(true);
    try {
      // Reference to the "employees" collection and query based on station_id
      const employeesCollection = collection(db, "users");
      const q = query(employeesCollection, where("station_id", "==", user?.station_id));

      // Listen to changes in the collection in real-time
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const updatedEmployeesData = [];
        querySnapshot.forEach((doc) => {
          updatedEmployeesData.push({ id: doc.id, ...doc.data() });
        });
        setEmployees(updatedEmployeesData);
        setLoading(false);
      });

      // Remember to unsubscribe when component unmounts to avoid memory leaks
      return unsubscribe;
    } catch (error) {
      console.error("Error fetching employees:", error);
      setLoading(false);
    }
  };

  fetchEmployees();
}, [user]);
// Empty dependency array means this effect runs once when component mounts

// ... Rest of your component







  //fetch station from localstoarage

  //fetch station from localstoarage

  //fetch station from localstoarage

  //pull user data from local storage

  //pull user data from local storage

  // useEffect(() => {
  //   const fetchUsers = async () => {
  //     setLoading(true);
  //     try {
  //       const querySnapshot = await getDocs(collection(db, "users"));
  //       const usersData = querySnapshot.docs.map((doc) => doc.data());
  //       setUsers(usersData);
  //       setLoading(false);
  //       console.log(usersData);
  //     } catch (error) {
  //       console.log(error);
  //       setLoading(false);
  //     }
  //   };

  //   fetchUsers();
  // }, []);

  // const [open, setOpen] = React.useState(false);

  // const handleOpen = () => setOpen(!open);

  // const handleSortChange = () => {
  //   // Toggle the sorting order when this function is called
  //   setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  // };

  // const handleSortOptionChange = (e) => {
  //   // Update the sorting option when the select value changes
  //   setSortOption(e.target.value);
  // };

  // const handleBlockAllChange = (e) => {
  //   const isChecked = e.target.checked;
  //   setBlockAll(isChecked);

  //   // Update the block field for all users in the state
  //   setUsers((prevUsers) =>
  //     prevUsers.map((user) => ({
  //       ...user,
  //       block: isChecked,
  //     }))
  //   );

  //   // Update all user documents in the database with the new block status
  //   users.forEach((user) => {
  //     updateDoc(doc(db, "users", user.id), { block: isChecked });
  //   });
  // };

  // const handleBlockChange = async (userId, isChecked) => {
  //   setUsers((prevUsers) =>
  //     prevUsers.map((user) =>
  //       user.id === userId ? { ...user, block: isChecked } : user
  //     )
  //   );

  //   // Update the user document in the database with the new block status
  //   try {
  //     await updateDoc(doc(db, "users", userId), { block: isChecked });
  //   } catch (error) {
  //     console.log("Error updating user:", error);
  //   }
  // };

  // const filteredUsers = users.filter((user) =>
  //   user.fullName.toLowerCase().includes(searchQuery.toLowerCase())
  // );

  // const sortedUsers = filteredUsers.slice().sort((a, b) => {
  //   // Filter users based on the 'sortOption' state
  //   if (sortOption === "blocked" && a.block !== b.block) {
  //     return a.block ? -1 : 1;
  //   } else if (sortOption === "unblocked" && a.block !== b.block) {
  //     return a.block ? 1 : -1;
  //   }

  //   // If 'sortOption' is 'all' or both users have the same 'block' status, sort based on 'sortOrder'
  //   if (sortOrder === "asc") {
  //     return a.block - b.block;
  //   } else {
  //     return b.block - a.block;
  //   }
  // });

  // const [currentPage, setCurrentPage] = useState(1);
  // const usersPerPage = 10;

  // // Function to get the index of the first and last user of the current page
  // const indexOfLastUser = currentPage * usersPerPage;
  // const indexOfFirstUser = indexOfLastUser - usersPerPage;
  // const currentUsers = sortedUsers.slice(indexOfFirstUser, indexOfLastUser);

  // // Function to handle page change
  // const handlePageChange = (pageNumber) => {
  //   setCurrentPage(pageNumber);
  // };

  // //authenticating user and storing in user database
  // const addUser = async () => {
  //   handleOpen();
  // };

  // // ...
  // const handleDeleteUser = async (userId) => {
  //   // Perform the deletion process
  //   try {
  //     // Delete the user document from the database
  //     await deleteDoc(doc(db, "users", userId));

  //     // Remove the user from the state (updated users list)
  //     setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));

  //     toast.success("User deleted successfully!");
  //   } catch (error) {
  //     console.error("Error deleting user:", error);
  //     toast.error("An error occurred while deleting the user.");
  //   }
  // };
  // ...

  const TABS = [
    {
      label: "All",
      value: "all",
    },
    {
      label: "Monitored",
      value: "monitored",
    },
    {
      label: "Unmonitored",
      value: "unmonitored",
    },
  ];

  const TABLE_HEAD = ["Employee", "Position", "Salary(Ghc)", "Contact", ""];

  return (
    <>
      <Card className="h-full w-full p-8">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="mb-8 flex items-center justify-between gap-8">
            <div>
              <Typography variant="h5" color="blue-gray">
                Manage Employees
              </Typography>
              <Typography color="gray" className="mt-1 font-normal">
                See information about all employees
              </Typography>
            </div>
            <div className="flex shrink-0 flex-col gap-2 sm:flex-row ">
              <AddEmployee />
            </div>
          </div>

          <div className="flex w-full  ">
            <div className="w-full md:w-72">
              <Input
                label="Search"
                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
              />
            </div>

            {/* <div className="">
              <button className="px-6 py-1">
                Download <FaFileDownload size={30} />
              </button>
            </div> */}
          </div>
        </CardHeader>
        <CardBody className="overflow-scroll px-0">
          <table className="mt-4 w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {TABLE_HEAD.map((head, index) => (
                  <th
                    key={head}
                    className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                    >
                      {head}{" "}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {employees.map(
                (
                  { id, imageUrl, name, email, position, salary, phone },
                  index
                ) => {
                  const classes =
                    index % 2 === 0
                      ? "p-4"
                      : "p-4 border-b border-blue-gray-50";

                  return (
                    <tr key={name}>
                      <td className={classes}>
                        <div className="flex items-center gap-3">
                          <Avatar src={imageUrl} alt={name} size="sm" />
                          <div className="flex flex-col">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {name}
                            </Typography>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal opacity-70"
                            >
                              {email}
                            </Typography>
                          </div>
                        </div>
                      </td>
                      <td className={classes}>
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {position}
                          </Typography>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal opacity-70"
                          ></Typography>
                        </div>
                      </td>
                      {/* <td className={classes}>
                        <div className="w-max">
                          <Chip
                            variant="ghost"
                            size="sm"
                            value={online ? "online" : "offline"}
                            color={online ? "green" : "blue-gray"}
                          />
                        </div>
                      </td> */}
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {salary}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {phone}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Menu>
                          <MenuList>
                            <Link
                              href="/employees/[id]"
                              as={`/employees/${id}`}
                            >
                              <MenuItem>View Details</MenuItem>
                            </Link>

                            <MenuItem className="text-red-500">Delete</MenuItem>
                          </MenuList>

                          <MenuHandler>
                            <IconButton variant="text">
                              <HiDotsHorizontal className="h-4 w-4" />
                            </IconButton>
                          </MenuHandler>
                        </Menu>
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        </CardBody>
        <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
          <Typography variant="small" color="blue-gray" className="font-normal">
            Page 1 of 10
          </Typography>
          <div className="flex gap-2">
            <Button variant="outlined" size="sm">
              Previous
            </Button>
            <Button variant="outlined" size="sm">
              Next
            </Button>
          </div>
        </CardFooter>
      </Card>

      {/* <div className="m-8 flex items-center justify-between">
        <div>
          <h2 className="text-3xl">All users</h2>
        </div>

        <div className="flex justify-end  items-center">
          <AddUser />

          <span className="px-2">Search</span>
          <input
            type="text"
            placeholder="Search a user"
            className="rounded-md border-gray-500 py-1 px-8 border-2"
            value={searchQuery}
            //onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>  */}
      {/* 
      <Card className="overflow-scroll h-full w-full">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              <th
                className="border-b border-blue-gray-100 bg-blue-gray-50 p-4 cursor-pointer"
                //  onClick={handleSortChange}
              >
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  Name
                </Typography>
              </th>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  Email
                </Typography>
              </th>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  Role
                </Typography>
              </th>
              {/* <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  Block action
                </Typography>
              </th>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  Action
                </Typography>
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5" className="p-4">
                  Loading...
                </td>
              </tr>
            ) : currentUsers.length > 0 ? (
              currentUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-300">
                  <td className="p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {user.fullName}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {user.email}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {user.profileType}
                    </Typography>
                  </td>

                  <td className="p-4">
                    <h2 className="text-blue-500">
                      <Link href="/users/[id]" as={`/users/${user.id}`}>
                        View Details
                      </Link>
                    </h2>
                    {/* <button
                      className="text-red-600 mt-2 underline cursor-pointer"
                      onClick={() => deleteDoc(user.id)}>
                      Delete
                    </button> 
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="p-4">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </Card> */}

      {/* <div className="flex justify-center mt-4">
        {Array.from(
          { length: Math.ceil(sortedUsers.length / usersPerPage) },
          (_, index) => (
            <button
              key={index}
              className={`px-4 py-2 mx-2 text-sm font-medium rounded-md ${
                currentPage === index + 1
                  ? "bg-blue-600 text-white"
                  : "bg-gray-300 text-gray-700"
              }`}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          )
        )}
      </div> */}

      {/* <Dialog open={open} handler={handleOpen}>
          <DialogHeader>Creating a new user</DialogHeader>
          <DialogBody>
            <form handleAddUser>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={newUserFullName}
                  onChange={(e) => setNewUserFullName(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Email address
                </label>
                <input
                  type="email"
                  className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  value={newUserEmail}
                  onChange={(e) => setNewUserEmail(e.target.value)}
                />
              </div>
              <DialogFooter>
                <Button
                  variant="text"
                  color="red"
                  onClick={handleOpen}
                  className="mr-1"
                >
                  <span>Cancel</span>
                </Button>
                <Button variant="gradient" color="green"  type="submit">
                  <span>Create</span>
                </Button>
              </DialogFooter>
            </form>
          </DialogBody>
        </Dialog> */}
    </>
  );
};

export default Customers;
