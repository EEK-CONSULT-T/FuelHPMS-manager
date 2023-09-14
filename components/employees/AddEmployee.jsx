import React, { Fragment, useState } from "react";
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
import { db, storage } from "@/firebase/config";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { nanoid } from "nanoid";

const AddEmployee = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);
  const [employee, setEmployee] = useState({
    id: nanoid(),
    name: "",
    imageUrl: "",
    salary: "",
    position: "",
    phone: "",
    email: "",
    address: "",
    station: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  const handleAddEmployee = async (e) => {
    e.preventDefault();
    console.log(employee);
    try {
      const docRef = doc(db, "employees", employee.id);

      const employeeData = {
        id: employee.id,
        name: employee.name,
        imageUrl: employee.imageUrl,
        salary: employee.salary,
        position: employee.position,
        phone: employee.phone,
        email: employee.email,
        address: employee.address,
      };

      await setDoc(docRef, employeeData);
      toast.success("Event created successfully");

      handleOpen();

      //console.log("Document written with ID: ", docRef.id);
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  };

  //simlpe interest formula

  const [uploadProgress, setUploadProgress] = useState(0);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    console.log(file);

    const storageRef = ref(
      storage,
      `Employeesimages/${Date.now()}${file.name}`
    );
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
          <DialogHeader>
            <h5 className="font-bold text-blue-400">Add Employee</h5>
          </DialogHeader>
          <DialogBody divider>
            <form onSubmit={handleAddEmployee}>
              <div className="m-2">
                <label htmlFor="">Employees's name</label>
                <input
                  type="text"
                  placeholder="Employee's name"
                  className="border-2 border-gray-300 p-2 rounded-lg w-full"
                  onChange={handleInputChange}
                  value={employee.name}
                  name="name"
                />
              </div>
              <div className="m-2">
                <label htmlFor="">Employees's Email</label>
                <input
                  type="email"
                  placeholder="Employee's Email"
                  className="border-2 border-gray-300 p-2 rounded-lg w-full"
                  onChange={handleInputChange}
                  value={employee.email}
                  name="email"
                />
              </div>

              {uploadProgress === 0 ? null : (
                <Progress value={uploadProgress} color="blue" />
              )}

              <div className="flex flex-col mt-2">
                <label htmlFor="imageUrl">Upload Image of Investor</label>
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

              <div className="m-2">
                <label htmlFor="">Employee's salary</label>
                <input
                  type="number"
                  placeholder="Employee's salary"
                  className="border-2 border-gray-300 p-2 rounded-lg w-full"
                  name="salary"
                  onChange={handleInputChange}
                  value={employee.salary}
                />
              </div>

              <div className="m-2">
                <label htmlFor="">Employee's address</label>
                <input
                  type="text"
                  placeholder="Employee's address"
                  className="border-2 border-gray-300 p-2 rounded-lg w-full"
                  name="address"
                  onChange={handleInputChange}
                  value={employee.address}
                />
              </div>

              <div className="">
                <label htmlFor="category" className="py-1 ">
                  Employee's position
                </label>
                <select
                  className="border-2 border-gray-300 p-2 rounded-lg w-full"
                  required
                  placeholder="Select employee's position"
                  name="position"
                  value={employee.position}
                  onChange={handleInputChange}
                >
                  <option selected disabled>
                    Select employee's position
                  </option>
                  <option value="owner">CEO</option>

                  <option value="manager">Manager</option>
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
                <label htmlFor="">Employee's phone number</label>
                <input
                  type="number"
                  placeholder="Employee's phone number"
                  className="border-2 border-gray-300 p-2 rounded-lg w-full"
                  name="phone"
                  onChange={handleInputChange}
                  value={employee.phone}
                />
              </div>

              <div className="flex justify-between m-4">
                <button
                  className="bg-blue-400 text-white px-6 py-2 rounded-xl"
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
