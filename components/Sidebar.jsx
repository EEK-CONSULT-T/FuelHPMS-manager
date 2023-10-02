// import React, { useEffect, useState } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import { RxSketchLogo, RxDashboard, RxPerson } from "react-icons/rx";
// import { HiOutlineShoppingBag } from "react-icons/hi";
// import { FiSettings } from "react-icons/fi";
// import { BsCashCoin } from "react-icons/bs";
// import {AiFillNotification, AiOutlineExport, AiOutlineUsergroupAdd, AiTwotoneNotification} from "react-icons/ai";
// import { FaCalendar, FaItunesNote, FaLongArrowAltRight, FaMicrophone, FaMicrophoneAlt, FaPodcast } from "react-icons/fa";
// import { Tooltip, Button } from "@material-tailwind/react";
// import { useRouter } from "next/router";
// import { BellIcon } from "lucide-react";
// import { signOut } from "firebase/auth";
// import { auth, db } from "@/firebase/config";
// import { doc } from "firebase/firestore";

// const Sidebar = ({ children }) => {
//    const router = useRouter();
//    const excludeSidebar = router.pathname === "/Login";

//    const handleLogout = () => {
//     console.log("Logout");
//     signOut(auth).then(() => {
//       // Sign-out successful.
//       localStorage.removeItem("user");
//       router.push("/Login");
//     }).catch((error) => {
//       // An error happened.
//     });
//   };

//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const user = JSON.parse(localStorage.getItem("user"));
//     setUser(user);
//   }, []);

// const givingAdmin = user?.subroles?.includes("givingsAdmin");
// const eventsAdmin = user?.subroles?.includes("eventsAdmin");

// const podcastAdmin = user?.subroles?.includes("podcastAdmin");
// const groupsAdmin = user?.subroles?.includes("groupsAdmin");
// const groupLeader = user?.subroles?.includes("groupLeader");

//     if (excludeSidebar) {
//       return <main className="w-full">{children}</main>;
//     }
//   return (
//     <div className="flex">
//       <div className="fixed w-20 h-screen p-4 bg-white border-r-[1px] flex flex-col justify-between">
//         <div className="flex flex-col items-center">

//           <Link href="/">
//             <Tooltip content="Dashboard" placement="right-end">
//               <div className="bg-purple-800 text-white p-3 rounded-lg inline-block">
//                 <RxSketchLogo size={20} />
//               </div>
//             </Tooltip>
//           </Link>
//           <span className="border-b-[1px] border-gray-200 w-full p-2"></span>
//           <Link href="/">
//             <Tooltip content="Dashboard" placement="right-end">
//               <div className="bg-gray-100 hover:bg-gray-200 cursor-pointer my-4 p-3 rounded-lg inline-block">
//                 <RxDashboard size={20} />
//               </div>
//             </Tooltip>
//           </Link>
//           <Link href="/customers">
//             <Tooltip content="Users" placement="right-end">
//               <div className="bg-gray-100 hover:bg-gray-200 cursor-pointer my-4 p-3 rounded-lg inline-block">
//                 <RxPerson size={20} />
//               </div>
//             </Tooltip>
//           </Link>

//           {givingAdmin && (

//                          <Link href="/givings">
//             <Tooltip content="Givings" placement="right-end">
//               <div className="bg-gray-100 hover:bg-gray-200 cursor-pointer my-4 p-3 rounded-lg inline-block">
//                 <BsCashCoin size={20} />
//               </div>
//             </Tooltip>
//           </Link>

//           )}

//               {
//                  eventsAdmin && (
//           //          <Link href="/events">
//           //   <Tooltip content="Events" placement="right-end">
//           //     <div className="bg-gray-100 hover:bg-gray-200 cursor-pointer my-4 p-3 rounded-lg inline-block">
//           //       <FaCalendar size={20} />
//           //     </div>
//           //   </Tooltip>
//           // </Link>
//           <>

//           <Link href="/events">
//             <Tooltip content="Events" placement="right-end">
//               <div className="bg-gray-100 hover:bg-gray-200 cursor-pointer my-4 p-3 rounded-lg inline-block">
//                 <FaCalendar size={20} />
//               </div>
//             </Tooltip>
//           </Link>

//           </>

//                   )
//               }

//           {
//             podcastAdmin && (

//           <Link href="/podcast">
//             <Tooltip content="Podcasts" placement="right-end">
//               <div className="bg-gray-100 hover:bg-gray-200 cursor-pointer my-4 p-3 rounded-lg inline-block">
//                 <FaPodcast size={20} />
//               </div>
//             </Tooltip>
//           </Link>
//             )
// }
//            {
//             groupsAdmin && (

