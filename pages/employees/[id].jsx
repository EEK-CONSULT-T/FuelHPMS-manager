import EditUser from '@/components/EditUser';
import { db } from '@/firebase/config';
import { Avatar } from '@material-tailwind/react';
import { doc, onSnapshot } from 'firebase/firestore';
import { useRouter } from 'next/router';
import React, { use, useEffect, useState } from 'react'
import toast from 'react-hot-toast';

const EmployeeDetails = () => {
    const [employee, setEmployee] = useState({});
    const [loading, setLoading] = useState(false);

const router = useRouter();
const { id } = router.query;

  // useEffect(() => {
  //   setLoading(true);

  //   try {
  //     const docRef = doc(db, "employees", id);

  //     const unsubscribe = onSnapshot(docRef, (docSnap) => {
  //       if (docSnap.exists()) {
  //         console.log("Document data:", docSnap.data());
  //         setEmployee(docSnap.data());
  //         setLoading(false);
  //       } else {
  //         // doc.data() will be undefined in this case
  //         console.log("No such document!");

  //         setLoading(false);
  //         toast.error(
  //           "Unable to provide data check your internet connection and try again"
  //         );
  //       }
  //     });
  //   } catch (error) {
  //     setLoading(false);
  //   }
  // }, [id]);


  return (
    <div className="bg-gray-300 w-full h-full ">
      <div className="m-8 shadow-sm p-8 bg-white rounded-lg">
        <div className="flex justify-around items-center">
          {/* <h1 className="text-lg font-bold">Employee's details</h1> */}

          {/* <button>
            <EditUser />
  </button>*/}
        </div>

        <section class="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800 mt-20">
          <div className="flex items-center justify-between">
            <h2 class="text-lg sm:text-2xl font-semibold text-gray-700 capitalize dark:text-white py-8">
              Employee Details
            </h2>
            <div>
              <button class="flex items-center justify-between px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-blue-500 border border-transparent rounded-lg active:bg-blue-600 hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue">
                <span>Save changes</span>
              </button>
            </div>
          </div>

          <form>
            <div className="flex justify-center">
              <label for="passwordConfirmation"></label>
              <img
                className="w-48 h-48 rounded-full"
                src="https://images.unsplash.com/photo-1697432906373-ac234aa00dff?auto=format&fit=crop&q=80&w=1470&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              />
            </div>

            <div>
              <label class="block text-sm font-medium ">Passport photo</label>
              <div class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div class="space-y-1 text-center">
                  <svg
                    class="mx-auto h-12 w-12 "
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  <div class="flex text-sm text-gray-600">
                    <label
                      for="file-upload"
                      class="relative cursor-pointer rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                    >
                      <span class="">Upload a file</span>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        class="sr-only"
                      />
                    </label>
                    <p class="pl-1">or drag and drop</p>
                  </div>
                  <p class="text-xs">JPG/JPEG to </p>
                </div>
              </div>
            </div>

            <div class="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
              <div>
                <label class="text-gray-700 dark:text-gray-200" for="username">
                  Full Name
                </label>
                <input
                  id="username"
                  type="text"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                />
              </div>

              <div>
                <label
                  class="text-gray-700 dark:text-gray-200"
                  for="emailAddress"
                >
                  Email Address
                </label>
                <input
                  id="emailAddress"
                  type="email"
                  class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                />
              </div>
            </div>

            <div class="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
              <div>
                <label class=" dark:text-gray-200" for="username">
                  Location{" "}
                </label>
                <input
                  id="username"
                  type="text"
                  class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                />
              </div>

              <div>
                <label class="" for="password">
                  Mobile
                </label>
                <input
                  id="password"
                  type="text"
                  class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                />
              </div>

              <div>
                <label class="" for="passwordConfirmation">
                  Gender
                </label>
                <select class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"></select>
              </div>

              <div>
                <label for="passwordConfirmation " className="font-bold">
                  Permissions
                </label>
                <ul>
                  <li>
                    <label>View</label>
                  </li>
                  <li>
                    <label>Edit</label>
                  </li>
                </ul>
              </div>

              <div>
                <label class="" for="passwordConfirmation">
                  Position
                </label>
                <select class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"></select>
              </div>

              <div>
                <label for="passwordConfirmation">Guarantor's Name</label>
                <input
                  id="passwordConfirmation"
                  type="text"
                  class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                />
              </div>
              <div>
                <label for="passwordConfirmation">Guarantor's Phone</label>
                <input
                  id="passwordConfirmation"
                  type="text"
                  class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                />
              </div>
              <div>
                <label for="passwordConfirmation">Guarantor's Name</label>
                <input
                  id="passwordConfirmation"
                  type="text"
                  class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                />
              </div>

              <div>
                <label for="passwordConfirmation">Salary</label>
                <input
                  id="passwordConfirmation"
                  type="text"
                  class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                />
              </div>
              <div>
                <label for="passwordConfirmation">Salary</label>
                <input
                  id="passwordConfirmation"
                  type="text"
                  class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                />
              </div>
            </div>
          </form>
        </section>
      </div>

      {/* </div>
    <div className="p-8 w-full shadow-lg">
      <div>
        <h2 className="font-bold text-xl">Employee Details</h2>
 {
    employee && (
        <>

        <div className="flex justify-between py-14 max-w-4xl">
          <div className="">
            <p className="text-lg">Profile </p>
            <p className="text-gray-500">
              You can view and edit employee details here
            </p>
          </div>
          <div className="sm:px-10">
            <button className="py-2 px-8 bg-blue-500 rounded text-white">
              Edit Profile
            </button>
          </div>
        </div>
        <div>
          <hr className="" />
          <div className="py-8 flex justify-between max-w-xl">
            <p>
              <span className="font-bold text-gray-700">Name:</span>
            </p>
            <p className="">
                {employee.name}
            </p>
          </div>
          <hr />
        </div>
        <div>
          <hr className="" />
          <div className="py-8 flex justify-between max-w-xl">
            <p>
              <span className="font-bold text-gray-700">Email:</span>
            </p>
            <p className="">
                {employee.email}
            </p>
          </div>
          <hr />
        </div>
        <div>
          <hr className="" />
          <div className="py-8 flex justify-between max-w-xl">
            <p>
              <span className="font-bold text-gray-700">Photo</span>
            </p>
            <Avatar src={employee.imageUrl} alt={''} size="sm" />
          </div>
          <hr />
        </div>
        <div>
          <hr className="" />
          <div className="py-8 flex justify-between max-w-xl">
            <p>
              <span className="font-bold text-gray-700">Phone:</span>
            </p>
            <p className="">
                {employee.phone}
            </p>
          </div>
          <hr />
        </div>
        <div>
          <hr className="" />
          <div className="py-8 flex justify-between max-w-xl">
            <p>
              <span className="font-bold text-gray-700">Address:</span>
            </p>
            <p className="">
                {employee.address}
            </p>
          </div>
          <hr />
        </div>
        <div>
          <hr className="" />
          <div className="py-8 flex justify-between max-w-xl">
            <p>
              <span className="font-bold text-gray-700">Salary(base):</span>
            </p>
            <p className="">
                {employee.salary}
            </p>
          </div>
          <hr />
        </div>
        </>
    )
} 
        </div>
    </div>*/}
    </div>
  );
}


export default EmployeeDetails