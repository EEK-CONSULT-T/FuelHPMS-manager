// components/ProtectedRoute.js
import { auth } from "@/firebase/config";
import { useRouter } from "next/router";
import { useEffect } from "react";
// Import the Firebase auth instance from _app.js

const ProtectedRoute = ({ children }) => {
  // const user = auth.currentUser;
  //check localstorage for user

  const router = useRouter();

  //client side redirect

  useEffect(() => {
    const user = localStorage.getItem("user");

    if (!user) {
      router.push("/Login");
    }
  }, []);

  return children;
};

export default ProtectedRoute;
