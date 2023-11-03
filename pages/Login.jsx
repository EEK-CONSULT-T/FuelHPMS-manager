import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, getDoc, onSnapshot, setDoc } from "firebase/firestore";
import { auth, db } from "@/firebase/config";
import { useRouter } from "next/router";
import Loader from "@/components/Loader";
import { toast } from "react-hot-toast";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

 const handleLogin = async (e) => {
   e.preventDefault();
   setLoading(true);

   if (typeof window !== "undefined") {
     try {
       const userCredential = await signInWithEmailAndPassword(
         auth,
         email,
         password
       );
       const user = userCredential.user;

       // Retrieve user data from Firestore collection in real-time

       const userDoc = await getDoc(doc(db, "users", user.uid));

       localStorage.setItem("user", JSON.stringify(userDoc.data()));

       if (userDoc.exists()) {
         const userData = userDoc.data();
         const position = userData.position; // Fixed typo: changed postion to position

         // Save user data to localStorage
         if (position === "Manager") {
           toast.success("Login successful");
           router.push("/");
         } else {
           // Redirect to the normal user page
           toast.error("You are not an admin");
           setLoading(false);
         }
       } else {
         console.log("No such document!");
         setLoading(false);
       }
     } catch (error) {
       toast.error(error.message); // Displaying error message
       setLoading(false);
     }
   }
 };
  return (
    <div
      className="relative min-h-screen flex flex-col items-center justify-center bg-no-repeat bg-cover bg-center"
      style={{
        backgroundImage: `url("https://images.unsplash.com/photo-1602853175733-5ad62dc6a2c8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8ZnVlbCUyMHN0YXRpb258ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60")`,
      }}
    >
      <div className="absolute top-0 left-0 w-full h-full bg-gray-300 bg-opacity-50"></div>
      <div className="bg-black rounded-lg p-8 shadow-lg backdrop-filter backdrop-blur-md bg-opacity-10 z-10">
        <div className="flex flex-col items-center justify-center mb-8">
          {/* <img
            src="https://images.unsplash.com/photo-1548625149-fc4a29cf7092?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Y2h1cmNofGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60"
            alt="Logo"
            className="h-12 mb-4"
          /> */}
          <h1 className="text-2xl font-bold text-gray-800">Welcome Admin!</h1>
        </div>
        <form className="flex flex-col" onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="email" className="font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              id="email"
              name="email"
              required
              className="border-2 rounded-lg py-2 px-3 w-full bg-white bg-opacity-50 backdrop-filter backdrop-blur-sm transition-colors duration-300 focus:bg-opacity-70 focus:outline-none focus:border-blue-500"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              id="password"
              name="password"
              required
              className="border-2 rounded-lg py-2 px-3 w-full bg-white bg-opacity-50 backdrop-filter backdrop-blur-sm transition-colors duration-300 focus:bg-opacity-70 focus:outline-none focus:border-blue-500"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {loading ? (
            <Loader />
          ) : (
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300 mt-4"
            >
              Sign In
            </button>
          )}
        </form>

        <div>
          <p className="mt-4 text-white">
            Forgot password?{" "}
            <Link href="/Forgot" className="text-blue-400 ">
               Reset
              </Link>
              </p>

        </div>
      </div>
    </div>
  );
}
