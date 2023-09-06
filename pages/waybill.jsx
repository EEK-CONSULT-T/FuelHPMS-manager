
import Link from 'next/link'
import SideBar from "./components/sidebar";
import NavBar from './components/content/navbar'
import ContentCont from "./components/contentcontainer";
import GenIcon from './components/content/gen_icon'
import { BsCaretLeftFill, BsPersonLinesFill, BsTruck } from 'react-icons/bs';
import { RiArrowLeftSLine, RiPencilFill } from 'react-icons/ri';
import { FaCheckCircle, FaHouseUser } from 'react-icons/fa';
import { TbTruckDelivery } from 'react-icons/tb';
import { Button } from "@material-tailwind/react";
import config from '../config'

const Waybill = () => {
    return (
        <div>
            <SideBar />
            <ContentCont component={[<NavBar />, <WayLayout />]}/>
        </div>
    );
};


const WayLayout = () => {
    return (
        <div className="bg-gray-100 px-5 py-2 h-screen">
            
            {/* Subheader Here..! RiArrowLeftSLine */}
            <h2 className="h1-text w-1/3 mt-2 mb-5"><GenIcon icon={<TbTruckDelivery size={24} className="float-left mt-0.5 mr-2" />}/>Manage&nbsp;Waybill</h2>
            <div className="text-links-container">
                <Link href="" className="active-tlink"><p className="flex">Add Waybill <GenIcon icon={<FaCheckCircle size={14} className="text-gray-500 mt-1 ml-2" />}/></p></Link>
                <Link href=""><p>View History</p></Link>
                <Link href=""><p>Next Page</p></Link>
            </div>

            {/* <div className="flex w-max gap-4">
                <Button variant="filled">filled</Button>
                <Button variant="gradient">gradient</Button>
                <Button variant="outlined">outlined</Button>
                <Button variant="text">text</Button>
            </div> */}

            <div className="white-card w-10/12">
                <h3>Sender/Driver`s details required <span>(Basic Info)</span></h3>
                <form action="">
                    <div className="flex">
                        <div className="input-container w-1/3">
                            <h4>Driver's Name</h4>
                            <input type="text" placeholder="eg. John Doe"/>
                        </div>
                        <div className="input-container w-1/3">
                            <h4>Driver's Contact</h4>
                            <input type="phone" placeholder="eg. 001752314825"/>
                        </div>
                        <div className="input-container w-1/3">
                            <h4>Email<span> (Optional)</span></h4>
                            <input type="email" />
                        </div>
                    </div>
                    <h3></h3>
                    <h3>Where is the order being delivered? <span>(Company from & Station to)</span></h3>

                    <div className="flex">
                        <div className="input-container w-1/2">
                            <h4>Company Name</h4>
                            <input type="text" placeholder="Delivery is from?"/>
                        </div>
                        <div className="input-container w-1/2">
                            <h4>Company Address</h4>
                            <input type="text" placeholder="eg. 001752314825"/>
                        </div>
                    </div>
                    <div className="flex">
                        <div className="input-container w-1/3">
                            <h4>Waybill No.</h4>
                            <input type="text"/>
                        </div>
                        <div className="input-container w-1/3">
                            <h4>Total Quantity <span>(In Litres)</span></h4>
                            <input type="text"/>
                        </div>
                        <div className="input-container w-1/3">
                            <h4>Delivery Date<span> (Optional)</span></h4>
                            <input type="date" />
                        </div>
                    </div>

                    <div className="flex">
                        <div className="input-container w-1/3">
                            <h4>Delivery Location<span> (Station)</span></h4>
                            <select name="" id="">
                                <option selcted>Station name</option>
                                <option>Station 1</option>
                                <option>Station 2</option>
                            </select>
                        </div>
                        {/* <div className="input-container w-1/2">
                            <h4>Waybill No.</h4>
                            <input type="text"/>
                        </div> */}
                    </div>
                    <div className="checkbox">
                        <input type="checkbox" />
                        Check box to confirm that item has being delivered
                    </div>
                </form>
            </div>
            {/* <p className="subheader">Preview of users' details</p> */}

            <div className="w-10/12">
                <button className="save-btn">Save</button>
            </div>
        </div>
    );
};

export default Waybill;