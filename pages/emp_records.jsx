
import Link from 'next/link'
import SideBar from "./components/sidebar";
import NavBar from './components/content/navbar'
import ContentCont from "./components/contentcontainer";
import GenIcon from './components/content/gen_icon'
import { ThemeProvider, Button, Alert } from "@material-tailwind/react";
import { TbTruckDelivery } from 'react-icons/tb';
import { RiArrowLeftSLine, RiPencilFill } from 'react-icons/ri';
import { BsPencilSquare, BsFileText, BsTrash, BsTrash3, BsTrashFill, BsCheckCircleFill, BsXCircleFill, BsXOctagonFill, BsExclamationTriangleFill} from 'react-icons/bs';
import { FaCheckCircle, FaEdit, FaExclamationTriangle, FaHouseUser, FaPen, FaPenAlt, FaPenSquare, FaTimesCircle, FaTrashAlt, FaUsers, FaUsersCog } from 'react-icons/fa';


const EmployeeRecords = ({ Component, pageProps }) => {
    return (
        <div>
            <SideBar />
            <EmpRecLayout />
            {/* <ContentCont component={[<NavBar />, <WayLayout />]}/> */}
        </div>
    );
};

const EmpRecLayout = () => {
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
                        <Link href="/employee"><p>Add Employee</p></Link>
                        <Link href="" className="active-tlink"><GenIcon className="menu-text" icon={<FaCheckCircle size={14} className="float-right text-gray-500 mt-1 ml-2" />} text='Emp. Records'/></Link>
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
                            <h3>Employee Records <span>Summary</span></h3>

                            <div className="flow-row-col">
                                <div className="user-viewform w-full">
                                    <SucessTag iconname={<GenIcon icon={<BsCheckCircleFill size={18} className="float-left mx-2 my-1" />} />} color="bg-green-100 text-green-700" text="Great! Your data has been successfully saved"/>
                                    <SucessTag iconname={<GenIcon icon={<BsXOctagonFill size={18} className="float-left mx-2 my-1" />} />} color="bg-red-100 text-red-700" text="Oop..! Unknown error"/>
                                    <SucessTag iconname={<GenIcon icon={<FaExclamationTriangle size={18} className="float-left mx-2 my-1" />} />} color="bg-orange-100 text-orange-800" text="Oop..! Unknown error"/>
                                    <table className="my-table table-auto">
                                        <thead>
                                            <tr>
                                                <th>Song</th>
                                                <th>Artist</th>
                                                <th>Year</th>
                                                <th className="text-right">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>The Sliding Mr. Bones (Next Stop, Pottersville)</td>
                                                <td>Malcolm Lockyer</td>
                                                <td>1961</td>
                                                <td className="text-right">
                                                    <button type="button" className="action-btn">
                                                        <GenIcon icon={<FaPenAlt size="14" className="text-teal-400"/>}/>
                                                    </button>
                                                    <button type="button" className="action-btn">
                                                        <GenIcon icon={<FaTrashAlt size="14" className="text-pink-500"/>}/>
                                                    </button>
                                                </td>
                                            </tr>
                                            <tr className="bg-light-blue-50">
                                                <td>Witchy Woman</td>
                                                <td>The Eagles</td>
                                                <td>1972</td>
                                                <td className="text-right w-24">
                                                    <button type="button" className="action-btn">
                                                        <GenIcon icon={<FaPenAlt size="14" className="text-teal-400"/>}/>
                                                    </button>
                                                    <button type="button" className="action-btn">
                                                        <GenIcon icon={<FaTrashAlt size="14" className="text-pink-500"/>}/>
                                                    </button>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Shining Star</td>
                                                <td>Earth, Wind, and Fire</td>
                                                <td>1975</td>
                                                <td className="text-right">
                                                    <button type="button" className="action-btn">
                                                        <GenIcon icon={<FaPenAlt size="14" className="text-teal-400"/>}/>
                                                    </button>
                                                    <button type="button" className="action-btn">
                                                        <GenIcon icon={<FaTrashAlt size="14" className="text-pink-500"/>}/>
                                                    </button>
                                                </td>
                                            </tr>
                                            <tr className="bg-light-blue-50">
                                                <td>The Sliding Mr. Bones (Next Stop, Pottersville)</td>
                                                <td>Malcolm Lockyer</td>
                                                <td>1961</td>
                                                <td className="text-right">
                                                    <button type="button" className="action-btn">
                                                        <GenIcon icon={<FaPenAlt size="14" className="text-teal-400"/>}/>
                                                    </button>
                                                    <button type="button" className="action-btn">
                                                        <GenIcon icon={<FaTrashAlt size="14" className="text-pink-500"/>}/>
                                                    </button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

const SucessTag = ( {iconname, color, text} ) => (
    <div className={`success-tag ${color}`}>
        {iconname}
        <p>{text}</p>
    </div>
);

export default EmployeeRecords;