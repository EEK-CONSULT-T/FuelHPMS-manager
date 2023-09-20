import React, { Fragment, use, useEffect, useState } from "react";
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
import { Timestamp, collection, doc, setDoc } from "firebase/firestore";
import { auth, db, storage } from "@/firebase/config";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { nanoid } from "nanoid";
import { createUserWithEmailAndPassword } from "firebase/auth";

const AddEmployee = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);
  const [employee, setEmployee] = useState({
    id: nanoid(),
    name: "",
    imageUrl: "",
    position: "",
    phone: "",
    email: "",
    password: "eek@1234",
    nextOfKin: "",
    nextOfKinPhone: "",
    location: "",
    station_id: "",
    privileges: [""],
  });

  const [user, setUser] = useState(null);

  //fetch the station id from the user object in local storage
  //  const fetchStationId = async () => {
  //   const user = JSON.parse(localStorage.getItem("user"));
  //   setUser(user);
  //   console.log("all", user);
  //  };

  //  console.log("this", user?.station_id);
  //       //get the station id from the user object in local storage

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setUser(user);
    console.log("all", user);
  }, []);

  console.log("this", user?.station_id);

  const handlePhoneKeyDown = (e) => {
    // Allow only numbers and specific control keys (e.g., backspace, delete)
    const allowedKeys = [
      "Backspace",
      "Delete",
      "ArrowLeft",
      "ArrowRight",
      "Tab",
    ];
    if (!allowedKeys.includes(e.key) && isNaN(Number(e.key))) {
      e.preventDefault();
    }
    // Allow for a maximum of 10 characters in total and a default format of (123) 456-7890 also allow dashes

    if (e.target.value.length >= 14 && !allowedKeys.includes(e.key)) {
      e.preventDefault();
    }
    //add dashes to the phone number

    // If the user is entering a new number (e.g., 2nd digit), then apply the default format
    // if (e.target.value.length === 0) {
    //   e.target.value = "+233";
    // }

    // If the user is entering a new number (e.g., 2nd digit), then apply the default format
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  const handleAddEmployee = async (e) => {
    e.preventDefault();
    console.log(employee);
    try {
      // Create user in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        employee.email,
        employee.password
      );

      // Remove the password property from the employee object
      const { password, ...employeeWithoutPassword } = employee;

      // Save user data to Firestore without the password
      await setDoc(doc(db, "users", userCredential.user.uid), {
        ...employeeWithoutPassword,
        createdAt: Timestamp.fromDate(new Date()),
        station_id: user?.station_id,
      });

      // Clear the form inputs after successful user creation
      setEmployee({
        id: nanoid(),
        name: "",
        email: "",
        phone: "",
        imageUrl: "",
        position: "",
        nextOfKin: "",
        nextOfKinPhone: "",
        location: "",
        station_id: "",
        privileges: [""],
      });

      // Close the dialog
      handleOpen();

      // Show a success toast message
      toast.success("User created successfully!");
    } catch (error) {
      console.error("Error creating user:", error.message);
      toast.error("Error creating user. Please try again.");
    }
  };

  //simlpe interest formula

  const [uploadProgress, setUploadProgress] = useState(0);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    console.log(file);

    const storageRef = ref(storage, `Employeeimages/${Date.now()}${file.name}`);
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
          setEmployee({ ...employee, imageUrl: downloadURL });
          alert("Image uploaded successfully");
        });
      }
    );
  };

  return (
    <div>
      <Fragment>
        <div className="flex justify-between px-4 pt-8">
          <div className="flex items-center">
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded-lg "
              onClick={handleOpen}
            >
              Add Employee
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
          <DialogHeader>Add Employee</DialogHeader>
          <DialogBody divider>
            <form onSubmit={handleAddEmployee}>
              <div className="m-2">
                <label htmlFor="">Employees's name</label>
                <input
                  type="text"
                  placeholder="Employees's name"
                  className="border-2 border-gray-300 p-2 rounded-lg w-full"
                  onChange={handleInputChange}
                  value={employee.name}
                  name="name"
                />
              </div>

              {/* <select
                className="border-2 px-4 rounded-full py-2 "
                value={selectedStation}
                onChange={handleStationChange}
              >
                <option value="">All</option>
                {station.map((subcategory) => (
                  <option key={subcategory.id} value={subcategory.id}>
                    {subcategory.name}
                  </option>
                ))}
              </select> */}

              <div className="m-2">
                <label htmlFor="phone">Employee's Phone</label>
                <input
                  type="tel"
                  onKeyDown={handlePhoneKeyDown}
                  // onKeyDown={
                  //   (e) =>
                  //     (e.target.value =
                  //       e.target.value.length < 1
                  //         ? "+233"
                  //         : e.target.value)
                  // }

                  placeholder="Employee's Phone"
                  className="border-2 border-gray-300 p-2 rounded-lg w-full"
                  maxLength={13}
                  onChange={handleInputChange}
                  value={employee.phone}
                  name="phone"
                  required
                />
              </div>
              <div className="m-2">
                <label htmlFor="">Employee's email</label>
                <input
                  type="email"
                  placeholder="Manager's email"
                  className="border-2 border-gray-300 p-2 rounded-lg w-full"
                  onChange={handleInputChange}
                  value={employee.email}
                  name="email"
                  required
                />
              </div>

              <div className="m-2 flex-col flex">
                <label htmlFor="">Employees Position</label>
                <select
                  className="w-full py-3 rounded-lg border-2 border-gray-300 px-4"
                  label="Select Position"
                  value={employee.position}
                  onChange={handleInputChange}
                  name="position"
                  required
                >
                  <option value={""} disabled>
                    Select Position
                  </option>
                  <option value="Accountant">Accountant</option>
                  <option value="Secretary">Secretary</option>
                  <option value="Driver">Driver</option>
                  <option value="Security">Security</option>
                  <option value="Cleaner">Cleaner</option>
                  <option value="Sales person">Sales person</option>
                  <option value="mechanic">mechanic</option>
                  <option value="pump attendant">Pump attendant</option>
                  <option value="Others">Others</option>
                </select>
              </div>

              <div className="m-2">
                <label htmlFor="">Employee's Location</label>
                <input
                  type="text"
                  placeholder="Manager's Location"
                  className="border-2 border-gray-300 p-2 rounded-lg w-full"
                  onChange={handleInputChange}
                  value={employee.location}
                  name="location"
                />
              </div>
              <div className="m-2">
                <label htmlFor="">Next of Kin's Name</label>
                <input
                  type="text"
                  placeholder="Next of Kin"
                  className="border-2 border-gray-300 p-2 rounded-lg w-full"
                  onChange={handleInputChange}
                  value={employee.nextOfKin}
                  name="nextOfKin"
                />
              </div>
              <div className="m-2">
                <label htmlFor="">Next of Kin's Phone</label>

                <input
                  type="tel"
                  onKeyDown={handlePhoneKeyDown}
                  maxLength={13}
                  placeholder="Next of Kin Phone"
                  className="border-2 border-gray-300 p-2 rounded-lg w-full"
                  onChange={handleInputChange}
                  value={employee.nextOfKinPhone}
                  name="nextOfKinPhone"
                />
              </div>

              {uploadProgress === 0 ? null : (
                <Progress value={uploadProgress} color="blue" />
              )}

              <div className="flex flex-col mt-2">
                <label htmlFor="imageUrl">Upload Image</label>
                <input
                  type="file"
                  accept="image/*"
                  name="imageUrl"
                  className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:border-blue-400"
                  onChange={(e) => handleImageChange(e)}
                />
                {employee.imageUrl === "" ? null : (
                  <input
                    className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:border-blue-400"
                    type="text"
                    name="imageUrl"
                    placeholder="Image URL"
                    value={employee.imageUrl}
                    disabled
                  />
                )}
              </div>

              <div className="flex justify-between m-4">
                <button
                  className="bg-blue-400 text-white px-6 py-2 rounded-xl hover:bg-blue-gray-500"
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

export default AddEmployee;
