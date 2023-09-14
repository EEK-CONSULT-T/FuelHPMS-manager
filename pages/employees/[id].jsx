import { db } from '@/firebase/config';
import { Avatar } from '@material-tailwind/react';
import { doc, onSnapshot } from 'firebase/firestore';
import { useRouter } from 'next/router';
import React, { use, useEffect, useState } from 'react'

const EmployeeDetails = () => {
    const [employee, setEmployee] = useState({});
    const [loading, setLoading] = useState(false);

const router = useRouter();
const { id } = router.query;

  useEffect(() => {
    setLoading(true);

    try {
      const docRef = doc(db, "employees", id);

      const unsubscribe = onSnapshot(docRef, (docSnap) => {
        if (docSnap.exists()) {
          console.log("Document data:", docSnap.data());
          setEmployee(docSnap.data());
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


  return (
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
    </div>
    )
}


export default EmployeeDetails