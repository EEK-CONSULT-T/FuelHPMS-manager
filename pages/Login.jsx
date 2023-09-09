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

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    // create user

    // try {
    //   //create user
    //   const userCredential = await createUserWithEmailAndPassword(
    //     auth,
    //     email,
    //     password
    //   );
    //   const user = userCredential.user;
    //   // add user to firestore with station
    //   const userRef = doc(db, "users", user.uid);
    //   await setDoc(userRef, {
    //     email: email,
    //     name: "Samuel Agyemang",
    //     station: "Ayawaso",
    //     profileType: "manager",
    //   });
    //   toast.success("Login successful");
    //   router.push("/");
    //   setLoading(false);

    //   //save user data to localstorage
    // } catch (error) {
    //   console.log(error);

    //   toast.error(error);

    //   setLoading(false);
    // }

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

        if (userDoc.exists()) {
          const userData = userDoc.data();
          const profileType = userData.profileType;
          // Save user data to localStorage
          localStorage.setItem("user", JSON.stringify(userData));

          if (profileType === "manager") {
            toast.success("Login successful");
            router.push("/");
          } else {
            // Redirect to the normal user page

            toast.error("You are not an admin");
          }
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      } catch (error) {
        console.log(error);
        toast.error(error);
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
      </div>
    </div>
  );
}
