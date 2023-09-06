
import Link from 'next/link'
import SideBar from "./components/sidebar";
import NavBar from './components/content/navbar'
import ContentCont from "./components/contentcontainer";
import GenIcon from './components/content/gen_icon'
import { ThemeProvider, Button, Alert } from "@material-tailwind/react";
import { BsCaretLeftFill, BsPersonLinesFill, BsTruck } from 'react-icons/bs';
import { RiArrowLeftSLine, RiPencilFill } from 'react-icons/ri';
import { FaCheckCircle, FaHouseUser } from 'react-icons/fa';
import { TbTruckDelivery } from 'react-icons/tb';

const Employee = ({ Component, pageProps }) => {
    return (
        <div>
            <SideBar />
            <EmpLayout />
            {/* <ContentCont component={[<NavBar />, <WayLayout />]}/> */}
        </div>
    );
};

const EmpLayout = () => {
    return (
        <div className="flex">
            <div className="content-container">
                <NavBar />
                
                <div className="bg-gray-100 px-5 py-2 h-screen">
                    
                    {/* Subheader Here..! RiArrowLeftSLine */}
                    {/* <h2 className="h1-text w-1/3 mt-2 mb-5"><GenIcon icon={<TbTruckDelivery size={24} className="float-left mt-0.5 mr-2" />}/>Manage&nbsp;Waybill</h2> */}
                    <GenIcon className="mr-2 text-lg font-medium mt-2 mb-5" icon={<TbTruckDelivery size={24} className="float-left mt-0.5 mr-2" />} text='Manage Employee'/>
                    <div className="text-links-container">
                        {/* <Link href="" className="active-tlink"><p className="flex">Add Waybill <GenIcon icon={<FaCheckCircle size={14} className="text-gray-500 mt-1 ml-2" />}/></p></Link> */}
                        {/* <Link href="" className="active-tlink"><p className="flex">Add Waybill <GenIcon icon={<FaCheckCircle size={14} className="text-gray-500 mt-1 ml-2" />}/></p></Link> */}
                        <Link href="" className="active-tlink"><GenIcon className="menu-text" icon={<FaCheckCircle size={14} className="float-right text-gray-500 mt-1 ml-2" />} text='Add Employee'/></Link>
                        <Link href="/emp_records"><p>Emp. Records</p></Link>
                        <Link href=""><p>Next Page</p></Link>
                    </div>

                    {/* <div className="flex w-max gap-4">
                        <Button variant="filled">filled</Button>
                        <Button variant="gradient">gradient</Button>
                        <Button variant="outlined">outlined</Button>
                        <Button variant="text">text</Button>
                    </div> */}

                    <div className="white-card w-10/12 h-auto">
                        <div className="h-auto">
                            <h3>Input employee data here <span>(Personal info.)</span></h3>
                            <form action="">
                                <div className="flex flex-col">
                                    <div className="input-container w-1/2">
                                        <h4>Fullname</h4>
                                        <input name="fullname" id="fullname" type="text" placeholder="eg. John Doe"/>
                                    </div>
                                    <div className="input-container w-1/2">
                                        <h4>Gender</h4>
                                        <select name="gender" id="gender">
                                            <option defaultValue>-- Select --</option>
                                            <option>Male</option>
                                            <option>Female</option>
                                        </select>
                                    </div>
                                    <div className="input-container w-1/2">
                                        <h4>Date of birth<span></span></h4>
                                        <input name="dob" id="dob" type="date" />
                                    </div>
                                    <div className="input-container w-1/2">
                                        <h4>Contact</h4>
                                        <input name="contact" id="contact" type="phone" placeholder="eg. 001752314825"/>
                                    </div>
                                    <div className="input-container w-1/2">
                                        <h4>Email<span> (Optional)</span></h4>
                                        <input name="email" id="" type="email" />
                                    </div>
                                    <div className="input-container w-1/2">
                                        <h4>Photo <span>(Optional)</span></h4>
                                        <input name="photo" id="photo" type="file"/>
                                    </div>
                                    
                                    <h3></h3>
                                    <h3>Company use <span>(Officially required for payroll)</span></h3>

                                    <div className="input-container w-1/2">
                                        <h4>Position</h4>
                                        <select name="position" id="position">
                                            <option defaultValue>-- Select --</option>
                                            <option>Position 1</option>
                                            <option>Position 2</option>
                                        </select>
                                    </div>

                                    <div className="input-container w-1/2">
                                        <h4>Salary</h4>
                                        <input name="salary" id="salary" type="number"/>
                                    </div>

                                    <div className="input-container w-1/2">
                                        <h4>Account Number</h4>
                                        <input name="acc_no" id="acc_no" type="number"/>
                                    </div>

                                    <div className="input-container w-1/2">
                                        <h4>Bank</h4>
                                        <input name="bank" id="bank" type="text" placeholder="eg. Ecobank"/>
                                    </div>

                                    <div className="input-container w-1/2">
                                        <h4>Branch</h4>
                                        <input name="branch" id="branch" type="text" placeholder="East Legon branch"/>
                                    </div>

                                    <div className="input-container w-1/2">
                                        <h4>Station</h4>
                                        <select name="station" id="station">
                                            <option defaultValue>-- Select --</option>
                                            <option>Station 1</option>
                                            <option>Station 2</option>
                                        </select>
                                    </div>
                                </div>

                                {/* <div className="checkbox">
                                    <input id="" type="checkbox" />
                                    Check box to confirm that item has being delivered
                                </div> */}
                            </form>
                        </div>
                    </div>
                    {/* <p className="subheader">Preview of users' details</p> */}

                    <div className="w-10/12">
                        <button className="save-btn">Save</button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Employee;