//           <Link href="/Groups">
//             <Tooltip content="Groups" placement="right-end">
//               <div className="bg-gray-100 hover:bg-gray-200 cursor-pointer my-4 p-3 rounded-lg inline-block">
//                 <AiOutlineUsergroupAdd size={20} />
//               </div>
//             </Tooltip>
//           </Link>
//             )
// }
//           <Link href="/Notification">
//             <Tooltip content="Notifications" placement="right-end">
//               <div className="bg-gray-100 hover:bg-gray-200 cursor-pointer my-4 p-3 rounded-lg inline-block">
//                 <BellIcon size={20} />
//               </div>
//             </Tooltip>
//           </Link>

//           <Tooltip content="Log out" placement="right-end">
//             <div
//               className="bg-gray-100 hover:bg-gray-200 cursor-pointer my-4 p-3 rounded-lg inline-block"
//               onClick={handleLogout}
//             >
//               <AiOutlineExport size={20} color="red" />
//             </div>
//           </Tooltip>
//         </div>
//       </div>
//       <main className="ml-20 w-full">{children}</main>
//     </div>
//   );
// };

// export default Sidebar;

import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
  Avatar,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";
import { BsCashCoin } from "react-icons/bs";
import Link from "next/link";
import { useRouter } from "next/router";
import ProtectedRoute from "./protectedroute";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase/config";
import { useEffect, useState } from "react";
import logo from "../assets/images/logo.jpeg"



export default function Sidebar({ children }) {



  const [user, setUser] = useState(null);
  
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setUser(user);
  }, []);

  console.log("thise", user?.name);


  const router = useRouter();
  const handleLogout = () => {
    console.log("Logout");
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        localStorage.removeItem("user");
        router.push("/Login");
      })
      .catch((error) => {
        // An error happened
      });
  };

  const excludeSidebar = router.pathname === "/Login" || router.pathname === "/Forgot";
  if (excludeSidebar) {
    return <main className="w-full">{children}</main>;
  }

  return (
    <ProtectedRoute>
      <div className="flex">
        <Card className="h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5 ">
          <div className="mb-2 p-4">
            <Avatar
              src="https://firebasestorage.googleapis.com/v0/b/hpmsf-690d7.appspot.com/o/proAssets%2FWhatsApp%20Image%202023-09-19%20at%203.17.45%20PM.jpeg?alt=media&token=349beddc-c3ed-4a8e-8c4c-d93cee200449"
              color="lightBlue"
              size=""
              className="w-36 h-36 mb-4"
            />

            <div>
              <p>
                <span className="font-bold text-lg">Welcome</span> {user?.name},
              </p>
            </div>
          </div>
          <List>
            <Link href="/">
              <ListItem>
                <ListItemPrefix>
                  <PresentationChartBarIcon className="h-5 w-5" />
                </ListItemPrefix>
                Dashboard
              </ListItem>
            </Link>
            <Link href="/customers">
              <ListItem>
                <ListItemPrefix>
                  <InboxIcon className="h-5 w-5" />
                </ListItemPrefix>
                Employees
                <ListItemSuffix>
                  {/* <Chip
              value="14"
              size="sm"
              variant="ghost"
              color="blue-gray"
              className="rounded-full"
            /> */}
                </ListItemSuffix>
              </ListItem>
            </Link>

            <Link href="/Stocks">
              <ListItem>
                <ListItemPrefix>
                  <UserCircleIcon className="h-5 w-5" />
                </ListItemPrefix>
                Stocks
              </ListItem>
            </Link>
            <Link href="/Tanks">
              <ListItem>
                <ListItemPrefix>
                  <UserCircleIcon className="h-5 w-5" />
                </ListItemPrefix>
                Tanks
              </ListItem>
            </Link>
            <Link href="/Stocks">
              <ListItem>
                <ListItemPrefix>
                  <UserCircleIcon className="h-5 w-5" />
                </ListItemPrefix>
                Sales
              </ListItem>
            </Link>
            <Link href="/Expenses">
              <ListItem>
                <ListItemPrefix>
                  <UserCircleIcon className="h-5 w-5" />
                </ListItemPrefix>
                Expenses
              </ListItem>
            </Link>

            <ListItem onClick={handleLogout}>
              <ListItemPrefix>
                <PowerIcon className="h-5 w-5 text-red-500" />
              </ListItemPrefix>
              <h2 className="text-red-500">Log Out</h2>
            </ListItem>
          </List>
        </Card>
        <main className="flex w-full ">{children}</main>
      </div>
    </ProtectedRoute>
  );
}
